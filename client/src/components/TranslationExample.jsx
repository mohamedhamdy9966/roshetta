import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Example: How to use translations in any component
 *
 * 1. Import useTranslation hook
 * 2. Call it in your component
 * 3. Use t('key') to translate strings
 */

const TranslationExample = () => {
  const { t, i18n } = useTranslation();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("common.roshetta")}</h2>
      <p>{t("common.description")}</p>

      {/* Namespace examples */}
      <h3>{t("pages.home.ourTopSpecialists")}</h3>

      {/* Using nested keys */}
      <p>{t("auth.signup.bloodTypes.aPositive")}</p>

      {/* Dynamic language */}
      <p>Current Language: {i18n.language}</p>

      {/* Changing language programmatically */}
      <button onClick={() => i18n.changeLanguage("ar")}>
        Switch to Arabic
      </button>
    </div>
  );
};

export default TranslationExample;

/**
 * HOW TO USE IN YOUR COMPONENTS:
 *
 * BEFORE (Hardcoded):
 * ==================
 * <button>Sign Up</button>
 * <p>Email</p>
 *
 * AFTER (With Translations):
 * ==========================
 * import { useTranslation } from 'react-i18next';
 *
 * function MyComponent() {
 *   const { t } = useTranslation();
 *
 *   return (
 *     <>
 *       <button>{t('buttons.signUp')}</button>
 *       <p>{t('auth.signup.email')}</p>
 *     </>
 *   );
 * }
 */
