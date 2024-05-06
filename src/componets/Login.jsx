import React from "react";
import { login } from "../firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import LoaderPage from "./LoaderPage";
import { onAuthStateChanged, getAuth } from "firebase/auth";
const Login = () => {
  const [loader,setLoader] = useState(true);
  const [error,setError]  = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin");
    } catch (error) {
      console.error("Error logging in:", error);
      console.log('Your Credistinal Error')
      setLoader(false);
      setError(true)
    }
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/admin");
      } else {
        setLoader(false);
      }
    });
    return unsubscribe; 
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center bg-pink ">
      <div className="card sm:w-[30rem] !cursor-default sm:h-[20rem]   w-full mx-12 h-[400px]   z-50">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="card-inner flex items-center flex-col  !rounded-3xl p-3">
          <form
            className="w-full flex justify-center flex-col items-center gap-6 h-[100dvh] text-white"
            onSubmit={handleSubmit}
          >
            <span className="font-Amce text-2xl font-bold tracking-widest text-center">
              Login To Your Account
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-3/4 px-3 py-2 bg-white text-black text-center rounded-full outline-none font-Poppins text-sm"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-3/4 px-3 py-2 bg-white text-black text-center rounded-full outline-none font-Poppins text-sm"
            />
            <button
              type="submit"
              className="w-1/2 px-3 py-2 bg-white text-black text-center rounded-full font-Amce text-sm font-normal active:opacity-25 active:scale-90 hover:opacity-95 hover:scale-105 transition-all duration-300 "
            >
              Login
            </button>
            {error && <p className="text-xs text-red-600 font-Poppins">Incorrect Email or Password</p> }
          </form>
        </div>
      </div>
      <ul className="circles absolute">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {loader && <LoaderPage />}
    </div>
  );
};

export default Login;
