import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

type AddTaskProps = {
    newTask: (e: React.FormEvent, formData: Task | any) => void 
}

const AddTask: React.FC<AddTaskProps> = ({newTask}) => {

    const [formData, setFormData] = useState<Task | {}>();

    const handleForm = (e: any) => {
      e.preventDefault();
      setFormData({
        [e.currentTarget.id]: e.currentTarget.value,
      })
    }

    return (
        <form  onSubmit={(e) => {newTask(e, formData); setFormData('')}} style={{padding: 40, display: 'inline'}}>
          <TextField autoFocus={true} id='what' onChange={handleForm} name='what' placeholder='Task to do'/>
          <Button type='submit' variant='contained' aria-label="add task to list" size='small' style={{background: 'black', color: 'white'}}>Add</Button>
        </form>
    )
}

export default AddTask