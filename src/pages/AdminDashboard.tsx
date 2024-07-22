import { useEffect, useState } from "react";
import MainProfileInfo from "../components/MainProfileInfo";
import SalesStats from "../components/SalesStats";
import TotalBalance from "../components/TotalBalance";
import TotalReport from "../components/TotalReport";
import useWindowSize from "../hooks/useWindowSize";
import PageHeader from "../layout/admin/PageHeader";
import { getTotalReport } from "../apis/order";

const AdminDashboard = () => {
  const { width } = useWindowSize();
  const [orderReport, setOrderReport] = useState<{
    total_orders: number;
    successful_orders: number;
    total_expense: number;
  }>({
    total_orders: 0,
    successful_orders: 0,
    total_expense: 0
  });

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getTotalReport();
        setOrderReport(response.data.data);
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
        <MainProfileInfo income={orderReport.total_expense} />
        {width >= 1536 && <TotalBalance income={orderReport.total_expense} />}
        <SalesStats />
        <TotalReport report={orderReport} />
      </div>
    </>
  );
};

export default AdminDashboard;
