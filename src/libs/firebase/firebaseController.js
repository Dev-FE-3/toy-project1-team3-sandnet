import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

let firestoreDb = null;
let imgCollectionRef = null;

// firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// firebase 초기화
const firebaseInit = async () => {
  const firebaseApp = await initializeApp(firebaseConfig);
  firestoreDb = await getFirestore(firebaseApp);
  imgCollectionRef = await collection(firestoreDb, 'images');
};

// Firestore 초기화 확인 함수
const isFirestoreInitialized = () => {
  return firestoreDb !== undefined && firestoreDb !== null;
};

// firebaseInit 함수를 내보내기
export { firebaseInit, isFirestoreInitialized, imgCollectionRef };
