import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSiderbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#fffafc]">
      <AdminSidebar />

      <main className="flex-1 px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
