import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";
import PDFParser from "pdf2json";

import tempFileModel from "../../models/tempFileModel.js";
import userModel from "../../models/userModel.js";

const uploadBufferToCloudinary = async (
  buffer,
  options = { resource_type: "auto", folder: "roshetta/files" },
) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      })
      .end(buffer);
  });

const saveUploadedFile = async ({ req, fileData }) => {
  if (req.userId) {
    await userModel.findByIdAndUpdate(req.userId, {
      $push: { uploadedFiles: fileData },
    });
    return;
  }

  await tempFileModel.create({
    ...fileData,
    sessionId: req.sessionID || "anonymous",
  });
};

const uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No audio file uploaded." });
    }

    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 10MB limit.",
      });
    }

    const allowedMimeTypes = [
      "audio/webm",
      "audio/wav",
      "audio/mp3",
      "audio/mpeg",
      "audio/m4a",
      "audio/ogg",
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported audio format. Please use WebM, WAV, MP3, or M4A.",
      });
    }

    const cloudinaryResult = await uploadBufferToCloudinary(req.file.buffer, {
      resource_type: "video",
      folder: "roshetta/audio",
      timeout: 60000,
      format: "webm",
    });

    let transcription = "";
    let transcriptionSuccess = false;

    const transcribeWithRetry = async (maxRetries = 3, initialDelayMs = 5000) => {
      let attempt = 0;
      let delay = initialDelayMs;

      while (attempt < maxRetries) {
        try {
          attempt += 1;

          const formData = new FormData();
          formData.append("file", req.file.buffer, {
            filename: req.file.originalname || "audio.webm",
            contentType: req.file.mimetype || "audio/webm",
          });
          formData.append("model", "whisper-1");
          formData.append("language", "en");
          formData.append("response_format", "json");

          const transcriptionResponse = await axios.post(
            "https://api.openai.com/v1/audio/transcriptions",
            formData,
            {
              headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                ...formData.getHeaders(),
              },
              timeout: 60000,
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
            },
          );

          if (transcriptionResponse.data?.text) {
            return transcriptionResponse.data.text.trim();
          }

          throw new Error("Empty transcription response");
        } catch (error) {
          if (error.response?.status !== 429 || attempt >= maxRetries) {
            throw error;
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        }
      }

      throw new Error(
        "Too many requests to transcription API. Please try again later.",
      );
    };

    try {
      transcription = await transcribeWithRetry();

      if (transcription.length < 2) {
        transcription =
          "Audio was too short or unclear. Please try speaking more clearly or for a longer duration.";
      } else {
        transcriptionSuccess = true;
      }
    } catch (error) {
      transcription = error.message || "Transcription failed.";
    }

    await saveUploadedFile({
      req,
      fileData: {
        type: "audio",
        url: cloudinaryResult.secure_url,
        transcription,
        transcriptionSuccess,
        createdAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      transcription,
      transcriptionSuccess,
      fileUrl: cloudinaryResult.secure_url,
      message: transcriptionSuccess
        ? "Audio uploaded and transcribed successfully"
        : "Audio uploaded but transcription failed",
    });
  } catch (error) {
    console.error("Error uploading audio:", error);
    return res.status(500).json({
      success: false,
      message: `Upload failed: ${error.message}`,
    });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    const result = await uploadBufferToCloudinary(req.file.buffer, {
      resource_type: "auto",
      folder: "roshetta/files",
    });

    await saveUploadedFile({
      req,
      fileData: {
        type: req.file.mimetype,
        url: result.secure_url,
        createdAt: Date.now(),
      },
    });

    return res.status(200).json({ success: true, fileUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const analyzeImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image URL is required" });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Analyze medical prescriptions from images. Extract details such as medication names, dosages, and instructions. If the image is unclear or not a prescription, state so.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this prescription image." },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    return res.json({
      success: true,
      analysis: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const analyzePdfText = async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== "application/pdf") {
      return res
        .status(400)
        .json({ success: false, message: "No PDF file uploaded." });
    }

    const result = await uploadBufferToCloudinary(req.file.buffer, {
      resource_type: "auto",
      folder: "roshetta/files",
    });

    const pdfParser = new PDFParser();
    const text = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
      });
      pdfParser.on("pdfParser_dataError", (error) => {
        reject(new Error(error.parserError));
      });
      pdfParser.parseBuffer(req.file.buffer);
    });

    const textAnalysisResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Analyze medical prescriptions from text. Extract details such as medication names, dosages, and instructions. If the text is unclear or not a prescription, state so.",
          },
          {
            role: "user",
            content: `Analyze this prescription text: ${text}`,
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    await saveUploadedFile({
      req,
      fileData: {
        type: "application/pdf",
        url: result.secure_url,
        textContent: text,
        createdAt: Date.now(),
      },
    });

    return res.json({
      success: true,
      text,
      fileUrl: result.secure_url,
      analysis: textAnalysisResponse.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error analyzing PDF text:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { uploadAudio, uploadFile, analyzeImage, analyzePdfText };
