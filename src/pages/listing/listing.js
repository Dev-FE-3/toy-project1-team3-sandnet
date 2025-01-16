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
      <div class="page-container">
        <div class="sidebar">
          <h1>SandNet</h1>
          <ul>
            <li>Home</li>
            <li class="active">Management</li>
            <li>Notification</li>
            <li>My page</li>
          </ul>
        </div>
        <div class="content">
          <h2>직원 관리</h2>
          <div class="team-card">
            <div class="team-header">
              <button>Edit</button>
              <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  placeholder="직원 이름, 이메일 또는 연락처로 검색..." 
                  class="search-input"
                  value="${this.state.searchText}"
                >
              </div>
            </div>
            <div class="table-container">
              <table class="team-table">
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
                        <img src="${employee.image}" alt="프로필" class="profile-image">
                      </td>
                      <td>${employee.name}</td>
                      <td>${employee.phone}</td>
                      <td>${employee.email}</td>
                      <td>${employee.branch}</td>
                      <td>${employee.rank}</td>
                      <td class="actions">
                        <button class="delete-btn">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="pagination">
              <button class="page-btn prev-btn">
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="page-numbers">
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">4</button>
                <button class="page-btn">5</button>
              </div>
              <button class="page-btn next-btn">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setEvent() {
    // 검색 이벤트
    const searchInput = this.target.querySelector('.search-input');
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
      if (e.target.classList.contains('delete-btn')) {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        // 삭제 로직 구현
        console.log('Delete employee:', id);
      }
    });

    // 페이지네이션 이벤트
    const pagination = this.target.querySelector('.pagination');
    if (pagination) {
      pagination.addEventListener('click', (e) => {
        const btn = e.target.closest('.page-btn');
        if (!btn) return;

        const currentActive = pagination.querySelector('.page-btn.active');
        if (currentActive) {
          currentActive.classList.remove('active');
        }
        if (!btn.classList.contains('prev-btn') && !btn.classList.contains('next-btn')) {
          btn.classList.add('active');
        }
      });
    }
  }
}

// 앱 실행
new ListingPage(document.querySelector('#app'));

export default ListingPage; 