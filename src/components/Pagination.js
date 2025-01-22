import './Pagination.css';

export default class Pagination {
  constructor(options = {}) {
    this.currentPage = options.currentPage || 1;
    this.totalPages = options.totalPages || 1;
    this.onPageChange = options.onPageChange || (() => {});
  }

  template() {
    if (this.totalPages <= 1) return '';

    return `
      <div class="pagination">
        <button class="page-btn prev-btn ${this.currentPage === 1 ? 'disabled' : ''}"
                ${this.currentPage === 1 ? 'disabled' : ''}>
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="page-numbers">
          ${this.renderPageNumbers()}
        </div>
        <button class="page-btn next-btn ${this.currentPage === this.totalPages ? 'disabled' : ''}"
                ${this.currentPage === this.totalPages ? 'disabled' : ''}>
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;
  }

  renderPageNumbers() {
    let pages = '';
    for (let i = 1; i <= this.totalPages; i++) {
      pages += `
        <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                data-page="${i}">
          ${i}
        </button>
      `;
    }
    return pages;
  }

  setEvent(target) {
    const pagination = target.querySelector('.pagination');
    if (!pagination) return;

    pagination.addEventListener('click', (e) => {
      const btn = e.target.closest('.page-btn');
      if (!btn || btn.disabled) return;

      let newPage = this.currentPage;

      if (btn.classList.contains('prev-btn')) {
        newPage = Math.max(1, this.currentPage - 1);
      } else if (btn.classList.contains('next-btn')) {
        newPage = Math.min(this.totalPages, this.currentPage + 1);
      } else {
        newPage = parseInt(btn.dataset.page);
      }

      if (newPage !== this.currentPage) {
        this.onPageChange(newPage);
      }
    });
  }
} 