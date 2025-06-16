import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import i18next from "i18next";
import SignupForm from "./webApp/appAuth/SignupForm";
// import SignUpMain from "./webApp/appAuth/SignUpMain";
// import SignupSubscription from "./webApp/appAuth/SignupSubscription";
// import SignupSubscriptionView from "./webApp/appAuth/SignupSubscriptionView";
import AppStartSignUp from "./webApp/appAuth/AppStartSignUp";
import AppLogin from "./webApp/appAuth/AppLogin";
import AppForgetPassword from "./webApp/appAuth/AppForgetPassword";
import AppOtpVerification from "./webApp/appAuth/AppOtpVerification";
import AppResetPassword from "./webApp/appAuth/AppResetPassword";
import AppTutorial from "./webApp/appAuth/AppTutorial";
import AppDashboard from "./webApp/appScreens/AppDashboard";
import AppProductDetails from "./webApp/appScreens/AppProductDetails";
import AppCategories from "./webApp/appScreens/AppCategories";
import AppSubCategories from "./webApp/appScreens/AppSubCategories";
import AppProductList from "./webApp/appScreens/AppProductList";
import AppMeeting from "./webApp/appScreens/meeting/AppMeeting";
import AppSOWManager from "./webApp/appScreens/sow/AppSOWManger";

const Splash1 = lazy(() => import("./webApp/appAuth/AppSelectProfile"));

const Loading = () => (
  <div
    style={{ height: "100vh" }}
    className="flex justify-center items-center h-[100vh]">
    <div className="logo">
      <img alt="" src="/resourcesApp/imagesApp/initialLoader.svg" />
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

function MobileApp() {
  return (
    <div className={i18next.language === "ar" ? "ArabicRtl" : "App"}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <RecoilRoot>
            <ScrollToTopOnNavigation />
            <Routes>
              {/* Private Routes */}
              <Route path="/" element={<Splash1 />} />
              <Route path="/User-App/Tutorial" element={<AppTutorial />} />
              <Route path="/User-App/SignUp" element={<AppStartSignUp />} />
              <Route path="/Sign-Up/Process-one" element={<SignupForm />} />
              <Route path="/User-App/Login" element={<AppLogin />} />
              <Route path="/User-App/Forgot-Password" element={<AppForgetPassword />} />
              <Route path="/User-App/Verify-OTP" element={<AppOtpVerification />} />
              <Route path="/User-App/Reset-Password" element={<AppResetPassword />} />
              {/* Public Routes */}
              <Route path="/User-App/Homepage" element={<AppDashboard />} />
              <Route path="/User-App/Categories" element={<AppCategories />} />
              <Route path="/User-App/Categories/Sub-Categories" element={<AppSubCategories />} />
              <Route path="/User-App/Products" element={<AppProductList />} />
              <Route path="/User-App/Product-Details" element={<AppProductDetails />} />
              <Route path="/User-App/Meeting" element={<AppMeeting />} />
              <Route path="/User-App/SOW" element={<AppSOWManager />} />

            </Routes>
          </RecoilRoot>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default MobileApp;
