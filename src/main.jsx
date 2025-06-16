import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import MobileApp from "./MobileApp.jsx";
import "./index.css"; // always load

function Root() {
  const isMobile = window.innerWidth <= 640;

  useEffect(() => {
    if (!isMobile) {
      // Dynamically load Style.css only for larger screens
      import("./assets/css/Style.css");
    }
    else{
      import("./assets/css/appStyle.css");

    }
  }, [isMobile]);

  return isMobile ? <MobileApp /> : <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
