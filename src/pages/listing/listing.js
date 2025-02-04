import styles from './listing.module.css';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import Component from '@/components/componentClass';
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
      itemsPerPage: 10, // 한 페이지당 8개로 수정
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
    const mainContent = this.target.querySelector('.main-content');
    if (!mainContent) return;

    const tableBody = mainContent.querySelector('tbody');
    if (tableBody) {
      tableBody.innerHTML = this.getCurrentPageEmployees()
        .map((employee) => this.renderTableRow(employee))
        .join('');
    }

    this.updateTotalPages(); // 페이지 수 업데이트

    const paginationContainer = mainContent.querySelector('.pagination');
    if (paginationContainer) {
      paginationContainer.innerHTML = this.pagination.template();
      this.pagination.setEvent(this.target); // 이벤트 리스너 갱신
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
    if (!searchTerm) return this.state.employees;

    if (searchTerm.startsWith('#')) {
      const branchNumber = searchTerm.slice(1);
      return this.state.employees.filter((employee) => employee.branch === branchNumber);
    }

    const searchTerms = searchTerm.split(' ').filter(Boolean);

    return this.state.employees.filter((employee) => {
      const searchFields = [employee.name, employee.phone, employee.branch, employee.rank].map(
        String,
      );
      return searchTerms.every((term) =>
        searchFields.some((field) => field.toLowerCase().includes(term)),
      );
    });
  }

  // filterEmployees() {
  //   const searchTerm = this.state.searchText.toLowerCase().trim();

  //   if (!searchTerm) {
  //     return this.state.employees;
  //   }

  //   // #으로 시작하는 검색어는 브랜치 전용 검색으로 처리
  //   if (searchTerm.startsWith('#')) {
  //     const branchNumber = searchTerm.slice(1); // # 제거
  //     if (!isNaN(branchNumber)) {
  //       return this.state.employees.filter((employee) => employee.branch === branchNumber);
  //     }
  //   }

  //   // 일반 검색어 처리
  //   const searchTerms = searchTerm.split(' ').filter((term) => term.length > 0);

  //   return this.state.employees.filter((employee) => {
  //     const searchFields = [employee.name, employee.phone, employee.branch, employee.rank];

  //     return searchTerms.every((term) =>
  //       searchFields.some((field) => String(field).toLowerCase().includes(term)),
  //     );
  //   });
  // }

  // 페이지 번호 렌더링 메서드 개선
  renderPageNumbers() {
    const { totalPages, currentPage } = this.state;
    if (totalPages <= 1) return '';

    return Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      return `<button class="page-btn ${
        currentPage === page ? 'active' : ''
      }" data-page="${page}">${page}</button>`;
    }).join('');
  }

  // 총 페이지 수 업데이트 메서드 개선
  updateTotalPages() {
    const filteredEmployees = this.filterEmployees();
    this.state.totalPages = Math.max(
      1,
      Math.ceil(filteredEmployees.length / this.state.itemsPerPage),
    );

    // 현재 페이지가 totalPages보다 크다면 마지막 페이지로 이동
    if (this.state.currentPage > this.state.totalPages) {
      this.state.currentPage = this.state.totalPages;
    }
  }
  // updateTotalPages() {
  //   // console.log('ListingPage ~ updateTotalPages ~ this.state: ', this.state);
  //   const filteredEmployees = this.filterEmployees();

  //   // 검색 결과가 8개 이하면 totalPages를 1로 설정
  //   if (filteredEmployees.length <= this.state.itemsPerPage) {
  //     this.state.totalPages = 1;
  //     this.state.currentPage = 1;
  //     return;
  //   }

  //   const newTotalPages = Math.ceil(filteredEmployees.length / this.state.itemsPerPage);

  //   // 현재 페이지가 새로운 총 페이지 수보다 크면 마지막 페이지로 이동
  //   if (this.state.currentPage > newTotalPages) {
  //     this.state.currentPage = Math.max(1, newTotalPages);
  //   }

  //   this.state.totalPages = newTotalPages;
  // }

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

  updatePagination() {
    if (this.pagination) {
      this.pagination.update({
        currentPage: this.state.currentPage,
        totalPages: Math.ceil(this.filterEmployees().length / this.state.itemsPerPage),
      });
    }
  }

  setEvent() {
    this.searchBar.setEvent(this.target);

    this.target.addEventListener('click', (event) => {
      // 페이지네이션 버튼 이벤트 처리
      const pageBtn = event.target.closest('.page-btn');
      if (pageBtn) {
        const newPage = Number(pageBtn.dataset.page);
        if (newPage && newPage !== this.state.currentPage) {
          this.setState({ currentPage: newPage });
          this.updateContent();
          this.updatePagination();
        }
      }

      // 삭제 버튼 이벤트 처리 (이벤트 위임 방식 적용)
      const deleteBtn = event.target.closest('.delete-btn');
      if (deleteBtn) {
        event.stopPropagation();
        console.log('delete-btn clicked');

        const row = deleteBtn.closest('tr');
        if (!row) return;

        const id = Number(row.dataset.userid);
        console.log('Deleting user with ID:', id);

        this.setState({
          employees: this.state.employees.filter((emp) => emp.userId !== id),
          totalPages: Math.ceil(this.filterEmployees().length / this.state.itemsPerPage),
        });

        this.updateContent();
        this.updatePagination();
      }
    });
    //프로필 페이지로 이동
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
