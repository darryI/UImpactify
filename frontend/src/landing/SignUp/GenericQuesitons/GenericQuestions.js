import React from 'react';

const GenericQuestions = (props) => {
    return(
        <form>
            <label htmlFor="email">Email:</label><br/>
            <input type="text" name="email" placeholder="Email" 
            value={props.email} onChange={props.handleEmailChange}/><br/>

            <label htmlFor="Name">Name:</label><br/>
            <input  type="text" name="Name" placeholder="Name" 
            value={props.username} onChange={props.handleUsernameChange}/><br/>

            <label htmlFor="password">Password:</label><br/>
            <input type="password" name="password" placeholder="Password" 
            value={props.password} onChange={props.handlePasswordChange}/><br/>

            <label htmlFor="phone">Phone:</label><br/>
            <input type="text" name="phone" placeholder="Phone number" 
            value={props.phone} onChange={props.handlePhoneChange}/><br/>
        </form>
    )
}

export default GenericQuestions ;