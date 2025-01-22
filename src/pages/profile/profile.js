// profile.css 파일 임포트
import styles from './profile.module.css';
import profileImg from '@/assets/images/princess01.webp';

class Component {
  constructor(target) {
    this.target = target;
  }

  setup() {}
  template() {
    return '';
  }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}

class ProfilePage extends Component {
  constructor(target) {
    super(target);
    this.state = {
      profileData: {
        name: '박샌드',
        phone: '010-1234-1234',
        email: 'yummy@sandwish.com',
        jobTitle: '홀 매니저',
        location: '서울특별시 강남구 역삼동 123-45, 101호',
        profileImage: '/src/assets/images/employee.jpg',
      },
    };

    this.setup();
    this.validateFileSize = this.validateFileSize.bind(this);
  }

  setup() {
    this.MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    // this.state = {
    //   employees: [
    //     {
    //       id: 1,
    //       image: "https://avatars.githubusercontent.com/u/113437204?v=4",
    //       name: "안요셉",
    //       phone: "010-1234-5678",
    //       email: "yosep@gmail.com",
    //       branch: "1",
    //       rank: "Leader"
    //     },
    //     // 더 많은 데이터...
    //   ],
    //   searchText: '',
    //   currentPage: 1
    // };
  }

  // 인스턴스 메서드로 변경
  getProfileData() {
    return this.state.profileData;
  }

  template() {
    const profileData = this.getProfileData();
    return `
        <main class="main-content">
        <header>
          <h1>프로필</h1>
        </header>
        <div class="my-content green-border">
          <article class="${styles.primaryProfileContainer}">
            <header>
              <img id="profileImage" src="${profileData.profileImage}" alt="프로필 사진" />
              <div class="${styles.profileInfo}">
                <h1 id="profileName">${profileData.name}</h1>
                <p id="profileJob" class="${styles.jobTitle}">${profileData.jobTitle}</p>
                <address id="profileLocation" class="${styles.location}">${profileData.location}</address>
              </div>
              <button type="button" data-role="primary-edit-button" class="${styles.editButton}">
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <span>Edit</span>
              </button>
              <input type="file" id="imageUpload" data-role="image-upload-button" accept="image/*" style="display: none;" />
            </header>
          </article>
          <article class="${styles.profileDetailContainer}">
            <header class="${styles.personalInfoHeader}">
              <h2>Personal information</h2>
              <button type="button" class="${styles.editButton}">
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <span>Edit</span>
              </button>
            </header>
            <form class="${styles.personalInfoContent}">
              <fieldset class="${styles.infoGroup}">
                <div class="${styles.infoItem}">
                  <label for="firstName">First Name</label>
                  <output id="firstName" name="firstName">Jack</output>
                </div>
                <div class="${styles.infoItem}">
                  <label for="lastName">Last Name</label>
                  <output id="lastName" name="lastName">Adams</output>
                </div>
              </fieldset>
              <fieldset class="${styles.infoGroup}">
                <div class="${styles.infoItem}">
                  <label for="email">Email address</label>
                  <output id="email" name="email">jackadams@gmail.com</output>
                </div>
                <div class="${styles.infoItem}">
                  <label for="phone">Phone</label>
                  <output id="phone" name="phone">(213) 555-1234</output>
                </div>
              </fieldset>
              <fieldset class="${styles.infoItem} ${styles.fullWidth}">
                <label for="bio">Bio</label>
                <output id="bio" name="bio">Product Designer</output>
              </fieldset>
            </form>
          </article>
        </div>
      </main>
    `;
  }

  setEvent() {
    const editButton = document.querySelector('[data-role="primary-edit-button"]');

    if (editButton) {
      editButton.addEventListener('click', () => {
        this.toggleEditMode();
      });
    } else {
      console.warn('Edit button not found.');
    }

    // 이미지 클릭 시 파일 업로드 창 열기
    const profileImage = document.getElementById('profileImage');
    const imageUploadButton = document.querySelector('[data-role="image-upload-button"]');

    profileImage.addEventListener('click', () => {
      imageUploadButton.click(); // 파일 입력 필드 클릭
    });
  }

  toggleEditMode() {
    const nameElement = document.getElementById('profileName');
    const jobElement = document.getElementById('profileJob');
    const locationElement = document.getElementById('profileLocation');
    const editButton = document.querySelector('[data-role="primary-edit-button"]');
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');

    if (editButton.innerText === 'Edit') {
      // 편집 모드로 전환
      nameElement.innerHTML = `<input type="text" value="${nameElement.innerText}" />`;
      jobElement.innerHTML = `<input type="text" value="${jobElement.innerText}" />`;
      locationElement.innerHTML = `<input type="text" value="${locationElement.innerText}" />`;
      editButton.innerText = 'Save';
      // imageUpload.style.display = "block"; // 파일 입력 필드 보이기

      // 이미지 업로드 이벤트 리스너 추가
      imageUpload.onchange = (event) => {
        const file = event.target.files[0];

        if (file) {
          if (!this.validateFileSize(file)) {
            return; // 파일 크기가 유효하지 않으면 종료
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            profileImage.src = e.target.result; // 미리보기
          };
          reader.readAsDataURL(file);
        }
      };
    } else {
      // 저장
      const newName = nameElement.querySelector('input').value;
      const newJob = jobElement.querySelector('input').value;
      const newLocation = locationElement.querySelector('input').value;

      nameElement.innerText = newName;
      jobElement.innerText = newJob;
      locationElement.innerText = newLocation;
      editButton.innerText = 'Edit';

      // 여기서 createImage() 호출 가능
      // createImage();
    }
  }

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
}

// 앱 실행
// new ProfilePage(document.querySelector('#page-container'));

export default ProfilePage;
