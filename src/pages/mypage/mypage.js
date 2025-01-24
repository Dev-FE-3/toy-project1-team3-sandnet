import styles from './mypage.module.css';
// import ProfilePage from '../profile/profile.js';
import Component from '@/components/ComponentClass';

class MyPage extends Component {
  constructor(target) {
    super(target);
    //this.profilePage = new ProfilePage(target);
    this.setup();
    // this.setEvent();
    this.setState();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  setup() {
    //const profileData = this.profilePage.getProfileData();

    this.state = {
      attendance: [], // 근태 내역
      writer: '장은혜', // 작성자

      workStartTime: null, // 근무 시작 시간
      workEndTime: null, // 근무 종료 시간
      isWorking: false, // 근무 중 여부
    };
  }

  template() {
    const { attendance, writer, workStartTime, workEndTime, isWorking } = this.state;
    console.log('MyPage ~ template ~ workStartTime: ', workStartTime);

    return `
      <main class="main-content">
        <header>
          <h1>마이 페이지</h1>
        </header>
        <div class="my-content green-border">
      <div class = "${styles.wrapper}">
        <!-- 프로필 -->
        <div class="${styles.gridItem} ${styles.section} ${styles.profileSection} ${
      styles.modalTrigger
    }">
          <p class="${styles.sectionTitle}">프로필</p>
          <!-- 프로필 이미지, 정보 -->
          <div class="${styles.profileContainer}">
            <div class="${styles.profileImageName}">
              <img class="${styles.myprofileImage}" src="" alt="사용자 프로필 이미지"></img>
              <div class="${styles.profileName}"></div>
            </div>
            <div>
              <ul class="${styles.profileInfo}">
                <li><span class="${styles.materialIcons} material-icons">phone</span></li>
                <li><span class="${styles.materialIcons} material-icons">work</span></li>
                <li><span class="${styles.materialIcons} material-icons">email</span></li>
                
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
              <!-- 근무 시작 시간 -->
              <p class="${styles.timeLabel}">근무 시작</p>
              <p class="${styles.timeValue} work-start-time">${workStartTime || '-'}</p>
            </li>
            <li class="${styles.workTimeItem}">
              <!-- 근무 종료 시간 -->
              <p class="${styles.timeLabel}">근무 종료</p>
              <p class="${styles.timeValue} work-end-time">${workEndTime || '-'}</p>
            </li>
          </ul>
          <!-- 근무 시작 버튼 -->
          <button data-modal-type='workBtnModal' class="commonModal ${styles.modalTrigger} ${
      styles.btn
    } ${styles.workBtn}" id="workBtn">
            <p class="work-btn-text" data-modal-type='workBtnModal'>${
              isWorking ? '근무 종료' : '근무 시작'
            }</p>
          </button>
        </div>

        <!-- 근태관리 -->
        <div class="${styles.gridItem} ${styles.section} ${styles.attendanceSection}">
          <!-- 근태 신청 내역 -->
          <div class="${styles.attendanceListSection} ${styles.section} ${styles.modalTrigger}">
          <p class="${styles.sectionTitle}">근태 목록</p>
          <select class="${styles.attendanceListSelect} ${styles.attendanceTypeSelect}">
              <option value="all">전체</option>
              <option value="vacation">연차</option>
              <option value="halfday">반차</option>
              <option value="early">조퇴</option>
              <option value="other">기타</option>
            </select>
            <div class="${styles.attendanceHeader}">
            <div class="${styles.headerItem} ${styles.profileImage}"></div>
            <div class="${styles.headerItem} ${styles.writer}">작성자</div>
            <div class="${styles.headerItem} ${styles.type}">종류</div>
            <div class="${styles.headerItem} ${styles.date}">일자</div>
            <div class="${styles.headerItem} ${styles.applyDate}">신청일</div>
            </div>
            <div class="${styles.attendanceList} attendance-list">
            </div>
          </div>
          <!-- 근태신청버튼 -->
          <button class="${styles.addAttendanceBtn} ${styles.btn} ${styles.modalTrigger}">
            <p>+</p>
          </button>
      </main>
     
      <!-- modal -->
      <div class="${styles.modal}">
        <!-- insert workBtnModal, attendanceBtnModal -->
      </div>

      <!-- 근태모달 -->
      <div class="${styles.modal} ${styles.attendanceModal}">
        <div class="${styles.modalContent}">
          <button class="${styles.close}">&times;</button>
          <div class="${styles.attendanceList}">
            <h2>근태 목록</h2>
            <select class="${styles.attendanceList} ${styles.attendanceTypeSelect}">
              <option value="all">전체</option>
              <option value="vacation">연차</option>
              <option value="halfday">반차</option>
              <option value="early">조퇴</option>
              <option value="other">기타</option>
            </select>
            <div class="${styles.attendanceList} ${styles.attendanceListContainer}">
              <div class="${styles.listHeader}">
                <span class="${styles.headerItem} ${styles.writer}">작성자</span>
                <span class="${styles.headerItem} ${styles.type}">종류</span>
                <span class="${styles.headerItem} ${styles.date}">일자</span>
                <span class="${styles.headerItem} ${styles.applyDate}">신청일</span>
              </div>

            <div class="${styles.attendanceList} attendance-list">
              ${attendance
                .slice() // 원본 배열을 변경하지 않기 위해 복사본을 생성
                .reverse() // 배열을 역순으로 뒤집음
                .map(
                  (item) => `
                <div class="${styles.attendanceItem}">
                  <div class="${styles.itemContent} ${styles.profileImage}">
                  <img src="src/assets/images/profile.jpg" alt="프로필 이미지"/>
                  </div>
                  <div class="${styles.itemContent} ${styles.writer}">${item.writer}</div>
                  <div class="${styles.itemContent} ${styles.type}">${item.type}</div>
                  <div class="${styles.itemContent} ${styles.date}">${item.date}</div>
                  <div class="${styles.itemContent} ${styles.applyDate}">${item.applyDate}</div>
                </div>
              `,
                )
                .join('')}
              </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    
    `;
  }

  setEvent() {
    this.initTimeUpdate();
    this.initWorkManagement();
    this.initAddAttendanceManagement();
    this.initAttendanceManagement();

    //프로필 클릭 시 페이지 이동
    const profileSection = document.querySelector(`.${styles.profileSection}`);
    if (profileSection) {
      profileSection.addEventListener('click', () => {
        window.location.href = '/profile';
        handleRouting();
      });
    }

    // document.querySelector(`.commonModal`).addEventListener('click', (e) => {
    //   e.stopPropagation();
    //   console.log(
    //     'MyPage ~ document.querySelector ~ e: ',
    //     e.target.getAttribute('data-modal-type'),
    //   );

    //   this.commonModalController('workBtnModal');
    // });
    // console.log('MyPage ~ setEvent ~ commonModal: ', commonModal);

    // 근무 시작/종료 버튼 클릭 이벤트 추가
    const workBtn = document.getElementById('workBtn');
    if (workBtn) {
      workBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // console.log('workBtn', e.target.getAttribute('data-modal-type'));
        this.commonModalController(e.target.getAttribute('data-modal-type'));
      });
    }
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

    const attendanceBtnModalHTML = `
      <div class="${styles.modalContent}">
        <button class="${styles.close}">&times;</button>
        <div class="${styles.addAttendanceForm}">
          <h2>근태 신청</h2>
          <div class="${styles.attendanceTypeButtons}">
            <button value="vacation" class="${styles.typeBtn}">연차</button>
            <button value="halfday" class="${styles.typeBtn}">반차</button>
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
    } else if (modalType === 'attendanceBtnModal') {
      document.querySelector(`.${styles.addAttendanceBtnModal}`);

      const modalContent = document.createElement('div');
      modalContent.className = `${styles.modalContent}`;
      modalContent.innerHTML = attendanceBtnModalHTML;

      // 기존 모달 초기화 및 새 모달콘텐츠 추가
      this.setModalContent(modal, modalContent);
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
    // console.log('MyPage ~ 근무 시작');

    const workBtnModal = document.querySelector(`.${styles.workBtnModal}`);
    if (!workBtnModal) return;
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

        // 모달 닫기 및 초기화
        // addAttendanceModal.style.display = 'none';
        document.querySelector('#start-date').value = '';
        document.querySelector('#end-date').value = '';
        typeButtons.forEach((btn) => btn.classList.remove(`${styles.selected}`));
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
                  <img src="src/assets/images/profile.jpg" alt="프로필 이미지"/>
                  </div>
              <div class="${styles.itemContent} ${styles.writer}">${item.writer}</div>
              <div class="${styles.itemContent} ${styles.type}">${this.getTypeInKorean(
            item.type,
          )}</div>
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

  getTypeInKorean(type) {
    const typeMap = {
      vacation: '연차',
      halfday: '반차',
      early: '조퇴',
      other: '기타',
    };
    return typeMap[type] || type;
  }
}

// 앱 실행
// new MyPage(document.querySelector("#app"));

export default MyPage;
