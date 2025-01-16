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
      attendance: [
        {
          id: 1,
          title: "연차 신청합니다",
          type: "연차",
          date: "1/10",
          writer: "장은혜",
        },
        // 더 많은 데이터...
      ],
      searchText: "",
      currentPage: 1,
    };
  }

  template() {
    const { attendance } = this.state;

    return `
    <div class="mypage">
      <main class="wrapper">
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
              <p class="time-value">-</p>
            </li>
            <li class="work-time-item">
              <!-- 근무 종료 시간 -->
              <p class="time-label">근무 종료</p>
              <p class="time-value">-</p>
            </li>
          </ul>
          <!-- 근무 시작 버튼 -->
          <button class="modal-trigger btn work-btn" id="work-btn">
            <p>근무 시작</p>
          </button>
        </div>

        <!-- 근태관리 -->
        <div class="grid-item section attendance-section">
          <!-- 근태 신청 내역 -->
          <div class="attendance-list-section modal-trigger">
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
            </p>+</p>
          </button>
      </main>

      <!-- 모달들을 여기로 이동 -->
      <div class="modal profile-modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>프로필 정보</h2>
          <!-- 모달 내용 -->
        </div>
      </div>

      <div class="modal work-btn-modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>근무 시작</h2>
          <!-- 모달 내용 -->
        </div>
      </div>

      <div class="modal attendance-modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>근태 내역</h2>
          <!-- 모달 내용 -->
        </div>
      </div>

      <div class="modal add-attendance-btn-modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>근태신청</h2>
          <!-- 모달 내용 -->
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    // 모달 초기화 함수
    function initModals() {
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

    // 시간 업데이트 함수
    function initTimeUpdate() {
      const currentTimeElement = document.querySelector(".current-time-value");
      if (!currentTimeElement) return;

      function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        // const ampm = hours >= 12 ? 'PM' : 'AM';
        // const displayHours = hours % 12 || 12; // 12시간제로 변환

        currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
        // currentTimeElement.textContent = `${ampm} ${String(displayHours).padStart(2, "0")}:${minutes}:${seconds}`;
        
      }

      updateTime();
      setInterval(updateTime, 500);
    }
    initModals();
    initTimeUpdate();
  }
}

// 앱 실행
new MyPage(document.querySelector("#app"));

export default MyPage;
