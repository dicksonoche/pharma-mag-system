import { Link } from "react-router-dom"

const Task = () => {
    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
                <h3>Tasks</h3>
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
                        Hey
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Task