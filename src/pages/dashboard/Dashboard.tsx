import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Drawer from "./Drawer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="flex lg:flex-row ">
        <aside className="w-full lg:w-[20%]">
          <Drawer />
        </aside>

        <main className="w-full lg:w-[80%] bg-webcolor">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
