export type Category = "sports" | "intelligence" | "art";

export type Hobby = {
  id: string;
  name: string;
  category: Category;
  summary: string;
  img: string;
};

export const CATEGORIES: { key: Category; label: string; intro: string }[] = [
  { key: "sports", label: "운동형", intro: "몸을 움직이며 에너지를 쓰는 취미" },
  { key: "intelligence", label: "지능형", intro: "머리와 집중력을 쓰는 취미" },
  { key: "art", label: "예술형", intro: "손과 감각으로 만드는 취미" },
];

/** 강의 가이드 고정 목록. 변경·확장하지 않음 */
export const HOBBIES: Hobby[] = [
  { id: "jogging", name: "조깅/러닝", category: "sports", summary: "공원이나 한강에서 페이스를 쌓습니다.", img: "/thumbnails/running.jpg" },
  { id: "yoga", name: "요가", category: "sports", summary: "호흡과 스트레칭으로 몸을 깨웁니다.", img: "/thumbnails/yoga.jpg" },
  { id: "swim", name: "수영", category: "sports", summary: "관절에 부담이 적은 전신 운동.", img: "/thumbnails/swimming.jpg" },
  { id: "cycle", name: "자전거", category: "sports", summary: "한강 코스를 내 페이스로.", img: "/thumbnails/cycling.jpg" },
  { id: "climb", name: "클라이밍", category: "sports", summary: "벽 위의 문제 풀이.", img: "/thumbnails/climbing.jpg" },
  { id: "dance", name: "댄스", category: "sports", summary: "리듬에 맞춰 몸을 풉니다.", img: "/thumbnails/dance.jpg" },
  { id: "reading", name: "독서", category: "intelligence", summary: "한 권을 끝까지 읽는 루틴.", img: "/thumbnails/reading.jpg" },
  { id: "puzzle", name: "퍼즐", category: "intelligence", summary: "조각이 맞을 때의 집중.", img: "/thumbnails/puzzle.jpg" },
  { id: "chess", name: "체스", category: "intelligence", summary: "수 읽기와 집중력.", img: "/thumbnails/chess.jpg" },
  { id: "programming", name: "프로그래밍", category: "intelligence", summary: "작은 서비스를 직접 만들기.", img: "/thumbnails/programming.jpg" },
  { id: "language", name: "외국어 학습", category: "intelligence", summary: "매일 20분 회화 루틴.", img: "/thumbnails/foreign_language_learning.jpg" },
  { id: "photo", name: "사진 촬영", category: "intelligence", summary: "빛과 구도를 수집합니다.", img: "/thumbnails/photography.jpg" },
  { id: "drawing", name: "그림 그리기", category: "art", summary: "선 하나로 관찰을 기록.", img: "/thumbnails/drawing.jpg" },
  { id: "instrument", name: "악기 연주", category: "art", summary: "손가락이 외우는 멜로디.", img: "/thumbnails/instrument_playing.jpg" },
  { id: "cooking", name: "요리", category: "art", summary: "한 끼를 직접 완성하기.", img: "/thumbnails/cooking.jpg" },
  { id: "calligraphy", name: "서예", category: "art", summary: "획의 속도와 여백.", img: "/thumbnails/calligraphy.jpg" },
  { id: "ceramic", name: "도자기 만들기", category: "art", summary: "흙을 중심으로 되돌리기.", img: "/thumbnails/pottery.jpg" },
  { id: "garden", name: "정원 가꾸기", category: "art", summary: "계절을 손으로 돌봅니다.", img: "/thumbnails/gardening.jpg" },
];
