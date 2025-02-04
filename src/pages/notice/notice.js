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
    this.searchText = '';
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
    this.initModal();
    this.applyTruncateText();
  }

  //페이지 로드 시 모든 .card 요소의 텍스트 줄이기
  applyTruncateText() {
    document.querySelectorAll(`.${styles.card}`).forEach((card) => {
      const cardText = card.querySelector('p');
      if (cardText) {
        const fullText = cardText.textContent;
        card.dataset.fullText = fullText;
        cardText.textContent = this.truncateText(fullText);
      }
    });
  }
  truncateText(text, limit = 40) {
    return text.length <= limit ? text : `${text.slice(0, limit)}...`;
  }

  initModal() {
    const modalContainer = document.querySelector(`.${styles.modalContainer}`);
    const closeButton = modalContainer?.querySelector(`.${styles.close}`);

    //부모 요소에서 이벤트 위임 (카드 클릭 시 모달 열기)
    document.addEventListener('click', (e) => {
      const card = e.target.closest(`.${styles.card}`);
      if (card) {
        e.stopPropagation();
        this.openModal(card);
        modalContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });

    //닫기 버튼 클릭 시 모달 닫기
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        // modalContainer.style.display = 'none';
        // document.body.style.overflow = 'auto';
        this.closeModal();
      });
    }

    //모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        // modalContainer.style.display = 'none';
        // document.body.style.overflow = 'auto';
        this.closeModal();
      }
    });
  }

  //모달 열기
  openModal(card) {
    const modalElements = this.getModalElements();
    const cardImage = card.querySelector(`.${styles.imagePlaceholder}`);
    const cardTitle = card.querySelector('h2').textContent;
    const fullText = card.dataset.fullText || card.querySelector('p')?.textContent;

    this.lastClickedCard = card; //원래 카드 저장
    this.originalImageParent = cardImage.parentNode; // 원래 부모 저장
    this.originalImageNextSibling = cardImage.nextSibling; // 원래 위치 기억

    modalElements.image.innerHTML = ''; // 기존 이미지 초기화
    modalElements.image.appendChild(cardImage);
    modalElements.title.textContent = cardTitle;
    modalElements.text.textContent = fullText;

    modalElements.container.classList.remove(styles.hidden);
  }

  //모달 닫기
  closeModal() {
    const modalElements = this.getModalElements();
    const cardImage = modalElements.image.querySelector(`.${styles.imagePlaceholder}`);

    if (this.lastClickedCard && cardImage) {
      // 원래 자리로 이미지 복귀
      if (this.originalImageNextSibling) {
        this.originalImageParent.insertBefore(cardImage, this.originalImageNextSibling);
      } else {
        this.originalImageParent.appendChild(cardImage);
      }
    }
    modalElements.container.classList.add(styles.hidden);
    document.body.style.overflow = 'auto';
  }

  //모달 요소 가져오기
  getModalElements() {
    return {
      container: document.querySelector(`.${styles.modalContainer}`),
      image: document.querySelector(`.${styles.modalImage}`),
      title: document.querySelector(`.${styles.modalTitle}`),
      text: document.querySelector(`.${styles.modalText}`),
    };
  }
}

// 앱 실행
// new NoticePage(document.querySelector('#app'));

export default NoticePage;
