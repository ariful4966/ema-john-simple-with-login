import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";




firebase.initializeApp(firebaseConfig);

const AuthContentext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return <AuthContentext.Provider value={auth}>{props.children}</AuthContentext.Provider>
}
export const useAuth = () => useContext(AuthContentext);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const getUser = user => {
  const { displayName, email, photoURL } = user;
  return { name: displayName, email, photo: photoURL };
}
const Auth = () => {
  const [user, setUser] = useState(null);


  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(res => {
        const signedInUser = getUser(res.user);
        setUser(signedInUser);
        return res.user;
      })

      .catch(err => {
        setUser(null)
        return err.message;
      })
  }
  const signInOut = () => {
    return firebase.auth().signOut().then(function () {
      setUser(null);
      return true;
    }).catch(function (error) {
      return false;
    });
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const currUser = getUser(usr)
        setUser(currUser);
      } else {
        // No user is signed in.
      }
    });
  }, [])

  return {
    user,
    signInWithGoogle,
    signInOut
  }
};
export default Auth;