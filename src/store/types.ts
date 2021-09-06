export interface IReduxAction<T = any, P = any> {
  type: T
  payload?: P
}

export interface IAutoModel {
  id: number
  name: string
  type: string
  description: string
  imgs: string[]
  price: number
}