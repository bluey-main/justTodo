import { Chip, Dialog, DialogBody } from '@material-tailwind/react'
import React, { useContext } from 'react'
import { DesktopContext } from '../context/DesktopContext'
import moment from 'moment';

const ViewTaskDialog = ({task}) => {
    const {viewDialogOpen, setViewDialogOpen,  handleViewDialogOpen} = useContext(DesktopContext);
  return (
    <Dialog size='xs' handler={handleViewDialogOpen} open={viewDialogOpen}>
        <DialogBody>
            <p className='text-2xl mb-3 font-bold text-black'>Task:</p>
            <div className='w-full break-words'>
            <p className='text-base text-black'>{task.content}</p>
            </div>
            
            <br />
            <p className='text-black'>Created on: <span className='text-green-500'>{`${moment(task.date).format("LLL")}`}</span></p>
            <br />
            <Chip value={task.status} className={`${task.status === 'todo' ?  'bg-red-500': task.status === 'inProgress' ? 'bg-yellow-500 text-black' : 'bg-green-500' }`}/>

        </DialogBody>
    </Dialog>
  )
}

export default ViewTaskDialog