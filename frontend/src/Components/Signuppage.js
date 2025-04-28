import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signuppage (){

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin =  async (e) => {
        e.preventDefault();

        try{
            await axios.post('http://localhost:8080/auth/signup',{
                email: email,
                username: username,
                password: password,
            })
            .then(response =>{
                localStorage.setItem('token',response.data.token)
            })
            
            

        }catch(err){
            console.error(err)
        }
        navigate('/flights');
    }

    return(
        <>
            <div className="signup">
                <div>
                    <form>
                        <label for="username" className="username">Username</label><br/>
                        <input type="text" id="username" name="username"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <br/>
                        <label for="email" className="email">Email</label><br/>
                        <input type="email" id="email" name="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <br/>
                        <label for="password" className="password" >Password</label><br/>
                        <input type="password" id="password" name="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        
                        <button onClick={handleLogin} className="button">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signuppage;