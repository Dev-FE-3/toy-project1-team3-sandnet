import styles from './listing.module.css'

class Component {
  constructor(target) {
    this.target = target;
    this.setup();
    // this.setEvent();
  }

  setup() {}
  template() { return ''; }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.setEvent();
  }
}

class ListingPage extends Component {
  setup() {
    this.state = {
      employees: [
        {
          id: 1,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "안요셉",
          phone: "010-1234-5678",
          email: "yosep@gmail.com",
          branch: "1",
          rank: "Leader"
        },
        // 더 많은 데이터...
      ],
      searchText: '',
      currentPage: 1
    };
  }

  template() {
    return `
      <main class="${styles.staffContainer}">
        <div class="${styles.content}">
          <h2>직원 관리</h2>
          <article class="${styles.teamCard}">
            <header class="${styles.teamHeader}">
              <button class="${styles.editButton}">Edit</button>
              <div class="${styles.searchContainer}">
                <i class="fas fa-search ${styles.searchIcon}"></i>
                <input 
                  type="text" 
                  placeholder="직원 이름, 이메일 또는 연락처로 검색..." 
                  class="${styles.searchInput}"
                  value="${this.state.searchText}"
                >
              </div>
            </header>
            <div class="${styles.tableContainer}">
              <table class="${styles.teamTable}">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Branch</th>
                    <th>Rank</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.state.employees.map(employee => `
                    <tr data-id="${employee.id}">
                      <td>
                        <img src="${employee.image}" alt="프로필" class="${styles.profileImage}">
                      </td>
                      <td>${employee.name}</td>
                      <td>${employee.phone}</td>
                      <td>${employee.email}</td>
                      <td>${employee.branch}</td>
                      <td>${employee.rank}</td>
                      <td class="${styles.actions}">
                        <button class="${styles.deleteBtn}">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <nav class="${styles.pagination}">
              <button class="${styles.pageBtn} ${styles.prevBtn}">
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="${styles.pageNumbers}">
                <button class="${styles.pageBtn} ${styles.active}">1</button>
                <button class="${styles.pageBtn}">2</button>
                <button class="${styles.pageBtn}">3</button>
                <button class="${styles.pageBtn}">4</button>
                <button class="${styles.pageBtn}">5</button>
              </div>
              <button class="${styles.pageBtn} ${styles.nextBtn}">
                <i class="fas fa-chevron-right"></i>
              </button>
            </nav>
          </article>
        </div>
      </main>
    `;
  }

  setEvent() {
    // 검색 이벤트
    const searchInput = this.target.querySelector(`.${styles.searchInput}`);
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.setState({ searchText: e.target.value });
          // 검색 로직 구현
        }, 300);
      });
    }

    // 삭제 버튼 이벤트
    this.target.addEventListener('click', (e) => {
      if (e.target.classList.contains(styles.deleteBtn)) {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        // 삭제 로직 구현
        console.log('Delete employee:', id);
      }
    });

    // 페이지네이션 이벤트
    const pagination = this.target.querySelector(`.${styles.pagination}`);
    if (pagination) {
      pagination.addEventListener('click', (e) => {
        const btn = e.target.closest(`.${styles.pageBtn}`);
        if (!btn) return;

        const currentActive = pagination.querySelector(`.${styles.pageBtn}.active`);
        if (currentActive) {
          currentActive.classList.remove('active');
        }
        if (!btn.classList.contains(styles.prevBtn) && !btn.classList.contains(styles.nextBtn)) {
          btn.classList.add('active');
        }
      });
    }
  }
}

// 앱 실행
// new ListingPage(document.querySelector('#app'));

export default ListingPage; 