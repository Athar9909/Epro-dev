import React from 'react';

const PopUp = ({
    type,
    heading,
    des,
    btnOne,
    btnTwo,
    setIsCompleted,
    options
}) => {
    const [selectedOption, setSelectedOption] = React.useState(null);

    return (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-[20px] max-w-xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar shadow-2xl" >
                <div className='my-10 mx-6'>
                    {/* Icon Section */}
                    <div className='flex justify-center items-center'>
                        {type === "success" && <img className='w-[150px] h-[150px]' src="/resources/icons/success.svg" alt="success-icon" />}
                        {type === "failed" && <img className='w-[150px] h-[150px]' src="/resources/icons/failed.svg" alt="failed-icon" />}
                        {type === "folder" && <img className='w-[120px] h-[120px]' src="/resources/icons/folder.svg" alt="folder-icon" />}
                    </div>

                    {/* Text Section */}
                    <div className='text-center my-6'>
                        <h1 className='text-4xl font-semibold mt-6'>{heading}</h1>
                        <p className='text-gray-600'>{des}</p>
                    </div>

                    {/* Options Section */}
                    {options && (
                        <div className='mb-6 space-y-4'>
                            {Object.entries(options).map(([key, label]) => (
                                <div
                                    key={key}
                                    className='flex items-center justify-between flex-row-reverse gap-2 border border-[#e5e5e5] px-4 py-4 rounded-btn w-full hover:bg-gray-50 cursor-pointer'
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
                                className='text-xl border border-[#e5e5e5] px-4 py-4 rounded-btn w-full bg-[#f7f7f7] hover:bg-gray-100 transition-colors'
                            >
                                {btnOne}
                            </button>
                        }
                        {
                            btnTwo &&
                            <button
                                onClick={() => setIsCompleted(true)}
                                className='text-xl border border-[#009EB4] px-4 py-4 rounded-btn w-full bg-[#009EB4] text-white hover:bg-[#00819a] transition-colors'
                                disabled={options && !selectedOption}
                            >
                                {btnTwo}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;