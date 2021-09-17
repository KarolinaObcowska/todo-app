interface Task {
    _id: string
    what: string
    done?: boolean,
    status: boolean
}

type selectedPage = {
    selectedPage: number
}
interface TaskProps {
    task: Task
}

type APIData = {
    msg: string
    tasks: Task[]
    task?: Task
}