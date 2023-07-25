
const Home = () => {
    return (
            <div>
                <div className='p-3 d-flex justify-content-around mt-3'>
                    <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                        <div className='text-center pb-1'>
                            <h4>Admin</h4>
                        </div>
                        <hr />
                        <div className=''>
                            <h5>Total: {}</h5>
                        </div>
                    </div>
                    <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                        <div className='text-center pb-1'>
                            <h4>Task</h4>
                        </div>
                        <hr />
                        <div className=''>
                            <h5>Total: {}</h5>
                        </div>
                    </div>
                    <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                        <div className='text-center pb-1'>
                            <h4>Cost</h4>
                        </div>
                        <hr />
                        <div className=''>
                            <h5>Total: {}</h5>
                        </div>
                    </div>
                </div>

                {/* List of admin  */}
                <div className='mt-4 px-5 pt-3'>
                    <h3>List of Admins</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Admin</td>
                                <td>Admin</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default Home