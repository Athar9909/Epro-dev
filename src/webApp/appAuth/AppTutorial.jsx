import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AppTutorial() {
    const [step, setStep] = useState(1)
    const controls = useAnimation();
    const [showPhone, setShowPhone] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPhone(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Star positions for background animation
    const stars = [
        { id: 1, x: '10%', y: '15%', delay: 0 },
        { id: 2, x: '85%', y: '25%', delay: 0.5 },
        { id: 3, x: '15%', y: '40%', delay: 1 },
        { id: 4, x: '75%', y: '50%', delay: 1.5 },
        { id: 5, x: '25%', y: '70%', delay: 0.8 },
        { id: 6, x: '80%', y: '80%', delay: 0.3 },
    ];

    return (
        <>
            {
                step === 1 &&
                <div className="min-h-screen bg-[#f6f7f9] relative overflow-hidden">
                    {/* Animated Stars Background */}
                    {stars.map((star) => (
                        <motion.div
                            key={star.id}
                            className="absolute text-white opacity-60"
                            style={{ left: star.x, top: star.y }}
                            initial={{ opacity: 0, scale: 0, rotate: 0 }}
                            animate={{
                                opacity: [0.4, 1, 0.4],
                                scale: [0.5, 1, 0.5],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: "easeInOut"
                            }}
                        >
                            {/* <Star size={16} fill="currentColor" /> */}
                            <img src='/resourcesApp/iconsApp/starBlue.svg' alt='star-icon' className='w-10' />
                        </motion.div>
                    ))}

                    {/* Main Content Container */}
                    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">

                        {/* Phone Animation Container */}
                        <div className="relative mb-20">
                            {/* Background Circle */}
                            {/* <motion.div
                        className="w-80 h-80 relative top-12 bg-[#49bcc9] bg-opacity-20 rounded-full flex items-center justify-center "
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    > */}

                            {/* Phone Container */}
                            <motion.div
                                className="w-80 h-80 relative bg-opacity-20 rounded-full flex items-center"
                                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                                animate={showPhone ? { y: 0, opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                            >
                                <img className='rounded-b-[18%]' src='/resourcesApp/iconsApp/p1.svg' alt='mobile-image' />
                            </motion.div>

                            {/* </motion.div> */}
                        </div>

                        {/* Text Content */}
                        <motion.div
                            className="text-center  px-4"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <h1 className="text-[36px] font-bold mb-1 leading-tight tracking-wide pt-2">
                                Contrary to<br />popular belief
                            </h1>
                            <p className="text-[14px] opacity-90 mb-4 leading-relaxed">
                                Affordable rates, easy ordering, and<br />unbeatable value
                            </p>
                        </motion.div>

                        {/* Get Started Button */}
                        <motion.button
                            className="w-full max-w-sm bg-[#009eb4] text-[#fff] font-semibold py-4 px-6 rounded-2xl shadow-lg"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </motion.button>

                        {/* skip button */}
                        <div className='absolute top-4 right-4 bg-[white] text-[#009EB4] px-4 rounded-[10px] py-1'>
                            <button
                                onClick={() => navigate("/")}>Skip</button>
                        </div>
                    </div>
                </div>
            }
            {
                step === 2 &&
                <div className="min-h-screen bg-[#FF9702] relative overflow-hidden">
                    {/* Animated Stars Background */}
                    {stars.map((star) => (
                        <motion.div
                            key={star.id}
                            className="absolute text-white opacity-60"
                            style={{ left: star.x, top: star.y }}
                            initial={{ opacity: 0, scale: 0, rotate: 0 }}
                            animate={{
                                opacity: [0.4, 1, 0.4],
                                scale: [0.5, 1, 0.5],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: "easeInOut"
                            }}
                        >
                            {/* <Star size={16} fill="currentColor" /> */}
                            <img src='/resourcesApp/iconsApp/star.svg' alt='star-icon' />
                        </motion.div>
                    ))}

                    {/* Main Content Container */}
                    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">

                        {/* Phone Animation Container */}
                        <div className="relative mb-20">
                            {/* Background Circle */}
                            {/* <motion.div
                        className="w-80 h-80 relative top-12 bg-[#49bcc9] bg-opacity-20 rounded-full flex items-center justify-center "
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    > */}

                            {/* Phone Container */}
                            <motion.div
                                className="w-80 h-80 relative bg-opacity-20 rounded-full flex items-center"
                                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                                animate={showPhone ? { y: 0, opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                            >
                                <img className='rounded-b-[18%]' src='/resourcesApp/iconsApp/p1.svg' alt='mobile-image' />
                            </motion.div>

                            {/* </motion.div> */}
                        </div>

                        {/* Text Content */}
                        <motion.div
                            className="text-center text-white px-4"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <h1 className="text-[36px] font-bold mb-1 leading-tight tracking-wide pt-2">
                                Contrary to<br />popular belief
                            </h1>
                            <p className="text-[14px] opacity-90 mb-4 leading-relaxed">
                                Affordable rates, easy ordering, and<br />unbeatable value
                            </p>
                        </motion.div>

                        {/* Get Started Button */}
                        <motion.button
                            className="w-full max-w-sm bg-white text-[#009eb4] font-semibold py-4 px-6 rounded-2xl shadow-lg"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </motion.button>

                        {/* skip button */}
                        <div className='absolute top-4 right-4 bg-[white] text-[#009EB4] px-4 rounded-[10px] py-1'>
                            <button
                                onClick={() => navigate("/")}>Skip</button>
                        </div>
                    </div>
                </div>
            }
            {
                step === 3 &&
                <div className="min-h-screen bg-[#009eb4] relative overflow-hidden">
                    {/* Animated Stars Background */}
                    {stars.map((star) => (
                        <motion.div
                            key={star.id}
                            className="absolute text-white opacity-60"
                            style={{ left: star.x, top: star.y }}
                            initial={{ opacity: 0, scale: 0, rotate: 0 }}
                            animate={{
                                opacity: [0.4, 1, 0.4],
                                scale: [0.5, 1, 0.5],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: "easeInOut"
                            }}
                        >
                            {/* <Star size={16} fill="currentColor" /> */}
                            <img src='/resourcesApp/iconsApp/star.svg' alt='star-icon' />
                        </motion.div>
                    ))}

                    {/* Main Content Container */}
                    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">

                        {/* Phone Animation Container */}
                        <div className="relative mb-20">
                            {/* Background Circle */}
                            {/* <motion.div
                        className="w-80 h-80 relative top-12 bg-[#49bcc9] bg-opacity-20 rounded-full flex items-center justify-center "
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    > */}

                            {/* Phone Container */}
                            <motion.div
                                className="w-80 h-80 relative bg-opacity-20 rounded-full flex items-center"
                                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                                animate={showPhone ? { y: 0, opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                            >
                                <img className='rounded-b-[18%]' src='/resourcesApp/iconsApp/p1.svg' alt='mobile-image' />
                            </motion.div>

                            {/* </motion.div> */}
                        </div>

                        {/* Text Content */}
                        <motion.div
                            className="text-center text-white px-4"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <h1 className="text-[36px] font-bold mb-1 leading-tight tracking-wide pt-2">
                                Contrary to<br />popular belief
                            </h1>
                            <p className="text-[14px] opacity-90 mb-4 leading-relaxed">
                                Affordable rates, easy ordering, and<br />unbeatable value
                            </p>
                        </motion.div>

                        {/* Get Started Button */}
                        <motion.button
                            className="w-full max-w-sm bg-white text-[#009eb4] font-semibold py-4 px-6 rounded-2xl shadow-lg"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/")}
                        >
                            Get Started
                        </motion.button>

                        {/* skip button */}
                        <div className='absolute top-4 right-4 bg-[white] text-[#009EB4] px-4 rounded-[10px] py-1'>
                            <button
                                onClick={() => navigate("/")}>Skip</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}