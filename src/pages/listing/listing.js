import styles from './listing.module.css';
import SearchBar from '@/components/searchBar';
import Pagination from '@/components/pagination';
import Component from '@/components/ComponentClass';
import { userData } from '../../data/userData';
import { handleRouting } from '@/app/router/router';

class ListingPage extends Component {
  constructor(target) {
    super(target);
    this.setup();
  }

  setup() {
    this.state = {
      employees: userData,
      searchText: '',
      currentPage: 1,
      itemsPerPage: 8, // 한 페이지당 8개로 수정
      totalPages: 0,
    };

    // console.log('ListingPage ~ setup ~ this.state: ', this.state);
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
        this.updateContent();
      },
    });

    this.pagination = new Pagination({
      currentPage: this.state.currentPage,
      totalPages: Math.ceil(this.filterEmployees().length / this.state.itemsPerPage),
      onPageChange: (page) => {
        this.setState({
          currentPage: page,
        });
        // this.updateTotalPages(); // 페이지 변경 시 총 페이지 수 업데이트
        this.updateContent();
      },
    });
  }

  updateContent() {
    console.log('ListingPage ~ updateContent!!! ~ mainContent: ');
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
    // console.log('ListingPage ~ renderTableRow ~ employee: ', employee);
    return `
      <tr data-userid="${employee.userId}">
        <td>
          <img src="${employee.profileImage}" alt="프로필" class="${styles.profileImage}">
        </td>
        <td>${employee.name}</td>
        <td>${employee.phone}</td>
        <td>${employee.branch}</td>
        <td>${employee.rank}</td>
        <td class="${styles.actions}">
          <button class="delete-btn">삭제</button>
        </td>
      </tr>
    `;
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
      console.log('ListingPage ~ # 검색');
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
    // console.log('ListingPage ~ updateTotalPages ~ this.state: ', this.state);
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
          <div class="${styles.teamHeader}">
            <button>직원등록</button>
          </div>
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
                    <th></th>
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
    // console.log(this.searchBar);

    // 페이지네이션 이벤트
    if (this.filterEmployees().length > this.state.itemsPerPage) {
      this.pagination = new Pagination({
        currentPage: this.state.currentPage,
        totalPages: Math.ceil(this.filterEmployees().length / this.state.itemsPerPage),
        onPageChange: (page) => {
          this.setState({ currentPage: page });
          this.updateTotalPages();
          this.updateContent();
        },
      });
      this.pagination.setEvent(this.target);
    }

    // 삭제 버튼 이벤트
    const deleteButtons = this.target.querySelectorAll('.delete-btn');
    deleteButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('delete-btn clicked');
        const row = e.target.closest('tr');
        // console.log('ListingPage ~ btn.addEventListener ~ row: ', row);
        const id = Number(row.dataset.userid);
        // console.log('ListingPage ~ btn.addEventListener ~ id: ', id);
        const newEmployees = this.state.employees.filter((emp) => {
          // console.log('ListingPage ~ btn.addEventListener ~ emp: ', emp.id);
          if (emp.userId !== id) {
            return emp;
          }
        });
        this.setState({
          employees: newEmployees,
          totalPages: Math.ceil(newEmployees.length / this.state.itemsPerPage),
        });
        console.log('ListingPage ~ btn.addEventListener ~ newEmployees: ', newEmployees);
        // this.updateTotalPages();
        this.updateContent();
      });
    });

    // Add 버튼 이벤트
    // const addButton = this.target.querySelector('button');
    // if (addButton) {
    //   addButton.addEventListener('click', () => {
    //     console.log('Add new employee');
    //   });
    // }

    //프로필 페이지 이동
    const profileSections = document.querySelectorAll('tr');
    profileSections.forEach((profileSection) => {
      profileSection.addEventListener('click', (e) => {
        // console.log('tr', e.target.parentElement.dataset.userid);
        const currentUserId = e.target.parentElement.dataset.userid;
        // 세션 스토리지에 사용자 데이터 저장
        sessionStorage.setItem('currentUser', JSON.stringify(currentUserId));
        window.history.pushState({}, '', '/profile');
        handleRouting();
      });
    });
  }
}

export default ListingPage;
