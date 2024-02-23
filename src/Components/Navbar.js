import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAdminCheck from '../Hooks/useAdminCheck';

const Navbar = () => {
    const [admin] = useAdminCheck();
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('MySecret');
        return navigate('/')
    }
    return (
        <div className="navbar bg-primary text-white">
          
            <div className="w-full">
                <ul className="flex gap-4 mx-auto items-center justify-center p-0">
                    <li><Link className='underline' to='/form'>Form</Link></li>
                    {
                        admin && <>
                            <li><Link className='underline' to='/dashboard'>Dashboard</Link></li>
                            <li><p onClick={logOut} className='underline'>Logout</p></li>
                        </>
                    }
                </ul>
            </div>
          
        </div>
    );
};

export default Navbar;