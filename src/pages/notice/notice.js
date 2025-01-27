import styles from './notice.module.css';
import { noticeData } from '@/data/noticeData';
import Component from '@/components/ComponentClass';

class NoticePage extends Component {
  constructor(target) {
    super(target);
    this.setup();
    this.setEvent();
  }

  setup() {
    this.cards = noticeData.slice(0);
    this.filteredCards = [...this.cards];
  }

  createCardHTML(card) {
    return `
      <div class="${styles.card}" data-notice-id="${card.id}">
        <img src="${card.image}" alt="공지사항 이미지" class="${styles.imagePlaceholder}"/>
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
        </header>

        <div class="my-content green-border">
          <section class="${styles.cards}">
          ${this.filteredCards.map((card) => this.createCardHTML(card)).join('')}
          </section>
        </div>

        <!--card modal-->
        <div class="${styles.modalContainer} ${styles.hidden}">
          <div class="${styles.modalContent}">
            <span class="${styles.close} close-icon material-icons">close</span>
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
    // console.log("NoticePage ~ setup ~ filteredCards: ", this.filteredCards);

    this.initModal();
    this.initCards();
  }

  //모달 초기화
  initModal() {
    const modals = {
      card: {
        trigger: document.querySelectorAll(`.${styles.card}`),
        modal: document.querySelector(`.${styles.modalContainer}`),
      },
    };

    Object.values(modals).forEach(({ trigger, modal }) => {
      if (!trigger || !modal) return;
      const closeBtn = modal.querySelector(`.${styles.close}`);

      // 트리거 클릭 시 모달 열기
      trigger.forEach((card) => {
        card.addEventListener('click', (e) => {
          // e.stopPropagation(); // 이벤트 전파 막기
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

  initCards() {
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
// new NoticePage(document.querySelector('#app'));

export default NoticePage;
