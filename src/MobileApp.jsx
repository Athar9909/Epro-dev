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
import AppProductDetails from "./webApp/appScreens/homepage/AppProductDetails";
import AppSubCategories from "./webApp/appScreens/homepage/AppSubCategories";
import AppProductList from "./webApp/appScreens/homepage/AppProductList";
import AppMeeting from "./webApp/appScreens/meeting/AppMeeting";
import AppSOWManager from "./webApp/appScreens/sow/AppSOWManger";
import AppVendorDetails from "./webApp/appScreens/sow/AppVenderDetails";
import AppChatInterface from "./webApp/appScreens/AppChatInterface";
import AppVendorProposal from "./webApp/appScreens/vendor/AppVendorProposal";
import AppTrackOrder from "./webApp/appScreens/e-delivery/AppTrackOrder";
import AppEDelivery from "./webApp/appScreens/e-delivery/AppEDelivery";
import AppDashboard from "./webApp/appScreens/homepage/AppDashboard";
import AppCategories from "./webApp/appScreens/homepage/AppCategories";
import AppNavbar from "./webApp/components/AppNavbar";

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

function NoPageFound (){
  return (
    <>
    <h1>No Page Found</h1>
    <AppNavbar/>
    </>
  )
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
              {/* Homepage */}
              <Route path="/User-App/Homepage" element={<AppDashboard />} />
              <Route path="/User-App/Categories" element={<AppCategories />} />
              <Route path="/User-App/Categories/Sub-Categories" element={<AppSubCategories />} />
              <Route path="/User-App/Products" element={<AppProductList />} />
              <Route path="/User-App/Product-Details" element={<AppProductDetails />} />
              {/* Meeting */}
              <Route path="/User-App/Meeting" element={<AppMeeting />} />
              {/* SOW */}
              <Route path="/User-App/Documents" element={<AppSOWManager />} />
              {/* Vendor */}
              <Route path="/User-App/Vendor-Details" element={<AppVendorDetails />} />
              <Route path="/User-App/Chat-Interface" element={<AppChatInterface />} />
              {/* Vendor Proposal */}
              <Route path="/User-App/Evaluated-Vendors-Proposals" element={<AppVendorProposal />} />
              {/* E-Delivery Note */}
              <Route path="/User-App/E-Delivery-Note" element={<AppEDelivery />} />
              <Route path="/User-App/Track-Delivery-Order" element={<AppTrackOrder />} />
              <Route path="*" element={<NoPageFound />} />
            </Routes>
          </RecoilRoot>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default MobileApp;
