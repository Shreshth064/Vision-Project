import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginForm.css';
import { FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
// import { useAlert } from 'react-alert'; // Import useAlert hook

const LoginForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate(); // Get the navigate function from react-router-dom
    // const alert = useAlert(); // Initialize alert hook

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { id, password, role })
        .then(result => {
            console.log(result);
            if (result.data === 'Success') {
                navigate('/dashboard'); // Use the navigate function to redirect to '/home'
            }
        })
        .catch(err => {
             setInvalidState(true);
        });
    };
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [invalidState, setInvalidState] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className ='body-wrapper'>
            <div className='wrapper'>
                <div className="hide">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Id' onChange={(e)=> setId(e.target.value)} required/>
                        <FaUser className='icon'/> 
                    </div>
                    <div className="input-box">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='Password' onChange={(e)=> setPassword(e.target.value)}
                            required
                        />
                        <i
                            className={passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}
                            id="togglePassword"
                            style={{ marginLeft: '-30px', cursor: 'pointer' }}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    <div className="input-box">
                        <input type="text" name="scHolders" list="stakeHolders" placeholder='Role' onChange={(e)=> setRole(e.target.value)} required />
                        <datalist id="stakeHolders">
                            <option value="Retailer"/>
                            <option value="Distributor"/>
                            <option value="Manufacturer"/>
                        </datalist>
                        <IoMdArrowDropdown className='icon'/>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="/contactus">Register</a></p>
                        <p className={invalidState ? 'invalid-login' : 'invalid-login-hidden'}>Invalid login credentials!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
