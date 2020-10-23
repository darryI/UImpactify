import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
// import FetchTest from './About/FetchTest.js';
import GenericQuestions from '../GenericQuesitons/GenericQuestions'
import UserTypeDeclaration from '../TypeDeclaration/TypeDeclaration'
import SocialInitiativesQuestions from '../SInitiativesQuestions/SInitiativesQuestions'
import InstructorQuesitons from '../InstructorQuestions/InstructorQuestions'
import './SignUp.css';

function SignUp() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState([])
    const [identify, setIdentify] = useState([])
    const [category, setCategory] = useState('')
    //const [other, setOther] = useState('')
    const [choice, setChoice] = useState('')

    const history = useHistory()
    const handleSelectIdentify = (event) => {
        setIdentify(identify.concat(event.target.name))
        //alert(`${event.target.name} is chosen`)
        console.log(identify)
    } 

    const handleSelectChoice = (event) =>{
        setChoice(event.target.name)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    
    const handleSelectType = (event) => {
        if(type.includes(event.target.id)){
            setType(type.filter(t => t !== event.target.id))
        }else{
            setType(type.concat(event.target.id))
        }
        console.log(type)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        //console.log(`email is: ${email}`)
    }

    const handleSignUp = () => {
        if(email && username && password){
            const newUser = {
                name: username,
                email: email,
                password: password,
                roles: {
                    student: type.includes("Student") ? "True" : "False",
                    instructor: type.includes("Instructor") ? "True" : "False",
                    organization: type.includes("Social Initiative") ? "True" : "False",
                    admin: "False"
                }
            }
            // wait for API call then route somewhere and do something with access token
            API.postSignUp(newUser)
            .then(
                (response) => {
                    console.log(response);
                    history.push('/login')
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //console.log("bumbumshoe")
                    alert("existing mail")
                }
            )
            console.log("here?")
        }else{
            alert("one or more of the required fields arent filled!")
        }
    }

    
    const handleCategory = (event) =>{
        if(category === ''){
            setCategory(event.target.id)
            //alert(`${event.target.id} is chosen`)
            //console.log(`${event.target.value}`)
        }else{
            //alert(`Now chosen:${event.target.id}, changed from: ${category}`)
            setCategory(event.target.id)
        }
    }

    return (
        <div>
            <p className="SignUp-colour">Sign Up</p>
            <h1>Create an Account</h1>
            <GenericQuestions 
            email={email} handleEmailChange={handleEmailChange}
            username={username} handleUsernameChange={handleUsernameChange}
            password={password} handlePasswordChange={handlePasswordChange}
            />
            <UserTypeDeclaration handleSelectType={handleSelectType}/>
            <InstructorQuesitons
            handleSelectIdentify={handleSelectIdentify}
            handleSelectChoice={handleSelectChoice}/>
            <SocialInitiativesQuestions
            handleCategory={handleCategory}/>
            <input type="submit" value="Sign Up" onClick={handleSignUp}/>
        </div>
    );
}

export const API = {

    postSignUp(data) {
        const url = 'http://localhost:5000/authentication/signup/';
        return fetch(url, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',// 'Content-Type': 'application/x-www-form-urlencoded',
                },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data)
            })
          .then(res => res.json())
    }

}

export default SignUp;