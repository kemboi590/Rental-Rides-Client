import Navbar from "../../components/navbar/Navbar"
import About from "./About";
import Card from "./Card";
import Hero from './Hero';

const Home = () => {
    return (
        <div>
            < Navbar />
            <Hero />
            <Card />
            <About />
        </div>
    )
}

export default Home