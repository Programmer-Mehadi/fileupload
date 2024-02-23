import { useState } from "react";


const useAdminCheck = () => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
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
                if (data.email) {
                    setAdmin(true)
                }
                if (data.status === 'Forbidden' || data.status === 'unauthorized access') {
                    setAdmin(false)
                }
            })
    }
    return [admin]
}
export default useAdminCheck;