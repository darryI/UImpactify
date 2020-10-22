import React from 'react';

const UserTypeDeclaration = (props) => {
    return(
        <form>
            <h3>Are you joining as a Student or Instructor?</h3>
            <label htmlFor="Student">Student</label>
            <input type="radio" name="userType" id="Student" onChange={props.handleSelectType}/>

            <label htmlFor="Instructor">Instructor</label>
            <input type="radio" name="userType" id="Instructor" onChange={props.handleSelectType}/>

            <label htmlFor="Social Initiative">Social Initiative</label>
            <input type="radio" name="userType" id="Social Initiative" onChange={props.handleSelectType} />
            <br/>
        </form>
    )
}

export default UserTypeDeclaration;