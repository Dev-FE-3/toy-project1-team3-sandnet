import { handleRouting } from '@/app/router/router';
import { firebaseInit } from '@/libs/firebase/firebaseController';

// Firebase 초기화
(async function () {
  await firebaseInit();
})();

// 초기 라우팅 설정
document.addEventListener('DOMContentLoaded', handleRouting);
// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener('popstate', handleRouting);
