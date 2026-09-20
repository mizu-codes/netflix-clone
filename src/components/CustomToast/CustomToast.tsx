import toast, { type Toast } from "react-hot-toast";
import { FiCheck, FiAlertCircle, FiX } from "react-icons/fi";
import "./CustomToast.css";

interface CustomToastProps {
  t: Toast;
  type: "success" | "error";
  message: string;
}

function CustomToast({ t, type, message }: CustomToastProps) {
  return (
    <div
      className={`app-toast ${t.visible ? "app-toast-enter" : "app-toast-exit"}`}
      role={type === "error" ? "alert" : "status"}
    >
      <span className="app-toast-icon">
        {type === "success" ? <FiCheck /> : <FiAlertCircle />}
      </span>

      <p className="app-toast-message">{message}</p>

      <button
        className="app-toast-close"
        onClick={() => toast.dismiss(t.id)}
        aria-label="Dismiss notification"
      >
        <FiX />
      </button>
    </div>
  );
}

export default CustomToast;
