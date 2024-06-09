export interface IReview {
  book: {
    id: number,
    title: string
  },
  comment: string,
  rating: number,
  user_id: number,
  id: number,
}

export interface ICreateReview {
  book_id: number,
  rating: number,
  comment: string,
}
