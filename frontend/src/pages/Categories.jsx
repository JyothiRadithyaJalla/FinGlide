import React, { useState } from 'react'
import { MdOutlineDelete,MdOutlineEdit } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux'
import { deleteCategoryThunk } from '../redux/coreThunks';
import { AddCategoryModal } from '../components/modals/add/AddCategoryModal';
import { categoryIcons } from '../components/utils/utilities';
import { EditCategoryModal } from '../components/modals/edit/EditCategoryModal';
import { selectCategories } from '../redux/selectors';


const categoriesTabs = {
  income: "Income",
  expense: "Expense",
}

function Categories() {
  const dispatch = useDispatch()
  const categoryList = useSelector(selectCategories) || [];
  const [isAddCategoryOpen,setIsAddCategoryOpen] = useState(false)
  const [activeCategoryTab,setActiveCategoryTab] = useState(categoriesTabs.expense)
  const [editCategory,setEditCategory] = useState(null)
  console.log(editCategory)

  const category_list = (categoryList || []).filter((eachCate) => eachCate.categoryType === activeCategoryTab)

  const inButton = 'text-[#9F0712] text-[11px] bg-[#DBFCE7] py-[1px] px-2 rounded'

  const exButton = 'text-[#9F0712] text-[11px] bg-[#FFE2E2] py-[1px] px-2 rounded'

  const deleteCategory = (id) => {
    dispatch(deleteCategoryThunk(id));
  }

  const incomeCategories = categoryList.filter((each) => "Income" === each.categoryType).length
  const expenseCategories = categoryList.filter((each) => "Expense" === each.categoryType).length


  return (
    <div>
      {/* {isCategoryModalOpen && <CategoryModal/>} */}
      {isAddCategoryOpen && <AddCategoryModal onClose={() => setIsAddCategoryOpen(false)}/>}
      {editCategory && <EditCategoryModal category={editCategory} onClose={() => setEditCategory(null)}/>}
      
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5'>
        <div>
          <h1 className='text-[#3A3A3A] text-2xl sm:text-[28px] font-[500]'>Categories</h1>
          <p className='text-[14px] text-[#3B3F40]'>Organize your income and expense categories.</p>
        </div>
        <div>
          <button onClick={() => setIsAddCategoryOpen(true)} className='bg-[#D96D38] text-white text-base sm:text-[18px] p-2 rounded px-5 cursor-pointer hover:bg-[#e05a38] transition-colors whitespace-nowrap'>+ Add Category</button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
        <div className='p-4 bg-[#FFFAF4] rounded-lg border-2 border-[#DDDFDE] shadow'>
          <div className='mb-5'>
            <h1 className='text-[20px] text-green-500 font-[500]'>Income Categories</h1>
            <p className='text-[#3A3A3A] text-[14px]'>Categories for tracking your income sources</p>
          </div>
          <div>
            <h1 className='text-[24px] font-[500]'>{incomeCategories}</h1>
            <p className='text-[#3A3A3A] text-[14px]'>Active Categories</p>
          </div>
        </div>
        <div className='p-4 bg-[#FFFAF4] rounded-lg border-2 border-[#DDDFDE] shadow'>
          <div className='mb-5'>
            <h1 className='text-[20px] text-red-600 font-[500]'>Expense Categories</h1>
            <p className='text-[#3A3A3A] text-[14px]'>Categories for tracking your expenses</p>
          </div>
          <div>
            <h1 className='text-[24px] font-[500]'>{expenseCategories}</h1>
            <p className='text-[#3A3A3A] text-[14px]'>Active Categories</p>
          </div>
        </div>
      </div>

      <div className='flex justify-center my-5'>
        <div className='flex justify-between w-full max-w-3xl bg-[#FFFAF4] px-3 py-2 rounded-lg gap-2'>
          <button className={`${activeCategoryTab == "Expense" ? "bg-white shadow" : ""} py-2 px-3 flex-1 rounded transition-all`} onClick={() => setActiveCategoryTab(categoriesTabs.expense)}>Expense Categories</button>
          <button className={`${activeCategoryTab == "Income" ? "bg-white shadow" : ""} py-2 px-3 flex-1 rounded transition-all`} onClick={() => setActiveCategoryTab(categoriesTabs.income)}>Income Categories</button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          category_list.map((category,index) => {

            const IconComponent =
  categoryIcons.find((eachIcon) => eachIcon.id === category.icon) || {
    icon: () => null,
    color: "#ccc"
  };
            return (
              <div key={index} className='bg-[#FFFAF4] p-5 border-2 border-[#DDDFDE] rounded-lg group shadow'>
                <div className='mb-5 flex justify-between items-center'>
                  <div className='flex gap-4 items-center'>
                    <div className='w-12 h-12 rounded-full mx-2 flex items-center justify-center' style={{backgroundColor: IconComponent.color}}>
                      <IconComponent.icon color='white'/>
                    </div>
                    <div>
                      <h1 className='text-[20px] font-[500] text-[#3A3A3A]'>{category.name}</h1>
                      <button className={category.categoryType === "Expense" ? exButton : inButton}>{category.categoryType === "Expense" ? "Expense" : "Income"}</button>
                    </div>
                  </div>
                  <div className='opacity-0 group-hover:opacity-100 flex gap-4'>
                    <button onClick={() => setEditCategory(category)} className='hover:bg-[#D96D38] text-gray-500 hover:text-white p-1 rounded-lg cursor-pointer'>
                      <MdOutlineEdit size={15}/>
                    </button>
                    <button onClick={() => deleteCategory(category._id)} className='hover:bg-[#D96D38] text-gray-500 hover:text-white p-1 rounded-lg cursor-pointer'> 
                      <MdOutlineDelete size={17} />
                    </button>
                  </div>
                </div>
                <p className='text-[#3A3A3A]'>{category.description && category.description}</p>
              </div>
          )})
        }
      </div>

      {/* {editCategory && <EditCategoryModal category={editCategory}/>} */}

    </div>
  )
}

export default Categories
