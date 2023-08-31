import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginOld = () => {
    const [cred, setCred] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCred((prevCred) => ({
            ...prevCred,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9876/login', cred)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/');
                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                <div className='p-3 rounded w-25 border loginForm'>
                    {error && <div className='text-danger'>{error}</div>}
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email'><strong>Email</strong></label>
                            <input
                                type='email'
                                placeholder='Enter Email'
                                name='email'
                                value={cred.email}
                                onChange={handleChange}
                                className='form-control rounded-0'
                                autoComplete='off'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password'><strong>Password</strong></label>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                name='password'
                                value={cred.password}
                                onChange={handleChange}
                                className='form-control rounded-0'
                            />
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                        <p>You agree to our terms and policies</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginOld;