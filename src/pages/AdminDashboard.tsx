import { useEffect, useState } from "react";
import MainProfileInfo from "../components/MainProfileInfo";
import SalesStats from "../components/SalesStats";
import TotalBalance from "../components/TotalBalance";
import TotalReport from "../components/TotalReport";
import useWindowSize from "../hooks/useWindowSize";
import PageHeader from "../layout/admin/PageHeader";
import { getTotalExpense } from "../apis/user";

const AdminDashboard = () => {
  const { width } = useWindowSize();
  const [income, setIncome] = useState<number>(0);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const expense = await getTotalExpense();
        setIncome(expense.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <PageHeader title="Sales Analytics" />
      <div className="widgets-grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-[minmax(0,_951px)_minmax(0,_1fr)]">
        <MainProfileInfo income={income} />
        {width >= 1536 && <TotalBalance income={income} />}
        <SalesStats />
        <TotalReport />
      </div>
    </>
  );
};

export default AdminDashboard;
