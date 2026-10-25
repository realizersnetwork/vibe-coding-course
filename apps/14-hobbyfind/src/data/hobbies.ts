export type Category = "sports" | "intelligence" | "art";

export type Hobby = {
  id: string;
  name: string;
  category: Category;
  summary: string;
  img: string;
};

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "sports", label: "운동형" },
  { key: "intelligence", label: "지능형" },
  { key: "art", label: "예술형" },
];

export const HOBBIES: Hobby[] = [
  { id: "yoga", name: "요가", category: "sports", summary: "호흡과 스트레칭으로 몸을 깨웁니다.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=520&fit=crop" },
  { id: "run", name: "러닝", category: "sports", summary: "공원 한 바퀴로 시작하는 지구력.", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=520&fit=crop" },
  { id: "climb", name: "클라이밍", category: "sports", summary: "벽 위의 문제 풀이.", img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=520&fit=crop" },
  { id: "swim", name: "수영", category: "sports", summary: "관절에 부담이 적은 전신 운동.", img: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=520&fit=crop" },
  { id: "cycle", name: "자전거", category: "sports", summary: "한강 코스를 내 페이스로.", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=520&fit=crop" },
  { id: "hike", name: "등산", category: "sports", summary: "주말 산으로 리셋.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=520&fit=crop" },
  { id: "chess", name: "체스", category: "intelligence", summary: "수 읽기와 집중력.", img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=520&fit=crop" },
  { id: "go", name: "바둑", category: "intelligence", summary: "집과 집 사이의 형세 판단.", img: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=520&fit=crop" },
  { id: "code", name: "코딩", category: "intelligence", summary: "작은 서비스를 직접 만들기.", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=520&fit=crop" },
  { id: "lang", name: "외국어", category: "intelligence", summary: "매일 20분 회화 루틴.", img: "https://images.unsplash.com/photo-14565130808-af103d479fd3?w=800&h=520&fit=crop" },
  { id: "chess2", name: "스도쿠", category: "intelligence", summary: "출퇴근 퍼즐.", img: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&h=520&fit=crop" },
  { id: "book", name: "독서 모임", category: "intelligence", summary: "한 권을 같이 읽고 토론.", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=520&fit=crop" },
  { id: "draw", name: "드로잉", category: "art", summary: "선 하나로 관찰을 기록.", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=520&fit=crop" },
  { id: "photo", name: "사진", category: "art", summary: "빛과 구도를 수집.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=520&fit=crop" },
  { id: "piano", name: "피아노", category: "art", summary: "손가락이 외우는 멜로디.", img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=520&fit=crop" },
  { id: "ceramic", name: "도자기", category: "art", summary: "흙을 중심으로 되돌리기.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=520&fit=crop" },
  { id: "write", name: "글쓰기", category: "art", summary: "하루 한 단락.", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=520&fit=crop" },
  { id: "dance", name: "현대무용", category: "art", summary: "몸과 공간의 대화.", img: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800&h=520&fit=crop" },
];
