import MainProfileInfo from "../components/MainProfileInfo";
import SalesStats from "../components/SalesStats";
import TotalBalance from "../components/TotalBalance";
import TotalReport from "../components/TotalReport";
import useWindowSize from "../hooks/useWindowSize";
import PageHeader from "../layout/admin/PageHeader";

const AdminDashboard = () => {
  const { width } = useWindowSize();
  return (
    <>
      <PageHeader title="Sales Analytics" />
      <div className="widgets-grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-[minmax(0,_951px)_minmax(0,_1fr)]">
        <MainProfileInfo />
        {width >= 1536 && <TotalBalance />}
        <SalesStats />
        <TotalReport />
      </div>
    </>
  );
};

export default AdminDashboard;
