import axios, { AxiosResponse } from 'axios';

const server_url: string = 'http://localhost:1234/task/';

export const getTasks = async (): Promise<AxiosResponse<APIData>> => {
  try {
    const tasks: AxiosResponse<APIData> = await axios.get(server_url);
    return tasks;
  } catch(error) {
    console.log(error)
    throw new Error('something went wrong in the multical function');
  }
}

export const createTask = async ( formData: Task ): Promise<AxiosResponse<APIData>> => {
      const task: Omit<Task, '_id'> = {
        what: formData.what,
        done: false,
        status: false
      }
      const newTask: AxiosResponse<APIData> = await axios.post(server_url, task )
      return newTask
  }
  
  export const updateTask = async ( task: Task ): Promise<AxiosResponse<APIData>> => {

      const taskUpdate: Pick<Task, 'done'> = {
        done: !task.done,
      }
      const updatedTask: AxiosResponse<APIData> = await axios.put(`${server_url}/${task._id}`, taskUpdate )
      return updatedTask
  }

  export const deleteTask = async (_id: string): Promise<AxiosResponse<APIData>> => {

      const deletedTask: AxiosResponse<APIData> = await axios.delete(`${server_url}/${_id}`)
      return deletedTask

  }
  