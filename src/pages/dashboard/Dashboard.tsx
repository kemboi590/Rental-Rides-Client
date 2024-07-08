import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Drawer from "./aside/Drawer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="flex lg:flex-row ">
        {/* <aside className="w-0 lg:w-[23%]"> */}
        {/* // using flex basis to set the width of the sidebar */}
        <aside className="lg:flex flex-col flex-shrink-0 w-0 lg:w-64 border-r border-gray-200">
          <Drawer />
        </aside>

        <main className="flex-1">
          {/* <main className="w-full bg-webcolor"> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
