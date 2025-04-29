import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Loginpage (){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin =  async (e) => {
        e.preventDefault();

        try{
            await axios.post('http://localhost:8080/auth/login',{
                username: username,
                password: password,
            })
            .then(response =>{
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('isAdmin', response.data.user.isAdmin)
            })
            

        }catch(err){
            console.error(err)
            // setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
        navigate('/flights');
    }

    return(
        <>
            <div className="login">
                <div>
                    <form>
                        <label for="username" className="username">Username</label><br/>
                        <input type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <br/>
                        <label for="password" className="password" >Password</label><br/>
                        <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button onClick={handleLogin} className="loginbutton">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Loginpage;