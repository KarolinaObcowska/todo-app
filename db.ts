import mongoose from 'mongoose';
import config from 'config';

export const connect = () => {
    const db = config.get('MONGODB_URI') as string;

    return mongoose.connect(db)
    .then(() => {
        console.log('Database connected') })
    .catch((err) => {
        console.log(err);
        process.exit()
    })
}