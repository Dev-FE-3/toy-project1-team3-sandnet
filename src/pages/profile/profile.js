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
    };
  }

  //  getProfileData() {
  //    return this.state.profileData;
  //  }

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
                <img id="profileImage" src="${this.state.profileImgs[0]?.imgUrl}" alt="프로필 사진" />
                <i class="fa-solid fa-pen ${styles.imgEditIcon}" aria-hidden="true"></i>
                <i class="fas fa-trash ${styles.imgDeleteIcon}"></i>
              </div>
              <div class="${styles.profileInfo}">
                <h1 id="profileName">${userData[0].name}</h1>
                <p id="profileJob" class="${styles.jobTitle}">${userData[0].jobTitle}</p>
                <address id="profileLocation" class="${styles.location}">${userData[0].location}</address>
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
                  <output id="firstName" name="firstName">최정훈</output>
                </div>
                <div class="${styles.infoItem}">
                  <label for="email">직무</label>
                  <output name="job-role">프론트엔드 개발자</output>
                </div>
              </fieldset>
              
              <fieldset class="${styles.infoGroup}">
                <div class="${styles.infoItem}">
                  <label for="email">Email</label>
                  <output id="email" name="email">jackadams@gmail.com</output>
                </div>
                <div class="${styles.infoItem}">
                  <label for="phone">전화번호</label>
                  <output id="phone" name="phone">(010) 1234-5678</output>
                </div>
              </fieldset>
            </form>
          </article>
        </div>
      </main>
    `;
  }

  async profileInit() {
    try {
      const images = await getImagesByUser();
      this.setState({ profileImgs: images });
      console.log('ProfilePage ~ profileInit ~ images: ', images);

      if (images && images.length > 0) {
        // Base64를 Blob으로 변환
        const response = await fetch(images[0].imgUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

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
    console.log(
      'ProfilePage ~ validateFileSize ~ file: ',
      file.size,
      this.MAX_FILE_SIZE,
      file.size > this.MAX_FILE_SIZE,
    );
    if (file.size > this.MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 최대 2MB까지 업로드 가능합니다.');
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
    const profileImage = document.getElementById('profileImage');
    const imgUploadBtn = document.querySelector(`.${styles.imgUpload}`);
    const editIcon = document.querySelector(`.${styles.imgEditIcon}`);
    const deleteIcon = document.querySelector(`.${styles.imgDeleteIcon}`);

    console.log('setEvent: img ', this.state.profileImgs);

    // 프로필 이미지 클릭 시 파일 업로드 창 열기
    // profileImage.addEventListener('click', () => {
    //   imgUploadBtn.click(); // 파일 입력 필드 클릭
    // });

    // 이미지 호버시 에디트 아이콘 클릭 시 파일 업로드 창 열기
    editIcon.addEventListener('click', (e) => {
      e.stopPropagation(); // 클릭 이벤트 전파 방지
      imgUploadBtn.click(); // 파일 입력 필드 클릭
    });

    // 삭제 아이콘 클릭 시 이미지 삭제 처리
    deleteIcon.addEventListener('click', async (e) => {
      e.stopPropagation(); // 클릭 이벤트 전파 방지
      // 이미지 삭제 로직 추가
      if (this.isProfileImgs()) {
        await deleteImage(this.state.profileImgs[0].id); // 이미지 삭제 함수 호출
        this.setState({
          profileImgs: this.state.profileImgs.filter(
            (img) => img.id !== this.state.profileImgs[0].id,
          ),
        }); // 상태 업데이트
        profileImage.src = ''; // 이미지 미리보기 초기화
      }
    });

    // 이미지 업로드
    imgUploadBtn.onchange = async (e) => {
      const file = e.target.files[0];

      if (file) {
        if (!this.validateFileSize(file)) return;

        try {
          // 파일을 Base64로 변환
          const base64String = await this.convertFileToBase64(file);
          profileImage.src = URL.createObjectURL(file); // 미리보기용 blob url
          console.log('click', this.state, this.isProfileImgs(), this.state.profileImgs[0].id);

          if (this.isProfileImgs()) {
            await updateImage(this.state.profileImgs[0].id, base64String); // 이미지 Base64 문자열로 저장
          } else {
            // await createImage(base64String); // 이미지 Base64 문자열로 저장
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
    if (profileImage && profileImage.src.startsWith('blob:')) {
      URL.revokeObjectURL(profileImage.src);
    }
  }
}

// 앱 실행
// new ProfilePage(document.querySelector('#page-container'));

export default ProfilePage;
