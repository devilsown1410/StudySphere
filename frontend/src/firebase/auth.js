import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, updatePassword, signOut } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { auth } from "./firebase"

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}
export const doSignInWithEmailAndPaassword = async (email, password) => {
    return doSignInWithEmailAndPaassword(auth, email, password)
}
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    return result
}
export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email)
}
export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password)
}