export type Category = "sports" | "intelligence" | "art";

export type Hobby = {
  id: string;
  name: string;
  category: Category;
  summary: string;
};

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "sports", label: "운동형" },
  { key: "intelligence", label: "지능형" },
  { key: "art", label: "예술형" },
];

export const HOBBIES: Hobby[] = [
  { id: "yoga", name: "요가", category: "sports", summary: "호흡과 스트레칭으로 몸을 깨웁니다." },
  { id: "run", name: "러닝", category: "sports", summary: "공원 한 바퀴로 시작하는 지구력." },
  { id: "climb", name: "클라이밍", category: "sports", summary: "벽 위의 문제 풀이." },
  { id: "swim", name: "수영", category: "sports", summary: "관절에 부담이 적은 전신 운동." },
  { id: "cycle", name: "자전거", category: "sports", summary: "한강 코스를 내 페이스로." },
  { id: "hike", name: "등산", category: "sports", summary: "주말 산으로 리셋." },
  { id: "chess", name: "체스", category: "intelligence", summary: "수 읽기와 집중력." },
  { id: "go", name: "바둑", category: "intelligence", summary: "집과 집 사이의 형세 판단." },
  { id: "code", name: "코딩", category: "intelligence", summary: "작은 서비스를 직접 만들기." },
  { id: "lang", name: "외국어", category: "intelligence", summary: "매일 20분 회화 루틴." },
  { id: "chess2", name: "스도쿠", category: "intelligence", summary: "출퇴근 퍼즐." },
  { id: "book", name: "독서 모임", category: "intelligence", summary: "한 권을 같이 읽고 토론." },
  { id: "draw", name: "드로잉", category: "art", summary: "선 하나로 관찰을 기록." },
  { id: "photo", name: "사진", category: "art", summary: "빛과 구도를 수집." },
  { id: "piano", name: "피아노", category: "art", summary: "손가락이 외우는 멜로디." },
  { id: "ceramic", name: "도자기", category: "art", summary: "흙을 중심으로 되돌리기." },
  { id: "write", name: "글쓰기", category: "art", summary: "하루 한 단락." },
  { id: "dance", name: "현대무용", category: "art", summary: "몸과 공간의 대화." },
];
