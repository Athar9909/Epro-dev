import React from 'react';
import { ChevronLeft, FileText, AlertCircle } from 'lucide-react';

const AppVendorProposal = () => {
  const chartData = [
    { month: 'Jan', value1: 20, value2: 10 },
    { month: 'Feb', value1: 80, value2: 60 },
    { month: 'Mar', value1: 90, value2: 85 },
    { month: 'Apr', value1: 50, value2: 45 },
    { month: 'May', value1: 45, value2: 50 },
    { month: 'Jun', value1: 10, value2: 20 },
    { month: 'Jul', value1: 60, value2: 25 },
    { month: 'Aug', value1: 70, value2: 65 },
    { month: 'Sep', value1: 20, value2: 15 }
  ];

  const tableData = [
    { sno: '#2332', vendor: 'Rohan Singh', coverage: '90%', itemCode: '#4567' },
    { sno: '#2333', vendor: 'Rohan Singh', coverage: '56%', itemCode: '#4567' },
    { sno: '#2334', vendor: 'Rohan Singh', coverage: '15%', itemCode: '#4567' }
  ];

  const proposals = [
    {
      id: 1,
      company: 'Qureshi Traders',
      date: '20 Dec, 2024 | 12:00 PM - 01:30 PM',
      tags: ['Construction', 'Construction'],
      document: 'Products table.pdf'
    },
    {
      id: 2,
      company: 'Qureshi Traders',
      date: '20 Dec, 2024 | 12:00 PM - 01:30 PM',
      tags: ['Construction', 'Construction'],
      document: 'Products table.pdf'
    }
  ];

  return (
    <div className=" bg-white min-h-screen">

      {/* Page Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 text-[#272727] mr-3" />
          <span className="text-lg font-semibold text-[#272727]">Vendor Proposals</span>
        </div>
        <button className="text-[#009eb4] font-medium">Print</button>
      </div>

      {/* Evaluate Summary */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#272727] mb-4">Evaluate Summary</h2>
        <div className="mb-6">
          <p className="text-sm text-[#272727] mb-2">
            The catering provided by Al Sahra Buffet Services exceeded our expectations. Every dish was delicious, and the staff went above and beyond to ensure everything ran smoothly.
          </p>
          <p className="text-sm text-[#272727]">
            exceeded our expectations. Every dish was delicious, and the staff went above and beyond to ensure everything ran smoothly.
          </p>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <div className="relative h-64">
            <svg width="100%" height="100%" viewBox="0 0 320 200" className="overflow-visible">
              {/* Grid lines */}
              {[0, 20, 40, 60, 80, 100].map((y) => (
                <g key={y}>
                  <line
                    x1="40"
                    y1={160 - (y * 1.2)}
                    x2="300"
                    y2={160 - (y * 1.2)}
                    stroke="#e5e5e5"
                    strokeDasharray="2,2"
                  />
                  <text
                    x="30"
                    y={165 - (y * 1.2)}
                    fontSize="12"
                    fill="#A8A8A8"
                    textAnchor="end"
                  >
                    {y}k
                  </text>
                </g>
              ))}

              {/* Chart lines */}
              <path
                d={`M 50,${160 - (chartData[0].value1 * 1.2)} ${chartData.map((d, i) =>
                  `L ${50 + (i * 30)},${160 - (d.value1 * 1.2)}`
                ).join(' ')}`}
                fill="none"
                stroke="#F4C63B"
                strokeWidth="2"
                strokeDasharray="5,5"
              />

              <path
                d={`M 50,${160 - (chartData[0].value2 * 1.2)} ${chartData.map((d, i) =>
                  `L ${50 + (i * 30)},${160 - (d.value2 * 1.2)}`
                ).join(' ')}`}
                fill="none"
                stroke="#009eb4"
                strokeWidth="2"
                strokeDasharray="5,5"
              />

              {/* X-axis labels */}
              {chartData.map((d, i) => (
                <text
                  key={i}
                  x={50 + (i * 30)}
                  y="185"
                  fontSize="12"
                  fill="#A8A8A8"
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Products/Services Table */}
        <h3 className="text-lg font-semibold text-[#272727] mb-4">Products/Services/Rental Services</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead className='rounded-tl-[10px] rounded-tr-[10px]'>
              <tr className="bg-[#009eb4] text-white">
                <th className="px-3 py-2 text-left text-sm font-medium">S.no</th>
                <th className="px-3 py-2 text-left text-sm font-medium">Vendor Name</th>
                <th className="px-3 py-2 text-left text-sm font-medium">Coverage</th>
                <th className="px-3 py-2 text-left text-sm font-medium">Item Code</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b border-[#e5e5e5]">
                  <td className="px-3 py-2 text-sm text-[#272727]">{row.sno}</td>
                  <td className="px-3 py-2 text-sm text-[#272727]">{row.vendor}</td>
                  <td className="px-3 py-2 text-sm text-[#272727]">{row.coverage}</td>
                  <td className="px-3 py-2 text-sm text-[#272727]">{row.itemCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Proposal Cards */}
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="border border-[#e5e5e5] rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="w-16 h-16 bg-[#f7f7f7] border border-[#e5e5e5] rounded-[10px] flex items-center justify-center mr-3">
                  <img src='/resources/icons/document2.svg' alt='icon' />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {proposal.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-[#009eb4] text-white text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-semibold text-[#272727] mb-1">{proposal.company}</h4>
                  <p className="text-sm text-[#A8A8A8] mb-2">{proposal.date}</p>
                  <div className="flex items-center mb-3 border border-[#e5e5e5] p-1 rounded-[10px]">
                    <img className='w-6' src='/resourcesApp/iconsApp/pdf.svg' alt='pdf-icon' />
                    <span className="text-sm text-[#272727] pl-2">{proposal.document}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 py-2 border border-[#009eb4] text-[#009eb4] rounded-lg font-medium">
                  Reject
                </button>
                <button className="flex-1 py-2 bg-[#009eb4] text-white rounded-lg font-medium">
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-6 p-3 bg-[#F6FEFF] border border-[#009eb4] rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-[#009eb4] mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#009eb4]">
            The system does not make responsibility for automatic selection & servers tool only.
          </p>
        </div>
      </div>

      {/* Bottom indicator */}
      {/* <div className="flex justify-center py-4">
        <div className="w-32 h-1 bg-[#272727] rounded-full"></div>
      </div> */}
    </div>
  );
};

export default AppVendorProposal;