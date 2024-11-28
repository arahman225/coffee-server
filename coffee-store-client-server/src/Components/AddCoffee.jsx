import React from 'react';
import Swal from 'sweetalert2'

const AddCoffee = () => {


    const addCoffee = e =>{
        e.preventDefault()
        console.log('add coffee')
        const form = e.target;
        const name = form.name.value;
        const chef = form.chef.value;
        const category = form.category.value;
        const price = form.price.value;
        const photoUrl = form.photourl.value;
        const coffeeInfo = {name, chef, category, price, photoUrl};
        console.log(coffeeInfo)

        fetch('http://localhost:5000/coffees', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(coffeeInfo)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    title: "Good job!",
                    text: "You successfully added!",
                    icon: "success"
                  });
            }
        })
    }

    return (
        <div className='bg-[#F4F3F0] w-4/5 mx-auto mt-10 mb-10'>
            <div className='p-10 text-center'>
                <h2>Add New Coffee</h2>
                <p>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
            </div>
            <div>
                <div className="card  w-full  shrink-0 shadow-2xl">
                    <form onSubmit={addCoffee} className="card-body">
                        <div className="flex gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Chef</span>
                                </label>
                                <input type="text" placeholder="chef" name='chef' className="input input-bordered" required />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <input type="text" placeholder="category" name='category' className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="text" placeholder="price" name='price' className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" placeholder="photo url" name='photourl' className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#D2B48C]">Add Coffee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCoffee;