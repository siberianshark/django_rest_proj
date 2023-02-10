import React from 'react'

const TaskItem = ({ item }) => {
    return (
        <tr>
            {/* <td>{item.id}</td> */}
            <td>{item.task}</td>
            <td>{item.task_content}</td>
        </tr>
    )
}
const TaskList = ({ items }) => {
    return (
        <table>
            <tr>
                <th>Task</th>
                <th>Content</th>
            </tr>
            {items.map((item) => <TaskItem item={item} />)}
        </table>
    )
}
export default TaskList