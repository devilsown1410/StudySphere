import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, updatePassword, signOut, signInWithEmailAndPassword } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { auth } from "./firebase"
import axios from "axios"

export const doCreateUserWithEmailAndPassword = async (email, password, role) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    localStorage.setItem('token', result._tokenResponse.idToken);
    localStorage.setItem('email',user.email);
    await axios.post('http://localhost:3000/users/newuser', {
        email: user.email,
        uid: user.uid,
        role: role,
    });
    return user;
}

export const doSignInWithEmailAndPaassword = async (email, password, role) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    localStorage.setItem('token', result._tokenResponse.idToken);
    localStorage.setItem('email',user.email);
    await axios.post('http://localhost:3000/users/newuser', {
        email: user.email,
        uid: user.uid,
        role: role,
    });
    return result;
}

export const doSignInWithGoogle = async (role) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('token', result._tokenResponse.idToken);
    localStorage.setItem('email',user.email);
    await axios.post('http://localhost:3000/users/newuser', {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        role: role,
    });
    return result;
}

export const doSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email)
}
export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password)
}