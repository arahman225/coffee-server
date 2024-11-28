import { Link, useLoaderData } from "react-router-dom";


const Details = () => {
    const coffee = useLoaderData()
  
    return (
        <div>
                            <div className="flex gap-7 items-center bg-[#F5F4F1] justify-between">
                                <div>
                                    <img src={coffee.photoUrl} alt="" />
                                </div>
                                <div className="">
                                        <h3>Name:{coffee.name}</h3>
                                        <p>Chef:{coffee.chef}</p>
                                        <p>Price:{coffee.price}</p>
                                        </div>
                                    <div className="p-5 flex flex-col gap-5">
                                        <Link to={`/coffees/${coffee._id}`}>Detail</Link>
                                        <Link  className="btn btn-primary">Edit</Link>
                                        <button onClick={() =>handleDelete(coffee._id)} className="btn btn-error text-white">X</button>
                                    </div>
                            </div>
        </div>
    );
};

export default Details;