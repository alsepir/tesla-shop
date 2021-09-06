import { CartStateItem } from './store/reducers/cart'

export const postCart = (items: CartStateItem[]) => {
  return fetch(`https://httpbin.org/status/${Math.random() > 0.5 ? 400 : 200}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  })
}
