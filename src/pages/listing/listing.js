import styles from './listing.module.css';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';


class Component {
  constructor(target) {
    this.target = target;
    // this.setup();
    // this.render();
    // this.setEvent();
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
  constructor(target) {
    super(target);
    this.setup();
  }

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
      itemsPerPage: 8,  // 한 페이지당 8개로 수정
      totalPages: 0
    };
    
    // 초기 총 페이지 수 계산
    this.updateTotalPages();

    this.searchBar = new SearchBar({
      placeholder: '검색어를 입력하세요.(#숫자:브랜치 검색)',
      value: this.state.searchText,
      onSearch: (value) => {
        this.setState({ 
          searchText: value,
          currentPage: 1
        });
      }
    });

    this.pagination = new Pagination({
      currentPage: this.state.currentPage,
      totalPages: Math.ceil(this.filterEmployees().length / this.state.itemsPerPage),
      onPageChange: (page) => {
        this.setState({ currentPage: page });
      }
    });
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

    // #으로 시작하는 검색어는 브랜치 전용 검색으로 처리
    if (searchTerm.startsWith('#')) {
      const branchNumber = searchTerm.slice(1); // # 제거
      if (!isNaN(branchNumber)) {
        return this.state.employees.filter(employee => 
          employee.branch === branchNumber
        );
      }
    }

    // 일반 검색어 처리
    const searchTerms = searchTerm.split(' ').filter(term => term.length > 0);

    return this.state.employees.filter(employee => {
      const searchFields = [
        employee.name,
        employee.email,
        employee.phone,
        employee.branch,
        employee.rank
      ];

      return searchTerms.every(term =>
        searchFields.some(field => 
          String(field).toLowerCase().includes(term)
        )
      );
    });
  }

  // 페이지 번호 렌더링 메서드 개선
  renderPageNumbers() {
    let pages = '';
    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;

    // 페이지가 없거나 1페이지만 있는 경우
    if (totalPages <= 1) {
      return '';
    }

    // 페이지 버튼 생성
    for (let i = 1; i <= totalPages; i++) {
      pages += `
        <button class="${styles.pageBtn} ${currentPage === i ? styles.active : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }
    return pages;
  }

  // 총 페이지 수 업데이트 메서드 개선
  updateTotalPages() {
    const filteredEmployees = this.filterEmployees();
    
    // 검색 결과가 8개 이하면 totalPages를 1로 설정
    if (filteredEmployees.length <= this.state.itemsPerPage) {
      this.state.totalPages = 1;
      this.state.currentPage = 1;
      return;
    }
    
    const newTotalPages = Math.ceil(filteredEmployees.length / this.state.itemsPerPage);
    
    // 현재 페이지가 새로운 총 페이지 수보다 크면 마지막 페이지로 이동
    if (this.state.currentPage > newTotalPages) {
      this.state.currentPage = Math.max(1, newTotalPages);
    }
    
    this.state.totalPages = newTotalPages;
  }

  // 페이지네이션 버튼 렌더링 부분 수정
  template() {
    const currentEmployees = this.getCurrentPageEmployees();
    // const sidebar = new Sidebar('listing');
    const totalEmployees = this.filterEmployees().length;
    const showPagination = totalEmployees > this.state.itemsPerPage; // 8개 초과일 때만 페이지네이션 표시
    
    return `
        <main class="main-content">
          <header>
            <h1>직원목록</h1>
            ${this.searchBar.template()}
          </header>
          <div class="${styles.myContent}">
            <div class="${styles.teamHeader}">
              <button>Edit</button>
            </div>
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
                  ${currentEmployees.map(employee => `
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
                        <button class="delete-btn">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            ${showPagination ? `
              ${this.pagination.template()}
            ` : ''}
          </div>
        </main>
    `;
  }

  setEvent() {
    // 사이드바 이벤트 설정
    // const sidebar = new Sidebar('listing');
    // sidebar.setEvent(this.target);

    // this.searchBar.setEvent(this.target);
    // this.pagination.setEvent(this.target);

    // 삭제 버튼 이벤트
    // this.target.addEventListener('click', (e) => {
    //   if (e.target.classList.contains('delete-btn')) {
    //     const tr = e.target.closest('tr');
    //     const id = tr.dataset.id;
    //     console.log('Delete employee:', id);
    //   }
    // });
  }
}

// 앱 실행
// new ListingPage(document.querySelector('#page-container'));

export default ListingPage; 