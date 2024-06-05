import React, { useContext } from "react";
import bgImage from "../assets/todo.jpg";
import { Typography } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import { CircleLoader, ClipLoader } from "react-spinners";

const Login = () => {
  const { signInWithGoogle, loading ,processing} = useContext(AuthContext);
  return (
    <div className="w-full h-screen flex">
      <div className=" lg:w-1/2 w-full  h-full p-14">
        <div className="w-full flex lg:justify-start lg:items-start justify-center items-centerh-[20%]">
          <Typography className="lg:text-3xl text-xl lg:text-left text-center text-[#fa8b23]">Just Todo</Typography>
        </div>

        <div className="w-full h-[80%] flex bg-green-2 flex-col lg:gap-y-20 gap-y-10 justify-center items-center lg:items-start ">
          <div>
            <h1 className="lg:text-4xl text-3xl text-bold lg:text-left text-center ">
              Hello <br /> Welcome Back
            </h1>
          </div>

          <div className="flex w-full flex-col lg:justify-start justify-center lg:items-start items-center gap-y-2">
            <p className="lg:text-left text-center">Login With Google</p>
            <div
              onClick={() => signInWithGoogle()}
              className="w-[70%] min-h-14 cursor-pointer border rounded-lg border-black hover:border-white group flex justify-center hover:bg-[#fa8b23] transition ease-in-out delay-150   items-center gap-x-6 "
            >
              {processing ? (
                <ClipLoader className="text-[#fa8b23]"/>
              ) : (
                <div className="w-full h-full flex justify-center flex-wrap gap-y-3 items-center gap-x-6">
                  <FcGoogle className="text-3xl group-hover:text-white " />
                  <p className="group-hover:text-white lg:text-left text-center transition ease-in-out delay-150  sm:block hidden">
                    Sign In With Google
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-1/2 h-full bg-[#fa8b23] bg-cover lg:block hidden"
        // style={{
        //     backgroundImage: `url(${bgImage})`
        // }}
      ></div>
    </div>
  );
};

export default Login;
