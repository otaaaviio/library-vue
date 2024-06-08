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
