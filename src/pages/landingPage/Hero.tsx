import { RootState } from '../../app/store';
import bgrides from '../../assets/images/bgrides.jpeg'
import { useSelector } from 'react-redux';

const Hero = () => {
    const user = useSelector((state: RootState) => state.user);

    console.log("from Hero", user.user?.name);

    const name = user.user?.name;
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
            <div className="hero-content text-neutral-content text-center">
                <div>
                    <h1 className="mb-5 text-3xl lg:text-5xl font-bold">Welcome to Rental Rides,
                        <span className='text-webcolor'>
                            {name ? ` ${name}` : ''}
                        </span>
                    </h1>
                    <p className="mb-5">
                        Rent a car from our extensive range of vehicles. We have every type of car available to meet your needs. <br />
                        We offer affordable Pricing to our Customers
                    </p>
                    <button className="btn bg-webcolor text-text-light hover:text-black border-none">Book a Ride</button>
                </div>
            </div>
        </div>
    );
}

export default Hero