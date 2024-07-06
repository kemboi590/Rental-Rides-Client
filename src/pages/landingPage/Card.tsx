import { CardData } from "../../components/cardData/CardData";

const Card = () => {
    return (
        <div className="flex flex-wrap gap-3 justify-center mt-10">
            {CardData.map((data, index) => (
                <div key={index} className="card bg-base-100 w-80 md:w-72 shadow-xl my-4 lg:my-0">
                    <figure className="h-60">
                        <img src={data.image} alt={data.name} />
                    </figure>
                    <div className="card-body flex flex-row justify-between gap-4">
                      <div>
                      <h2 className="card-title">
                            {data.name}
                        </h2>
                        <p>Price: Ksh.{data.price}</p>
                      </div>
                        <div className="card-actions justify-end">
                    <button className="badge badge-outline btn bg-[#FF914D] text-text-light hover:text-black border-none">Book vehicle</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
