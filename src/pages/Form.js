import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const Form = () => {

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
   

    const handleForm = (data) => {

        setLoading(true);
        let img = data.file[0];
        const formData = new FormData();
        formData.append('image', img);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                data.file = result.path;
                fetch('http://localhost:5000/insert', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.acknowledged) {
                            setLoading(false)
                            toast.success('Form Submit Sucessfully!');
                            navigate('/')
                        }
                    })
            })
    }

    return (
        <div>
            <h2 className='text-xl font-bold text-center pt-10 pb-6'>Submit The Form</h2>
            <div className=" w-[90%] mx-auto max-w-[600px]  ">
                <div className=" flex-col lg:flex-row-reverse">

                    <div className=" flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(handleForm)}>
                            {
                                loading && <Loading></Loading>
                            }
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input name='name' type="text" placeholder="name" className="input input-bordered"  {...register("name", { required: "Name is required" })} />
                                {
                                    errors.name && <p className='text-red-500 my-1'>{errors.name.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered"  {...register("email", { required: "Email is required" })} />
                                {
                                    errors.email && <p className='text-red-500 my-1'>{errors.email.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Age</span>
                                </label>
                                <input name='age' type="number" placeholder="age" className="input input-bordered"   {...register("age", { required: "Age is required" })} />
                                {
                                    errors.age && <p className='text-red-500 my-1'>{errors.age.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">File</span>
                                </label>
                                <input name="file" type="file"   {...register("file", { required: "File is required" })} />
                                {
                                    errors.file && <p className='text-red-500 my-1'>{errors.file.message}*</p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;