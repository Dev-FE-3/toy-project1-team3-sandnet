import "../../../reset.css";
import "../../styles/global.css";
import "../../styles/variables.css";
import styles from "./notice.module.css";
import noticeData from "./notice-data.json";

class Component {
  constructor(target) {
    this.target = target;
    this.setup();
    this.render();
    this.setEvent();
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

class NoticePage extends Component {
  setup() {
    this.cards = noticeData.cards;
    this.filteredCards = [...this.cards];
    
  };

  template () {
    return `
    <div class="page-container">
      <!--Sidebar-->
      <div class="sidebar">
        <h1>SandNet</h1>
          <ul>
            <li>Home</li>
            <li class="active">Management</li>
            <li>Notification</li>
            <li>My page</li>
          </ul>
      </div>
      <!--Main Content-->
      <main class="content">
        <header>
          <h2 class="${styles.title}">공지사항</h2>
          <div class="search-container">
            <input class="search-input" type="text" placeholder="검색어를 입력하세요" >
            <span class="search-icon material-icons">search</span>
          </div>
        </header>

        <!--Scrollable Cards Section-->
        <section class="${styles.cards}">
        ${this.filteredCards
          .map(
            (card) => `
            <div id= "${card.id}" class="${styles.card}">
            <img src="${card.imgSrc}" alt="${card.title}" class="${styles.imagePlaceholder}"/>
            <h2>${card.title}</h2>
            <p>${card.description}</p>
            </div>
            `
          )
          .join("")
        }

        </section>

        <!--card modal-->
        <div class="${styles.modalContainer} ${styles.hidden}">
          <div class="${styles.modalContent}">
            <span class="${styles.modalCloseButton} close-icon material-icons">close</span>
            <div class="${styles.modalArea}">
              <div  class="${styles.modalImage}"></div>
              <div class="${styles.modalTextContent}">
                <h2 class="${styles.modalTitle}"></h2>
                <p  class="${styles.modalText}"></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    `;
  }

  setEvent() {
    // 공통 DOM 요소 가져오기
    const modalContainer = document.querySelector(`.${styles.modalContainer}`);
    const modalImage = modalContainer.querySelector(`.${styles.modalImage}`);
    const modalTitle = modalContainer.querySelector(`.${styles.modalTitle}`);
    const modalText = modalContainer.querySelector(`.${styles.modalText}`);
    const modalCloseButton = modalContainer.querySelector(`.${styles.modalCloseButton}`);
  
    // 텍스트 제한 함수
    const truncateText = (text, limit = 40) =>
      text.length <= limit ? text : `${text.slice(0, limit)}...`;
  
    // 모달 열기 함수
    const openModal = (card) => {
      const cardImage = card.querySelector(`.${styles.imagePlaceholder}`).cloneNode(true);
      const cardTitle = card.querySelector('h2').textContent;
      const fullText = card.dataset.fullText;
  
      // 모달 내용 업데이트
      modalImage.innerHTML = ''; // 기존 이미지 제거
      modalImage.appendChild(cardImage); // 새 이미지 추가
      modalTitle.textContent = cardTitle;
      modalText.textContent = fullText;
  
      modalContainer.classList.remove(styles.hidden); // 모달 표시
    };
  
    // 모달 닫기 함수
    const closeModal = () => {
      modalContainer.classList.add(styles.hidden); // 모달 숨기기
    };
  
    // 외부 클릭 시 모달 닫기
    const handleOutsideClick = (e) => {
      if (e.target === modalContainer) closeModal();
    };
  
    // 카드별 이벤트 설정 함수
    const setupCardEvents = (card) => {
      const cardText = card.querySelector('p');
      const fullText = cardText.textContent;
  
      // 원본 텍스트 저장
      card.dataset.fullText = fullText;
  
      // 카드 텍스트 줄이기
      cardText.textContent = truncateText(fullText);
  
      // 카드 클릭 시 모달 열기
      card.addEventListener('click', () => openModal(card));
    };
  
    // 초기화 함수
    const initialize = () => {
      const cards = document.querySelectorAll(`.${styles.card}`);
  
      // 각 카드에 이벤트 바인딩
      cards.forEach(setupCardEvents);
  
      // 모달 닫기 버튼 이벤트 바인딩
      modalCloseButton.addEventListener('click', closeModal);
  
      // 모달 외부 클릭 이벤트 바인딩
      modalContainer.addEventListener('click', handleOutsideClick);
    };
  
    // 초기화 실행
    initialize();
  }
  
  
}

// 앱 실행
new NoticePage(document.querySelector('#app'));

export default NoticePage; 