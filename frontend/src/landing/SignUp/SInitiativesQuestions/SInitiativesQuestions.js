import React from 'react';

const SocialInitiativesQuestions = (props) => {
    return(
        <div>
        <h2>Additional questions for Social Initiatives</h2>
        <form>
            <h4>Check all that apply. Do you identify as:</h4>
            <label>Social entrepreneurs or intrapreneurs</label>
            <input type="checkbox" name="entreperneur" id="entreperneur"/><br/>
            
            <label>Worker at a charity or a non-profit organization</label>
            <input type="checkbox" name="charity" id="charity" /><br/>
            
            <label>Individual who wants to learn something new</label>
            <input type="checkbox" name="learner" id="learner" /><br/>

            <label>Other: Please List:</label>
            <input type="text" name="otherInitiativesCategory1" id="otherInitiativesCategory1" /><br/>
        </form>
        <form>
            <h4>What category does your company fits in?</h4>
            <label>Arts and Culture</label>
            <input type="checkbox" name="ArtsCulture" id="ArtsCulture" onChange={props.handleCategory}/><br/>
                
            <label htmlFor="teacher">Civic and Environmental</label>
            <input type="checkbox" name="Civic" id="Civic" onChange={props.handleCategory}/><br/>
                
            <label htmlFor="facilitator">Education</label>
            <input type="checkbox" name="Educaiton" id="Educaiton" onChange={props.handleCategory}/><br/>

            <label htmlFor="facilitator">Health Services</label>
            <input type="checkbox" name="Health" id="Health" onChange={props.handleCategory}/><br/>

            <label htmlFor="facilitator">International Relations and Development</label>
            <input type="checkbox" name="InternationalRelations" id="InternationalRelations" onChange={props.handleCategory}/><br/>

            <label htmlFor="facilitator">Social and Legal Services</label>
            <input type="checkbox" name="SocialLegalServices" id="SocialLegalServices" onChange={props.handleCategory}/><br/>

            <label htmlFor="other">Other: Please List:</label>
            <input type="text" name="otherInitiativesCategory2" id="otherInitiativesCategory2" onChange={props.handleCategory}/><br/>
        </form>
        <form>
            <h4>What do you want to learn more about? (select all that apply)</h4>
            <label htmlFor="coach">Accounting</label>
            <input type="checkbox" name="Accounting" id="Accounting"/><br/>
                
            <label htmlFor="teacher">Business</label>
            <input type="checkbox" name="Business" id="Business"/><br/>
                
            <label htmlFor="facilitator">Communication</label>
            <input type="checkbox" name="Communication" id="Communication"/><br/>

            <label htmlFor="facilitator">Design</label>
            <input type="checkbox" name="Design" id="Design"/><br/>

            <label htmlFor="facilitator">Finance</label>
            <input type="checkbox" name="Finance" id="Finance"/><br/>

            <label htmlFor="facilitator">Project Managament</label>
            <input type="checkbox" name="Project Managament" id="Project Managament"/><br/>

            <label htmlFor="other">Other: Please List:</label>
            <input type="text" name="otherInitiativesCategory3" id="otherInitiativesCategory3"/><br/>
        </form>
    </div>
    )
}

export default SocialInitiativesQuestions;