import React, { useState } from 'react';
import '../AdminLogin/AdminComponent.css';
import { useHistory } from 'react-router-dom';


function Admin() {
    const histroy = useHistory();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [loginNotProper, setLoginEmailNotProper] = useState(false);

    const [showText, setShowText] = useState(' ')

    const [passwordNotProper, setLoginPasswordNotProper] = useState(false);


    let handleLogin = () => {
        if (!email) {
            setLoginEmailNotProper(true);
            setShowText("Enter Email id");
        }
        else if (!password) {
            setLoginPasswordNotProper(true);
            setShowText("Enter password");
        }
        else {
            if (email !== 'admin@app.com') {
                setLoginEmailNotProper(true);
                setShowText("Wrong admin credentials !");
            }
            else if (password !== '12345') {
                setLoginPasswordNotProper(true);
                setShowText("Wrong admin credentials !");
            }
            else {
                histroy.push('/console')
            }
        }
    }

    return <div className='admin-login-container'>
        <div className='login-container'>
            <input type='text' value={email} placeholder="Email Id" className="input-text" onChange={(e) => { setEmail(e.target.value); setLoginEmailNotProper(false); setShowText('') }} style={loginNotProper ? { border: '1px solid red' } : {}}></input>
            <input type='password' value={password} placeholder="Password" className="input-text" onChange={(e) => { setPassword(e.target.value); setLoginPasswordNotProper(false); setShowText('') }} style={passwordNotProper ? { border: '1px solid red' } : {}}></input>
            <button className="signInBUtton" onClick={() => handleLogin()}>Login</button>
            <div style={{ textAlign: 'center' }}>
                <p style={{ textAlign: 'center' }}>{showText}</p>
            </div>
        </div>
    </div>
}

export default Admin;