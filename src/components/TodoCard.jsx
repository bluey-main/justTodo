import { useContext } from "react";
import { GoArrowUpRight, GoTrash } from "react-icons/go";
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
  } = useContext(DesktopContext);
  return (
    <div
      key={task.id}
      className={`w-full transition-all duration-300 ease-in-out delay-100 active:opacity-5 group h-32 ${
        column == "todo"
          ? "bg-red-400"
          : column == "inProgress"
          ? "bg-yellow-300"
          : "bg-green-500"
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
          className="w-[2rem] h-[2rem]  border border-white flex justify-center items-center rounded-full"
          onClick={() => handleMove(task)}
        >
          <GoArrowUpRight />
        </div>
      </div>
      <div className="w-full h-[70%] ">
        <p
          className={`sm:text-xl text-base font-bold truncate text-ellipsis ${
            task.status === "done" ? "line-through" : ""
          }`}
        >
          {task.content}
        </p>
        {/* <br /> */}
        {/* {task?.status } */}
      </div>
      <div className="w-full h-[20%] flex justify-end">
        <GoTrash
          onClick={() => deleteTask(task.id, column)}
          className=" text-xl text-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TodoCard;
