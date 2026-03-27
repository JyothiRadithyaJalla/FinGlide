import React, { useState } from 'react'
import { MdOutlineDelete,MdOutlineEdit } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux'
import {AddAccountModal} from '../components/modals/add/AddAccountModal.jsx'
import {EditAccountModal} from "../components/modals/edit/EditAccountModal.jsx"
import { accountIcons } from '../components/utils/utilities.js';
import { deleteAccountThunk } from '../redux/coreThunks.js';
import { selectAccounts } from '../redux/selectors.js';

function Accounts() {
  const dispatch = useDispatch();

  const [isAddAccountModelOpen,setIsAccountModalOpen] = useState(false)
  const [editAccount,setEditAccount] = useState(null)

 const accounts = useSelector(selectAccounts) || [];

  const deleteAccount = (id) => {
    dispatch(deleteAccountThunk(id));
  }

  const reducer = (a,b) => a+b.balance 
  const totalAmount = accounts.reduce(reducer,0);


  return (
    <div>
      {isAddAccountModelOpen && <AddAccountModal onClose={() => setIsAccountModalOpen(false)}/>}
      {editAccount && <EditAccountModal editAccount={editAccount} onClose={() => setEditAccount(null)}/>}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5'>
        <div>
          <h1 className='text-[#3A3A3A] text-2xl sm:text-[28px] font-[500]'>Accounts</h1>
          <p className='text-[14px] text-[#3B3F40]'>Manage your financial accounts and view balances.</p>
        </div>
        <div>
          <button onClick={() => setIsAccountModalOpen(true)} className='bg-[#D96D38] text-white text-base sm:text-[18px] p-2 rounded px-5 cursor-pointer hover:bg-[#e05a38] transition-colors whitespace-nowrap'>+ Add Account</button>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#FFFAF4] rounded-lg shadow-lg p-4 border-2 border-[#DDDFDE] my-5'>
        <div>
          <h1 className='text-[#36353A] font-[500] text-[18px]'>Total Net Worth</h1>
          <p className='text-[#813C7F] text-[14px]'>Combined balance across all accounts</p>
        </div>
        <div className='sm:text-right'>
          <h1 className='text-[#D66C39] text-[25px] font-[500]'>₹{totalAmount}</h1>
          <p className='text-[12px]'>Across {accounts.length} accounts</p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          accounts.map((account,index) => {
            const IconComponent =
  accountIcons.find((eachIcon) => eachIcon.id === account.icon) || {
    icon: () => null,
    color: "#ccc"
  };
            return(
            <div key={index} className='bg-[#FFFAF4] p-4 border-2 border-[#DDDFDE] rounded-lg group shadow'>
              <div className='mb-5 flex items-center justify-between'>
                <div className='flex gap-2'>
                  <div className='w-12 h-12 rounded-full mx-2 flex items-center justify-center' style={{backgroundColor: IconComponent.color}}>
                    <IconComponent.icon color='white'/>
                  </div>
                  <div>
                    <h1 className='text-[#3A3A3A] text-[18px] font-[500]'>{account.name}</h1>
                    <p className='text-[14px] text-[#3A3A3A]'>{account.accountType}</p>
                  </div>
                </div>
                <div className='opacity-0 group-hover:opacity-100 flex gap-4'>
                  <button onClick={() => setEditAccount(account)} className='hover:bg-[#D96D38] text-gray-500 hover:text-white p-1 rounded-lg cursor-pointer'>
                    <MdOutlineEdit size={15}/>
                  </button>
                  <button onClick={() => deleteAccount(account._id)} className='hover:bg-[#D96D38] text-gray-500 hover:text-white p-1 rounded-lg cursor-pointer'> 
                    <MdOutlineDelete size={17} />
                  </button>
                </div>
              </div>
              <div className='my-3'>
                <h1 className={`${account.balance >= 0 ? 'text-green-500' : 'text-red-500'} text-[22px] font-[500]`}>₹{account.balance}</h1>
                <p className='text-[14px] text-[#3A3A3A]'>Current Balance</p>
              </div>
              <hr className='my-3 text-gray-300'/>
              <div className='flex justify-between text-[#3A3A3A]'>
                <p>Account:</p>
                <p>{account.accountNumber}</p>
              </div>
              <div className='flex justify-between text-[#3A3A3A]'>
                <p>Institution:</p>
                <p>{account.institution}</p>
              </div>
            </div>
          )})
        }
      </div>
      
    </div>
  )
}

export default Accounts
