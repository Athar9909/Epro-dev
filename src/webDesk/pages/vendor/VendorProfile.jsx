import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail, User, Building2, FolderOpen, MessageSquare, ExternalLink, Search, Filter, Eye, FileText, Plus, ArrowLeft } from 'lucide-react';

const VendorProfile = () => {
    const [activeTab, setActiveTab] = useState('Vendor Details');
    const [selectedProject, setSelectedProject] = useState(null);

    const tabs = [
        { name: 'Vendor Details', icon: User },
        { name: 'Served Categories', icon: Building2 },
        { name: 'Company Details', icon: Building2 },
        { name: 'Projects', icon: FolderOpen },
        { name: 'Product', icon: FolderOpen },
        { name: 'Reviews', icon: MessageSquare }
    ];

    const vendorData = {
        companyName: 'Al-Karim Pvt Ltd',
        rating: 4.5,
        reviewCount: 10,
        serviceCategories: ['Electrical', 'Corporate'],
        countries: ['UAE', 'Saudi Arabia', 'United States of America', 'Germany', 'China', '8+ Lanka'],
        phone: '+966 XXXXXXXXX',
        email: 'PrivateInfo@gmail.com',
        website: 'Rated Best Global',
        tradeLicense: 'Trade License',
        firstName: 'Fida Mneamah',
        lastName: 'Fida Mneamah',
        phoneNumber: '+966 XXXXXXXXX',
        emailAddress: 'Fida.mneamah@gmail.com',
        address: 'Naseem Rowshan, Sulaimania, Riyadh, 24236, Saudi Arabia'
    };

    const reviews = [
        {
            id: 1,
            name: 'Sophia Lee',
            date: '12 July 2024',
            rating: 5,
            title: 'Exceptional Experience',
            content: 'The catering provided by Al Sahra Buffet Services exceeded our expectations. Every dish was delicious, and the staff went above and beyond to ensure everything ran smoothly.'
        },
        {
            id: 2,
            name: 'James Smith',
            date: '15 August 2024',
            rating: 4,
            title: 'Wonderful Event',
            content: 'The decorations and setup by Event Essentials were stunning. Our guests were in awe, and the entire atmosphere was perfect for the occasion.'
        },
        {
            id: 3,
            name: 'Emma Brown',
            date: '22 September 2024',
            rating: 5,
            title: 'Memorable Celebration',
            content: 'The live music from The Harmony Band added an unforgettable touch to our celebration. They played a fantastic mix of songs that kept everyone dancing all night.'
        },
        {
            id: 4,
            name: 'Olivia Davis',
            date: '5 November 2024',
            rating: 5,
            title: 'Exceptional Service',
            content: 'The team at Luxe Florals delivered exquisite arrangements that truly elevated our event. Each centerpiece was a work of art, and the service was impeccable.'
        }
    ];

    const projects = [
        {
            id: 1,
            title: 'Turbocharge X400 Engine Kit Project',
            category: 'Healthcare',
            fileType: 'PDF'
        },
        {
            id: 2,
            title: 'Maximize Y200 Investment Strategy',
            category: 'Finance',
            fileType: 'Excel'
        },
        {
            id: 3,
            title: 'Enhance Learning Pathways Program',
            category: 'Education',
            fileType: 'PPT'
        },
        {
            id: 4,
            title: 'Integrate Z100 Software Solutions',
            category: 'Technology',
            fileType: 'DOC'
        },
        {
            id: 5,
            title: 'Revamp Brand Awareness Campaign',
            category: 'Marketing',
            fileType: 'JPEG'
        },
        {
            id: 6,
            title: 'Optimize Inventory Management System',
            category: 'Retail',
            fileType: 'CSV'
        },
        {
            id: 7,
            title: 'Optimize Inventory Management System',
            category: 'Retail',
            fileType: 'CSV'
        },
        {
            id: 8,
            title: 'Streamline Supply Chain Operations',
            category: 'Logistics',
            fileType: 'XML'
        }
    ];

    const companyDetails = {
        employees: '1001 - 5,000',
        age: '44 Years, 2 Months',
        website: 'www.dunedream.com',
        email: 'Fida Mneimneh',
        location: 'Sulaimania, Riyadh, 24236, Saudi Arabia',
        about: 'Al Sahra Buffet Services is a premier catering company based in Dubai, specializing in creating unforgettable culinary experiences for every occasion. From corporate events and weddings to private gatherings and festive celebrations, Al Sahra is renowned for its impeccable service and exquisite menu offerings.',
        documents: [
            { name: 'Company Trade License.pdf', type: 'pdf' },
            { name: 'Company Trade License.pdf', type: 'pdf' }
        ]
    };

    const categories = [
        { name: 'Construction', count: 45, selected: true },
        { name: 'Pharmaceutical', count: null },
        { name: 'Education', count: null },
        { name: 'Broadcasting', count: null },
        { name: 'Broadcasting', count: null },
        { name: 'Broadcasting', count: null }
    ];

    //   const getFileTypeColor = (type) => {
    //     const colors = {
    //       'PDF': 'bg-red-100 text-red-700',
    //       'Excel': 'bg-green-100 text-green-700',
    //       'PPT': 'bg-orange-100 text-orange-700',
    //       'DOC': 'bg-blue-100 text-blue-700',
    //       'JPEG': 'bg-purple-100 text-purple-700',
    //       'CSV': 'bg-yellow-100 text-yellow-700',
    //       'XML': 'bg-pink-100 text-pink-700'
    //     };
    //     return colors[type] || 'bg-gray-100 text-gray-700';
    //   };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    const renderContent = () => {
        if (selectedProject) {
            return (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="flex items-center gap-2 text-gray-600"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                        <h2 className="text-xl font-semibold text-gray-900">{selectedProject.title}</h2>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 h-96 flex items-center justify-center">
                        <div className="text-center text-white">
                            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">PDF Viewer</p>
                            <p className="text-sm opacity-75">Document preview would appear here</p>
                        </div>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'Reviews':
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Previous Projects</h2>
                            <p className="text-gray-600 text-sm mb-6">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                            </p>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Overall Rating of Vendor</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">{renderStars(4)}</div>
                                            <span className="text-sm text-gray-600">4.8/5 (33 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-orange-500">4.2/5</div>
                                    <div className="text-sm text-gray-600">Over Rating</div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Customer Ratings</h3>
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#009EB4] text-white rounded-lg transition-colors text-sm">
                                    <Plus className="w-4 h-4" />
                                    Add review
                                </button>
                            </div>

                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-gray-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                                    <div className="flex">{renderStars(review.rating)}</div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                        <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                                        <p className="text-gray-600 text-sm">{review.content}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-6">
                                <button className="text-[#009EB4] hover:text-teal-600 font-medium">See more</button>
                            </div>
                        </div>
                    </div>
                );

            case 'Projects':
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Previous Projects</h2>
                            <p className="text-gray-600 text-sm mb-6">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search Product here"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009EB4] focus:border-transparent outline-none"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg transition-colors">
                                    <Filter className="w-4 h-4" />
                                    Filters
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative">
                                        <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium bg-[#F4C63B]`}>
                                            {project.fileType}
                                        </span>
                                        <FileText className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div className="text-xs text-gray-500 mb-1 border border-[#e5e5e5] w-fit px-2 py-1 rounded-[4px] bg-[#f7f7f7]">{project.category}</div>
                                    <h3 className="font-medium text-gray-900 text-sm">{project.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'Company Details':
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Company Details</h2>
                            <p className="text-gray-600 text-sm">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600 mb-1">No of Employees</div>
                                <div className="font-semibold text-gray-900">{companyDetails.employees}</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600 mb-1">Company Age</div>
                                <div className="font-semibold text-gray-900">{companyDetails.age}</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600 mb-1">Website</div>
                                <div className="font-semibold text-gray-900">{companyDetails.website}</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600 mb-1">Email</div>
                                <div className="font-semibold text-gray-900">{companyDetails.email}</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-sm font-medium text-gray-700 mb-2">Company Location</div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-gray-900">{companyDetails.location}</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-sm font-medium text-gray-700 mb-2">About Company</div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-900">{companyDetails.about}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-sm font-medium text-gray-700 mb-2">Company Location</div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-gray-900">{companyDetails.location}</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-4">Documents</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {companyDetails.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-red-600" />
                                            </div>
                                            <span className="text-gray-900 font-medium">{doc.name}</span>
                                        </div>
                                        <button className="p-2 text-[#009EB4] rounded">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'Served Categories':
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Served Categories</h2>
                            <p className="text-gray-600 text-sm mb-6">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                            </p>

                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search Categories"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009EB4] focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg cursor-pointer transition-colors ${category.selected
                                                ? 'bg-[#009EB4] text-white'
                                                : 'bg-gray-50 text-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{category.name}</span>
                                            {category.count && (
                                                <span className="text-sm">({category.count})</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {categories.map((category, index) => (
                                    <div
                                        key={index + 'right'}
                                        className="p-4 bg-gray-50 text-gray-900 rounded-lg cursor-pointer transition-colors"
                                    >
                                        <span className="font-medium">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Vendor Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={vendorData.firstName}
                                        readOnly
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={vendorData.lastName}
                                        readOnly
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        value={vendorData.emailAddress}
                                        readOnly
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="tel"
                                        value={vendorData.phoneNumber}
                                        readOnly
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                    <textarea
                                        value={vendorData.address}
                                        readOnly
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className='p-6'>
        <div className="min-h-screen bg-white rounded-[20px] overflow-hidden shadow-md">
            {/* Header */}
            <div className="relative h-[142px]  bg-gradient-to-r from-teal-600 to-[#009EB4] overflow-hidden">
                {/* <div className="absolute h-[100%] inset-0 bg-black bg-opacity-40"></div> */}
                <div className="absolute h-[100%] inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('/resources/images/vendor-banner.svg')" }}></div>

            </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 -mt-34">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 transform translate-y-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-900 rounded-lg flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
                                AK
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                            {vendorData.companyName}
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-4 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold text-gray-900">{vendorData.rating}</span>
                                                <span className="text-gray-600">({vendorData.reviewCount} reviews)</span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {vendorData.serviceCategories.map((category, index) => (
                                                    <span key={index} className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-1">Served Countries:</p>
                                            <p className="text-sm text-gray-800">{vendorData.countries.join(', ')}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-4 h-4" />
                                                <span>{vendorData.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail className="w-4 h-4" />
                                                <span>{vendorData.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <ExternalLink className="w-4 h-4" />
                                                <span>{vendorData.website}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Building2 className="w-4 h-4" />
                                                <span>{vendorData.tradeLicense}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button className="px-4 py-2 bg-[#009EB4] text-white rounded-lg transition-colors text-sm font-medium">
                                            Sending Request
                                        </button>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg transition-colors text-sm font-medium">
                                            Get Quotation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-2">
                            {tabs.map((tab) => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.name}
                                        onClick={() => {
                                            setActiveTab(tab.name);
                                            setSelectedProject(null);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-btn ${activeTab === tab.name
                                                ? 'bg-[#009EB4] text-white'
                                                : 'text-gray-700 hover:bg-[#f7f7f7]'
                                            }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span className="font-medium">{tab.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default VendorProfile;