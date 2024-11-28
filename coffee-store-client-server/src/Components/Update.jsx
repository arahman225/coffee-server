import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {

    const coffee = useLoaderData()

    const updateCoffee = e =>{
        e.preventDefault()
        console.log('clickded')
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const updateInfo = {name, price};
        console.log(updateInfo)

        fetch(`http://localhost:5000/coffees/${coffee._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount>0){
                alert('Successfully modified')
            }else{
                alert('Not updated')
            }
        })
    }
  
    return (
        <div>
        <div className='bg-[#F4F3F0] w-4/5 mx-auto mt-10 mb-10'>
            <div className='p-10 text-center'>
                <h2>Update Coffee</h2>
                <p>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
            </div>
            <div>
                <div className="card  w-full  shrink-0 shadow-2xl">
                    <form onSubmit={updateCoffee} className="card-body">
                        <div className="flex gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="namesdgdgf" defaultValue={coffee.name} name='name' className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="text" placeholder="price" name='price' defaultValue={coffee.price} className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#D2B48C]">Add Coffee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Update;