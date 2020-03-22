import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle().then(res => {
            window.location.pathname = '/review';
        })
    }
    const handleSignOut = () => {
        auth.signInOut()
            .then(res => {
                window.location.pathname = '/';
            })
    }

    return (
        <div>
            <h1>Join The Party !!!</h1>
            {
                auth.user ? <button onClick={handleSignOut}>Sign Out</button> :
                    <button onClick={handleSignIn}>Sign In With Google</button>
            }
        </div>
    );
};

export default Login;