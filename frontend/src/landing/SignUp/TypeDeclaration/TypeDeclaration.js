import React from 'react';

const UserTypeDeclaration = (props) => {
    return(
        <form>
            <h3>Are you joining as a Student or Instructor?</h3>
            <h4>*On default every user is registered as a student, if you dont wish to be one, please unselect the field!</h4>
            <label htmlFor="Student">Student</label>
            <input type="checkbox" name="userType" id="Student" onChange={props.handleSelectType} checked={props.studentChecked}/>

            <label htmlFor="Instructor">Instructor</label>
            <input type="checkbox" name="userType" id="Instructor" onChange={props.handleSelectType}/>

            <label htmlFor="Social Initiative">Social Initiative</label>
            <input type="checkbox" name="userType" id="Social Initiative" onChange={props.handleSelectType} />
            <br/>
        </form>
    )
}

export default UserTypeDeclaration;