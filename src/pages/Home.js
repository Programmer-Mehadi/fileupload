import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="flex w-full h-screen items-center justify-center text-white gap-6 text-2xl font-bold">
                <Link to='/form' className="grid h-20 w-[150px] card  rounded-box place-items-center bg-primary">Form</Link>
       
                <Link to='/dashboard' className="grid h-20 w-[150px]  card bg-primary rounded-box place-items-center">Dashboard</Link>
            </div>
        </div>
    );
};

export default Home;