import React from 'react';

const GenericQuestions = (props) => {
    return(
        <form>
            <label htmlFor="email">Email:</label><br/>
            <input type="text" name="email" placeholder="Email" 
            value={props.email} onChange={props.handleEmailChange}/><br/>

            <label htmlFor="Name">Name:</label><br/>
            <input type="text" name="Name" placeholder="Name" 
            value={props.username} onChange={props.handleUsernameChange}/><br/>

            <label htmlFor="password">Password:</label><br/>
            <input type="password" name="password" placeholder="password" 
            value={props.password} onChange={props.handlePasswordChange}/><br/>
        </form>
    )
}

export default GenericQuestions ;