import express from 'express';
import config from 'config';
import { connect } from './db';
import { seedDB } from './dbSeed';
import taskRouter from './routes/task';

const port = config.get('PORT') as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/task', taskRouter);

app.listen(port, () => {
    console.log(`Server listing at ${port}`);
    connect();
    seedDB();
});
