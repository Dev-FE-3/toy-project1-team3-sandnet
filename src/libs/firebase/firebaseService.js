import {
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from 'firebase/firestore';
import { isFirestoreInitialized, imgCollectionRef } from './firebaseController';
import profileImg from '@/assets/images/princess01.webp';
import jsIcon from '@/assets/images/js-icon.png';
// let imgCollectionRef = null;
//   const imgCollectionRef =  collection(firestoreDb, "images");

const dummyImg = {
  imgUrl: '',
  title: 'Sample Image',
  description: 'This is a sample image uploaded by the user',
  createdAt: '2025-01-17T10:00:00Z',
  uploadedBy: 'choi123',
  tags: ['nature', 'landscape'],
};

const displayImageFromBlob = (blobImg) => {
  // const imgUrl = URL.createObjectURL(blobImg); // Blob을 URL로 변환
  const imgElement = document.createElement('img'); // 이미지 요소 생성
  imgElement.src = blobImg; // URL을 src에 할당
  imgElement.alt = 'Converted Image'; // 대체 텍스트 설정
  imgElement.style.width = '200px';
  imgElement.style.height = '200px';

  document.body.appendChild(imgElement); // 이미지 요소를 문서에 추가

  // 이미지 로드 후 URL 해제
  imgElement.onload = () => {
    URL.revokeObjectURL(blobImg); // 메모리 해제
  };

  imgElement.onerror = (err) => {
    console.error('Error loading image', err);
  };
};

const convertToBlob = async () => {
  const testImg = await fetch(jsIcon);
  const blob = await testImg.blob();
  console.log('convertToBlob ~ blob: ', blob);
  const fr = new FileReader();

  fr.readAsDataURL(blob);
  fr.addEventListener('load', () => {
    const res = fr.result;
    console.log('fr.addEventListener ~ res: ', res);
    displayImageFromBlob(res);
  });
};

// 이미지 생성
const createImage = async (imgUrl) => {
  console.log('createImage');
  if (!imgCollectionRef) {
    alert('faild initialzed');
    return;
  }

  const imgData = {
    ...dummyImg,
    createdAt: new Date().toISOString(),
    imgUrl,
  };

  await addDoc(imgCollectionRef, imgData)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

// 이미지 업데이트
const updateImage = async (imgId, imgUrl) => {
  const imgDocRef = doc(imgCollectionRef, imgId);
  await updateDoc(imgDocRef, { imgUrl })
    .then((docRef) => {
      console.log('Document update with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
};

// 이미지 삭제
const deleteImage = async (imgId) => {
  const imgDocRef = doc(imgCollectionRef, imgId);
  await deleteDoc(imgDocRef)
    .then((docRef) => {
      console.log('Document deleted with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error deleting document: ', error);
    });
};

// 이미지 조회
const getImagesByUser = async (userId = 'choi123') => {
  try {
    const q = query(imgCollectionRef, where('uploadedBy', '==', userId));

    const querySnapshot = await getDocs(q);
    const images = [];

    querySnapshot.forEach((doc) => {
      images.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return images;
  } catch (error) {
    console.error('이미지 조회 중 오류 발생:', error);
    throw error;
  }
};

export {
  convertToBlob,
  createImage,
  getImagesByUser,
  updateImage,
  deleteImage,
  displayImageFromBlob,
};
