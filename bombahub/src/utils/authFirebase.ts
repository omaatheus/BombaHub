
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {  getFirestore, doc, setDoc  } from 'firebase/firestore'
import { auth, db } from '../services/firebase'
import { Alert } from 'react-native'

export async function SignUpWithEmail(email: string, password: string, name: string){
    try {

         if(name === "" || email === "" || password === ""){
                    return Alert.alert("Erro", "Preencha corretamente os campos.")
                }

        const response = await createUserWithEmailAndPassword(auth, email, password)

        const userUid = response.user.uid

        await setDoc(doc(db, "users", userUid), {
            createdAt: new Date(),
            name: name,
            email: email,
            senha: password,
            uid: userUid,
        })

        return true
        
    } catch (error) {
        console.error(error);
    }
}

export async function SignInWithEmail(email: string, password: string) {
    try {

        if(email === "" || password === ""){
            return Alert.alert("Erro", "Preencha corretamente os campos.")
        }

        const response = await signInWithEmailAndPassword(auth, email, password)

        if(!response.user){
            return Error
        }

        return response.user
        

    } catch (error) {
        console.error(error);
    }
}

export async function signOutFb(){
    try {
        await signOut(auth)

        return true
        
    } catch (error) {
        console.error(error);
        
    }
}