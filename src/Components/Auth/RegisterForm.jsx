import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        user: {
            username: "",
            password: "",
            email:""
        },
    });

    const handleChange = (e) => {
        setFormData({
            user: {
                ...formData.user,
                [e.target.name]: e.target.value,
            },
        });
    };

    return (
        <figure className="h-screen flex bg-black bg-opacity-20">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
                <blockquote className="text-2xl font-medium text-center">

                    <p className="text-lg font-semibold inline flex justify-center align-middle">
                        <img
                            className="block sm h-8 w-auto mr-5"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                            alt="Workflow"
                        />Welcome to Student Planner</p>
                </blockquote>

                <div className="text-primary m-6">
                    <div className="flex items-center mt-3 justify-center">
                        <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
                            Register new account
                        </h1>
                    </div>
                    <form>
                        <label className="text-left">Username:</label>
                        <input
                            name="username"
                            type="text"
                            value={formData.user.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            }
                        />

                        <label>Email:</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.user.email}
                            onChange={handleChange}
                            placeholder="Password"
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            }
                        />
                        <label>Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            }
                        />

                        <div className="flex items-center mt-3 justify-center">
                            <button
                                className={
                                    "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                                }
                                value="Login"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center mt-3 justify-center">
                        <button className={"justify-center text-blue-500 hover:underline"}>
                        <Link to='/login'>Already have account? Log in</Link>
                        </button>
                    </div>
                </div>

            </div>
        </figure>
    );
}