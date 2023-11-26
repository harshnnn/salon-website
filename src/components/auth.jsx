import React, { useState } from 'react';
import './style.css'

const Auth = () => {
    const [isUser, setIsUser] = useState(false);
    return (
        <>
            {isUser &&(
                <div>
                    <div>Booking Div</div>
                    <button>Logout</button>
                </div>
            )}
            {isUser === false &&(
                <div className='auth-login'>
                    <h1>Login div</h1>
                    <form action="">
                        <label htmlFor="">Enter Nummber</label>
                        <input type="number" />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            )}


        </>
    );
}

export default Auth;
