import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import OverviewTab from "../components/reports/tabs/OverviewTab";
import CategoriesTab from "../components/reports/tabs/CategoriesTab";
import TrendsTab from "../components/reports/tabs/TrendsTab";

const reportTabs = [
  { id: "OVERVIEW", display: "Overview" },
  { id: "CATEGORIES", display: "Categories" },
  { id: "TRENDS", display: "Trends" },
];

const tabMap = {
  OVERVIEW: OverviewTab,
  CATEGORIES: CategoriesTab,
  TRENDS: TrendsTab,
};

function Reports() {
  const [activeReportsTab, setActiveReportsTab] = useState("CATEGORIES");
  const { transactionList = [] } = useSelector((store) => store.sliceState || {});

  const currentYear = new Date().getFullYear();
  let income = 0, expenses = 0;

  transactionList.forEach(tx => {
    const year = new Date(tx.date).getFullYear();
    if (year === currentYear) {
      if (tx.transactionType === "Income") income += tx.amount;
      if (tx.transactionType === "Expense") expenses += tx.amount;
    }
  });

  const ActiveTab = tabMap[activeReportsTab];

  return (
    <div>
      {/* HEADER */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5'>
        <div>
          <h1 className='text-[#3A3A3A] text-2xl sm:text-[28px] font-[500]'>Reports & Analytics</h1>
          <p className='text-[14px] text-[#3B3F40]'>Comprehensive insights into your financial data.</p>
        </div>
        <div>
          <button className='bg-[#D96D38] text-white text-base sm:text-[18px] p-2 rounded px-5 cursor-pointer hover:bg-[#e05a38] transition-colors whitespace-nowrap'>Export Report</button>
        </div>
      </div>

      {/* SUMMARY CARDS — unchanged */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3'>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'>
            <p className='text-green-600'>Total Income</p>
            <FaArrowTrendUp size={20} color='green' />
          </div>
          <div>
            <h1 className='text-[25px] text-green-500 font-[600]'>₹{income}</h1>
            <p className='flex items-center text-[12px]'>Avg: ₹{(income/12).toFixed(2)}/month</p>
          </div>
        </div>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'>
            <p className='text-red-600'>Total Expenses</p>
            <FaArrowTrendDown size={20} color='red' />
          </div>
          <div>
            <h1 className='text-[25px] text-red-600 font-[600]'>₹{expenses}</h1>
            <p className='flex items-center text-[12px]'>Avg: ₹{(expenses/12).toFixed(2)}/month</p>
          </div>
        </div>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'>
            <p className='text-yellow-600'>Net Income</p>
            <p className='text-yellow-600'>₹</p>
          </div>
          <div>
            <h1 className='text-[25px] text-yellow-600 font-[600]'>₹{income - expenses}</h1>
            <p className='flex items-center text-[12px]'>{income > 0 
  ? (((income - expenses) / income) * 100).toFixed(2) 
  : 0
}% savings rate</p>
          </div>
        </div>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'>
            <p>Report Period</p>
            <CiCalendar/>
          </div>
          <div>
            <h1 className='text-[25px] font-[600]'>12 Months</h1>
            <p className='flex items-center text-[12px]'>Jan {currentYear} - Dec {currentYear}</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className='flex justify-center my-5'>
        <div className='flex w-full max-w-3xl shadow bg-[#FFFAF4] px-3 py-2 rounded-lg gap-2'>
          {reportTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveReportsTab(tab.id)}
              className={`${activeReportsTab === tab.id && "bg-white shadow"} flex-1 py-2 rounded`}
            >
              {tab.display}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      {ActiveTab && <ActiveTab />}
    </div>
  );
}

export default Reports;
