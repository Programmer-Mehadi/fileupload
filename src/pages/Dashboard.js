import React, { useEffect, useState } from 'react';

const Dashboard = () => {

    const [data, setData] = useState(null);
    useEffect(() => {

        fetch('http://localhost:5000/allcandidates')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })

    }, [])
    return (
        <div>
            <h2 className='text-xl font-bold text-center pt-10 pb-6'>List of candidates</h2>
            {
                data?.length > 0 && <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((submit, index) => {
                                    return <tr key={submit._id}>
                                        <th>{index + 1}</th>
                                        <td>{submit.name}</td>
                                        <td>{submit.age}</td>
                                        <td>{submit.email}</td>
                                        <td><a className='underline text-primary' target='_blank' href={`http://localhost:5000/${submit.file}`}>View file</a></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                data?.length === 0 && <p className='text-red-600 font-bold text-xl text-center'>No data founds.</p>
            }
        </div>
    );
};

export default Dashboard;