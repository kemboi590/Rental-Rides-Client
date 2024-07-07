import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Drawer from "./Drawer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="flex lg:flex-row gap-4">
        <aside className="w-0 lg:w-[23%]">
          <Drawer />
        </aside>

        <main className="w-full bg-webcolor">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
