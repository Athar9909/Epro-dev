import { ArrowLeft, Printer } from "lucide-react";

const SOWPreview = ({setCurrentView, deliverables, sowForm}) => {

    const generatePDF = () => {
        // In a real application, you would use a library like jsPDF or react-pdf
        alert('PDF generation would be implemented here using libraries like jsPDF or react-pdf');
    };

    return (
        <div className="fixed inset-0 bg-gray-500/70 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className='bg-[#F5F7F9] rounded-btn' >
                <div className=" rounded-lg border border-[#e5e5e5] m-4 w-full max-w-4xl max-h-[90vh] overflow-x-hidden overflow-y-auto hide-scrollbar">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white fixed w-4xl rounded-tl-xl rounded-tr-xl">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCurrentView('create')}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-lg font-semibold text-gray-900">SOW Preview</h2>
                        </div>
                        <button
                            onClick={generatePDF}
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-600"
                        >
                            <Printer className="w-4 h-4" />
                            Print Document
                        </button>
                    </div>

                    {/* Preview Content */}
                    <div className="p-8 space-y-8 mx-6 mt-20 mb-10 rounded-btn shadow-md bg-white">
                        {/* Company Header */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl">🏢</span>
                            </div>
                            <h1 className="text-xl font-bold text-blue-600 mb-2">Hindustan Unilever Ltd</h1>
                        </div>

                        {/* SOW Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">SOW Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SOW Title</label>
                                    <p className="text-sm text-gray-900">{sowForm.title || 'lorem ipsum'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SOW Number</label>
                                    <p className="text-sm text-gray-900">lorem ipsum</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Document for</label>
                                    <p className="text-sm text-gray-900">{sowForm.documentFor || 'lorem ipsum'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <p className="text-sm text-gray-900">lorem ipsum</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SOW Creator</label>
                                    <p className="text-sm text-gray-900">{sowForm.creator || 'lorem ipsum'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                    <p className="text-sm text-gray-900">lorem ipsum</p>
                                </div>
                            </div>
                        </div>

                        {/* Other Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Introduction</h4>
                                    <p className="text-sm text-gray-700">
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Company Info</h4>
                                    <p className="text-sm text-gray-700">
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Objectives</h4>
                                        <p className="text-sm text-gray-700">lorem ipsum</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Department</h4>
                                        <p className="text-sm text-gray-700">lorem ipsum</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deliverable Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deliverable Details</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-200 rounded-lg">
                                    <thead className="bg-[#009EB4] text-white">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">S.no</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Deliverables</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {deliverables.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-3 text-sm">{String(index + 1).padStart(2, '0')}</td>
                                                <td className="px-4 py-3 text-sm">{item.name}</td>
                                                <td className="px-4 py-3 text-sm">{item.quantity}</td>
                                                {item.itemCodes.map((code, codeIndex) => (
                                                    <td key={codeIndex} className="px-4 py-3 text-sm text-gray-600">{code}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SOWPreview