import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import GenericQuestions from '../GenericQuesitons/GenericQuestions'
import UserTypeDeclaration from '../TypeDeclaration/TypeDeclaration'
import SocialInitiativesQuestions from '../SInitiativesQuestions/SInitiativesQuestions'
import InstructorQuesitons from '../InstructorQuestions/InstructorQuestions'
import './SignUp.css';
import { prettyDOM } from "@testing-library/react";

function SignUp() {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState(["Student"])
    const [studentChecked, setStudentChecked] = useState(true)
    const [identify, setIdentify] = useState([])
    const [category, setCategory] = useState('')
    //const [other, setOther] = useState('')
    const [choice, setChoice] = useState('')

    const history = useHistory()
    const handleSelectIdentify = (event) => {
        setIdentify(identify.concat(event.target.name))
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
        if(event.target.id === "Student"){
            setStudentChecked(!studentChecked)
        }
        if(type.includes(event.target.id)){
            setType(type.filter(t => t !== event.target.id))
        }else{
            setType(type.concat(event.target.id))
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }

    const handleSignUp = () => {
        if(email && username && password){
            const newUser = {
                name: username,
                email: email,
                password: password,
                roles: {
                    admin: type.includes("admin"),
                    instructor: type.includes("Instructor"),
                    organization: type.includes("Social Initiative"),
                    student: type.includes("Student")
                },
                phone: phone
            }
            // wait for API call then route somewhere and do something with access token
            API.postSignUp(newUser)
            .then(
                (response) => {
                    history.push('/login')
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert(JSON.stringify(error, null, 2));
                }
            )
        }else{
            alert("one or more of the required fields arent filled!")
        }
    }

    
    const handleCategory = (event) =>{
        if(category === ''){
            setCategory(event.target.id)
        }else{
            setCategory(event.target.id)
        }
    }

    return (
        <div className="SignUpPage">
            {/* <p className="SignUp-colour">Sign Up</p> */}
            <br/><h1>Welcome to U-Impactify!</h1>
            <div className="SignUpSection1">
                <GenericQuestions 
                    email={email} handleEmailChange={handleEmailChange}
                    username={username} handleUsernameChange={handleUsernameChange}
                    password={password} handlePasswordChange={handlePasswordChange}
                    phone={phone} handlePhoneChange={handlePhoneChange}
                />
                <div className="SignUpImg1"></div>
            </div>
            
            <div className="SignUpSection2">
                <UserTypeDeclaration 
                    handleSelectType={handleSelectType}
                    studentChecked={studentChecked}/>
                <InstructorQuesitons
                    handleSelectIdentify={handleSelectIdentify}
                    handleSelectChoice={handleSelectChoice}/>
                <div className="SignUpImg2"></div>
            </div>
            
            <SocialInitiativesQuestions
            handleCategory={handleCategory}/>
            <button id="signInButton" type="submit" onClick={handleSignUp}>CONFIRM</button>
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
        .then(res => {
            // check to see if the server responded with a 200 request (ok)
            // if not, then reject the promise so that proper error handling can take place
            return res.json().then(json => {
                return res.ok ? json : Promise.reject(json);
            });
        });
    }

}

export default SignUp;