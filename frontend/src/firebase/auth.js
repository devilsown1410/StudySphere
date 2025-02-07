import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, updatePassword, signOut } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { auth } from "./firebase"
import axios from "axios"

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user=result.user;
    localStorage.setItem('token',result._tokenResponse.idToken)
    console.log(user.email);
    await axios.post('http://localhost:3000/users/newuser',{
        email:user.email,
        uid:user.uid,
    })
    return userCredential;
}
export const doSignInWithEmailAndPaassword = async (email, password) => {
    const result= doSignInWithEmailAndPaassword(auth, email, password)
    console.log(result)
    localStorage.setItem('token',result._tokenResponse.idToken);

    return result;
}
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    const user=result.user;
    localStorage.setItem('token',result._tokenResponse.idToken)
    // console.log(result);
    await axios.post('http://localhost:3000/users/newuser',{
        name:user.displayName,
        email:user.email,
        uid:user.uid,
    })

    return result
}
export const doSignOut = () => {
    localStorage.removeItem('token');
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email)
}
export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password)
}