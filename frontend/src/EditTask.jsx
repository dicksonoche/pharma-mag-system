import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        //password: '',
        cost: '',
        description: '',
        //image: ''
    })

    const navigate = useNavigate()

    const { id } = useParams(); //To get the id

    useEffect(() => {
        axios.get('http://localhost:9876/get/' + id)
            .then(res => {
                setData({
                    ...data, name: res.data.Result[0].name,
                    email: res.data.Result[0].email,
                    description: res.data.Result[0].description,
                    cost: res.data.Result[0].cost
                })
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:9876/update/' + id, data) //No need to create and use "formdata",  since we are not updating a new image, unlike AddTask component
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/task')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Update Task</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />{/* ... is the spread operator. //.value is the property for a value to be passed */}
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Submitted to</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                        onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
                </div>
                {/*<div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
                        onChange={e => setData({ ...data, password: e.target.value })} />
                </div>*/}
                <div className="col-12">
                    <label className="form-label">Cost</label>
                    <input type="text" className="form-control" id="inputSalary" placeholder="Enter Cost" autoComplete='off'
                        onChange={e => setData({ ...data, cost: e.target.value })} value={data.cost} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputText" className="form-label">Description</label>
                    <input type="text" className="form-control" id="inputText" placeholder="Enter Description" autoComplete='off'
                        onChange={e => setData({ ...data, description: e.target.value })} value={data.description} />
                </div>
                {/*<div className="col-12 mb-3">
                    <label htmlFor="inputGroupFile01" className="form-label">Select Image</label>
                    <input type="file" className="form-control" id="inputGroupFile01"
                        onChange={e => setData({ ...data, image: e.target.files[0] })} />{/* files[0] is used to take the first file, and store inside image */}
                {/*</div>*/}
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditTask