import React, { useEffect, useState } from 'react'
const serverUri = import.meta.env.VITE_JWT_TRIAL_SERVER_URI;

const Dashboard = () => {

    const [username, setUsername] = useState('User');
    const [counter, setCounter] = useState(null);


    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            console.log(serverUri);

            const response = await fetch(`${serverUri}/api/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setUsername(data.username);
            setCounter(data.counter);
            console.log(data);
        }
        fetchUser();
    }, [])


    const handleCountSave = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${serverUri}/api/savecount`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ counter })
        });
        const data = await response.json();
        console.log(data.msg);
    }


    return (
        <div>
            Hello, {username}! <br />
            Your count is {counter} <br /> <br />
            <button onClick={() => setCounter(counter - 10)}>Count-10</button> <br /> <br />
            <button onClick={handleCountSave}>Save Count</button>
        </div>
    )
}

export default Dashboard
