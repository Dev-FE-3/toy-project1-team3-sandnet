import styles from './listing.module.css';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

class Component {
  constructor(target) {
    this.target = target;
  }

  setup() {}
  template() {
    return '';
  }
  render() {
    this.target.innerHTML = this.template();
  }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.updateContent();
  }

  updateContent() {
    const mainContent = this.target.querySelector('.main-content');
    if (mainContent) {
      const currentEmployees = this.getCurrentPageEmployees();
      const tableBody = mainContent.querySelector('tbody');
      if (tableBody) {
        tableBody.innerHTML = currentEmployees
          .map((employee) => this.renderTableRow(employee))
          .join('');

        // 페이지네이션 업데이트
        const paginationContainer = mainContent.querySelector('.pagination');
        if (paginationContainer && this.pagination) {
          paginationContainer.outerHTML = this.pagination.template();
        }
      }
      this.setEvent();
    }
  }

  renderTableRow(employee) {
    return `
      <tr data-id="${employee.id}">
        <td>
          <img src="${employee.image}" alt="프로필" class="${styles.profileImage}">
        </td>
        <td>${employee.name}</td>
        <td>${employee.phone}</td>
        <td>${employee.branch}</td>
        <td>${employee.rank}</td>
      </tr>
    `;
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
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '안요셉',
          phone: '010-1234-5678',
          branch: '1',
          rank: 'Leader',
        },
        {
          id: 2,
          image: 'https://avatars.githubusercontent.com/u/103546376?v=4',
          name: '이지원',
          phone: '010-1234-5678',
          branch: '2',
          rank: 'Leader',
        },
        {
          id: 3,
          image: 'https://avatars.githubusercontent.com/u/39721166?v=4',
          name: '최정훈',
          phone: '010-1234-5678',
          branch: '3',
          rank: 'Leader',
        },
        {
          id: 4,
          image: 'https://avatars.githubusercontent.com/u/173143133?v=4',
          name: '장은혜',
          phone: '010-1234-5678',
          branch: '4',
          rank: 'Leader',
        },
        {
          id: 5,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '최영일',
          phone: '010-1234-5678',
          branch: '1',
          rank: 'Mate1',
        },
        {
          id: 6,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '이영이',
          phone: '010-1234-5678',
          branch: '2',
          rank: 'Mate1',
        },
        {
          id: 7,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '장영삼',
          phone: '010-1234-5678',
          branch: '3',
          rank: 'Mate1',
        },
        {
          id: 8,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '안영사',
          phone: '010-1234-5678',
          branch: '4',
          rank: 'Mate1',
        },
        {
          id: 9,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '홍길동',
          phone: '010-1234-5678',
          branch: '1',
          rank: 'Mate2',
        },
        {
          id: 10,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '심청이',
          phone: '010-1234-5678',
          branch: '2',
          rank: 'Mate2',
        },
        {
          id: 11,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '고두심',
          phone: '010-1234-5678',
          branch: '3',
          rank: 'Mate2',
        },
        {
          id: 12,
          image: 'https://avatars.githubusercontent.com/u/113437204?v=4',
          name: '서현진',
          phone: '010-1234-5678',
          branch: '1',
          rank: 'Mate2',
        },
        // 더 많은 데이터...
      ],
      searchText: '',
      currentPage: 1,
      itemsPerPage: 8, // 한 페이지당 8개로 수정
      totalPages: 0,
    };

    // 초기 총 페이지 수 계산
    this.updateTotalPages();

    this.searchBar = new SearchBar({
      placeholder: '검색어를 입력하세요.',
      value: this.state.searchText,
      onSearch: (value) => {
        this.setState({
          searchText: value,
          currentPage: 1,
        });
      },
    });

    this.pagination = new Pagination({
      currentPage: this.state.currentPage,
      totalPages: Math.ceil(this.filterEmployees().length / this.state.itemsPerPage),
      onPageChange: (page) => {
        this.setState({
          currentPage: page,
        });
      },
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
        return this.state.employees.filter((employee) => employee.branch === branchNumber);
      }
    }

    // 일반 검색어 처리
    const searchTerms = searchTerm.split(' ').filter((term) => term.length > 0);

    return this.state.employees.filter((employee) => {
      const searchFields = [employee.name, employee.phone, employee.branch, employee.rank];

      return searchTerms.every((term) =>
        searchFields.some((field) => String(field).toLowerCase().includes(term)),
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
        <button class="${styles.pageBtn} ${
        currentPage === i ? styles.active : ''
      }" data-page="${i}">
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

  template() {
    const currentEmployees = this.getCurrentPageEmployees();
    const totalEmployees = this.filterEmployees().length;
    const showPagination = totalEmployees > this.state.itemsPerPage;

    return `
      <main class="main-content">
        <header>
          <h1>직원목록</h1>
          ${this.searchBar.template()}
        </header>
        <div class="my-content green-border">
          
          <div class="${styles.tableContainer}">
            <div class="${styles.tableHeader}">
              <table class="${styles.teamTable}">
                <thead>
                  <tr>
                    <th></th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>지점</th>
                    <th>직급</th>
                    
                  </tr>
                </thead>
              </table>
            </div>
            <div class="${styles.scrollArea}">
              <table class="${styles.teamTable}">
                <tbody>
                  ${currentEmployees.map((employee) => this.renderTableRow(employee)).join('')}
                </tbody>
              </table>
            </div>
          </div>
          ${showPagination ? this.pagination.template() : ''}
        </div>
      </main>
    `;
  }

  setEvent() {
    // 검색바 이벤트
    this.searchBar.setEvent(this.target);

    // 페이지네이션 이벤트
    if (this.filterEmployees().length > this.state.itemsPerPage) {
      this.pagination = new Pagination({
        currentPage: this.state.currentPage,
        totalPages: Math.ceil(this.filterEmployees().length / this.state.itemsPerPage),
        onPageChange: (page) => {
          this.setState({ currentPage: page });
          this.updateTotalPages();
        },
      });
      this.pagination.setEvent(this.target);
    }

    // // 삭제 버튼 이벤트
    // const deleteButtons = this.target.querySelectorAll('.delete-btn');
    // deleteButtons.forEach((btn) => {
    //   btn.addEventListener('click', (e) => {
    //     const row = e.target.closest('tr');
    //     const id = Number(row.dataset.id);
    //     const newEmployees = this.state.employees.filter((emp) => emp.id !== id);
    //     this.setState({
    //       employees: newEmployees,
    //       totalPages: Math.ceil(newEmployees.length / this.state.itemsPerPage),
    //     });
    //     this.updateTotalPages();
    //   });
    // });

    // // Add 버튼 이벤트
    // const addButton = this.target.querySelector('button');
    // if (addButton) {
    //   addButton.addEventListener('click', () => {
    //     console.log('Add new employee');
    //   });
    // }
  }
}

// 앱 실행
// new ListingPage(document.querySelector('#page-container'));

export default ListingPage;
