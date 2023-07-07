import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { signUp } from "../../store/session";
import Input from "../../components/inputs/input";
import logo from '../../assets/cypher-logo.svg'
import './signup.css'

function SignUp() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory('/')

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) {
        history.push('/dashboard')
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
          const data = await dispatch(signUp(username, email, password));
          if (data) {
            setErrors(data)
          }
          history.push("/dashboard")
      } else {
          setErrors({confirmPassword: 'Passwords should match'});
      }
    };

    const handleDemoUser= async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
          setErrors(data);
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
                <div onClick={() => history.push('/')} className='auth--logo'>
                    <img src={logo} className='auth--image'/>
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
                    error={errors.email}
                    disabled={false}
                />
                <Input
                    placeholder='Username'
                    value={username}
                    setValue={(x) => setUsername(x.target.value)}
                    name='username'
                    error={errors.username}
                    disabled={false}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={password}
                    setValue={(x) => setPassword(x.target.value)}
                    name='current-password'
                    error={errors.password}
                    disabled={false}
                />
                <Input
                    placeholder='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    setValue={(x) => setConfirmPassword(x.target.value)}
                    name='current-password'
                    error={errors.confirmPassword}
                    disabled={false}
                />
                <button
                    id="auth-sign-up"
                    className='btn'>Create your account
                </button>
                <div onClick={handleDemoUser} type="button" className="btn auth--demo">
                            Sign in With Demo Account
                </div>
            </form>
            </div>
        </main>
    )
}


export default SignUp
