import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddTaskOld = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cost: '',
        description: '',
        image: ''
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("cost", data.cost);
        formdata.append("description", data.description);
        formdata.append("myimage", data.image);

        axios.post('http://localhost:9876/create', formdata) //We have an object which includes a file, so passing "data" would lose the data object, hence "formdata".
        .then(() => {
            navigate('/task')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add New Task</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                    onChange={e => setData({...data, name: e.target.value})} />{/* ... is the spread operator. //.value is the property for a value to be passed */}
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Submitted to</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                    onChange={e => setData({...data, email: e.target.value})} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
                    onChange={e => setData({...data, password: e.target.value})} />
                </div>
                <div className="col-12">
                    <label className="form-label">Cost</label>
                    <input type="text" className="form-control" id="inputSalary" placeholder="Enter Cost" autoComplete='off'
                    onChange={e => setData({...data, cost: e.target.value})} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputText" className="form-label">Description</label>
                    <input type="text" className="form-control" id="inputText" placeholder="Enter Description" autoComplete='off'
                    onChange={e => setData({...data, description: e.target.value})} />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="inputGroupFile01" className="form-label">Select Image</label>
                    <input type="file" className="form-control" id="inputGroupFile01"
                    onChange={e => setData({...data, image: e.target.files[0]})} />{/* files[0] is used to take the first file, and store inside image */}
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default AddTaskOld