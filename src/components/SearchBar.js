import './searchBar.css';

export default class SearchBar {
  constructor(options = {}) {
    this.placeholder = options.placeholder || '검색어를 입력하세요';
    this.onSearch = options.onSearch || (() => {});
    this.value = options.value || '';
  }

  template() {
    return `
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input 
          class="search-input"
          type="text" 
          placeholder="${this.placeholder}"
          value="${this.value}"
        >
      </div>
    `;
  }

  setEvent(target) {
    const searchInput = target.querySelector('.search-input');
    if (!searchInput) return;

    let debounceTimer;

    // 입력 이벤트
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.onSearch(e.target.value);
      }, 300);
    });

    // 엔터 이벤트
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(debounceTimer);
        this.onSearch(e.target.value);
      }
    });

    // 검색창 클리어
    searchInput.addEventListener('search', () => {
      this.onSearch('');
    });
  }
}
