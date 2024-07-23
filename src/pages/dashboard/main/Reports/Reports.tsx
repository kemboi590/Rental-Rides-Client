import Footer from "../../../landingPage/Footer";
import BookingPerMonth from "./BookingPerMonth";
import CardsReport from "./CardsReport";
import TicketReport from "./TicketReport";
import VSpecReport from "./VSpecReport";



const Reports: React.FC = () => {



  return (
    <div className="bg-slate-200 h-full overflow-x-hidden">
      <h1 className="text-center text-2xl p-2 rounded-t-md text-webcolor font-bold border-b-2 border-slate-500">Rental Rides Report</h1>
      <CardsReport />
      <BookingPerMonth />
      <TicketReport />
      <VSpecReport />
      <Footer />

    </div>
  );
};

export default Reports;
