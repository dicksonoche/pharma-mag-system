import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTaskOld = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cost: '',
        description: '',
        image: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === "file" ? files[0] : value;
        setData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    /* Here, we use destructuring assignment to extract properties from the event object e. The e parameter represents the event triggered when the user interacts with an input field.
    name: Represents the name attribute of the input element. It helps identify which field is being updated.
    value: Represents the current value of the input field. For text inputs, this will be the typed text, and for file inputs, this will be undefined.
    type: Represents the type attribute of the input element. It helps differentiate between different types of input fields.
    files: This property is only available for file inputs and holds an array of files selected by the user.
    const newValue = type === "file" ? files[0] : value;

    Here, we use a ternary operator to determine the new value that should be assigned to the corresponding field (name) in the state (data).
    If the input field is of type "file" (i.e., a file input field), we set newValue to files[0], which is the first selected file from the files array. This is because file inputs can handle multiple file selections, but in this case, we are assuming that only one file is selected.
    If the input field is not of type "file" (i.e., a text input field), we set newValue to the value of the input field.
    setData((prevData) => ({ ...prevData, [name]: newValue }));

    Here, we update the state (data) using the setData function provided by the useState hook.
    We use the functional form of setData to ensure that we are updating the state based on the previous state (prevData).
    The spread operator (...prevData) is used to create a shallow copy of the previous state to avoid directly mutating the state.
    We then update the property corresponding to the name attribute with the newValue. This will effectively update the specific field in the data state with the new value provided by the user. */

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("cost", data.cost);
        formData.append("description", data.description);
        formData.append("myimage", data.image);

        axios.post('http://localhost:9876/create', formData) //We have an object which includes a file, so passing "data" would lose the data object, hence "formdata".
            .then(() => {
                navigate('/task');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add New Task</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        name="name"
                        placeholder='Enter Name'
                        autoComplete='off'
                        value={data.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Submitted to</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        name="email"
                        placeholder='Enter Email'
                        autoComplete='off'
                        value={data.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        name="password"
                        placeholder='Enter Password'
                        value={data.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Cost</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputSalary"
                        name="cost"
                        placeholder="Enter Cost"
                        autoComplete='off'
                        value={data.cost}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputText" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputText"
                        name="description"
                        placeholder="Enter Description"
                        autoComplete='off'
                        value={data.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="inputGroupFile01" className="form-label">Select Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="inputGroupFile01"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskOld;