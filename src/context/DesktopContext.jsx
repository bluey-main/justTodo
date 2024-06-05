import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { AuthContext } from "./AuthContext";
import { db } from "../config/firebase";
import moment from "moment";

export const DesktopContext = createContext();

const DesktopProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState({});
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTask, setActiveTask] = useState({})

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (user?.uid) {
      unsubscribe = onSnapshot(
        doc(db, "justTodo", user.uid),
        (snapshot) => {
          const data = snapshot.data();
          if (data) {
            setTasks(data.tasks);
            console.log(data.tasks);
          } else {
            console.log("No tasks found in the snapshot");
          }
        },
        (error) => {
          console.error("Error fetching tasks:", error);
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user?.uid]);
  // useEffect(() => {
  //   console.log(user)
  // }, [])

  const handleDragStart = (e, task, column) => {
    setDraggedTask(task);
    setDraggedFrom(column);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, column) => {
    if (draggedTask) {
      try {
        const newTasks = { ...tasks };
        const docRef = doc(db, "justTodo", user.uid);
        
        newTasks[draggedFrom] = newTasks[draggedFrom].filter(
          (task) => task.id !== draggedTask.id
        );
        draggedTask.status = column;
        newTasks[column].push(draggedTask);
        setTasks(newTasks);
        await updateDoc(docRef,{
          tasks : newTasks,
        })
        setDraggedTask(null);
        setDraggedFrom(null);
      } catch (error) {
        console.log(error)
      }
     
    }
  };

  const handleMove = (task) => {
    try {
      const newTasks = { ...tasks };
      const docRef = doc(db, "justTodo", user.uid);
      if (task.status === "todo") {
        task.status = "inProgress";
        newTasks.inProgress.push(task);
        newTasks["todo"] = newTasks["todo"].filter(
          (t) => t.id !== task.id
        );
      } else if (task.status === "inProgress") {
        task.status = "done";
        newTasks.done.push(task);
        newTasks["inProgress"] = newTasks["inProgress"].filter(
          (t) => t.id !== task.id
        );
      }
     
      setTasks(newTasks);
      updateDoc(docRef, {
        tasks: newTasks,
      });

    
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleViewDialogOpen = () => {
    setViewDialogOpen(!viewDialogOpen);

  };

  const addTask = async () => {
    try {
      const newTasks = { ...tasks };
    const docRef = doc(db, "justTodo", user.uid);
    newTasks.todo.push({
      id: v4(),
      content: newTask,
      date: moment().toString(),
      status: "todo",
    });
    setTasks(newTasks);
    await updateDoc(docRef, {
      tasks: newTasks,
    });
    setOpen(false);
    setNewTask("");
    } catch (error) {
      console.log(error)
    }
    
  };

  const deleteTask = async(id, column) => {
    try {
      const newTasks = { ...tasks };
      const docRef = doc(db, "justTodo", user.uid);
  
      newTasks[column] = newTasks[column].filter((task) => task.id !== id);
      await updateDoc(docRef, {
        tasks: newTasks,
      });
      setTasks(newTasks)
    } catch (error) {
      console.log(error)
    }
  
  };

  const values = {
    tasks,
    open,
    setNewTask,
    deleteTask,
    setOpen,
    handleOpen,
    addTask,
    setTasks,
    draggedTask,
    draggedFrom,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleMove,
    handleViewDialogOpen,
    viewDialogOpen,
    setViewDialogOpen,
    activeTask,
    setActiveTask,
  };
  return (
    <DesktopContext.Provider value={values}>{children}</DesktopContext.Provider>
  );
};

export default DesktopProvider;
