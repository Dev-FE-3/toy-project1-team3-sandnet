import './listing.css';
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
        {
          id: 2,
          image: "https://avatars.githubusercontent.com/u/103546376?v=4",
          name: "이지원",
          phone: "010-1234-5678",
          email: "jiwon@gmail.com",
          branch: "2",
          rank: "Leader"
        },
        {
          id: 3,
          image: "https://avatars.githubusercontent.com/u/39721166?v=4",
          name: "최정훈",
          phone: "010-1234-5678",
          email: "jung@gmail.com",
          branch: "3",
          rank: "Leader"
        },
        {
          id: 4,
          image: "https://avatars.githubusercontent.com/u/173143133?v=4",
          name: "장은혜",
          phone: "010-1234-5678",
          email: "eun@gmail.com",
          branch: "4",
          rank: "Leader"
        },
        {
          id: 5,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "최영일",
          phone: "010-1234-5678",
          email: "yong1@gmail.com",
          branch: "1",
          rank: "Mate1"
        },
        {
          id: 6,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "이영이",
          phone: "010-1234-5678",
          email: "yong2@gmail.com",
          branch: "2",
          rank: "Mate1"
        },
        {
          id: 7,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "장영삼",
          phone: "010-1234-5678",
          email: "yong3@gmail.com",
          branch: "3",
          rank: "Mate1"
        },
        {
          id: 8,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "안영사",
          phone: "010-1234-5678",
          email: "yong4@gmail.com",
          branch: "4",
          rank: "Mate1"
        },
        {
          id: 9,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "홍길동",
          phone: "010-1234-5678",
          email: "hong@gmail.com",
          branch: "1",
          rank: "Mate2"
        },
        {
          id: 10,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "심청이",
          phone: "010-1234-5678",
          email: "sim@gmail.com",
          branch: "2",
          rank: "Mate2"
        },
        {
          id: 11,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "고두심",
          phone: "010-1234-5678",
          email: "dusim@gmail.com",
          branch: "3",
          rank: "Mate2"
        },
        {
          id: 12,
          image: "https://avatars.githubusercontent.com/u/113437204?v=4",
          name: "서현진",
          phone: "010-1234-5678",
          email: "hyunjin@gmail.com",
          branch: "1",
          rank: "Mate2"
        },
        // 더 많은 데이터...
      ],
      searchText: '',
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0
    };
    
    // 초기 총 페이지 수 계산
    this.state.totalPages = Math.ceil(this.state.employees.length / this.state.itemsPerPage);
  }

  // 현재 페이지에 표시할 직원 목록 가져오기
  getCurrentPageEmployees() {
    const filteredEmployees = this.filterEmployees();
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex = startIndex + this.state.itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }

  // 검색 필터 메서드
  filterEmployees() {
    const searchTerm = this.state.searchText.toLowerCase().trim();
    
    if (!searchTerm) {
      return this.state.employees;
    }

    return this.state.employees.filter(employee => {
      return (
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.phone.includes(searchTerm) ||
        employee.branch.toLowerCase().includes(searchTerm) ||
        employee.rank.toLowerCase().includes(searchTerm)
      );
    });
  }

  // 페이지 번호 렌더링
  renderPageNumbers() {
    let pages = '';
    for (let i = 1; i <= this.state.totalPages; i++) {
      pages += `
        <button class="page-btn ${this.state.currentPage === i ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }
    return pages;
  }

  // setup 메서드의 totalPages 계산 부분을 아래 메서드로 대체
  updateTotalPages() {
    const filteredEmployees = this.filterEmployees();
    this.state.totalPages = Math.ceil(filteredEmployees.length / this.state.itemsPerPage);
  }

  template() {
    const currentEmployees = this.getCurrentPageEmployees();
    
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
                  ${currentEmployees.map(employee => `
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
              <button class="page-btn prev-btn" ${this.state.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="page-numbers">
                ${this.renderPageNumbers()}
              </div>
              <button class="page-btn next-btn" ${this.state.currentPage === this.state.totalPages ? 'disabled' : ''}>
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
          this.setState({ 
            searchText: e.target.value,
            currentPage: 1
          });
          this.updateTotalPages();
        }, 300);
      });
    }

    // 삭제 버튼 이벤트
    this.target.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        console.log('Delete employee:', id);
      }
    });

    // 페이지네이션 이벤트
    const pagination = this.target.querySelector('.pagination');
    if (pagination) {
      pagination.addEventListener('click', (e) => {
        const btn = e.target.closest('.page-btn');
        if (!btn) return;

        if (btn.classList.contains('prev-btn') && this.state.currentPage > 1) {
          this.setState({ currentPage: this.state.currentPage - 1 });
        } else if (btn.classList.contains('next-btn') && this.state.currentPage < this.state.totalPages) {
          this.setState({ currentPage: this.state.currentPage + 1 });
        } else if (!btn.classList.contains('prev-btn') && !btn.classList.contains('next-btn')) {
          const pageNum = parseInt(btn.dataset.page);
          this.setState({ currentPage: pageNum });
        }
      });
    }
  }
}

// 앱 실행
new ListingPage(document.querySelector('#app'));

export default ListingPage; 