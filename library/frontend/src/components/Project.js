import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name_of_project}</Link>
            </td>
            <td>
                {project.created_at}
            </td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <th>
                Project Name
            </th>
            <th>
                Created at
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList
