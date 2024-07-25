import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import bgrides from '../../assets/images/bgrides.jpeg';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Hero = () => {
    const user = useSelector((state: RootState) => state.user);
    const name = user.user?.name;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div
            className="hero h-full lg:h-screen"
            style={{
                backgroundImage: `url(${bgrides})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="hero-overlay bg-opacity-50 rounded-lg"></div>
            <div className={`hero-content text-neutral-content text-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`transform transition-transform duration-1000 ${loaded ? 'translate-y-0' : '-translate-y-10'}`}>
                    <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
                        Welcome to Rental Rides,
                        <span className='text-webcolor'>
                            {name ? ` ${name}` : ''}
                        </span>
                    </h1>
                    <p className="mb-5">
                        Rent a car from our extensive range of vehicles. We have every type of car available to meet your needs. <br />
                        We offer affordable Pricing to our Customers
                    </p>
                    <Link to="/dashboard/vehicles" className="btn bg-webcolor text-text-light hover:text-black border-none">Book a Ride</Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;
