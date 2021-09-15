import mongoose from 'mongoose';

export interface TaskDocument extends mongoose.Document {
    what: String;
    done: Boolean;
};

const TaskSchema = new mongoose.Schema({
    what: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true } );

export const Task = mongoose.model<TaskDocument>("Task", TaskSchema);