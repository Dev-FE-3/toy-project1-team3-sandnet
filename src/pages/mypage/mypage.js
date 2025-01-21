import "../../../reset.css";
import "../../styles/global.css";
import "../../styles/variables.css";
import "./mypage.css";

class Component {
  constructor(target) {
    this.target = target;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}
  template() {
    return "";
  }
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

class MyPage extends Component {
  setup() {
    this.state = {
      attendance: [], // 근태 내역
      writer: "장은혜", // 작성자

      workStartTime: null, // 근무 시작 시간
      workEndTime: null, // 근무 종료 시간
      isWorking: false, // 근무 중 여부
    };
  }

  template() {
    const { attendance, writer, workStartTime, workEndTime, isWorking } =
      this.state;

    return `
    <div class="page-container">
      <div class="sidebar"></div> <!-- 사이드바 -->
      <main class="content">
        <header>
          <h1>마이 페이지</h1>
        </header>
      <div class = "wrapper">
        <!-- 프로필 -->
        <div class="grid-item section profile-section modal-trigger">
          <p class="section-title">프로필</p>
          <!-- 프로필 이미지, 정보 -->
        </div>

        <!-- 시간관리 -->
        <div class="grid-item section time-management-section">
          <div class="current-time">
            <p>현재시각</p>
            <p class="current-time-value">--:--</p>
          </div>
          <ul class="work-time-list">
            <li class="work-time-item">
              <!-- 근무 시작 시간 -->
              <p class="time-label">근무 시작</p>
              <p class="time-value">${workStartTime || "-"}</p>
            </li>
            <li class="work-time-item">
              <!-- 근무 종료 시간 -->
              <p class="time-label">근무 종료</p>
              <p class="time-value">${workEndTime || "-"}</p>
            </li>
          </ul>
          <!-- 근무 시작 버튼 -->
          <button class="modal-trigger btn work-btn" id="work-btn">
            <p>${isWorking ? "근무 종료" : "근무 시작"}</p>
          </button>
        </div>

        <!-- 근태관리 -->
        <div class="grid-item section attendance-section">
          <!-- 근태 신청 내역 -->
          <div class="attendance-list-section section modal-trigger">
          <p class="section-title">근태 내역</p>
            <div class="attendance-header">
              <div class="header-item title">제목</div>
              <div class="header-item type">종류</div>
              <div class="header-item date">일자</div>
              <div class="header-item writer">작성자</div>
            </div>
            <div class="attendance-list">
              ${attendance
                .map(
                  (item) => `
                <div class="attendance-item">
                  <div class="profile-circle"></div>
                  <div class="item-content title">${item.title}</div>
                  <div class="item-content type">${item.type}</div>
                  <div class="item-content date">${item.date}</div>
                  <div class="item-content writer">${item.writer}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          <!-- 근태신청버튼 -->
          <button class="add-attendance-btn btn modal-trigger">
            <p>+</p>
          </button>
      </main>

      <!-- 모달들을 여기로 이동 -->
      <!-- 프로필모달 -->
     

      <!-- 근무모달 -->
      <div class="modal work-btn-modal">
        <div class="modal-content .work-btn-modal">
          <span class="close">&times;</span>
          <!-- 모달 내용 -->
          <h2 class="current-time-title">현재시각</h2>
          <p class="current-time-value">--:--</p>
          <p class="work-start-question">근무를 ${
            this.state.isWorking ? "종료" : "시작"
          }하시겠습니까?</p>
          <div class="modal-buttons">
            <button class="confirm-btn">확인</button>
            <button class="cancel-btn">취소</button>
          </div>
        </div>
      </div>

      <!-- 근태모달 -->
      <div class="modal attendance-modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="attendance-list">
            <div class="modal-header">
              <h2>근태 목록</h2>
            </div>
            <div class="attendance-list-container">
              <div class="list-header">
                <span class="header-item title">제목</span>
                <span class="header-item type">종류</span>
                <span class="header-item writer">작성자</span>
              </div>

            <div class="attendance-list">
              ${attendance
                .map(
                  (item) => `
                <div class="attendance-item">
                  <div class="profile-circle"></div>
                  <div class="item-content title">${item.title}</div>
                  <div class="item-content type">${item.type}</div>
                  <div class="item-content date">${item.date}</div>
                  <div class="item-content writer">${item.writer}</div>
                </div>
              `
                )
                .join("")}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 근태신청모달 -->
      <div class="modal add-attendance-btn-modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="attendance-form">
            <h2>근태 신청</h2>
            <div class="attendance-type-buttons">
              <button class="type-btn">연차</button>
              <button class="type-btn">반차</button>
              <button class="type-btn">조퇴</button>
              <button class="type-btn">기타</button>
            </div>
            <div class="attendance-form">
              <div class="date-picker-container">
                <label for="start-date">시작일</label>
                <input type="date" id="start-date" class="date-picker" />

                <label for="end-date">종료일</label>
                <input type="date" id="end-date" class="date-picker" />
              </div>
              <button class="submit-btn">신청</button>
            
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.initModals();
    this.initTimeUpdate();
    this.initWorkManagement();
    this.initAttendanceManagement();
  }

  // 모달 초기화
  initModals() {
    const modals = {
      profile: {
        trigger: document.querySelector(".profile-section"),
        modal: document.querySelector(".profile-modal"),
      },
      workBtn: {
        trigger: document.querySelector("#work-btn"),
        modal: document.querySelector(".work-btn-modal"),
      },
      attendance: {
        trigger: document.querySelector(".attendance-list-section"),
        modal: document.querySelector(".attendance-modal"),
      },
      addAttendance: {
        trigger: document.querySelector(".add-attendance-btn"),
        modal: document.querySelector(".add-attendance-btn-modal"),
      },
    };

    Object.values(modals).forEach(({ trigger, modal }) => {
      if (!trigger || !modal) return;
      const closeBtn = modal.querySelector(".close");

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        });
      }

      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    });
  }

  // 시간 업데이트 초기화
  initTimeUpdate() {
    const currentTimeElements = document.querySelectorAll(
      ".current-time-value"
    );
    if (!currentTimeElements.length) return;

    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const timeString = `${hours}:${minutes}:${seconds}`;

      // NodeList의 각 요소를 순회하면서 시간을 업데이트
      currentTimeElements.forEach((element) => {
        element.textContent = timeString;
      });
    };

    updateTime();
    setInterval(updateTime, 500);
  }

  // 근무 시작/종료 관리
  initWorkManagement() {
    const workBtnModal = document.querySelector(".work-btn-modal");
    if (!workBtnModal) return;

    // 확인 버튼 이벤트
    const confirmBtn = workBtnModal.querySelector(".confirm-btn");
    const cancelBtn = workBtnModal.querySelector(".cancel-btn");

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const currentTime = `${hours}:${minutes}`;

        if (!this.state.isWorking) {
          this.setState({
            workStartTime: currentTime,
            workEndTime: null,
            isWorking: true,
          });
        } else {
          this.setState({
            workEndTime: currentTime,
            isWorking: false,
          });
        }
        workBtnModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        workBtnModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  }

  // 근태 관리
  initAttendanceManagement() {
    const addAttendanceBtn = document.querySelector(".add-attendance-btn");
    const addAttendanceModal = document.querySelector(
      ".add-attendance-btn-modal"
    );
    if (!addAttendanceBtn || !addAttendanceModal) return;

    // 근태 유형 버튼 이벤트
    const typeButtons = addAttendanceModal.querySelectorAll(".type-btn");
    typeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // 모든 버튼의 선택 상태를 먼저 제거
        typeButtons.forEach((btn) => btn.classList.remove("selected"));
        // 클릭한 버튼만 선택 상태로 변경
        e.target.classList.add("selected");
        this.state.selectedAttendanceType = e.target.textContent;
      });
    });

    // 신청 버튼 이벤트
    const submitBtn = addAttendanceModal.querySelector(".submit-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const startDate = document.querySelector("#start-date").value;
        const endDate = document.querySelector("#end-date").value;
        // 근태 유형(연차, 반차 등)이 선택되지 않았거나
        // 시작일이 선택되지 않았을 때 알림 메시지 출력
        if (!this.state.selectedAttendanceType || !startDate) {
          alert("근태 유형과 날짜를 선택해주세요.");
          return; // 함수 종료
        }

        // 새로운 근태 추가
        const newAttendance = {
          id: this.state.attendance.length + 1,
          title: `${this.state.selectedAttendanceType} 신청합니다`,
          type: this.state.selectedAttendanceType,
          date: this.formatDate(startDate, endDate),
          writer: `${this.state.writer}`,
        };

        // 상태 업데이트
        this.setState({
          attendance: [...this.state.attendance, newAttendance],
        });

        // 모달 닫기 및 초기화
        addAttendanceModal.style.display = "none";
        document.querySelector("#start-date").value = "";
        document.querySelector("#end-date").value = "";
        typeButtons.forEach((btn) => btn.classList.remove("selected"));
      });
    }
  }

  formatDate(startDate, endDate) {
    const start = new Date(startDate);
    const startMonth = start.getMonth() + 1;
    const startDay = start.getDate();

    if (!endDate) {
      return `${startMonth}/${startDay}`;
    }

    const end = new Date(endDate);
    const endMonth = end.getMonth() + 1;
    const endDay = end.getDate();

    if (startMonth === endMonth) {
      return `${startMonth}/${startDay}~${endDay}`;
    }
    return `${startMonth}/${startDay}~${endMonth}/${endDay}`;
  }
}

// 앱 실행
new MyPage(document.querySelector("#app"));

export default MyPage;
