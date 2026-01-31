/**
 * 왁타버스 멤버 카드 데이터
 * 카테고리 및 멤버 정보
 */

// 카테고리 목록
const categories = [
  { id: 'all', name: 'ALL' },
  { id: 'fixed', name: '고정멤버' },
  { id: 'isedol', name: '이세돌' },
  { id: 'gomemgomem', name: '고멤고멤' },
  { id: 'middle', name: '중간계' },
  { id: 'waktaverse', name: '왁타버스' }
];

// 멤버 데이터
const members = [
  // 고정멤버
  { id: 1, name: '곽춘식', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 2, name: '권민', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 3, name: '김치만두번영택사스가', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 4, name: '단답벌레', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 5, name: '도파민 박사', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 6, name: '뢴트게늄', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 7, name: '비밀소녀', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 8, name: '비즈니스킴', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 9, name: '왁파고', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 10, name: '풍신', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 11, name: '해루석', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 12, name: '히키킹', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 13, name: '닌닌', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 14, name: '보디가드 불독', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 15, name: '시리안 레인', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 16, name: '아마데우스최', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 17, name: '진희', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 18, name: '독고혜지', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 19, name: '부정형인간', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 20, name: '소피아', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 21, name: '이덕수 할아버지', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 22, name: '티파니0421', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 23, name: '사랑전도사 젠투', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 24, name: '수셈이', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 25, name: '철도왕 길버트', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 26, name: '아르바', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 27, name: '미미짱짱세용', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 28, name: '빅토리', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 29, name: '카르나르 융터르', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 30, name: '노스페라투 호드', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 31, name: '데스해머 쵸로키', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 32, name: '아이 쓰게끼', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 33, name: '크리즈', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 34, name: '버터우스 3세', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 35, name: '성기사 샬롯', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 36, name: '메카 맹기산', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 37, name: '도깨비공주 루딘', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 38, name: '바룬상', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 39, name: '코드네임 로즈', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 40, name: '촌장 고봉', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 41, name: '제갈 통', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 42, name: '강풍', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 43, name: '무녀 사야', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 44, name: '구호선', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 45, name: '하율 옹', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 46, name: '서애라', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 47, name: '상 가르마', category: 'fixed', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },

  // 이세돌
  { id: 48, name: '아이네', category: 'isedol', cardImage: '', description: '테스트', youtubeUrl: 'https://www.youtube.com/@INE_', soopUrl: 'https://www.sooplive.co.kr/station/inehine' },
  { id: 49, name: '징버거', category: 'isedol', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 50, name: '릴파', category: 'isedol', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 51, name: '주르르', category: 'isedol', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 52, name: '고세구', category: 'isedol', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' },
  { id: 53, name: '비찬', category: 'isedol', cardImage: '', description: '테스트', youtubeUrl: '', soopUrl: '' }
];

export { categories, members };
