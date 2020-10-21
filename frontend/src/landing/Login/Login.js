import React, { useState } from "react";
import './Login.css';
import blackboard from './LoginBlackboard.svg';

const LoginForm = (props) => {
    return(
        <form>
            <div className="FormSection">
            <label className="InputLabel" for="Username">Username</label><br/>
            <input className="InfoInput" type="text" name="username" placeholder="Enter Username Here"
            value={props.username} onChange={props.handleUsernameChange}/><br/>
            </div>
            <div className="FormSection">
            <label className="InputLabel" for="password">Password</label><br/>
            <input className="InfoInput" type="password" name="password" placeholder="Enter Password Here"
            value={props.password} onChange={props.handlePasswordChange}/><br/>
            </div>
        </form>
    )
}

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event) => {
        console.log("logged in?")
    }


    return (
        <div className="LoginPage">
            <div className="LeftSideImage">
                <p className="SloganTitle">A system you can rely on.</p>

            </div>
            <div className="LoginBox">
                <p className="WelcomeBack">Welcome Back</p>
                <LoginForm
                username={username} handleUsernameChange={handleUsernameChange}
                password={password} handlePasswordChange={handlePasswordChange}
                />
                <a className="ForgotPassword">Forgot Password?</a>

                <input type="submit" value="Login" id="LoginSubmit" onSubmit={handleLogin}/>
            </div>
        </div>
    );
}

export default Login;