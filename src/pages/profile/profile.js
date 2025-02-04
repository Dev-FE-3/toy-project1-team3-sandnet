// profile.css 파일 임포트
import styles from './profile.module.css';
import profileImg from '@/assets/images/princess01.webp';
import {
  createImage,
  updateImage,
  getImagesByUser,
  deleteImage,
} from '@/libs/firebase/firebaseService';
import Component from '@/components/ComponentClass';
import { userData } from '@/data/userData';

class ProfilePage extends Component {
  constructor(target) {
    super(target);
    this.state = {};
    this.setup();
    this.profileInit();
    this.validateFileSize = this.validateFileSize.bind(this);
  }

  setup() {
    this.MAX_FILE_SIZE = 2 * 1024 * 1024; // 업로드 이미지 최대 파일 크기(2MB)

    this.state = {
      profileImgs: [],
      currentUserId: JSON.parse(sessionStorage.getItem('currentUser')),
    };
  }

  template() {
    return `
        <main class="main-content">
        <header>
          <h1>프로필</h1>
        </header>
        <div class="my-content green-border">
          <article class="${styles.primaryProfileContainer} green-border">
            <header>
              <div class="${styles.imgContainer}">
                <img id="profileImage" src="${
                  this.state.profileImgs[0]?.imgUrl
                }" alt="프로필 사진" />
                <i class="fa-solid fa-pen ${styles.imgEditIcon}" aria-hidden="true"></i>
                <i class="fas fa-trash ${styles.imgDeleteIcon}"></i>
              </div>
              <div class="${styles.profileInfo}">
                <h1 id="profileName">${userData[this.state.currentUserId]?.name}</h1>
                <p id="profileJob" class="${styles.jobTitle}">${
      userData[this.state.currentUserId]?.jobTitle
    }</p>
                <address id="profileLocation" class="${styles.location}">${
      userData[this.state.currentUserId]?.location
    }</address>
              </div>
              <input type="file" accept="image/*" class="${styles.imgUpload}" />
            </header>
          </article>
          <article class="${styles.profileDetailContainer}"green-border>
            <header class="${styles.personalInfoHeader}">
              <h2>Personal information</h2>
              
            </header>
            <!-- 개인정보 -->
            <form class="${styles.personalInfoContent}">
              <fieldset class="${styles.infoGroup}">
                <div class="${styles.infoItem}">
                  <label for="firstName">이름</label>
                  <output id="firstName" name="firstName">${
                    userData[this.state.currentUserId]?.name
                  }</output>
                </div>
                <div class="${styles.infoItem}">
                  <label for="email">직무</label>
                  <output name="job-role">${userData[this.state.currentUserId]?.jobTitle}</output>
                </div>
              </fieldset>
              
              <fieldset class="${styles.infoGroup}">
                <div class="${styles.infoItem}">
                  <label for="email">Email</label>
                  <output id="email" name="email">${
                    userData[this.state.currentUserId]?.email
                  }</output>
                </div>
                <div class="${styles.infoItem}">
                  <label for="phone">전화번호</label>
                  <output id="phone" name="phone">${
                    userData[this.state.currentUserId]?.phone
                  }</output>
                </div>
              </fieldset>
            </form>
          </article>
        </div>
      </main>
    `;
  }

  // Base64 문자열을 Blob으로 변환하는 함수
  base64ToBlob(base64, mimeType = 'image/png') {
    const byteCharacters = atob(base64.split(',')[1]); // Base64 디코딩
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers); // Uint8Array로 변환
    return new Blob([byteArray], { type: mimeType }); // Blob 생성 후 반환
  }

  async profileInit() {
    try {
      const images = await getImagesByUser();
      this.setState({ profileImgs: images });
      console.log('ProfilePage ~ profileInit ~ images: ', this.state.profileImgs);

      // if (images && images.length > 0) {
      //   // Base64를 Blob으로 변환
      //   const response = await fetch(images[0].imgUrl);
      //   console.log('ProfilePage ~ profileInit ~ response: ', response);
      //   const blob = await response.blob();
      //   const blobUrl = URL.createObjectURL(blob);

      //   const profileImage = document.getElementById('profileImage');

      //   if (profileImage) {
      //     profileImage.src = blobUrl;
      //   }
      // }
      if (images && images.length > 0) {
        const base64String = images[0].imgUrl; // 이미지 Base64 문자열
        const blob = this.base64ToBlob(base64String, 'image/webp'); // Blob 변환
        const blobUrl = URL.createObjectURL(blob); // Blob URL 생성

        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
          profileImage.src = blobUrl;
        }
      }
    } catch (error) {
      console.error('프로필 이미지 로딩 중 오류 발생:', error);
    }
  }

  // 파일 크기 검증
  validateFileSize(file) {
    if (file.size > this.MAX_FILE_SIZE) {
      return false;
    }
    return true;
  }

  // 파일을 Base64로 변환
  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  isProfileImgs() {
    return this.state.profileImgs.length > 0 ? true : false;
  }

  setEvent() {
    const imgContainer = document.querySelector(`.${styles.imgContainer}`);
    const profileImage = document.getElementById('profileImage');
    const imgUploadBtn = document.querySelector(`.${styles.imgUpload}`);
    const editIcon = document.querySelector(`.${styles.imgEditIcon}`);
    const deleteIcon = document.querySelector(`.${styles.imgDeleteIcon}`);

    imgContainer.addEventListener('click', async (e) => {
      e.stopPropagation();

      // 프로필 이미지 편집
      if (e.target.classList.contains(styles.imgEditIcon)) {
        imgUploadBtn.click();
      }

      // 프로필 이미지 삭제
      if (e.target.classList.contains(styles.imgDeleteIcon)) {
        if (this.isProfileImgs()) {
          await deleteImage(this.state.profileImgs[0].id); // 이미지 삭제 함수 호출
          this.setState({
            profileImgs: this.state.profileImgs.filter(
              (img) => img.id !== this.state.profileImgs[0].id,
            ),
          }); // 상태 업데이트
          profileImage.src = ''; // 이미지 미리보기 초기화
        }
      }
    });

    // 이미지 업로드
    imgUploadBtn.onchange = async (e) => {
      const file = e.target.files[0];

      if (file) {
        if (!this.validateFileSize(file)) {
          alert('파일 크기가 너무 큽니다. 최대 2MB까지 업로드 가능합니다.');
          return;
        }

        try {
          // 파일을 Base64로 변환
          const base64String = await this.convertFileToBase64(file);
          profileImage.src = URL.createObjectURL(file); // 미리보기용 blob url

          if (this.isProfileImgs()) {
            // await updateImage(this.state.profileImgs[0].id, base64String); // 이미지 Base64 문자열로 저장
          } else {
            await createImage(base64String); // 이미지 Base64 문자열로 저장
          }
        } catch (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        }
      }
    };
  }

  // 컴포넌트가 언마운트될 때 Blob URL 해제 필요
  componentWillUnmount() {
    const profileImage = document.getElementById('profileImage');
    if (profileImage?.src?.startsWith('blob:')) {
      URL.revokeObjectURL(profileImage.src);
    }
  }
}

// 앱 실행
// new ProfilePage(document.querySelector('#page-container'));

export default ProfilePage;
