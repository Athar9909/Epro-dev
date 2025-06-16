import React from 'react';

const AppPopUp = ({
    type,
    url,
    heading,
    des,
    btnOne,
    btnTwo,
    setIsCompleted,
    options
}) => {
    const [selectedOption, setSelectedOption] = React.useState(null);

    return (
        <>
            {/* Full Screen Popup */}
            {
                type === "fullScreenPopup" &&
                <>
                    <div className="fixed inset-0 h-screen border-gray-200 bg-[#fff] flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className=' flex justify-center items-center flex-col pt-3'>
                            {/* Icon Section */}
                            <div className='flex justify-center items-center'>
                                {type === "success" && <img className='w-[60px] h-[60px]' src={url} alt="success-icon" />}
                            </div>

                            {/* Text Section */}
                            <div className='text-center w-[90vw] mx-auto'>
                                <h1 className='text-[20px] font-semibold mt-4'>{heading}</h1>
                                <p className='text-gray-600 text-[14px]'>{des}</p>
                            </div>

                            {/* Options Section */}
                            {options && (
                                <div className='mb-6 space-y-4 w-[90vw] mx-auto bg-[#B5B8BA1A] rounded-[10px]'>
                                    {Object.entries(options).map(([key, label]) => (
                                        <div
                                            key={key}
                                            className='flex items-center px-4 py-4 w-full hover:bg-gray-50 cursor-pointer'
                                            onClick={() => setSelectedOption(key)}
                                        >
                                            <label className='flex-1 justify-between cursor-pointer text-[14px]'>{label}</label>
                                            <input
                                                type="radio"
                                                name="docType"
                                                checked={selectedOption === key}
                                                onChange={() => setSelectedOption(key)}
                                                className='h-5 w-5 text-[#009EB4] focus:ring-[#009EB4]'
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Buttons Section */}
                            <div className='mx-auto mb-2 flex gap-4'>
                                {
                                    btnOne &&
                                    <button
                                        onClick={() => setIsCompleted(false)}
                                        className='text-xl border border-[#e5e5e5] px-4 py-4 rounded-[10px] mx-auto bg-[#f7f7f7] hover:bg-gray-100 transition-colors fixed bottom-0 right-0 left-0 w-[95vw] mb-6'
                                    >
                                        {btnOne}
                                    </button>
                                }
                                {
                                    btnTwo &&
                                    <button
                                        onClick={() => setIsCompleted(true)}
                                        className='text-xl border border-[#009EB4] px-4 py-4 rounded-[10px] mx-auto bg-[#009EB4] text-white hover:bg-[#00819a] transition-colors fixed bottom-0 right-0 left-0 w-[95vw] mb-6'
                                        disabled={options && !selectedOption}
                                    >
                                        {btnTwo}
                                    </button>
                                }
                            </div>
                            <div className='bg-[#272727] flex justify-center items-center w-[134px] h-[5px] rounded-[20px] mx-auto fixed bottom-0 right-0 left-0 mb-2'></div>

                        </div>
                    </div>

                </>
            }
            {/* Bottom checkpoint Popup */}
            {
                type === "bottomPopup" &&
                <div className="fixed inset-0 border-gray-200 bg-[#00000080] flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className='bg-white fixed bottom-0 left-0 right-0 pt-3'>
                        <div className='bg-[#B3BAC2] flex justify-center items-center w-[22px] h-[4px] rounded-[20px] mx-auto'></div>

                        {/* Text Section */}
                        <div className='text-start my-6 w-[90vw] mx-auto'>
                            <h1 className='text-[16px] font-semibold mt-6'>{heading}</h1>
                            <p className='text-gray-600'>{des}</p>
                        </div>

                        {/* Options Section */}
                        {options && (
                            <div className='mb-6 space-y-4 w-[90vw] mx-auto bg-[#B5B8BA1A] rounded-[10px]'>
                                {Object.entries(options).map(([key, label]) => (
                                    <div
                                        key={key}
                                        className='flex items-center px-4 py-4 w-full hover:bg-gray-50 cursor-pointer'
                                        onClick={() => setSelectedOption(key)}
                                    >
                                        <label className='flex-1 justify-between cursor-pointer text-[14px]'>{label}</label>
                                        <input
                                            type="radio"
                                            name="docType"
                                            checked={selectedOption === key}
                                            onChange={() => setSelectedOption(key)}
                                            className='h-5 w-5 text-[#009EB4] focus:ring-[#009EB4]'
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Buttons Section */}
                        <div className='w-[95vw] mx-auto mb-2 flex gap-4'>
                            {
                                btnOne &&
                                <button
                                    onClick={() => setIsCompleted(false)}
                                    className='text-xl border border-[#e5e5e5] px-4 py-4 rounded-[10px] w-full bg-[#f7f7f7] hover:bg-gray-100 transition-colors'
                                >
                                    {btnOne}
                                </button>
                            }
                            {
                                btnTwo &&
                                <button
                                    onClick={() => setIsCompleted(true)}
                                    className='text-xl border border-[#009EB4] px-4 py-4 rounded-[10px] w-full bg-[#009EB4] text-white hover:bg-[#00819a] transition-colors'
                                    disabled={options && !selectedOption}
                                >
                                    {btnTwo}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            }
            {/* Alert Popup */}
            {
                type === "alert" &&
                <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-[20px] max-w-xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar shadow-2xl" >
                        <div className='m-4'>
                            {/* Icon Section */}
                            <div className='flex justify-center items-center'>
                                {url && <img className='w-[150px] h-[150px]' src={url} alt="success-icon" />}
                            </div>

                            {/* Text Section */}
                            <div className='text-center my-6'>
                                <h1 className='text-[20px] font-semibold mt-6'>{heading}</h1>
                                <p className='text-gray-600 text-[14px]'>{des}</p>
                            </div>

                            {/* Options Section */}
                            {options && (
                                <div className='mb-6 space-y-4'>
                                    {Object.entries(options).map(([key, label]) => (
                                        <div
                                            key={key}
                                            className='flex items-center justify-between flex-row-reverse gap-2 border border-[#e5e5e5] px-4 py-4 rounded-[10px] w-full hover:bg-gray-50 cursor-pointer'
                                            onClick={() => setSelectedOption(key)}
                                        >
                                            <label className='flex-1 justify-between cursor-pointer'>{label}</label>
                                            <input
                                                type="radio"
                                                name="docType"
                                                checked={selectedOption === key}
                                                onChange={() => setSelectedOption(key)}
                                                className='h-5 w-5 text-[#009EB4] focus:ring-[#009EB4]'
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Buttons Section */}
                            <div className='w-full flex gap-4'>
                                {
                                    btnOne &&
                                    <button
                                        onClick={() => setIsCompleted(false)}
                                        className='text-[14px] border border-[#e5e5e5] px-2 py-3 rounded-[10px] w-full bg-[#f7f7f7] hover:bg-gray-100 transition-colors'
                                    >
                                        {btnOne}
                                    </button>
                                }
                                {
                                    btnTwo &&
                                    <button
                                        onClick={() => setIsCompleted(true)}
                                        className='text-[14px] border border-[#009EB4] px-2 py-3 rounded-[10px] w-full bg-[#009EB4] text-white hover:bg-[#00819a] transition-colors'
                                        disabled={options && !selectedOption}
                                    >
                                        {btnTwo}
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AppPopUp;