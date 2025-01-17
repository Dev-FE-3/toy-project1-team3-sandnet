// profile.css 파일 임포트
import styles from './profile.module.css';

class Component {
  constructor(target) {
    this.target = target;
  }

  setup() {}
  template() { return ''; }
  render() {
    this.target.innerHTML = this.template();
  }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
    this.setEvent();
  }
}

class ProfilePage extends Component {
  setup() {
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

  template() {
    return `
      <main>
      <div class="${styles.profileContainer}">
        <article class="${styles.primaryProfileContainer}">
          <header>
            <img src="../../images/princess01.webp" alt="프로필 사진" />
            <div class="${styles.profileInfo}">
              <h1>Jack Adams</h1>
              <p class="${styles.jobTitle}">Product Designer</p>
              <address class="${styles.location}">Los Angeles, California, USA</address>
            </div>

            <button type="button" class="${styles.editButton}">
              <i class="fa fa-pencil" aria-hidden="true"></i>
              <span>Edit</span>
            </button>
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
    
  }
}

// 앱 실행
new ProfilePage(document.querySelector('#app'));

export default ProfilePage; 