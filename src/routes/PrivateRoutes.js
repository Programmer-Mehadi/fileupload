import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem('MySecret');
    if (token) {
        fetch('http://localhost:5000/verifyuser',
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `$Barer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (user === data.email) {
                    return children;
                }
                if (data.status === 'Forbidden' || data.status === 'unauthorized access') {
                    return navigate('/login')
                }
            })
    }
    else {
        return <Navigate to='/login' state={{ form: location }} replace></Navigate>;
    }
    if (loading) {
        return <Loading></Loading>
    }

    return children;

};

export default PrivateRoutes;