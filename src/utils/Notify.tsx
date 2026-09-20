import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast/CustomToast";

const DEFAULT_DURATION = 3500;

// Stable id: any new error toast replaces an in-flight one instead of
// stacking a duplicate on top of it.
const AUTH_ERROR_TOAST_ID = "auth-error";

export const notify = {
  success(message: string) {
    toast.custom(
      (t) => <CustomToast t={t} type="success" message={message} />,
      { duration: DEFAULT_DURATION },
    );
  },
  error(message: string, id: string = AUTH_ERROR_TOAST_ID) {
    toast.custom(
      (t) => <CustomToast t={t} type="error" message={message} />,
      { id, duration: DEFAULT_DURATION },
    );
  },
};