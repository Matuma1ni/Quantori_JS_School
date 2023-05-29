import { useEffect } from "react";
import { auth, signInWithGoogle } from "../../firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";
import { selectUser, setUser } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./LoginButton.css";

export const LoginButton = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            dispatch(setUser(user));
        })
    }, [])

    return (
        <div>
            {user
                ? <div className="signoutElement">
                    <span className="userName">{user.displayName}</span> 
                    <button className="signButton" onClick={() => auth.signOut()}>Sign Out</button> 
                </div>
                : <button className="signButton" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>}
        </div>
    )
}