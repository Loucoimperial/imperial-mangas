export interface Chapter {
  number: number;
  pages: number;
}

export interface Manga {
  id: string;
  title: string;
  description: string;
  cover: string;
  chapters: Chapter[];
}

export const mangas: Manga[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    description: "Um caçador fraco descobre um sistema misterioso.",
    cover: "/covers/solo.jpg",
    chapters: [
      { number: 1, pages: 45 },
      { number: 2, pages: 38 }
    ]
  }
];