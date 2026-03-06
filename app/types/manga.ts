export type Chapter = {
  number: number;
};

export type Manga = {
  id: string;
  title: string;
  description: string;
  cover: string;
  author?: string;
  status?: string;
  year?: number;
  chapters: Chapter[];
};