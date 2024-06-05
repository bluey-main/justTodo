import { Button, Dialog, DialogBody, Input, Typography } from '@material-tailwind/react'
import { useContext } from 'react'
import { DesktopContext } from '../context/DesktopContext'

const AddTaskDIalog = () => {
    const {setNewTask, addTask, open, handleOpen,setOpen} = useContext(DesktopContext)
  return (
    <Dialog open={open} handler={handleOpen} size="xs" >
          <DialogBody className="flex flex-col gap-y-7 overflow-x-auto">
            <Typography variant="h5" className="text-[#fa8b23]">
              Add Task
            </Typography>
            <Input label="Task" className='w-full' onChange={(e) => setNewTask(e.target.value)} />
            {/* <div className="flex gap-x-3 ">
              <Chip value="Low" color="green"/>
              <Chip value="Moderate" color="yellow"/>
              <Chip value="High"  color="red"/>
            </div> */}

            <div className="flex sm:justify-end justify-center">
              <Button className="bg-[#fa8b23]" onClick={() => addTask()}>Add</Button>

              <Button variant="text" color="red" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogBody>
        </Dialog>
  )
}

export default AddTaskDIalog