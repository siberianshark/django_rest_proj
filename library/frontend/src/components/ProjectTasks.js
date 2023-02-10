import React from 'react'
import { useParams } from 'react-router-dom'

const TaskItem = ({ task }) => {
    return (
        <tr>
            {/* <td>{item.id}</td> */}
            <td>{task.task}</td>
            <td>{task.task_content}</td>
        </tr>
    )
}
const ProjectTasksList = ({ tasks }) => {
    let { id } = useParams();
    let filtered_items = tasks.filter((task) => task.project.id === id)
    return (
        <table>
            <tr>
                <th>Task</th>
                <th>Content</th>
            </tr>
            {filtered_items.map((task) => <TaskItem task={task} />)}
        </table>
    )
}
export default ProjectTasksList