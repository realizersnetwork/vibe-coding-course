export type Book = {
  id: string;
  title: string;
  by: string;
  type: string;
  why: string;
  celeb: string;
};

export const TYPES = ["전체", "기업가", "연예인", "스포츠선수", "지식인", "예술가"] as const;

export const BOOKS: Book[] = [
  { id: "b1", title: "사피엔스", by: "유발 하라리", type: "지식인", celeb: "빌 게이츠", why: "인류의 큰 그림을 한 권에." },
  { id: "b2", title: "원칙", by: "레이 달리오", type: "기업가", celeb: "일론 머스크", why: "의사결정의 시스템을 만든다." },
  { id: "b3", title: "데미안", by: "헤르만 헤세", type: "예술가", celeb: "류이치 사카모토", why: "자아를 깨우는 소설." },
  { id: "b4", title: "아토믹 해빗", by: "제임스 클리어", type: "스포츠선수", celeb: "손흥민", why: "1%의 복리." },
  { id: "b5", title: "코스모스", by: "칼 세이건", type: "지식인", celeb: "칼 세이건", why: "밤하늘을 다시 보게 한다." },
  { id: "b6", title: "픽사 스토리텔링", by: "매튜 룬", type: "예술가", celeb: "피트 닥터", why: "이야기를 설계하는 법." },
  { id: "b7", title: "나는 나로 살기로 했다", by: "김수현", type: "연예인", celeb: "아이유", why: "경계 긋기와 자기 존중." },
  { id: "b8", title: "타이탄의 도구들", by: "팀 페리스", type: "기업가", celeb: "팀 페리스", why: "고수들의 루틴을 훔친다." },
  { id: "b9", title: "바디", by: "빌 브라이슨", type: "스포츠선수", celeb: "류현진", why: "몸이 어떻게 움직이는지." },
];
