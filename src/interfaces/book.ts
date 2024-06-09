export interface IBook {
  id: number,
  title: string,
  author: string,
  avg_rating: number,
  category: string,
  image_path: string,
  review_count: number,
}

export interface IBookCreate {
  title: string,
  publisher_id: number,
  author_id: number,
  category_id: number,
  description: string,
  published_at: Date,
  images: string[],
}

export interface IBookDetailed {
  id: number,
  title: string,
  description: string,
  Author: {
    id: number,
    name: string,
  },
  Publisher: {
    id: number,
    name: string,
  },
  Category: {
    id: number,
    name: string,
  },
  CreatedBy: {
    id: number,
    name: string,
  },
  avgRating: number,
  published_at: string,
  Images: string[],
  Reviews: [],
}
