export type Chapter = {
  number: number;
  pages: number;
};

export type Manga = {
  id: string;
  title: string;
  description: string;
  cover: string;
  chapters: Chapter[];
};