import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors == "object") {
      for (let e in err?.data.errors) {
        console.log(`err.data.errors[${e}]`, err.data.errors[e]);
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      for (let i = 0; i < err.data.length; i++) {
        console.log(`data(${i})=`, err.data[i]);
        toast.warning(err.data[i].description);
      }
    } else if (err?.status == 401) {
      toast.warning("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.warning(err?.data);
    }
  }
};
