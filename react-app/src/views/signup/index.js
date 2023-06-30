import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import Input from "../../components/inputs/input";
import { FaRegTimesCircle } from 'react-icons/fa'
import './signup.css'

function SignUp() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
          const data = await dispatch(signUp(username, email, password));
          if (data) {
            setErrors(data)
          }
      } else {
          setErrors(['Confirm Password field must be the same as the Password field']);
      }
    };

    return (
        <main id="auth--wrapper">
            <div className='auth--to_login'>
                <p>Already a Member?</p>
                <Link to='/sign-in'>Sign in to Cypher</Link>
            </div>
            <div className='auth--contents'>
            <form onSubmit={handleSubmit} className='auth--form'>
                <div className='auth--logo'>
                    <div className='auth--image'></div>
                    <p className='auth--text'>cypher</p>
                </div>
                <div className='auth--intro'>
                    <h1>Create your account</h1>
                    <p>Create your account to start using Cypher</p>
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
                    placeholder='Username'
                    value={username}
                    setValue={(x) => setUsername(x.target.value)}
                    name='username'
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
                <Input
                    placeholder='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    setValue={(x) => setConfirmPassword(x.target.value)}
                    name='current-password'
                    error={undefined}
                    disabled={false}
                />
                <button
                    id="auth-sign-up"
                    className='btn'>Create your account
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


export default SignUp
