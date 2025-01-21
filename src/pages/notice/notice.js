// src/pages/notice2/notice2.js
import "../../../reset.css";
import "../../styles/global.css";
import "../../styles/variables.css";
import styles from "./notice.module.css";

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
    this.cards = [
      // ... existing code ...
    ];
    this.filteredCards = [...this.cards];
  }

  template() {
    return `
    <div class="${styles.pageContainer}">
      <!--Sidebar-->
      <div class="${styles.sidebar}">
        <h1>SandNet</h1>
          <ul>
            <li>Home</li>
            <li class="active">Management</li>
            <li>Notification</li>
            <li>My page</li>
          </ul>
      </div>
      <!--Main Content-->
      <main class="${styles.content}">
        <header>
          <h2 class="${styles.title}">공지사항</h2>
          <div class="${styles.searchContainer}">
            <input class="${styles.searchInput}" type="text" placeholder="검색어를 입력하세요" >
            <span class="${styles.searchIcon} material-icons">search</span>
          </div>
        </header>

        <!--Scrollable Cards Section-->
        <section class="${styles.cards}">
        ${this.filteredCards
          .map(
            (card) => `
            <div id="${card.id}" class="${styles.card}">
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
              <div class="${styles.modalImage}"></div>
              <div class="${styles.modalTextContent}">
                <h2 class="${styles.modalTitle}"></h2>
                <p class="${styles.modalText}"></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    `;
  }

  setEvent() {
    const modalContainer = document.querySelector(`.${styles.modalContainer}`);
    const modalImage = document.querySelector(`.${styles.modalImage}`);
    const modalTitle = document.querySelector(`.${styles.modalTitle}`);
    const modalText = document.querySelector(`.${styles.modalText}`);
    const modalCloseButton = document.querySelector(`.${styles.modalCloseButton}`);

    const truncateText = (text, limit = 65) =>
      text.length <= limit ? text : text.slice(0, limit) + '...';

    const openModal = (card) => {
      const cardImage = card.querySelector(`.${styles.imagePlaceholder}`).cloneNode(true);
      const cardTitle = card.querySelector('h2').textContent;
      const fullText = card.dataset.fullText;

      modalImage.innerHTML = '';
      modalImage.appendChild(cardImage);
      modalTitle.textContent = cardTitle;
      modalText.textContent = fullText;

      modalContainer.classList.remove(styles.hidden);
    };

    const closeModal = () => modalContainer.classList.add(styles.hidden);

    const handleOutsideClick = (e) => {
      if (e.target === modalContainer) closeModal();
    };

    const setupCardEvents = (card) => {
      const cardText = card.querySelector('p');
      const fullText = cardText.textContent;

      card.dataset.fullText = fullText;
      cardText.textContent = truncateText(fullText);

      card.addEventListener('click', () => openModal(card));
    };

    const initialize = () => {
      const cards = document.querySelectorAll(`.${styles.card}`);
      cards.forEach((card) => setupCardEvents(card));
      modalContainer.addEventListener('click', handleOutsideClick);
      modalCloseButton.addEventListener('click', closeModal);
    };

    initialize();
  }
}

// 앱 실행
new NoticePage(document.querySelector('#app'));

export default NoticePage;