import React, { useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core'

type AddTaskProps = {
    newTask: (e: React.FormEvent, formData: Task | any) => void 
}

const AddTask: React.FC<AddTaskProps> = ({newTask}) => {

    const [formData, setFormData] = useState<Task | {}>();

    const handleSubmit = (e: any) => {
        setFormData({
          ...formData,
          [e.currentTarget.id]: e.currentTarget.value,
        })
      }

    return (
        <Box component='form' onSubmit={(e) => {e.preventDefault(); newTask(e, formData)}} style={{padding: 40}}>
                <TextField autoFocus={true} id='what' onChange={handleSubmit}
        name='what' placeholder='Task to do'/>
                <Button type='submit' variant='contained' size='small' style={{background: 'black', color: 'white'}}>Add</Button>
        </Box>
    )
}

export default AddTask