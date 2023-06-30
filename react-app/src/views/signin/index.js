import React, { useState } from 'react'
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Input from '../../components/inputs/input';
import { FaRegTimesCircle } from 'react-icons/fa'
import './signin.css'

function SignIn() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/dashboard" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
          setErrors(data);
        }
    };

    return (
        <main className="auth--wrapper">
            <div className='auth--to_login'>
                <p>New to Cypher?</p>
                <Link to='/sign-up'>Create an Account</Link>
            </div>
            <div className='auth--contents'>
                <form onSubmit={handleSubmit} className='auth--form'>
                    <div className='auth--logo'>
                        <div className='auth--image'></div>
                        <p className='auth--text'>cypher</p>
                    </div>
                    <div className='auth--intro'>
                        <h1>Sign in to Cypher</h1>
                        <p>Sign using your email address.</p>
                    </div>
                    <Input
                        placeholder='Email'
                        value={email}
                        setValue={(x) => setEmail(x.target.value)}
                        name='email'
                        error={undefined}
                        disabled={false}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        value={password}
                        setValue={(x) => setPassword(x.target.value)}
                        name='current-password'
                        error={undefined}
                        disabled={false}
                    />
                    <button
                        id="auth-sign-in"
                        className='btn'>Sign in With Email
                    </button>
                    <ul className='auth--errors'>
                        {errors.map((error, idx) => (
                            <li  className='auth--error' key={idx}>
                                <FaRegTimesCircle/>
                                <span>{error}</span>
                            </li>
                        ))}
                    </ul>
                </form>
            </div>
        </main>
    )
}

export default SignIn
