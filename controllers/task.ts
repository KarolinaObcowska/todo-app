import { Request, Response } from "express";
import { Task } from "../models/task";


export async function createTask (req: Request, res: Response) {
    try {
        const body = req.body;
        const task = new Task({ ...body });
        await task.save();

        return res.status(201).json({ msg: 'Task created' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong...' })
    }   
};

export async function getTasks (req: Request, res: Response) {
    try {
        const tasks = await Task
            .find()
            .sort({ createdAt: 1 })
        return res.status(200).json({ msg: 'Tasks fetched successfully', tasks });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Something went wrong...' })
    }
}

export async function getTask (req: Request, res: Response) {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found'})
        }
        return res.status(200).json({ msg: 'Task fetched successfully', task})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong...' });
    };
};

export async function updateTask (req: Request, res: Response) {
    const taskId = req.params.id;
    try {
        const task = await Task.findById({_id: taskId});
        if (!task) {
            return res.status(404).json({ msg: 'Task not found'});
        };
        const update = req.body;
        const updatedTask = await Task.findByIdAndUpdate({ _id: taskId }, update);

        return res.status(200).json({ msg: 'Task updated!', updatedTask });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong...'});
    };
};


export async function deleteTask (req: Request, res: Response) {
    const taskId = req.params.id;
    try {
        let task = await Task.findById({ _id: taskId });
        if (!task) {
            return res.status(404).json({ msg: 'Task not found'})
        };
        task = await Task.findByIdAndRemove({ _id: taskId });
        return res.status(200).json({ msg: 'Task removed!' });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Something went wrong...'});
    };
};
