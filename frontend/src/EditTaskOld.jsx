import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskOld = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        cost: '',
        description: '',
    });

    const navigate = useNavigate();
    const { id } = useParams(); //To get the id

    useEffect(() => {
        // Extract the API call into a separate function for better organization, unlike EditTaskOld.jsx
        const fetchTaskData = async () => {
            try {
                const response = await axios.get(`http://localhost:9876/get/${id}`);
                const taskData = response.data.Result[0];
                setData({ ...taskData }); //... is the spread operator, which copies all parts of an existing array into another array/object.
            } catch (err) {
                console.log(err);
            }
        };

        fetchTaskData();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:9876/update/${id}`, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/task');
                }
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        // Destructure the event to get the target value and name for easy assignment
        const { name, value } = e.target; // name: The name attribute of the input field. It is used as a key to identify which field in the state (data object) needs to be updated. value: The current value of the input field. It represents the new value that the user entered
        setData(prevData => ({ ...prevData, [name]: value })); // e.target represents the element that triggered the event, which in this case is the input field. By using destructuring assignment, the function extracts two properties from e.target
    };

    /* The setData function is used to update the state (data object) based on the changes made by the user in the input fields. 
    It takes a function as an argument that receives the previous state (prevData) and returns the new state.
    Inside the setData function, the spread operator (...prevData) is used to create a shallow copy of the previous state. 
    Then, the new value is assigned to the state property corresponding to the name attribute of the input field. 
    The square brackets [name] represent a computed property name, allowing the value of the name variable to be used as the property name. */

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Update Task</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        name="name" value={data.name} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Submitted to</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                        name="email" value={data.email} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label className="form-label">Cost</label>
                    <input type="text" className="form-control" id="inputSalary" placeholder="Enter Cost" autoComplete='off'
                        name="cost" value={data.cost} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputText" className="form-label">Description</label>
                    <input type="text" className="form-control" id="inputText" placeholder="Enter Description" autoComplete='off'
                        name="description" value={data.description} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditTaskOld;