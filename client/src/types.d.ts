interface Task {
    _id: string
    what: string
    done?: boolean
}

interface TaskProps {
    task: Task
}

type APIData = {
    msg: string
    tasks: Task[]
    task?: Task
}