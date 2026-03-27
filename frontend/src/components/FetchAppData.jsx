import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchCoreData } from "../redux/coreThunks"
import { fetchReportsData } from "../redux/coreThunks"

export const FetchAppData = () => {
  const dispatch = useDispatch()
  
  const isUserLoggedIn = useSelector(
    state => state.core.isUserLoggedIn
  )

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchCoreData());
      dispatch(fetchReportsData());
    }
  }, [isUserLoggedIn, dispatch]);
}