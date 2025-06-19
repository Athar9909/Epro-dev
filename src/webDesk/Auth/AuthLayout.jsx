import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen h-100dvh bg-[#fefefe] flex p-4">
      {/* Left Panel (same as login) */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="hidden md:flex lg:w-[35%] bg-gradient-to-br from-[#009EB4] to-teal-500 relative overflow-hidden rounded-container shadow-md">
        <div className="bg-[url(/resources/images/homeBanner.svg)] w-full bg-cover bg-center relative z-10 flex flex-col justify-between p-8 text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-${i === 0 ? "8" : "2"} h-2 rounded-full ${
                  i === 0 ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex-1 flex items-end">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <p className="text-lg opacity-90">{subtitle}</p>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#009EB4]/80 to-teal-500/80" />
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full lg:w-[65%] flex flex-col items-center justify-center p-4 sm:p-8 bg-white border-2 border-[#e5e5e5] sm:ml-4 rounded-container shadow-md">
        {children}
      </motion.div>
    </motion.div>
  );
};
