import express from 'express';
import config from 'config';
import cors from 'cors';
import { connect } from './db';
// import { seedDB } from './dbSeed';
import taskRouter from './routes/task';

const port = config.get('PORT') as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000'}));
app.use('/task', taskRouter);

app.listen(port, () => {
    console.log(`Server listing at ${port}`);
    connect();
    // seedDB();
});
