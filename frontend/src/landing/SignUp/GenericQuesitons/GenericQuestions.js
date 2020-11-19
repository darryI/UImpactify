import React from 'react';
import '../SignUp/SignUp.css';


const GenericQuestions = (props) => {
    return(
        <form className="SignUpGQ">
            <h2 className="SignUpSubText">Create an Account</h2>
            <label className="SignUpInputLabel" htmlFor="email">Email:</label><br/>
            <input className="SignUpInfoInput" type="text" name="email" placeholder="Email" 
            value={props.email} onChange={props.handleEmailChange}/>

            <label className="SignUpInputLabel" htmlFor="Name">Name:</label><br/>
            <input className="SignUpInfoInput" type="text" name="Name" placeholder="Name" 
            value={props.username} onChange={props.handleUsernameChange}/>

            <label className="SignUpInputLabel" htmlFor="password">Password:</label><br/>
            <input className="SignUpInfoInput" type="password" name="password" placeholder="Password" 
            value={props.password} onChange={props.handlePasswordChange}/>

            <label className="SignUpInputLabel" htmlFor="phone">Phone:</label><br/>
            <input className="SignUpInfoInput" type="text" name="phone" placeholder="Phone number" 
            value={props.phone} onChange={props.handlePhoneChange}/>
        </form>
    )
}

export default GenericQuestions ;