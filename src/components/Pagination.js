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
        <button class="page-btn number-btn ${i === this.currentPage ? 'active' : ''}" 
                data-page="${i}">
          ${i}
        </button>
      `;
    }
    return pages;
  }

  setEvent(target) {
    // console.log('Pagination ~ setEvent ~ target:시작 ');
    const pagination = target.querySelector('.pagination');
    if (!pagination) return;

    pagination.addEventListener('click', (e) => {
      const btn = e.target.closest('.page-btn');
      console.log('Pagination ~ pagination.addEventListener ~ btn: ', btn, this.onPageChange);

      if (!btn || btn.classList.contains('disabled')) return;

      let newPage = this.currentPage;

      if (btn.classList.contains('prev-btn')) {
        newPage = Math.max(1, this.currentPage - 1);
      } else if (btn.classList.contains('next-btn')) {
        newPage = Math.min(this.totalPages, this.currentPage + 1);
      } else {
        newPage = parseInt(btn.dataset.page);
      }

      if (newPage !== this.currentPage) {
        // 현재 활성화된 버튼의 active 클래스 제거
        const currentActiveBtn = pagination.querySelector('.page-btn.active');
        if (currentActiveBtn) {
          currentActiveBtn.classList.remove('active');
        }

        // 새로 선택된 버튼에 active 클래스 추가
        const newActiveBtn = pagination.querySelector(`[data-page="${newPage}"]`);
        if (newActiveBtn) {
          newActiveBtn.classList.add('active');
        }

        // 이전/다음 버튼 상태 업데이트
        const prevBtn = pagination.querySelector('.prev-btn');
        const nextBtn = pagination.querySelector('.next-btn');

        if (prevBtn) {
          prevBtn.disabled = newPage === 1;
          prevBtn.classList.toggle('disabled', newPage === 1);
        }

        if (nextBtn) {
          nextBtn.disabled = newPage === this.totalPages;
          nextBtn.classList.toggle('disabled', newPage === this.totalPages);
        }

        this.currentPage = newPage;
        this.onPageChange(newPage);
      }
    });
  }
}
