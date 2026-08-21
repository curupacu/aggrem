import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDxO-VWeoUu4nSXbSW5c6bRUKPqTQgxaoM',
    authDomain: 'aggrem.firebaseapp.com',
    projectId: 'aggrem',
    storageBucket: 'aggrem.firebasestorage.app',
    messagingSenderId: '456664843574',
    appId: '1:456664843574:web:890357463584d9df479f97',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export function sendContactMessage(data) {
    return addDoc(collection(db, 'contatos'), {
        ...data,
        lido: false,
        timestamp: serverTimestamp(),
    });
}
