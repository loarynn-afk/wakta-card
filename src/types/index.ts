export interface Member {
  id: number;
  name: string;
  category: string[];
  cardImage: string;
  description: string;
  youtubeUrl: string;
  soopUrl: string;
}

export interface Category {
  id: string;
  name: string;
}
