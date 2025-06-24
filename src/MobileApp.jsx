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
import AppSelectProfile from "./webApp/appAuth/AppSelectProfile";
import { useSelector } from "react-redux";
import AppUserProfile from "./webApp/appScreens/userProfile/AppUserProfile";

const Splash1 = lazy(() => import("./webApp/appAuth/AppSplash"));

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

function NoPageFound() {
  return (
    <>
      <h1>No Page Found</h1>
      {/* <AppNavbar /> */}
    </>
  )
}



function MobileApp() {
  const registerData = useSelector((state) => state.misc.registerData);
  console.log(registerData)

  return (
    <div className={i18next.language === "ar" ? "ArabicRtl" : "App"}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Toaster
            position="top-center"
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
            transition="bounce"
          />
          <ScrollToTopOnNavigation />
          <Routes>
            {/* Private Routes */}
            <Route path="/" element={<Splash1 />} />
            <Route path="/User-Web/Profile-Selection" element={<AppSelectProfile />} />
            <Route path="/User-Web/SignUp" element={<AppStartSignUp />} />
            <Route path="/Sign-Up/Process-one" element={<SignupForm />} />
            <Route path="/Login" element={<AppLogin />} />
            <Route path="/Forgot-Password" element={<AppForgetPassword />} />
            <Route path="/Verify-OTP" element={<AppOtpVerification />} />
            <Route path="/Reset-Password" element={<AppResetPassword />} />
            {/* User Routes */}
            <Route path="/profile" element={<AppUserProfile />} />
            
            {/* Public Routes */}
            {/* Homepage */}
            <Route path="/Dashboard" element={<AppDashboard />} />
            <Route path="/User-Web/Categories" element={<AppCategories />} />
            <Route path="/User-Web/Categories/Sub-Categories" element={<AppSubCategories />} />
            <Route path="/User-Web/Products" element={<AppProductList />} />
            <Route path="/User-Web/Product-Details" element={<AppProductDetails />} />
            {/* Meeting */}
            <Route path="/User-Web/Meeting" element={<AppMeeting />} />
            {/* SOW */}
            <Route path="/User-Web/Documents" element={<AppSOWManager />} />
            {/* Vendor */}
            <Route path="/User-Web/Vendor-Details" element={<AppVendorDetails />} />
            <Route path="/User-Web/Chat-Interface" element={<AppChatInterface />} />
            {/* Vendor Proposal */}
            <Route path="/User-Web/Evaluated-Vendors-Proposals" element={<AppVendorProposal />} />
            {/* E-Delivery Note */}
            <Route path="/User-Web/E-Delivery-Note" element={<AppEDelivery />} />
            <Route path="/User-Web/Track-Delivery-Order" element={<AppTrackOrder />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default MobileApp;
