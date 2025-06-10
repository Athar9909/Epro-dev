import { useState } from "react";


const TableView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [tableData, setTableData] = useState([
        { id: 1, productName: 'TMT Steel Bars', dimensions: 'L: 30mm, T: 12mm, W: 10mm', quantity: '300 Qty.', price: '5,05,909 AED', deliveryDate: 'Apr 10, 2025' },
        { id: 2, productName: 'Reinforced Concrete', dimensions: 'L: 30mm, T: 12mm, W: 10mm', quantity: '300 Qty.', price: '5,05,909 AED', deliveryDate: 'May 10, 2025' },
        { id: 3, productName: 'Structural Steel', dimensions: 'L: 30mm, T: 12mm, W: 10mm', quantity: '300 Qty.', price: '5,05,909 AED', deliveryDate: 'Jun 10, 2025' },
        { id: 4, productName: 'Precast Concrete', dimensions: 'L: 30mm, T: 12mm, W: 10mm', quantity: '300 Qty.', price: '5,05,909 AED', deliveryDate: 'Jul 10, 2025' },
        { id: 5, productName: 'Cement Boards', dimensions: 'L: 30mm, T: 12mm, W: 10mm', quantity: '300 Qty.', price: '5,05,909 AED', deliveryDate: 'Aug 10, 2025' },
        { id: 6, productName: 'Cement Boards', dimensions: 'L: 30mm, T: 12mm, W: 10mm', quantity: '300 Qty.', price: '5,05,909 AED', deliveryDate: 'Sep 10, 2025' }
    ]);
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#009EB4] text-white">
                            <tr>
                                <th className="px-4 py-4 text-left text-sm font-semibold">S.no</th>
                                <th className="px-4 py-4 text-left text-sm font-semibold">Product Name</th>
                                <th className="px-4 py-4 text-left text-sm font-semibold">Dimensions</th>
                                <th className="px-4 py-4 text-left text-sm font-semibold">Quantity</th>
                                <th className="px-4 py-4 text-left text-sm font-semibold">Expected Price</th>
                                <th className="px-4 py-4 text-left text-sm font-semibold">Delivery Date</th>
                                <th className="px-4 py-4 text-left text-sm font-semibold">Attachments</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{item.productName}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{item.dimensions}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{item.quantity}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">{item.price}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{item.deliveryDate}</td>
                                    <td className="px-4 py-4 text-sm">
                                        <button className="inline-flex items-center px-3 py-1 border border-[#e7e7e7] rounded-btn">
                                            <img
                                                className="font-semibold"
                                                src="/resources/icons/PDF.svg"
                                                alt="PDF-icon"
                                            />
                                            Product Specification
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-16 h-1 bg-[#009EB4] rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[1, 2, 3].map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 text-sm rounded ${currentPage === page
                                    ? 'bg-[#009EB4] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {String(page).padStart(2, '0')}
                            </button>
                        ))}
                        <span className="text-gray-400">...</span>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">18</button>
                        <button
                            onClick={() => setCurrentPage(Math.min(18, currentPage + 1))}
                            className="px-4 py-2 bg-[#009EB4] text-white text-sm rounded"
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};


export default TableView
