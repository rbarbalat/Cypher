import React, { useState } from 'react'
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Input from '../../components/inputs/input';
import logo from '../../assets/cypher-logo.svg'
import './signin.css'

function SignIn() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        history.push('/dashboard')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
          setErrors(data);
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
        <main className="auth--wrapper">
            <div className='auth--to_login'>
                <p>New to Cypher?</p>
                <Link to='/sign-up'>Create an Account</Link>
            </div>
            <div className='auth--contents'>
                <form onSubmit={handleSubmit} className='auth--form'>
                    <div onClick={() => history.push('/')} className='auth--logo'>
                        <img src={logo} className='auth--image'/>
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
                        error={errors.email}
                        disabled={false}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        value={password}
                        setValue={(x) => setPassword(x.target.value)}
                        name='password'
                        error={errors.password}
                        disabled={false}
                    />
                    <button
                        id="auth-sign-in"
                        className='btn'>Sign in With Email
                    </button>
                    <button onClick={handleDemoUser} type="button" className="btn auth--demo">
                            Sign in With Demo Account
                    </button>
                </form>
            </div>
        </main>
    )
}

export default SignIn
