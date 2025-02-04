import './Pagination.css';

export default class Pagination {
  constructor(options = {}) {
    this.currentPage = options.currentPage || 1;
    this.totalPages = options.totalPages || 1;
    this.onPageChange = options.onPageChange || (() => {});
    // this.setEvent();
  }

  template() {
    if (this.totalPages <= 1) return '';

    return `
      <div class="pagination">
        <button class="page-btn prev-btn ${this.currentPage === 1 ? 'disabled' : ''}"
                ${this.currentPage === 1 ? 'disabled aria-disabled="true"' : ''}>
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="page-numbers">
          ${this.renderPageNumbers()}
        </div>
        <button class="page-btn next-btn ${this.currentPage === this.totalPages ? 'disabled' : ''}"
                ${this.currentPage === this.totalPages ? 'disabled aria-disabled="true"' : ''}>
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;
  }

  renderPageNumbers() {
    const { totalPages, currentPage } = this;
    if (totalPages <= 1) return '';

    const range = 3;
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
        pages.push(
          `<button class="page-btn number-btn ${
            i === currentPage ? 'active' : ''
          }" data-page="${i}">${i}</button>`,
        );
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages.join('');
  }

  setEvent(target) {
    const pagination = target.querySelector('.pagination');
    if (!pagination) return;

    // 기존 이벤트 리스너 제거 없이, 한 번만 등록되는 이벤트 위임 방식 적용
    target.addEventListener('click', (e) => {
      const btn = e.target.closest('.page-btn, .prev-btn, .next-btn');
      if (!btn || btn.classList.contains('disabled')) return;

      let newPage = this.currentPage;

      if (btn.classList.contains('prev-btn')) {
        newPage = Math.max(1, this.currentPage - 1);
      } else if (btn.classList.contains('next-btn')) {
        newPage = Math.min(this.totalPages, this.currentPage + 1);
      } else {
        newPage = parseInt(btn.dataset.page, 10);
      }

      if (newPage !== this.currentPage) {
        this.currentPage = newPage;
        this.updatePaginationUI(pagination);
        this.onPageChange(newPage);
      }
    });
  }

  // ✅ UI 업데이트 로직 분리 (코드 재사용성을 높임)
  updatePaginationUI(pagination) {
    pagination.querySelectorAll('.page-btn').forEach((btn) => {
      btn.classList.toggle('active', parseInt(btn.dataset.page, 10) === this.currentPage);
    });

    const prevBtn = pagination.querySelector('.prev-btn');
    const nextBtn = pagination.querySelector('.next-btn');

    if (prevBtn) prevBtn.classList.toggle('disabled', this.currentPage === 1);
    if (nextBtn) nextBtn.classList.toggle('disabled', this.currentPage === this.totalPages);
  }
}
