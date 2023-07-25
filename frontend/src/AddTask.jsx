
const AddTask = () => {
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add New Task</h2>
            <form className="row g-3 w-50">
                <div className="col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Submitted to</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Cost</label>
                    <input type="text" className="form-control" id="inputSalary" placeholder="Enter Cost" autoComplete='off'
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Enter Description" autoComplete='off'
                    />
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">Select Image</label>
                    <input type="file" className="form-control" id="inputGroupFile01"
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default AddTask