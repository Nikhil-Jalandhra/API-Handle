import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Optional: scroll only when hash is not used
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    // window.scrollTo({ top: 0, behavior: "smooth"});
  }, [pathname]);

  return null;
}
