/**
 * 왁타버스 멤버 카드 스크립트
 * 필터, 검색, 정렬, 모달 기능
 */

import { categories, members } from './data.js';

// ==================== DOM 요소 ====================
const elements = {
  filterContainer: document.getElementById('filterContainer'),
  cardGrid: document.getElementById('cardGrid'),
  cardCount: document.getElementById('cardCount'),
  currentFilter: document.getElementById('currentFilter'),
  searchInput: document.getElementById('searchInput'),
  sortSelect: document.getElementById('sortSelect'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalClose: document.getElementById('modalClose'),
  modalCardInner: document.getElementById('modalCardInner'),
  modalName: document.getElementById('modalName'),
  modalCategory: document.getElementById('modalCategory'),
  modalDescription: document.getElementById('modalDescription'),
  modalYoutube: document.getElementById('modalYoutube'),
  modalSoop: document.getElementById('modalSoop')
};

// ==================== 상태 관리 ====================
let state = {
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'default'
};

// ==================== 유틸리티 함수 ====================

/**
 * 카테고리 ID로 카테고리 이름 가져오기
 */
function getCategoryName(categoryId) {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
}

/**
 * 멤버 필터링
 */
function getFilteredMembers() {
  let filtered = [...members];
  
  // 카테고리 필터
  if (state.currentCategory !== 'all') {
    filtered = filtered.filter(m => m.category === state.currentCategory);
  }
  
  // 검색 필터
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.description.toLowerCase().includes(query)
    );
  }
  
  // 정렬
  if (state.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }
  
  return filtered;
}

// ==================== 렌더링 함수 ====================

/**
 * 필터 버튼 렌더링 (하스스톤 박스 스타일)
 */
function renderFilters() {
  elements.filterContainer.innerHTML = categories.map(cat => `
    <button 
      class="category-box ${cat.id === state.currentCategory ? 'active' : ''}" 
      data-category="${cat.id}"
    >
      ${cat.name}
    </button>
  `).join('');
}

/**
 * 카드 그리드 렌더링
 */
function renderCards() {
  const filtered = getFilteredMembers();
  
  // 카운트 업데이트
  elements.cardCount.textContent = filtered.length;
  elements.currentFilter.textContent = getCategoryName(state.currentCategory);
  
  // 카드 렌더링
  elements.cardGrid.innerHTML = filtered.map(member => `
    <div class="card" data-member-id="${member.id}">
      <div class="card-inner">
        ${member.cardImage 
          ? `<img src="${member.cardImage}" alt="${member.name}" loading="lazy">`
          : `<div class="card-placeholder">
              <div class="card-placeholder-name">${member.name}</div>
              <div class="card-placeholder-category">${getCategoryName(member.category)}</div>
            </div>`
        }
      </div>
    </div>
  `).join('');
}

/**
 * 전체 UI 업데이트
 */
function updateUI() {
  renderFilters();
  renderCards();
}

// ==================== 모달 함수 ====================

/**
 * 모달 열기
 */
function openModal(memberId) {
  const member = members.find(m => m.id === parseInt(memberId));
  if (!member) return;
  
  // 카드 이미지 영역
  if (member.cardImage) {
    elements.modalCardInner.innerHTML = `<img src="${member.cardImage}" alt="${member.name}">`;
  } else {
    elements.modalCardInner.innerHTML = `
      <div class="modal-card-placeholder">
        <div class="modal-card-placeholder-name">${member.name}</div>
      </div>
    `;
  }
  
  // 정보 업데이트
  elements.modalName.textContent = member.name;
  elements.modalCategory.textContent = getCategoryName(member.category);
  elements.modalDescription.textContent = member.description;
  
  // 유튜브 링크 처리
  if (member.youtubeUrl && member.youtubeUrl.trim()) {
    elements.modalYoutube.href = member.youtubeUrl;
    elements.modalYoutube.style.display = 'inline-flex';
  } else {
    elements.modalYoutube.style.display = 'none';
  }
  
  // SOOP 링크 처리
  if (member.soopUrl && member.soopUrl.trim()) {
    elements.modalSoop.href = member.soopUrl;
    elements.modalSoop.style.display = 'inline-flex';
  } else {
    elements.modalSoop.style.display = 'none';
  }
  
  // 모달 표시
  elements.modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * 모달 닫기
 */
function closeModal() {
  elements.modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ==================== 이벤트 핸들러 ====================

/**
 * 필터 클릭 핸들러
 */
function handleFilterClick(e) {
  const btn = e.target.closest('.category-box');
  if (!btn) return;
  
  state.currentCategory = btn.dataset.category;
  updateUI();
}

/**
 * 카드 클릭 핸들러
 */
function handleCardClick(e) {
  const card = e.target.closest('.card');
  if (!card) return;
  
  openModal(card.dataset.memberId);
}

/**
 * 검색 입력 핸들러 (디바운스 적용)
 */
let searchTimeout;
function handleSearchInput(e) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    state.searchQuery = e.target.value;
    renderCards();
  }, 300);
}

/**
 * 정렬 변경 핸들러
 */
function handleSortChange(e) {
  state.sortBy = e.target.value;
  renderCards();
}

/**
 * 모달 배경 클릭 핸들러
 */
function handleOverlayClick(e) {
  if (e.target === elements.modalOverlay) {
    closeModal();
  }
}

/**
 * 키보드 이벤트 핸들러
 */
function handleKeydown(e) {
  if (e.key === 'Escape' && elements.modalOverlay.classList.contains('active')) {
    closeModal();
  }
}

// ==================== 이벤트 리스너 설정 ====================

function setupEventListeners() {
  // 필터
  elements.filterContainer.addEventListener('click', handleFilterClick);
  
  // 카드
  elements.cardGrid.addEventListener('click', handleCardClick);
  
  // 검색
  elements.searchInput.addEventListener('input', handleSearchInput);
  
  // 정렬
  elements.sortSelect.addEventListener('change', handleSortChange);
  
  // 모달
  elements.modalClose.addEventListener('click', closeModal);
  elements.modalOverlay.addEventListener('click', handleOverlayClick);
  
  // 키보드
  document.addEventListener('keydown', handleKeydown);
}

// ==================== 초기화 ====================

function init() {
  setupEventListeners();
  updateUI();
  
  console.log('🎴 왁타버스 멤버 카드 로드 완료!');
  console.log(`📊 총 ${members.length}명의 멤버, ${categories.length}개 카테고리`);
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', init);
