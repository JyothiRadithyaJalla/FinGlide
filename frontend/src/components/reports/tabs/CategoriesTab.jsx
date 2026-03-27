import React,{useState,useMemo} from 'react'
import { useSelector } from 'react-redux'
import  BarChartSpVsBud  from '../charts/BarChartSpVsBud'
import { selectBudgets,selectTransactions } from '../../../redux/selectors'
import EmptyView from '../../EmptyView'

const CategoriesTab = () => {

  const [period, setPeriod] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const budgetList = useSelector(selectBudgets) || [];
  const transactionList = useSelector(selectTransactions) || [];

  const [year, month] = period.split("-");


  const categoryAnalysisList = useMemo(() => {
    if (!transactionList.length || !budgetList.length) return [];
    console.log("hey")

    const budgetCategoryIds = new Set(budgetList.map(b => b.categoryId.toString()));

    const categories = {};

    transactionList.forEach((tx) => {
      if (tx.transactionType !== "Expense") return;
      if (!tx.categoryId?._id) return;

      const categoryId = tx.categoryId._id;
      if (!budgetCategoryIds.has(categoryId)) return;

      const d = new Date(tx.date);
      if (
        d.getFullYear() !== Number(year) ||
        d.getMonth() + 1 !== Number(month)
      ) {
        return;
      }

      if (!categories[categoryId]) {
        categories[categoryId] = {
          name: tx.categoryId.name,
          total: 0,
          count: 0,
        };
      }

      categories[categoryId].total += tx.amount;
      categories[categoryId].count += 1;
    });

    return Object.values(categories).sort((a, b) => b.total - a.total);
  }, [transactionList, budgetList, year, month]);

  return (
    <div className="flex flex-col lg:flex-row gap-5 justify-around items-stretch">
      <div className="lg:basis-[67%] bg-[#FFFAF4] shadow-lg rounded-2xl flex flex-col border-2 border-[#DDDFDE]">
        <BarChartSpVsBud period={period} setPeriod={setPeriod} />
      </div>
      <div className="lg:basis-[33%] flex flex-col bg-[#FFFAF4] border-2 border-[#DDDFDE] shadow-lg rounded-2xl p-4 w-full ">
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Category Analysis
            </h2>
            <p className="text-[#8E5660] text-sm">
              Detailed breakdown of spending by category
            </p>
          </div>

          {categoryAnalysisList.length > 0 ? (
            <div className="space-y-3">
              {categoryAnalysisList.map((cat, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white border border-[#DDDFDE] p-3 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-[#3A3A3A]">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {cat.count} transactions
                    </p>
                  </div>
                  <p className="font-semibold text-green-600">
                    ₹{cat.total}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyView message="No category data available." />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoriesTab
