import Navbar from "../../components/navbar/Navbar"
import About from "./About";
import Card from "./Card";
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
        </div>
    )
}

export default Home