import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdminCheck from '../Hooks/useAdminCheck';

const Login = () => {

    const { user,setUser } = useContext(AuthContext);
    const [data, setData] = useState("");
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()

    const [admin] =  useAdminCheck()
    console.log(admin);
    if (admin) {
        navigate('/')
    }

    const handleForm = (data) => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.accessToken !== 'No token') {
                    localStorage.setItem('MySecret', result.accessToken)
                    toast.success('Login Successfully!');
                    setUser(result.email)
                    navigate('/dashboard');
                }
            })
    }

    return (
        <div>
            <h2 className='text-xl font-bold text-center pt-10 pb-6'>Login to Admin Panel</h2>
            <div className=" w-[90%] mx-auto max-w-[600px]  ">
                <div className=" flex-col lg:flex-row-reverse">
                    <div className=" flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(handleForm)}>

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
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered"   {...register("password", { required: "Password is required" })} />
                                {
                                    errors.password && <p className='text-red-500 my-1'>{errors.password.message}*</p>
                                }
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;