import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { DesktopContext } from "../context/DesktopContext";
import { ClipLoader } from "react-spinners";

const AddTaskDIalog = () => {
  const {
    setNewTask,
    addTask,
    open,
    handleOpen,
    setOpen,
    addTaskWhenEnterIsPressed,
    error,
    newTask,
    addTaskLoading,
  } = useContext(DesktopContext);
  return (
    <Dialog open={open} handler={handleOpen} size="xs">
      <DialogBody className="flex flex-col gap-y-7 overflow-x-auto">
        {addTaskLoading ? (
          <div className="w-full h-12 flex justify-center items-center">
            <ClipLoader />
          </div>
        ) : (
          <>
            <div className="w-full h-10 flex justify-between items-center">
              <Typography variant="h5" className="text-[#fa8b23]">
                Add Task
              </Typography>
              {error && !newTask ? (
                <Typography variant="p" className="text-red-500 text-sm">
                  Enter A Task
                </Typography>
              ) : (
                ""
              )}
            </div>

            <Input
              label="Task"
              className="w-full"
              onChange={(e) => setNewTask(e.target.value)}
              onKeyUp={(e) => addTaskWhenEnterIsPressed(e)}
            />

            {/* <div className="flex gap-x-3 ">
              <Chip value="Low" color="green"/>
              <Chip value="Moderate" color="yellow"/>
              <Chip value="High"  color="red"/>
            </div> */}

            <div className="flex sm:justify-end justify-center">
              {newTask ? (
                <Button className="bg-[#fa8b23]" onClick={addTask}>
                  Add
                </Button>
              ) : null}

              <Button variant="text" color="red" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogBody>
    </Dialog>
  );
};

export default AddTaskDIalog;
