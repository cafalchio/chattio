import React, { useState, useEffect } from 'react';

function Login(props) {
    const { setUserName, setLogged, logged, setUsers } = props;
    const [error, setError] = useState(null);

    function getUsers() {
        fetch("http://192.168.0.9:8009/users", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            });
    }

    useEffect(() => {
        getUsers();
    }, [logged]);


    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://192.168.0.9:8009/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user }),
        })
            .then((response) => {
                if (response.ok) {
                    setLogged(true);

                } else if (response.status === 401) {
                    setError("Invalid username");
                }
            })
            .catch((error) => {
                setError("Could not login, try later");
            });
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-inherit">
            <div className=" p-8 rounded-lg max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;