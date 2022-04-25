import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import AuthAction from "../../ActionsController/AuthActionController";
import { useToasts } from "react-toast-notifications";
import { Loader } from "../Shared/Loader";
import { Navigate } from 'react-router-dom';

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const SignIn = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(AuthAction.SignIn(email, password))
            .then(() => {
                setTimeout(() => {
                    setLoading(false);
                    setSuccessful(true);
                }, 2000);
            })
            .catch((e) => {
                catchError(e);
            });
    };

    const catchError = (e) => {
        setTimeout(() => {
            setLoading(false);
            if (e.code === 400) {
                setError(e.message);
                setSuccessful(false);
            } else {
                addToast(
                    { error: "Something went wrong", message: " Please try again later" },
                    {
                        appearance: "error",
                        autoDismiss: true,
                    }
                );
            }
        }, 2000);
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
                {!loading ? (
                    <div className="text-primary m-6">
                        <div className="flex items-center mt-3 justify-center">
                            <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
                                Login to your account
                            </h1>
                        </div>
                        {error ? (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4  h-7 rounded relative mb-3">
                                <span>{error + " !"}</span>
                                <span onClick={() => setError(false)} class="absolute top-0 bottom-0 right-0 px-4 py-1">
                                    <svg class="fill-current h-5 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div>
                        ) : null}
                        <form onSubmit={SignIn}>
                            <label className="text-left">Email:</label>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="johndoe@gmail.com"
                                className={
                                    "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                                }
                            />
                            <label>Password:</label>
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={onChangePassword}
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
                                    SignIn
                                </button>
                            </div>
                        </form>
                        <div className="flex items-center mt-3 justify-center">
                            <button className={"justify-center text-blue-500 hover:underline"}>
                                <Link to='/register'>Need to register? Sign up for free</Link>
                            </button>
                        </div>

                    </div>
                ) : (
                    <Loader height={"45px"} width={"7px"} textAlign={"center"} />
                )}
                {successful && <Navigate  to="/" />}
            </div>
        </figure>
    );
}