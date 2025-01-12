const cards = document.querySelectorAll('.card');
const modalContainer = document.getElementById('modalContainer');
const modalContent = document.getElementById('modalContent');
const modalCloseButton = document.getElementById('modalCloseButton');

const modalImage = document.querySelector('.modal-image-placeholder');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

cards.forEach(card => {
  card.addEventListener('click', ()=> {
    const cardImage = card.querySelector('.image-placeholder').cloneNode(true);
    const cardTitle = card.querySelector('h2').textContent;
    const cardText = card.querySelector('p').textContent;

    modalImage.innerHTML = ''; // 기존 내용 삭제
    modalImage.appendChild(cardImage);
    modalTitle.textContent = cardTitle;
    modalText.textContent = cardText;


    modalContainer.classList.remove('hidden');

    modalCloseButton.addEventListener('click', () => {
      modalContainer.classList.add('hidden');
    });
  });
});