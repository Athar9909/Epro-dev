import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import i18next from "i18next";
import StartSignUp from "./webDesk/Auth/StartSignUp";
import SignupForm from "./webDesk/Auth/SignupForm";
import SignupSubscription from "./webDesk/Auth/SignupSubscription";
import SignupSubscriptionView from "./webDesk/Auth/SignupSubscriptionView";
import SignUpMain from "./webDesk/Auth/SignUpMain";

const Splash1 = lazy(() => import("./webDesk/Auth/SelectProfile"));

const Loading = () => (
  <div
    style={{ height: "100vh" }}
    className="d-flex justify-content-center align-items-center h-100vh">
    <div className="logo">
      <img alt="" src="/resources/imgs/navLogo.svg" />
    </div>
  </div>
);

function ScrollToTopOnNavigation() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <div className={i18next.language === "ar" ? "ArabicRtl" : "App"}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Toaster
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            toastClassName="custom-toast"
            bodyClassName="custom-toast-body"
            progressClassName="custom-toast-progress"
          />

          <RecoilRoot>
            <ScrollToTopOnNavigation />
            <Routes>
              <Route path="/" element={<Splash1 />} />
              <Route path="/Choose-Identity" element={<StartSignUp />} />
              <Route path="/SignUpNow" element={<SignUpMain />} />
              <Route path="/Sign-Up/Process-one" element={<SignupForm />} />
              <Route
                path="/Sign-Up/Subscription"
                element={<SignupSubscription />}
              />
              <Route
                path="/Sign-Up/Subscription-view"
                element={<SignupSubscriptionView />}
              />
            </Routes>
          </RecoilRoot>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
