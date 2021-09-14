import { Task } from './models/task';
const generate = require('fake-todos');

const tasks = JSON.stringify(generate(3000));

export async function seedDB () {
    try {
        await Task.create(JSON.parse(tasks));
        console.log('Data imported')
    } catch (err) {
        console.log(err);
    }
}


