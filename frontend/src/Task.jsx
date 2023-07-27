import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Task = () => {
    const [data, setData] = useState([])

    const [error, setError] = useState('')

    useEffect(() => {
        axios.get('http://localhost:9876/getTasks')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                }
                else {
                    alert("Error");
                    setError(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:9876/delete/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
                else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
                <h3>Tasks</h3>
            </div>
            <div className='text-danger'>
                {error && error}
            </div>
            <Link to="/create" className='btn btn-success'>Add New Task</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Submitted to</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    <td>{tasks.name}</td>
                                    <td>{
                                        <img src={`http://localhost:9876/images/` + tasks.image} alt="" className="task_image" />
                                    }</td>
                                    <td>{tasks.email}</td>
                                    <td>{tasks.description}</td>
                                    <td>{tasks.cost}</td>
                                    <td>
                                        <Link to={`/taskEdit/` + tasks.id} className="btn btn-primary btn-sm me-2">edit</Link>
                                        <button onClick={() => handleDelete(tasks.id)} className="btn btn-sm btn-danger">delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Task