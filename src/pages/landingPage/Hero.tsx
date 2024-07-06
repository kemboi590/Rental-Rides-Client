import bgrides from '../../assets/images/bgrides.jpeg'

const Hero = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${bgrides})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="hero-overlay bg-opacity-50 rounded-lg"></div>
            <div className="hero-content text-neutral-content text-center">
                <div>
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Rental Rides</h1>
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