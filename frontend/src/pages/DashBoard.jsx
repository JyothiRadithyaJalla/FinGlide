import React, {  useState } from 'react'
import {IoWalletOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import PieChartCategory from "../components/PieChartCategory"
import  BarChartInVsEx  from '../components/BarChartInVsEx';
import { useSelector } from 'react-redux';
import { categoryIcons,accountIcons } from '../components/utils/utilities';
import {ArrowBigRight} from "lucide-react"
import {AddTransactionModal}  from '../components/modals/add/AddTransactionModal';
import EmptyView from '../components/EmptyView';
import { selectAccounts, selectTransactions } from '../redux/selectors';


function DashBoard() {
  const [isTransactionModalOpen,setIsTransactionModalOpen] = useState(false)

  const transactionList = useSelector(selectTransactions) || []
  const accountList = useSelector(selectAccounts) || []

 const accounts = accountList
  .filter((each) => each.balance > 0)
  .slice(0, 3)

  const transactions = transactionList.slice(0,5)

  const currentMonth = new Date().getMonth();
  let income = 0, expenses = 0;

  transactionList.forEach(tx => {
    const month = new Date(tx.date).getMonth();
    if (month === currentMonth) {
      if (tx.transactionType === "Income") income += tx.amount;
      if (tx.transactionType === "Expense") expenses += tx.amount;
    }
  });
  return (
    <div>
      {/* {isTransactionModalOpen && <TransactionModal />} */}
        {isTransactionModalOpen && <AddTransactionModal onClose={() => setIsTransactionModalOpen(false)}/>}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5'>
        <div>
          <h1 className='text-[#3A3A3A] text-2xl sm:text-[28px] font-[500]'>Dashboard</h1>
          <p className='text-[14px] text-[#3B3F40]'>Welcome back! Here's your financial overview.</p>
        </div>
        <div>
          <button onClick={()=>setIsTransactionModalOpen(true)} className='bg-[#D96D38] text-white text-base sm:text-[18px] p-2 rounded px-5 cursor-pointer hover:bg-[#e05a38] transition-colors whitespace-nowrap'>+ Add Transaction</button>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3'>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'>
            <p>Total Balance</p>
            <IoWalletOutline size={20} color='#505050' />  
          </div>
          <div>
            <h1 className='text-[25px] font-[600]'>₹{income-expenses}</h1>
          </div>
        </div>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'>
            <p>Total Income</p>
            <p className='text-green-700'>↑</p>
          </div>
          <div>
            <h1 className='text-[25px] text-green-600 font-[600]'>₹{income}</h1>
            <p className='flex items-center text-[12px]'>This month</p>
          </div>
        </div>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'>
            <p>Total Expenses</p>
            <p className='text-red-600'>↓</p>
          </div>
          <div>
            <h1 className='text-[25px] text-red-600 font-[600]'>₹{expenses}</h1>
            <p className='flex items-center text-[12px]'>This month</p>
          </div>
        </div>
        <div className='flex flex-col gap-6 py-6 bg-[#FFFAF4] p-3 shadow border-1 border-[#DDDFDE] rounded-lg'>
          <div className='flex justify-between items-center'> 
            <p>Net Income</p>
            <FaArrowTrendUp/>
          </div>
          <div>
            <h1 className='text-[25px] text-green-600 font-[600]'>₹{income-expenses}</h1>
            <p className='flex items-center text-[12px]'>This month</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row items-stretch gap-4 my-3'>
        <div className="lg:basis-[38%] flex-1 bg-[#FFFAF4] shadow-lg rounded-2xl flex flex-col border-2 border-[#DDDFDE]">
          <PieChartCategory/>
        </div>
        <div className="lg:basis-[62%] flex-1 bg-[#FFFAF4] shadow-lg rounded-2xl flex flex-col border-2 border-[#DDDFDE]">
          <BarChartInVsEx />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row items-stretch gap-4'>
        <div className='flex-1 bg-[#FFFAF4] shadow-lg rounded-2xl border-2 border-[#DDDFDE] p-4 flex flex-col'>
          <div>
            <h1 className="text-lg font-semibold text-gray-700">Account Overview</h1>
            <p className="text-[#8E5660]">Your account balances at a glance.</p>
          </div>
          { accounts.length > 0 ?  <div className='my-3 space-y-2'>
            {
              accounts.map((acc,index) => {
                const IconComponent = accountIcons.find((eachIcon) => eachIcon.id === acc.icon)
                return (
                  <div key={index} className='flex items-center justify-between bg-[#FFFAF4] border-2 border-[#DDDFDE] p-3 rounded-lg'>
                    <div className='flex'>
                      <div className='w-12 h-12 rounded-full mx-2 flex items-center justify-center' style={{backgroundColor: IconComponent.color}}>
                        <IconComponent.icon color='white'/>
                      </div>
                      <div>
                        <h1 className='text-[#433C3E] text-[20px]'>{acc.name}</h1>
                        <p className='text-[12px] text-gray-700'>{acc.accountType}</p>
                      </div>
                    </div>
                    <h1 className='text-green-700 text-[18px]'>₹{acc.balance}</h1>
                  </div>
                )
              })
            }
          </div> : <EmptyView message={"All your accounts are empty. Add funds to get started."}/>}
        </div>

        <div className='flex-1 bg-[#FFFAF4] shadow-lg rounded-2xl border-2 border-[#DDDFDE] p-4 flex flex-col'>
          <div>
            <h1 className="text-lg font-semibold text-gray-700">Recent Transactions</h1>
            <p className="text-[#8E5660]">Your Latest financial activity.</p>
          </div>
          { transactions.length > 0 ?
            <div className='my-3 space-y-1'>
            {
              transactions.map((each,index) => {
              let button
              let IconComponent = {icon: ArrowBigRight , color: "blue"}
              if(each.transactionType === "Expense")
                button = "text-white bg-red-500 text-[11px] border py-1 px-2 rounded"
              else if(each.transactionType === "Transfer")
                button = "text-white bg-blue-500 text-[11px] border py-1 px-2 rounded"
              else
                button = "text-white bg-green-500 text-[11px] border py-1 px-2 rounded"
              if (each.transactionType === "Income" || each.transactionType === "Expense")
                 IconComponent = categoryIcons.find((eachIcon) => eachIcon.id === each.categoryId.icon)
              return (
                <div key={index} className='border-2 border-[#DDDFDE] bg-white rounded p-3 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center'>
                  <div className='w-12 h-12 rounded-full flex items-center justify-center shrink-0' style={{backgroundColor: IconComponent.color}}>
                    <IconComponent.icon color='white'/>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between flex-1 gap-2 min-w-0'>
                    <div className='min-w-0'>
                      <div className='flex flex-wrap gap-2 sm:gap-4 items-center mb-1'>
                        <h1 className='text-[#3A3A3A] text-base sm:text-[18px] font-[500] break-words'>{each.description}</h1>
                        <p className={button}>{each.transactionType}</p>
                      </div>
                      <div className='min-w-0'>
                        { (each.transactionType === "Income" || each.transactionType === "Expense") ? 
                          <ul className='flex flex-wrap gap-2 sm:gap-5 text-[12px]'>
                            <p className='text-[#494847]'>{each.categoryId.name}</p>
                            <li className='text-[#494847] list-disc'>{each.accountId.name}</li>
                            <li className='text-[#494847] list-disc'>{new Date(each.date).toDateString()}</li>
                          </ul>
                          : <ul className='flex flex-wrap gap-2 sm:gap-5 text-[12px]'>
                              <p className='text-[#494847]'>From: {each.fromAccountId.name}</p>
                              <p className='text-[#494847]'>To: {each.toAccountId.name}</p>
                              <li className='text-[#494847] list-disc'>{new Date(each.date).toDateString()}</li>
                            </ul>
                        }
                        <p className='text-[#494847] text-sm sm:text-[15px] break-words'>{each.notes}</p>
                      </div>  
                    </div>
                    {each.transactionType === "Expense" ? 
                      <p className={`text-lg sm:text-[22px] font-[500] text-red-600 shrink-0 whitespace-nowrap`}><span>- </span>₹{each.amount}</p> 
                      : <p className={`text-lg sm:text-[22px] font-[500] ${each.transactionType==="Transfer" ? 'text-blue-600':'text-green-500'} shrink-0 whitespace-nowrap`}>₹{each.amount}</p>
                    }
                  </div>
                </div>
              )
            })
            }
          </div> : <EmptyView message={"No transactions recorded yet."}/>}
        </div>
      </div>
    </div>
  )
}

export default DashBoard