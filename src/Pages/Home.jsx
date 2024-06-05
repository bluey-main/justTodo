import { useContext, useEffect, useState } from "react";
import { DesktopContext } from "../context/DesktopContext";
import { GoArrowUpRight, GoChevronDown } from "react-icons/go";
import TodoCard from "../components/TodoCard";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogBody,
  Input,

  Typography,
} from "@material-tailwind/react";
import todoImage from "../assets/todo.jpg";
import AddTaskDIalog from "../components/AddTaskDIalog";
import { AuthContext } from "../context/AuthContext";
import { CiPower } from "react-icons/ci";
import moment from "moment";
import Navbar from "../components/Navbar";
import ViewTaskDialog from "../components/ViewTaskDialog";

const Home = () => {
  const {
    tasks,
    handleDragStart,

    handleDragOver,
    handleDrop,

    handleOpen,
    activeTask,
    setActiveTask,

  } = useContext(DesktopContext);

  const {signOut, user} = useContext(AuthContext)

  const columnOrder = ['todo', 'inProgress', 'done'];

  return (
    <div>
      <Navbar signOut={signOut} user={user} />
      <div className="w-full z-50 h-24  sticky top-0 lg:mb-14 mb-5 flex items-center sm:justify-start justify-center  py-5 sm:px-16 bg-[url('/assets/todo.jpg')]">
        <Typography className="lg:text-4xl text-2xl">My Tasks</Typography>
        <Button className=" ml-auto lg:block hidden">
          {moment().format("LL")}
        </Button>
      </div>

      <div className="lg:px-20  ">
        <div className="w-full flex sm:justify-start sm:items-start justify-center items-center  h-12 bg-green-3 mb-3 sm:px-0 px-8">
          <Button
            className="bg-[#fa8b23] flex justify-between items-center "
            onClick={handleOpen}
          >
            New Task <GoChevronDown className="text-lg ml-2" />
          </Button>
        </div>

        <div className="flex w-full overflow-x-auto  gap-x-4 transition-all duration-300 ease-in-out delay-100">

          {columnOrder.map((column,index) => (
            <div
              key={column}
              className={`lg:w-[20rem] min-w-[15rem] min-h-[20rem] ${index == 0 ? "ml-6" : index == 2 ? "mr-6": ""}  transition-all duration-300 ease-in-out delay-100 bg-[#fafafa] flex flex-col gap-y-4 p-6 `}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
            >
              <h2>{column.charAt(0).toUpperCase() + column.slice(1)}</h2>
              {tasks && tasks[column] &&
                tasks[column].map((task) => (
                  <TodoCard key={task.id} task={task} column={column} />
                ))}
               
            </div>
          ))}
        </div>

        <AddTaskDIalog/>
        <ViewTaskDialog task={activeTask}/>
      </div>
    </div>
  );
};

export default Home;
