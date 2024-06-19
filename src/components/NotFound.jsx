import React from "react";
import notFoundAni from "../assets/lotties/notfoundAni.json";
import Lottie from "react-lottie-player";
import { Button, Typography } from "@material-tailwind/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-6 lg:p-0 ">
      <div className="w-[20rem] h-[20rem] object-cover">
        <Lottie loop animationData={notFoundAni} play  />
      </div>

      <Button className="flex justify-center items-center gap-x-3 " onClick={() => navigate("/")}>
      <IoArrowBack className="text-2xl text-[#fa8b23]"/>
        <Typography  className="text-lg" >
          Go Home
        </Typography>
      </Button>
      
    </div>
  );
};

export default NotFound;
