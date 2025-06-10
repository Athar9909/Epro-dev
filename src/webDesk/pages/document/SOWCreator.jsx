import { ArrowLeft, Edit, Eye, GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

const SOWCreator = ({setCurrentView, deliverables, setDeliverables, sowForm, setSowForm}) => {
    const [draggedItem, setDraggedItem] = useState(null);

    const addDeliverable = () => {
        const newDeliverable = {
            id: deliverables.length + 1,
            name: 'New Service',
            quantity: 1,
            itemCodes: ['#0000', '#0000', '#0000', '#0000']
        };
        setDeliverables([...deliverables, newDeliverable]);
    };



    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        // Handle drop logic here
        setDraggedItem(null);
    };



    // Drag and drop handlers
    const handleDragStart = (e, item, type) => {
        setDraggedItem({ item, type });
        e.dataTransfer.effectAllowed = 'move';
    };

    const removeDeliverable = (id) => {
        setDeliverables(deliverables.filter(item => item.id !== id));
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCurrentView('table')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Create SOW</h2>
                        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex gap-1">
                        <Save className='text-xs' />
                        Save as Draft
                    </button>
                    <button
                        onClick={() => setCurrentView('preview')}
                        className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-600"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                {/* Add Document Details */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs">📄</span>
                        </div>
                        Add Document Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Document for</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]">
                                <option>Select Document Type</option>
                                <option>SOW</option>
                                <option>Contract</option>
                                <option>Proposal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SOW Title</label>
                            <input
                                type="text"
                                placeholder="Enter SOW title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                                value={sowForm.title}
                                onChange={(e) => setSowForm({ ...sowForm, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SOW Creator</label>
                            <input
                                type="text"
                                placeholder="Enter creator name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                                value={sowForm.creator}
                                onChange={(e) => setSowForm({ ...sowForm, creator: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                placeholder="Enter description..."
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                                value={sowForm.description}
                                onChange={(e) => setSowForm({ ...sowForm, description: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Products/Services/Rental Services */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-xs">📦</span>
                            </div>
                            Products/Services/Rental Services
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-2 text-teal-600 hover:bg-teal-50 rounded">
                                <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                                <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={addDeliverable}
                                className="px-3 py-1 bg-[#009EB4] text-white text-sm rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#009EB4] text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">S.no</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Deliverables</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Item Code</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Item...</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {deliverables.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item, 'deliverable')}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center gap-2">
                                                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{item.name}</td>
                                        <td className="px-4 py-3 text-sm">{item.quantity}</td>
                                        {item.itemCodes.map((code, codeIndex) => (
                                            <td key={codeIndex} className="px-4 py-3 text-sm text-gray-600">{code}</td>
                                        ))}
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => removeDeliverable(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Other Details */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs">📋</span>
                        </div>
                        Other Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estimate Budget</label>
                            <input
                                type="text"
                                placeholder="Enter budget estimate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                                value={sowForm.estimateBudget}
                                onChange={(e) => setSowForm({ ...sowForm, estimateBudget: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Acceptance Criteria</label>
                            <input
                                type="text"
                                placeholder="Enter acceptance criteria"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                                value={sowForm.acceptanceCriteria}
                                onChange={(e) => setSowForm({ ...sowForm, acceptanceCriteria: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                            <input
                                type="text"
                                placeholder="Enter payment terms"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                                value={sowForm.paymentTerms}
                                onChange={(e) => setSowForm({ ...sowForm, paymentTerms: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Other Requirements</label>
                            <input
                                type="text"
                                placeholder="Enter other requirements"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                                value={sowForm.otherRequirements}
                                onChange={(e) => setSowForm({ ...sowForm, otherRequirements: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Upload Required Documents */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs">📎</span>
                        </div>
                        Upload Required Documents
                    </h3>

                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                <Plus className="w-6 h-6 text-teal-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Upload a file</p>
                            <p className="text-xs text-gray-500">PDF file or other supporting doc</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default SOWCreator