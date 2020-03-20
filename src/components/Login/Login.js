import React from 'react';
import Auth from './use-auth';

const Login = () => {
    const auth = Auth();
    return (
        <div>
            <h1>Join The Party !!!</h1>
            {
                auth.user?<button onClick={auth.signInOut}>Sign In</button>:
                <button onClick={auth.signInWithGoogle}>Sign In With Google</button>
            }
        </div>
    );
};

export default Login;