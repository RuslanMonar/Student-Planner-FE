import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import AuthAction from "../../ActionsController/AuthActionController";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
          //setLoading(true);
          dispatch(AuthAction.SignIn(email, password))
            .then(() => {
              setTimeout(() => {
                //setLoading(false);
                //setSuccessful(true);
              }, 2000);
            })
            .catch((e) => {
              //catchError(e);
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
              Login to your account
            </h1>
          </div>
          <form onSubmit={SignIn}>
            <label className="text-left">Email:</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="Email"
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
            
          </div>
        </figure>
      );
}