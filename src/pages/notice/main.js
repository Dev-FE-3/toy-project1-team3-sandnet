import "./style.css";

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

class NoitcePage extends Component {

  template () {
    return `
    <div class="container">
      <!--Sidebar-->
      <aside class="sidebar">
        <ul>
          <li>마이 페이지</li>
          <li>프로필</li>
          <li>공지사항</li>
          <li>직원 구성</li>
        </ul>
      </aside>

      <!--Main Content-->
      <main class="main-content">
        <header>
          <h1>공지사항</h1>
          <div class="search-bar">
            <input type="text" id="search-input" placeholder="검색어를 입력하세요">
            <span class="search-icon material-icons" onclick="search()">search</span>
          </div>
        </header>

        <!--Scrollable Cards Section-->
        <section class="cards">
          <!--카드1-->
          <div id="card1" class="card">
            <img src="./src/assets/images/img1.png" alt="공지사항 이미지" class="image-placeholder"/>
            <h2>주간 근무 스케줄 공지</h2>
            <p>
              안녕하세요, 모든 직원 여러분!

              다가오는 주의 근무 스케줄을 아래와 같이 공지합니다. 각자 본인의 근무 시간을 확인하시고, 교대 시간이 변경되거나 문제가 있을 경우 매니저에게 즉시 알려주세요.

              1. 근무 시간:

              - 오전 조: 09:00 ~ 14:00
              - 오후 조: 14:00 ~ 19:00
              - 야간 조: 19:00 ~ 23:00

              2. 주요 내용:

              - 교대 시간은 근무 10분 전에 대기실에서 대기해 주세요.

              - 휴무일 변경 요청은 최소 3일 전에 매니저와 상의 후, 공식적으로 승인받아야 합니다.

              - 변경 요청이 없을 경우, 아래 스케줄에 따라 운영됩니다.

              첨부 파일: 주간 근무표(PDF 다운로드)
            </p>
          </div>

          <!--카드2-->
          <div id="card2" class="card">
            <img src="./src/assets/images/img2.png" alt="공지사항 이미지" class="image-placeholder"/>
            <h2>신메뉴 출시</h2>
            <p>
              안녕하세요!
              이번 주에는 고객들에게 더욱 즐거운 경험을 제공하기 위해 신메뉴가 출시됩니다. 새롭게 추가된 메뉴에 대한 세부 사항은 아래를 참고해주세요.
              
              1. 메뉴 이름:

              - 클래식 치즈 샌드위치 (싱글/더블 옵션)
              - 매콤 치킨 샌드위치 콤보 (음료 포함)

              2. 레시피 및 준비:

              - 치즈 샌드위치: 고온에서 조리된 패티에 체다치즈와 신선한 토마토 추가.
              - 치킨 샌드위치: 고소한 마요네즈와 특제 매운 소스 사용.

              3. 홍보 방법:

              - 매장 내 메뉴판 업데이트.
              - SNS 이벤트로 "신메뉴 후기 작성 시 10% 할인 쿠폰 제공".
              - 신메뉴 시식권 제공 이벤트 진행.

              모든 직원은 신메뉴의 준비 과정을 숙지하고 고객 문의에 응답할 준비를 해주세요.</p>
          </div>

          <!--카드3-->
          <div id="card3" class="card" >
            <img src="./src/assets/images/img3.png" alt="공지사항 이미지" class="image-placeholder"/>
            <h2>주말 프로모션 안내</h2>
            <p>
              매장에서는 이번 주말 동안 특별 이벤트를 진행합니다.
              1월 20일(토)부터 1월 21일(일)까지 모든 세트 메뉴를 20% 할인된 가격으로 제공합니다.
              
              1. 이벤트 세부 사항:

              - 대상: 모든 방문 고객
              - 할인 메뉴: 세트 A, 세트 B, 세트 C
              - 프로모션 시간: 10:00 ~ 21:00

              2. 준비 사항:

              - 홍보 전단지 배포 및 카운터 배치.
              - 세트 메뉴 재료 재고를 사전 점검하여 부족하지 않도록 관리.

              모든 직원은 고객 응대 시 이벤트 내용을 숙지하고 정확히 안내 부탁드립니다.</p>
          </div>

          <!--카드4-->
          <div id="card4" class="card">
            <img src="./src/assets/images/img4.png" alt="공지사항 이미지" class="image-placeholder"/>
            <h2>위생 및 안전 지침</h2>
            <p>
              매장은 고객들에게 항상 안전하고 깨끗한 환경을 제공하기 위해 새로운 위생 및 안전 지침을 시행합니다.
              
              1. 청소 매뉴얼:
              
              - 조리대는 3시간마다 소독.
              - 고객 테이블은 사용 후 즉시 닦기.
              - 바닥은 매일 마감 후 청소 및 건조.
              
              2. 위생 관리:
              
              - 모든 직원은 반드시 손 소독 후 장갑 착용.
              - 냉장고 및 냉동고 온도를 매일 점검 후 기록.
              
              3. 안전 교육:
              
              - 화재 발생 시 대처 방법 매뉴얼 배포.
              - 고객 응급상황 시 대처법 교육.

              모든 직원은 반드시 해당 지침을 숙지하고 실천해야 합니다.</p>
          </div>

          <!--카드5-->
          <div id="card5" class="card">
            <img src="./src/assets/images/img5.png" alt="공지사항 이미지" class="image-placeholder"></img>
            <h2>정기 직원 회의 및 급여 일정</h2>
            <p>
              1월 정기 회의 및 급여 지급 관련 공지를 드립니다.

              1. 정기 회의 일정:
              
              - 날짜: 1월 18일(목)
              - 시간: 오후 3시
              - 장소: 매장 대회의실
              
              2. 급여 지급일:
              
              - 지급일: 1월 25일(목)
              - 지급 방법: 본인 명의 은행 계좌로 이체
              
              3. 출근/지각 규정 업데이트:
              
              - 정시 출근을 원칙으로 하며, 지각 3회 시 경고 조치가 취해집니다.
              - 특별한 사유로 인해 지각/결근이 불가피한 경우 사전에 매니저에게 통보 부탁드립니다.</p>
          </div>

          <!--카드6-->
          <div id="card6" class="card">
            <img src="./src/assets/images/img6.png" alt="공지사항 이미지" class="image-placeholder"/>
            <h2>POS 시스템 업데이트</h2>
            <p>
              안녕하세요, 매장에서 사용 중인 POS 시스템이 1월 20일에 업데이트될 예정입니다.

              1. 업데이트 세부 사항:
              
              - 기능 추가: 재고 관리 자동화, 판매 데이터 통계 기능.
              - UI 개선: 더욱 간편한 화면 구성.
              
              2. 업데이트 시간:
              
              - 1월 20일 오전 2시 ~ 4시 (운영 시간 외 진행)
              
              3. 사전 준비:
              
              - 업데이트 후 사용법 가이드 제공 예정.
              - 질문사항은 IT 담당자에게 문의 가능합니다.</p>
          </div>

          <!--카드7-->
          <div id="card7" class="card">
            <img src="./src/assets/images/img7.png" alt="공지사항 이미지" class="image-placeholder"/>
            <h2>신규 직원 인사 공지</h2>
            <p>
              이번 주 신규로 합류한 직원들과 퇴사하는 직원에 대해 공지드립니다.

              1. 신규 직원:
              
              - 김철수: 주간 근무 (09:00~14:00)
              - 김민수: 야간 근무 (19:00~23:00)
              
              2. 퇴사 직원:
              
              - 박지연: 개인 사정으로 1월 18일자로 퇴사
              
              신규 직원들에게 환영 인사를 부탁드리며, 퇴사 직원과의 마지막 근무일도 뜻깊게 마무리해주시길 바랍니다.</p>
          </div>

          <!--카드8-->
          <div id="card8" class="card">
            <img src="./src/assets/images/img8.png" alt="공지사항 이미지" class="image-placeholder"/>
            <h2>문제 상황 대처 매뉴얼</h2>
            <p>
              고객 컴플레인 처리 및 장비 고장 시 대처법을 공유드립니다.

              1. 고객 컴플레인 처리:
              
              - 고객의 불만 사항을 경청하고 메모.
              - 매니저에게 즉시 보고 후 문제 해결 방법을 안내.
              - 사후 이메일 또는 전화로 고객 만족 확인.
              
              2. 장비 고장 대처:
              
              - POS 시스템 오류: 즉시 IT 팀에 연락 후 수동 기록 사용.
              - 조리 장비 고장: 대체 장비 확인 및 고객에게 대기 시간 안내.
              
              모든 직원은 위의 지침을 상황에 따라 유연하게 활용해주세요.</p>
          </div>
        </section>

        <!--card modal-->
        <div id="modalContainer" class="hidden">
          <div id="modalContent">
            <span id="modalCloseButton"  class="material-icons">close</span>
            <div class="modal-area">
              <div  class="modal-image-placeholder"></div>
              <div class="modal-text-content">
                <h2 id="modalTitle"></h2>
                <p  id="modalText"></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    `;
  }

  setEvent() {
    // 카드 텍스트 제한 함수
    function truncateText(text, limit = 80) {
      return text.length <= limit ? text : text.slice(0, limit) + '...';
    }

    // 모달 열기 함수
    function openModal(card) {
      console.log('openModal called');
      const modalContainer = document.getElementById('modalContainer');
      const modalContent = document.getElementById('modalContent');
      const modalImage = document.querySelector('.modal-image-placeholder');
      const modalTitle = document.getElementById('modalTitle');
      const modalText = document.getElementById('modalText');
  
      const cardImage = card.querySelector('.image-placeholder').cloneNode(true);
      const cardTitle = card.querySelector('h2').textContent;
      const fullText = card.querySelector('p').textContent;

      // 모달 내용 업데이트
      modalImage.innerHTML = ''; // 기존 내용 삭제
      modalImage.appendChild(cardImage);  // 이미지 추가
      modalTitle.textContent = cardTitle;
      modalText.textContent = fullText;

      modalContainer.classList.remove('hidden');
    }

    // 모달 닫기 함수
    function closeModal() {
      const modalContainer = document.getElementById('modalContainer');
      modalContainer.classList.add('hidden'); // 모달 숨기기
    }

    // 외부 클릭 시 모달 닫기 함수
    function handleOutsideClick(e) {
      const modalContainer = document.getElementById('modalContainer');
      if (e.target === modalContainer) {
        closeModal();
      }
    }

    // 카드 클릭 이벤트 설정 함수
    function setupCardEvents(card) {
      const cardText = card.querySelector('p');
      const fullText = cardText.textContent;

      // 카드 텍스트 제한 처리
      cardText.textContent = truncateText(fullText);

      card.addEventListener('click', () => {
        const modalContainer = document.getElementById('modalContainer');
        const modalImage = document.querySelector('.modal-image-placeholder');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');
    
        // 이미지 src 복사 및 추가
        const cardImage = card.querySelector('.image-placeholder').cloneNode(true);
        modalImage.innerHTML = '';  // 기존 내용 삭제
        modalImage.appendChild(cardImage);  // 이미지 추가
    
        // 제목과 전체 텍스트 설정
        modalTitle.textContent = card.querySelector('h2').textContent;
        modalText.textContent = fullText;  // 원본 전체 텍스트 사용

        modalContainer.classList.remove('hidden');
      });
    }

    // 모달 닫기 버튼 이벤트 설정 함수
    function setupCloseButton() {
      const modalCloseButton = document.getElementById('modalCloseButton');
      modalCloseButton.addEventListener('click', closeModal);
    }

    // DOM 로드 후 초기화 함수
    function initialize() {
      const cards = document.querySelectorAll('.card');
  
      // 각 카드에 대해 클릭 이벤트 설정
      cards.forEach(card => setupCardEvents(card));

      // 모달 외부 클릭시 닫기 이벤트 설정
      const modalContainer = document.getElementById('modalContainer');
      modalContainer.addEventListener('click', handleOutsideClick);

      // 모달 닫기 버튼 이벤트 설정
      setupCloseButton();
    }
    initialize();
  }
}

// 앱 실행
new NoitcePage(document.querySelector('#app'));

export default NoitcePage; 