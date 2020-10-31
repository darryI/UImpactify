import { useHistory } from "react-router-dom";

function Logout(props){

    const setLoggedIn = props.setLoggedIn;
    const history = useHistory();

    localStorage.removeItem('jwtAuthToken')
    setLoggedIn(false);
    history.push("/login")
    return (null);

}

export default Logout;