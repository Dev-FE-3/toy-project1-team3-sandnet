import styles from './notice.module.css';
import { noticeData } from '@/data/noticeData.js';

class Component {
  constructor(target) {
    this.target = target;
    // this.setup();
    // this.render();
    // this.setEvent();
  }
  setup() {}
  template() {
    return '';
  }
  // render() {
  //   this.target.innerHTML = this.template();
  // }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    // this.render();
    this.setEvent();
  }
}

class NoitcePage extends Component {
  constructor(target) {
    super(target);
    // this.setup();
    // this.setEvent();
  }

  setup() {
    this.cards = noticeData.cards;
    this.filteredCards = [...this.cards];
  }

  createCardHTML(card) {
    return `
      <div class="card" data-notice-id="${card.id}">
        <img src="${card.image}" alt="공지사항 이미지" class="image-placeholder"/>
        <h2>${card.title}</h2>
        <p>${card.content}</p>
      </div>
    `;
  }

  template() {
    return `
      <main class="main-content">
        <header>
          <h1>공지사항</h1>
          <div class="search-container">
            <input class="search-input" type="text" placeholder="검색어를 입력하세요" >
            <span class="search-icon material-icons">search</span>
          </div>
        </header>

        <div class="my-content green-border">
          <section class="${styles.cards}">
          ${this.filteredCards
            .map(
              (card) => `
              <div id= "${card.id}" class="${styles.card}">
              <img src="${card.imgSrc}" alt="${card.title}" class="${styles.imagePlaceholder}"/>
              <h2>${card.title}</h2>
              <p>${card.description}</p>
              </div>
              `,
            )
            .join('')}

          </section>
        </div>

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

    `;
  }

  setEvent() {
    this.initializeModal();
    this.initializeCards();
  }

  initializeModal() {
    const modals = [
      {
        trigger: document.querySelectorAll(`.${styles.card}`),
        modal: document.querySelector(`.${styles.modalContainer}`),
      },
    ];

    modals.forEach(({ trigger, modal }) => {
      if (!trigger || !modal) return;

      const closeBtn = modal.querySelector(`.${styles.modalCloseButton}`);

      // 트리거 클릭 시 모달 열기
      trigger.forEach((card) => {
        card.addEventListener('click', (e) => {
          e.stopPropagation(); // 이벤트 전파 막기
          this.openModal(card); // openModal 사용
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        });
      });

      // 닫기 버튼 클릭 시 모달 닫기
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });
      }

      // 모달 외부 클릭 시 닫기
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    });
  }

  initializeCards() {
    const cards = document.querySelectorAll(`.${styles.card}`);
    cards.forEach((card) => this.setupCard(card));
  }

  setupCard(card) {
    const cardText = card.querySelector('p');
    if (cardText) {
      const fullText = cardText.textContent;
      card.dataset.fullText = fullText;
      cardText.textContent = this.truncateText(fullText);
    }
  }

  //모달 열기기
  openModal(card) {
    const modalElements = this.getModalElements();
    const cardImage = card.querySelector(`.${styles.imagePlaceholder}`).cloneNode(true);
    const cardTitle = card.querySelector('h2').textContent;
    const fullText = card.dataset.fullText;

    modalElements.image.innerHTML = ''; // 기존 이미지 초기화
    modalElements.image.appendChild(cardImage);
    modalElements.title.textContent = cardTitle;
    modalElements.text.textContent = fullText;

    modalElements.container.classList.remove(styles.hidden);
  }

  //모달 요소 가져오기
  getModalElements() {
    return {
      container: document.querySelector(`.${styles.modalContainer}`),
      image: document.querySelector(`.${styles.modalImage}`),
      title: document.querySelector(`.${styles.modalTitle}`),
      text: document.querySelector(`.${styles.modalText}`),
      closeButton: document.querySelector(`.${styles.modalCloseButton}`),
    };
  }

  truncateText(text, limit = 40) {
    return text.length <= limit ? text : `${text.slice(0, limit)}...`;
  }
}

// 앱 실행
new NoitcePage(document.querySelector('#app'));

export default NoticePage;
