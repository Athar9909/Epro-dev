import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AuthHeader = ({ backLink, backText }) => {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between mb-8 flex-wrap gap-2 flex-col-reverse sm:flex-row">
        {backLink && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center">
            <Link
              to={backLink}
              className="flex items-center text-sm text-gray-600 hover:text-[#009EB4] gap-2">
              <ArrowLeft />
              {backText || "Back"}
            </Link>
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-sm bg-[#e7e7e7] py-4 px-2 rounded-btn ml-auto">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/sign-up" className="text-[#009EB4] hover:underline">
            Sign up
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
