import Navbar from "../../components/navbar/Navbar"
import About from "./About";
import Card from "./Card";
import Footer from "./Footer";
import Hero from './Hero';
import Services from "./Services";

const Home = () => {
    return (
        <div>
            < Navbar />
            <Hero />
            <Card />
            <About />
            <Services />
            <Footer />
        </div>
    )
}

export default Home