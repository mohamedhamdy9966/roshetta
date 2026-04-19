import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const OrderContext = createContext();

const ORDER_STATUSES = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const OrderContextProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAdminToken = () => localStorage.getItem("aToken");

  const getAllOrders = async () => {
    const token = getAdminToken();
    if (!token) {
      toast.error("Admin authentication required");
      return false;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/order/all`, {
        headers: { aToken: token },
      });

      if (data.success) {
        setOrders(data.orders || []);
        return true;
      }

      toast.error(data.message || "Failed to fetch orders");
      return false;
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    const token = getAdminToken();
    if (!token) {
      toast.error("Admin authentication required");
      return false;
    }

    if (!orderId || !status) {
      toast.error("Order ID and status are required");
      return false;
    }

    if (!ORDER_STATUSES.includes(status)) {
      toast.error("Invalid order status");
      return false;
    }

    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { aToken: token } },
      );

      if (data.success) {
        toast.success(data.message || "Order status updated successfully");

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status,
                  updatedAt: data.order?.updatedAt || new Date().toISOString(),
                  deliveredAt:
                    status === "Delivered"
                      ? data.order?.deliveredAt || new Date().toISOString()
                      : order.deliveredAt,
                }
              : order,
          ),
        );

        return true;
      }

      toast.error(data.message || "Failed to update order status");
      return false;
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    orders,
    setOrders,
    loading,
    backendUrl,
    orderStatuses: ORDER_STATUSES,
    getAllOrders,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>{props.children}</OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderContext must be used within an OrderContextProvider",
    );
  }

  return context;
};

export default OrderContextProvider;
