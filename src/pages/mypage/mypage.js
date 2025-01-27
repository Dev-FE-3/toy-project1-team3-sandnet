import styles from './mypage.module.css';
// import ProfilePage from '../profile/profile.js';
import Component from '@/components/ComponentClass';
import { userData } from '../../data/userData';

class MyPage extends Component {
  constructor(target) {
    super(target);
    //this.profilePage = new ProfilePage(target);
    this.setup();
    this.setEvent();
    this.setState();
  }

  render() {
    this.target.innerHTML = this.template();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    // this.render();
    // this.setEvent();
  }

  setup() {
    // 세션 스토리지에서 현재 선택된 사용자 가져오기
    const selectedUser = sessionStorage.getItem('currentUser') || 'user1';
    console.log('Selected User:', selectedUser); // 어떤 값이 저장되었는지 확인

    // 선택된 사용자 ID에 맞는 숫자로 변환
    const userId = parseInt(selectedUser.replace('user', ''), 10);
    console.log('User ID:', userId); // 변환된 숫자 확인

    // userData에서 해당 ID의 사용자 찾기
    const user = userData.find((user) => user.userId === userId) || userData[0];
    console.log('Found User:', user); // 찾아진 사용자 확인

    //const profileData = this.profilePage.getProfileData();

    this.state = {
      attendance: [], // 근태 내역
      writer: user.name, // 작성자
      user,

      workStartTime: null, // 근무 시작 시간
      workEndTime: null, // 근무 종료 시간
      isWorking: false, // 근무 중 여부
    };
  }

  template() {
    const { attendance, user, writer, workStartTime, workEndTime, isWorking } = this.state;
    console.log('MyPage ~ template ~ workStartTime: ', workStartTime);

    return `
    <main class="main-content">
      <header>
        <h1>마이 페이지</h1>
      </header>
      <div class="my-content green-border">
        <div class="${styles.wrapper}">
          <!-- 프로필 -->
          <div class="${styles.gridItem} ${styles.section}">
            <p class="${styles.sectionTitle}">프로필</p>
            <!-- 프로필 이미지, 정보 -->
            <div class="${styles.profileContainer}">
              <div class="${styles.profileImageName}">
                <img
                  class="${styles.myprofileImage}"
                  src="${user.profileImage}"
                  alt="사용자 프로필 이미지"
                />
                <div class="${styles.profileName}">${user.name}</div>
              </div>
              <div>
                <ul class="${styles.profileInfo}">
                  <li>
                    <span class="${styles.materialIcons} material-icons">phone</span>${user.phone}
                  </li>
                  <li>
                    <span class="${styles.materialIcons} material-icons">work</span>${user.jobTitle}
                  </li>
                  <li>
                    <span class="${styles.materialIcons} material-icons">email</span>${user.email}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 시간관리 -->
          <div class="${styles.gridItem} ${styles.section} ${styles.timeManagementSection}">
            <div class="${styles.currentTime}">
              <p>현재시각</p>
              <div class="${styles.currentTimeValue}">
                <span>-</span>:<span>-</span>:<span>-</span>
              </div>
            </div>
            <ul class="${styles.workTimeList}">
              <li class="${styles.workTimeItem}">
                <p class="${styles.timeLabel}">근무 시작</p>
                <p class="${styles.timeValue} work-start-time">${workStartTime || '-'}</p>
              </li>
              <li class="${styles.workTimeItem}">
                <p class="${styles.timeLabel}">근무 종료</p>
                <p class="${styles.timeValue} work-end-time">${workEndTime || '-'}</p>
              </li>
            </ul>
            <button data-modal-type='workBtnModal' class="commonModal ${styles.modalTrigger} ${styles.btn} ${styles.workBtn}" id="workBtn">
              <p class="work-btn-text">${isWorking ? '근무 종료' : '근무 시작'}</p>
            </button>
          </div>

          <!-- 근태관리 -->
          <div class="${styles.gridItem} ${styles.section} ${styles.attendanceSection}">
            <div class="${styles.attendanceListSection} ${styles.section}">
              <p class="${styles.sectionTitle}">근태 목록</p>
              <select class="${styles.attendanceListSelect} ${styles.attendanceTypeSelect}">
                <option value="all">전체</option>
                <option value="vacation">휴가</option>
                <option value="sick">병가</option>
                <option value="early">조퇴</option>
                <option value="other">기타</option>
              </select>
              <div class="${styles.attendanceHeader}">
                <div class="${styles.headerItem} ${styles.profileImage} ${user.profileImage}"></div>
                <div class="${styles.headerItem} ${user.name}">작성자</div>
                <div class="${styles.headerItem} ${styles.type}">종류</div>
                <div class="${styles.headerItem} ${styles.date}">일자</div>
                <div class="${styles.headerItem} ${styles.applyDate}">신청일</div>
              </div>
              <div class="${styles.attendanceList} attendance-list"></div>
            </div>
            <!-- 근태신청버튼 -->
            <button
              data-modal-type="addAttendanceBtnModal"
              class="commonModal ${styles.addAttendanceBtn} ${styles.btn} ${styles.modalTrigger}"
              id="addAttendanceBtn">
              <p>+</p>
            </button>
          </div>
        </div>
      </div>
    </main>

     <!-- modal -->
      <div class="${styles.modal}">
        <!-- insert workBtnModal, attendanceBtnModal -->
      </div>
    `;
  }

  setEvent() {
    this.initTimeUpdate();
    this.initWorkManagement();
    this.initAddAttendanceManagement();
    this.initAttendanceManagement();

    document.querySelectorAll(`.commonModal`).forEach((modal) => {
      modal.addEventListener('click', (e) => {
        const clickedElement = e.target.closest('[data-modal-type]'); // 가장 가까운 data-modal-type 속성을 가진 상위 요소 찾기
        if (!clickedElement) return; // 해당 요소가 없으면 종료

        e.stopPropagation();
        const modalType = clickedElement.getAttribute('data-modal-type');
        this.commonModalController(modalType);
      });
    });

    // 근무 시작/종료 버튼 클릭 이벤트 추가
    const workBtn = document.getElementById('workBtn');
    if (workBtn) {
      workBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modalType = clickedElement.getAttribute('data-modal-type');
        this.commonModalController(modalType);
      });
    }

    // 근무 시작/종료 버튼 클릭 이벤트 추가
    // const workBtn = document.getElementById('workBtn');
    // const addAttendanceBtn = document.getElementById('addAttendanceBtn');

    // if (workBtn) {
    //   workBtn.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     this.commonModalController(e.target.getAttribute('data-modal-type'));
    //   });
    // }
  }

  commonModalController(modalType) {
    const modal = document.querySelector(`.${styles.modal}`);

    if (!modal) return;

    // 모달 활성화
    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';

    const workBtnModalHTML = `
      <span class="${styles.close}">&times;</span>
      <h2 class="${styles.currentTimeTitle}">현재시각</h2>
      <div class="${styles.currentTimeValue}">
        <span>-</span>:<span>-</span>:<span>-</span>
      </div>
      <p class="${styles.workStartQuestion}">근무를 ${
      this.state.isWorking ? '종료' : '시작'
    }하시겠습니까?</p>
      <div class="${styles.modalButtons}">
        <button class="${styles.confirmBtn}">확인</button>
        <button class="${styles.cancelBtn}">취소</button>
      </div>
    `;

    const addAttendanceBtnModalHTML = `
        <button class="${styles.close}">&times;</button>
        <div class="${styles.addAttendanceForm}">
          <h2>근태 신청</h2>
          <div class="${styles.attendanceTypeButtons}">
            <button value="vacation" class="${styles.typeBtn}">휴가</button>
            <button value="sick" class="${styles.typeBtn}">병가</button>
            <button value="early" class="${styles.typeBtn}">조퇴</button>
            <button value="other" class="${styles.typeBtn}">기타</button>
          </div>
          <div class="${styles.addAttendanceForm}">
            <div class="${styles.datePickerContainer}">
              <label for="start-date">시작일</label>
              <input type="date" id="start-date" class="${styles.datePicker}" />

              <label for="end-date">종료일</label>
              <input type="date" id="end-date" class="${styles.datePicker}" />
            </div>
            <button class="${styles.submitBtn}">신청</button>
          </div>
        </div>
    `;

    if (modalType === 'workBtnModal') {
      // 모달 콘텐츠 기본 설정 및 콘텐츠 준비
      const modalContent = document.createElement('div');
      modal.classList.add(`${styles.workBtnModal}`);
      modalContent.className = `${styles.modalContent}`;
      modalContent.innerHTML = workBtnModalHTML;

      // View
      this.setModalContent(modal, modalContent);

      // Event
      // 시간 업데이트
      this.initTimeUpdate();

      // 모달 닫기 버튼
      const modalCloseBtn = modal.querySelector(`.${styles.close}`);
      if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
          this.closeModal(modal);
        });

        // 모달 외부 클릭 시 모달 닫기
        window.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closeModal(modal);
          }
        });

        // 확인 버튼
        const confirmBtn = modal.querySelector(`.${styles.confirmBtn}`);
        if (confirmBtn) {
          confirmBtn.addEventListener('click', () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;

            if (!this.state.isWorking) {
              // 근무 시작
              this.setState({
                workStartTime: currentTime,
                workEndTime: null,
                isWorking: true,
                test: true,
              });

              document.querySelector('.work-start-time').textContent = currentTime;
            } else {
              // 근무 종료
              this.setState({
                workEndTime: currentTime,
                isWorking: false,
              });
              document.querySelector('.work-end-time').textContent = currentTime;
              // document.querySelector(".work-btn-text").textContent = this.state.isWorking ? "근무 시작" : "근무 종료";
            }

            this.updateWorkUI();
            this.closeModal(modal);
          });

          // 취소 버튼
          const cancelBtn = modal.querySelector(`.${styles.cancelBtn}`);
          if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
              this.closeModal(modal);
            });
          }
        }
      }
      return;
    }
    if (modalType === 'addAttendanceBtnModal') {
      const modalContent = document.createElement('div');
      modal.classList.add(`${styles.addAttendanceBtnModal}`);
      modalContent.className = `${styles.modalContent}`;
      modalContent.innerHTML = addAttendanceBtnModalHTML;

      // 기존 모달 초기화 및 새 모달콘텐츠 추가
      this.setModalContent(modal, modalContent);

      // 모달 닫기 버튼
      const modalCloseBtn = modal.querySelector(`.${styles.close}`);
      if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
          this.closeModal(modal);
        });

        // 모달 외부 클릭 시 모달 닫기
        window.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closeModal(modal);
          }
        });
      }

      this.initAddAttendanceManagement();
      this.initAttendanceManagement();
    }
  }

  // 모달 콘텐츠 삽입
  setModalContent(modal, modalContent) {
    if (modal.firstChild) {
      modal.replaceChild(modalContent, modal.firstChild);
    } else {
      modal.appendChild(modalContent);
    }
  }

  // 근무 시작/종료 UI 업데이트
  updateWorkUI() {
    const workQuestion = document.querySelector(`.${styles.workStartQuestion}`);
    const workBtnText = document.querySelector('.work-btn-text');

    workQuestion.textContent = this.state.isWorking
      ? '근무를 종료하시겠습니까?'
      : '근무를 시작하시겠습니까?';
    workBtnText.textContent = this.state.isWorking ? '근무 종료' : '근무 시작';
  }

  // 모달 닫기
  closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // 시간 업데이트 초기화
  initTimeUpdate() {
    const currentTimeElements = document.querySelectorAll(`.${styles.currentTimeValue}`);
    if (!currentTimeElements.length) return;

    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      currentTimeElements.forEach((element) => {
        const spans = element.querySelectorAll('span');
        if (spans.length === 3) {
          spans[0].textContent = hours;
          spans[1].textContent = minutes;
          spans[2].textContent = seconds;
        }
      });
    };

    updateTime();
    setInterval(updateTime, 500);
  }

  // 근무 시작/종료 관리
  initWorkManagement() {
    const workBtnModal = document.querySelector(`.${styles.workBtnModal}`);
    if (!workBtnModal) return;
    console.log('MyPage ~ initWorkManagement ~ workBtnModal: ', workBtnModal);

    // 확인 버튼 이벤트
    const confirmBtn = workBtnModal.querySelector(`.${styles.confirmBtn}`);
    const cancelBtn = workBtnModal.querySelector(`.${styles.cancelBtn}`);
    // console.log("MyPage ~ initWorkManagement ~ confirmBtn: ", confirmBtn)

    if (confirmBtn) {
      console.log('MyPage ~ initWorkManagement ~ confirmBtn: ', confirmBtn);
      confirmBtn.addEventListener('click', () => {
        console.log('MyPage ~ initWorkManagement ~ confirmBtn: 클릭!!!!!!!');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;

        if (!this.state.isWorking) {
          this.setState({
            workStartTime: currentTime,
            workEndTime: null,
            isWorking: true,
            test: true,
          });

          document.querySelector('.work-start-time').textContent = currentTime;
        } else {
          this.setState({
            workEndTime: currentTime,
            isWorking: false,
          });
          document.querySelector('.work-end-time').textContent = currentTime;
          // document.querySelector(".work-btn-text").textContent = this.state.isWorking ? "근무 시작" : "근무 종료";
        }

        document.querySelector(`.${styles.workStartQuestion}`).textContent = this.state.isWorking
          ? '근무를 종료하시겠습니까?'
          : '근무를 시작하시겠습니까?';
        document.querySelector('.work-btn-text').textContent = this.state.isWorking
          ? '근무 종료'
          : '근무 시작';
        workBtnModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        workBtnModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  }

  // 근태 관리
  initAddAttendanceManagement() {
    const addAttendanceBtn = document.querySelector(`.${styles.addAttendanceBtn}`);
    const addAttendanceModal = document.querySelector(`.${styles.addAttendanceBtnModal}`);
    if (!addAttendanceBtn || !addAttendanceModal) return;

    // 근태 유형 버튼 이벤트
    const typeButtons = addAttendanceModal.querySelectorAll(`.${styles.typeBtn}`);
    typeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        // 모든 버튼의 선택 상태를 먼저 제거
        typeButtons.forEach((btn) => btn.classList.remove(`${styles.selected}`));
        // 클릭한 버튼만 선택 상태로 변경
        e.target.classList.add(`${styles.selected}`);
        this.state.selectedAttendanceType = e.target.value;
      });
    });

    // 신청 버튼 이벤트
    const submitBtn = addAttendanceModal.querySelector(`.${styles.submitBtn}`);
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const startDate = document.querySelector('#start-date').value;
        const endDate = document.querySelector('#end-date').value;
        // 근태 유형(연차, 반차 등)이 선택되지 않았거나
        // 시작일이 선택되지 않았을 때 알림 메시지 출력
        if (!this.state.selectedAttendanceType || !startDate) {
          alert('근태 유형과 날짜를 선택해주세요.');
          return; // 함수 종료
        }

        // 새로운 근태 추가
        const newAttendance = {
          writer: `${this.state.writer}`,
          id: this.state.attendance.length + 1,
          type: this.state.selectedAttendanceType,
          date: this.formatDate(startDate, endDate),
          applyDate: this.formatDate(new Date()),
        };

        // 상태 업데이트
        this.setState({
          attendance: [...this.state.attendance, newAttendance],
        });

        this.renderAttendanceList(this.state.attendance);

        //초기화
        document.querySelector('#start-date').value = '';
        document.querySelector('#end-date').value = '';
        typeButtons.forEach((btn) => btn.classList.remove(`${styles.selected}`));
        //모달 닫기
        this.closeModal(addAttendanceModal);
      });
    }

    const modalClose = addAttendanceModal.querySelector(`.${styles.close}`);
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        typeButtons.forEach((btn) => btn.classList.remove(styles.selected)); // 상태 초기화
      });
    }

    window.addEventListener('click', (e) => {
      if (e.target === addAttendanceModal) {
        typeButtons.forEach((btn) => btn.classList.remove(styles.selected)); // 상태 초기화
      }
    });
  }

  initAttendanceManagement() {
    this.AttendanceFilter();
  }
  AttendanceFilter() {
    const attendanceTypeSelect = document.querySelector(`.${styles.attendanceTypeSelect}`);
    if (attendanceTypeSelect) {
      attendanceTypeSelect.addEventListener('change', (e) => {
        this.filterAttendance(e.target.value);
      });
    }
  }
  // 근태 목록을 출력하는 함수
  renderAttendanceList(attendance) {
    const attendanceListElements = document.querySelectorAll('.attendance-list');
    attendanceListElements.forEach((attendanceListElement) => {
      attendanceListElement.innerHTML = attendance
        .slice()
        .reverse()
        .map(
          (item) => `
            <div class="${styles.attendanceItem}">
              <div class="${styles.itemContent} ${styles.profileImage}">
                  <img src="${this.state.user.profileImage}" alt="프로필 이미지"/>
                  </div>
              <div class="${styles.itemContent} ${styles.writer}">${item.writer}</div>
              <div class="${styles.itemContent} ${styles.type}">
                ${
                  document.querySelector(
                    `.${styles.attendanceTypeSelect} option[value="${item.type}"]`,
                  )?.textContent || item.type
                }
              </div>
              <div class="${styles.itemContent} ${styles.date}">${item.date}</div>
              <div class="${styles.itemContent} ${styles.applyDate}">${item.applyDate}</div>
            </div>
          `,
        )
        .join('');
    });
  }

  // 필터링 함수
  filterAttendance(selectedType) {
    const filteredAttendance = this.state.attendance.filter((item) => {
      return selectedType === 'all' || item.type === selectedType;
    });

    this.renderAttendanceList(filteredAttendance);
  }

  formatDate(startDate, endDate) {
    const start = new Date(startDate);
    const startYear = start.getFullYear().toString().slice(-2);
    const startMonth = (start.getMonth() + 1).toString().padStart(2, '0');
    const startDay = start.getDate().toString().padStart(2, '0');

    if (!endDate) {
      return `${startYear}.${startMonth}.${startDay}`;
    }

    const end = new Date(endDate);
    const endYear = end.getFullYear().toString().slice(-2);
    const endMonth = (end.getMonth() + 1).toString().padStart(2, '0');
    const endDay = end.getDate().toString().padStart(2, '0');

    if (startDate === endDate) {
      return `${startYear}.${startMonth}.${startDay}`;
    }
    return `${startYear}.${startMonth}.${startDay}~${endYear}.${endMonth}.${endDay}`;
  }
}

// 앱 실행
// new MyPage(document.querySelector("#app"));

export default MyPage;
