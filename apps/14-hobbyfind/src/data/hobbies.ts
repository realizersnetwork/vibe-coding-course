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
  { id: "jogging", name: "조깅/러닝", category: "sports", summary: "공원이나 한강에서 페이스를 쌓습니다.", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=520&fit=crop" },
  { id: "yoga", name: "요가", category: "sports", summary: "호흡과 스트레칭으로 몸을 깨웁니다.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=520&fit=crop" },
  { id: "swim", name: "수영", category: "sports", summary: "관절에 부담이 적은 전신 운동.", img: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=520&fit=crop" },
  { id: "cycle", name: "자전거", category: "sports", summary: "한강 코스를 내 페이스로.", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=520&fit=crop" },
  { id: "climb", name: "클라이밍", category: "sports", summary: "벽 위의 문제 풀이.", img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=520&fit=crop" },
  { id: "dance", name: "댄스", category: "sports", summary: "리듬에 맞춰 몸을 풉니다.", img: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800&h=520&fit=crop" },
  { id: "reading", name: "독서", category: "intelligence", summary: "한 권을 끝까지 읽는 루틴.", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=520&fit=crop" },
  { id: "puzzle", name: "퍼즐", category: "intelligence", summary: "조각이 맞을 때의 집중.", img: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&h=520&fit=crop" },
  { id: "chess", name: "체스", category: "intelligence", summary: "수 읽기와 집중력.", img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=520&fit=crop" },
  { id: "programming", name: "프로그래밍", category: "intelligence", summary: "작은 서비스를 직접 만들기.", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=520&fit=crop" },
  { id: "language", name: "외국어 학습", category: "intelligence", summary: "매일 20분 회화 루틴.", img: "https://images.unsplash.com/photo-14565130808-af103d479fd3?w=800&h=520&fit=crop" },
  { id: "photo", name: "사진 촬영", category: "intelligence", summary: "빛과 구도를 수집합니다.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=520&fit=crop" },
  { id: "drawing", name: "그림 그리기", category: "art", summary: "선 하나로 관찰을 기록.", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=520&fit=crop" },
  { id: "instrument", name: "악기 연주", category: "art", summary: "손가락이 외우는 멜로디.", img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=520&fit=crop" },
  { id: "cooking", name: "요리", category: "art", summary: "한 끼를 직접 완성하기.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=520&fit=crop" },
  { id: "calligraphy", name: "서예", category: "art", summary: "획의 속도와 여백.", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=520&fit=crop" },
  { id: "ceramic", name: "도자기 만들기", category: "art", summary: "흙을 중심으로 되돌리기.", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=520&fit=crop" },
  { id: "garden", name: "정원 가꾸기", category: "art", summary: "계절을 손으로 돌봅니다.", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=520&fit=crop" },
];
