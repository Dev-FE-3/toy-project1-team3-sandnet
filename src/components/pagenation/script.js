// 샘플 데이터
const items = Array.from({ length: 248 }, (_, i) => `아이템 ${i + 1}`);

// 페이지당 표시할 아이템 수
const itemsPerPage = 10;
// 페이지당 표시할 페이지 버튼 수
const buttonsPerPages = 10;
// 현재 페이지
let currentPage = 1;
// 다음 버튼 활성화 토글
let nextButtonActive = true;

// 페이지네이션 생성 함수
function createPagination() {
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // 이전 페이지 버튼
  const prevButton = document.createElement("button");
  prevButton.textContent = "이전";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayItems();
      createPagination();
    }
  });
  pagination.appendChild(prevButton);

  // 페이지 그룹 계산
  const pageGroup = Math.ceil(currentPage / buttonsPerPages);
  let startPage = (pageGroup - 1) * buttonsPerPages + 1;
  let endPage = Math.min(pageGroup * buttonsPerPages, pageCount);
  console.log(
    "createPagination ~ endPage: ",
    endPage,
    Math.round(items.length)
  );

  console.log("createPagination ~ startPage: ", startPage);
  // 첫 페이지 표시 (1페이지가 현재 그룹에 없을 경우)
  //   if (startPage > 1) {
  //     const firstButton = document.createElement("button");
  //     firstButton.textContent = "1";
  //     firstButton.addEventListener("click", () => {
  //       currentPage = 1;
  //       displayItems();
  //       createPagination();
  //     });
  //     pagination.appendChild(firstButton);

  //     const dots = document.createElement("span");
  //     dots.textContent = "...";
  //     dots.className = "pagination-dots";
  //     pagination.appendChild(dots);
  //   }

  // 페이지 번호 버튼
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      displayItems();
      createPagination();
    });
    pagination.appendChild(button);
  }

  // 마지막 페이지가 있는 화면에서 '다음 버튼' 비활성화
  if (endPage === pageCount) {
    nextButtonActive = false;
  }
  // 마지막 페이지 표시 (마지막 페이지가 현재 그룹에 없을 경우)
  if (endPage < itemsPerPage) {
    // const dots = document.createElement("span");
    // dots.textContent = "...";
    // dots.className = "pagination-dots";
    // pagination.appendChild(dots);

    const lastButton = document.createElement("button");
    lastButton.textContent = pageCount;
    lastButton.addEventListener("click", () => {
      currentPage = pageCount;
      displayItems();
      createPagination();
    });
    pagination.appendChild(lastButton);
  }
  console.log("createPagination ~ pageCount: ", endPage === pageCount);
  console.log("createPagination ~ nextButtonActive: ", nextButtonActive);

  // 다음 페이지 버튼
  if (nextButtonActive) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "다음";
    nextButton.addEventListener("click", () => {
      if (currentPage < pageCount) {
        currentPage++;
        displayItems();
        createPagination();
      }
    });
    pagination.appendChild(nextButton);
  }
}

// 아이템 표시 함수
function displayItems() {
  const content = document.getElementById("content");
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentPageItems = items.slice(start, end);
  function createItemElement(item) {
    const divEle = document.createElement("div");
    divEle.className = "item";
    divEle.textContent = item;
    return divEle;
  }

  //   content.innerHTML = currentPageItems
  //     .map((item) => `<div class="item">${item}</div>`)
  //     .join("");
  console.log("displayItems ~ createItemElement: ", createItemElement("test"));

  content.innerHTML = "";
  currentPageItems.forEach((item) => {
    content.appendChild(createItemElement(item));
  });
}

// Init
displayItems();
createPagination();
