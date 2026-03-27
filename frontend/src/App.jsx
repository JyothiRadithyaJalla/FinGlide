import { Routes,Route } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import DashBoard from './pages/DashBoard'
import Layout from './components/Layout'
import Categories from './pages/Categories'
import Accounts from './pages/Accounts'
import Transactions from './pages/TransactionPage.jsx'
import Budgets from './pages/Budgets'
import Reports from './pages/ReportsPage.jsx'
import {ProtectedRoute, PublicRoute} from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector,useDispatch } from 'react-redux';
import Loader from './components/Loader'
import { useEffect } from 'react'
import { restoreSession } from './redux/coreThunks.js'

function App() {
  const  isLoading  = useSelector((state) => state.core.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);


  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-60 bg-white flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Layout/></ProtectedRoute>}>
            <Route index element={<DashBoard/>}></Route>
            <Route path='/categories/' element={<Categories/>}></Route>
            <Route path='/accounts' element={<Accounts/>}></Route>
            <Route path='/transactions' element ={<Transactions/>}></Route>
            <Route path='/budgets' element ={<Budgets/>}></Route>
            <Route path='/reports' element ={<Reports/>}></Route>
          </Route>
          <Route path='/register/' element={<PublicRoute><Signup /></PublicRoute>}></Route>
          <Route path='/login/' element={<PublicRoute><Signin /></PublicRoute>}></Route>
        </Routes>
      </div>
      <ToastContainer position='top-right'
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
/>
    </>
    
  )
}

export default App
