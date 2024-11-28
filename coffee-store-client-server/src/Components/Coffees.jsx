import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'

const Coffees = () => {
    const loadedCoffees = useLoaderData()
    const [coffees, setCoffees] = useState(loadedCoffees)
    console.log(coffees)


    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/coffees/${id}`, {
              method: "DELETE"
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  const remainingCoffees = coffees.filter((coffee) => coffee._id !== id);
                  setCoffees(remainingCoffees);
      
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              })
              .catch((error) => {
                console.error("Error deleting coffee:", error);
                Swal.fire({
                  title: "Error!",
                  text: "Something went wrong. Please try again.",
                  icon: "error"
                });
              });
          }
        });
      };

    return (
        <div>
            <div className='bg-[#fafaf9] w-4/5 mx-auto mt-10 mb-10'>
                <div className='p-10 text-center'>
                    <h2>Our Popular Coffees</h2>
                    <p>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {
                        coffees.map(coffee => <div key={coffee._id}>
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
                                        <Link to={`/update/${coffee._id}`} className="btn btn-primary">Edit</Link>
                                        <button onClick={() =>handleDelete(coffee._id)} className="btn btn-error text-white">X</button>
                                    </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Coffees;