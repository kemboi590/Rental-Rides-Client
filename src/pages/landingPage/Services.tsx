import serviceimg from '../../assets/images/landingPage/services.png'
import { Check } from 'lucide-react';
const Services = () => {
    return (

        <div className="container mx-auto py-10 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2">
            <div className="flex justify-center items-center w-[80%] lg:w-[60%] mx-auto">
                <img src={serviceimg} alt="services" className="w-full" />
            </div>
            <div>
                <h2 className="font-bold text-center lg:text-start text-xl md:text-4xl text-webcolor">Our Services</h2>
                
                <div className="flex flex-col justify-center lg:flex-none lg:justify-start lg:items-start">
                <p className="text-lg mt-5 px-6 lg:px-0">
                    We offer a wide range of services to our customers. <br />
                     Our services include:
                </p>

     {/* Ul */}
                <ul className="mt-5 list-none mx-5">
                    <li className="flex gap-2">
                        <Check size={20} color='green' />
                        Car Rental
                    </li>
                    <li className="flex gap-2">
                        <Check size={20} color='green'/>
                        Car Leasing
                    </li>
                    <li className="flex gap-2">
                        <Check size={20} color='green'/>
                        Car Sales
                    </li>
                    <li className="flex gap-2">
                        <Check size={20} color='green'/>
                        Car Maintenance
                    </li>
                    <li className="flex gap-2">
                        <Check size={20} color='green'/>
                        Car Insurance
                    </li>
                </ul>
                </div>
            </div>
        </div>

    )
}

export default Services