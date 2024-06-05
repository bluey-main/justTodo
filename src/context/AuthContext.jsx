import { setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { useEffect, useState, createContext, useContext } from 'react';
import { auth, db, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { DesktopContext } from './DesktopContext';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const initialTasks = {
        todo: [
          
        ],
        inProgress: [
          
        ],
        done: [
          
        ],
      };

    const signInWithGoogle = async () => {
        try {
            setProcessing(true);
            await signInWithPopup(auth, provider);
    
            setProcessing(false);
        } catch (error) {
            console.log(error);
            setProcessing(false);
        }
    }

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const createUser = async (user) => {
        const userRef = doc(db, 'justTodo', user.uid)
        const userDoc = await getDoc(userRef);

        if(!userDoc.exists()) {
            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                tasks :initialTasks ,
            }
            try {
                await setDoc(userRef, userData);
                console.log('User created');
            } catch (error) {
                console.log(error);
            }
        }else {
            console.log('User already exists');
        }

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
                console.log(user);
                createUser(user)
                navigate('/');
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [navigate])

    const values = { user, signInWithGoogle, loading, processing, signOut };
    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
