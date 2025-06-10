import React, { useState, useRef } from 'react';
import {
    Search, Bell, User, ChevronDown, FileText, Plus, Download,
    X, ArrowLeft, Printer, GripVertical, Trash2,
    Edit, Save, Eye
} from 'lucide-react';
import TableView from './TableView';
import SOWCreator from './SOWCreator';
import SOWPreview from './SOWPreview';
import PopUp from '../../components/popups/PopUp';

const SOW = () => {
    const [currentView, setCurrentView] = useState('table'); // 'table', 'create', 'preview'
    const [popUp, setPopUp] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [activeTab, setActiveTab] = useState('All');

    const [sowForm, setSowForm] = useState({
        title: '',
        creator: '',
        description: '',
        documentFor: '',
        estimateBudget: '',
        paymentTerms: '',
        acceptanceCriteria: '',
        otherRequirements: ''
    });

    const [deliverables, setDeliverables] = useState([
        { id: 1, name: 'Car Rental Service', quantity: 34, itemCodes: ['#4567', '#4567', '#4567', '#4567'] },
        { id: 2, name: 'Table Desktop', quantity: 56, itemCodes: ['#4567', '#4567', '#4567', '#4567'] },
        { id: 3, name: 'Car Rental Service', quantity: 13, itemCodes: ['#4567', '#4567', '#4567', '#4567'] }
    ]);

    return (
        <>
            <div className="min-h-screen bg-white m-6 rounded-[20px]">
                {/* Navigation Header */}
                <div className=' p-6 rounded-btn'>
                    {/* Heading */}
                    <div className="mb-6 flex justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                Scope of work ( SOWs ) Documents
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base">
                                We found 140 amazing properties that match your search.
                            </p>
                        </div>
                        <button
                            onClick={() => setCurrentView('create')}
                            className="flex items-center gap-2 px-6 py-3 bg-[#009EB4] text-white rounded-md h-fit"
                        >
                            <img
                                className="font-semibold"
                                src="/resources/icons/addWhite.svg"
                                alt="add-icon"
                            />
                            Create SOW
                        </button>
                    </div>

                    {/* Navigation and Search */}
                    <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-2">
                        {/* Tabs */}
                        <div className="flex bg-[#F5F7F9] border border-[#e5e5e5] rounded-lg p-1 w-full lg:w-1/2">
                            <button
                                onClick={() => setActiveTab('All')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'All'
                                    ? 'bg-white text-[#009EB4] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                {
                                    activeTab === "All" ?
                                        <img src='/resources/icons/filter.svg' alt='phone.svg' />
                                        :
                                        ""
                                }
                                <span>All</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('My Documents')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'My Documents'
                                    ? 'bg-white text-[#009EB4] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <span>My Documents</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('Vendor Documents')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'Vendor Documents'
                                    ? 'bg-white text-[#009EB4] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <span>Vendor Documents</span>
                            </button>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex gap-3">
                            <div className="relative flex-1 lg:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    // value={searchTerm}
                                    // onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                />
                            </div>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-md w-full sm:w-auto justify-center border border-[#e5e5e5] bg-white"
                            > <img
                                    className="font-semibold w-fit"
                                    src="/resources/icons/filter.svg"
                                    alt="filter"
                                />
                                Filters
                            </button>
                        </div>
                    </div>

                </div>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Content Area */}
                    <div className="p-4 rounded-btn overflow-hidden border border-[#e5e5e5] bg-[#f7f7f7]">
                        {currentView === 'table' && <TableView />}
                        {currentView === 'create' && <SOWCreator
                            sowForm={sowForm}
                            setSowForm={setSowForm}
                            setCurrentView={setCurrentView}
                            deliverables={deliverables}
                            setDeliverables={setDeliverables} />}
                        {currentView === 'preview' && <SOWPreview
                            sowForm={sowForm}
                            setCurrentView={setCurrentView}
                            deliverables={deliverables}
                            setDeliverables={setDeliverables} />}
                    </div>
                </main>
            </div>
            {
                popUp && (
                    <PopUp
                        type="folder"
                        heading="Choose Doc Type"
                        des="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
                        btnOne="Cancel"
                        btnTwo="Continue"
                        setIsCompleted={setIsCompleted}
                        options={{
                            optionOne: "Create PR Manually",
                            optionTwo: "Create PR with Material Code"
                        }}
                    />
                )
            }
        </>
    );
};

export default SOW;