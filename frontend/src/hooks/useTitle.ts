import { APP_TITLE } from "@/constants/app";
import { useEffect } from "react";

const useTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${APP_TITLE}`;
    } else {
      document.title = APP_TITLE;
    }
  }, [title]);
};

export default useTitle;
