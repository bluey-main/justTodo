import { useContext } from "react";
import { GoArrowDownLeft, GoArrowUpRight, GoTrash } from "react-icons/go";
import { DesktopContext } from "../context/DesktopContext";
import moment from "moment";
import ViewTaskDialog from "./ViewTaskDialog";

const TodoCard = ({ task, column }) => {
  const {
    handleDragStart,
    deleteTask,
    handleMove,
    setViewDialogOpen,
    activeTask,
    setActiveTask,
    handleMoveBackward
  } = useContext(DesktopContext);
  return (
    <div
      key={task.id}
      className={`w-full transition-all duration-300 ease-in-out delay-100 active:opacity-5 group h-32 ${
        column == "todo"
          ? "bg-red-500 text-white"
          : column == "inProgress"
          ? "bg-yellow-500"
          : "bg-green-500 text-white"
      } text-xl w-[full] flex flex-col justify-center gap-y-7 p-5 rounded-lg`}
      draggable
      onDragStart={(e) => handleDragStart(e, task, column)}
      onClick={() =>
         {setViewDialogOpen(true)
          setActiveTask(task)
         }}
    >
      <div className="w-full h-[10%] flex justify-between">
        <p className="text-base">{moment(task.date).format("LL")}</p>
        <div
          className={`w-[1.5rem] h-[1.5rem] cursor-pointer border ${column == "done" ? "hidden" : "block"} border-white flex justify-center items-center rounded-full`}
          onClick={(e) => handleMove(task, e)}
        >
          <GoArrowUpRight className="text-lg" />
        </div>
      </div>
      <div className="w-full h-[70%] ">
        <p
          className={`sm:text-lg text-base font-bold truncate text-ellipsis ${
            task.status === "done" ? "line-through" : ""
          }`}
        >
          {task.content}
        </p>
        {/* <br /> */}
        {/* {task?.status } */}
      </div>
      <div className={`w-full h-[20%] items-center flex ${column == "todo" ? "justify-end": "justify-between"} `}>
      <div
          className={`w-[1.5rem] h-[1.5rem] cursor-pointer border ${column == "todo" ? "hidden" : "block"} border-white flex justify-center items-center rounded-full`}
          onClick={(e) => handleMoveBackward(task, e)}
        >
          <GoArrowDownLeft className="text-lg" />
        </div>
        <GoTrash
          onClick={(e) => deleteTask(task.id, column, e)}
          className=" text-xl text-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TodoCard;
