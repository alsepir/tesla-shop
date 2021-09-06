import { ThunkAction } from 'redux-thunk'
import { IReduxAction } from '../types'
import { IAutoModel } from '../types'
import { RootState } from '../'
import { postCart } from '../../api'

export interface CartStateItem {
  readonly data: IAutoModel
  readonly amount: number
}

interface CartState {
  readonly sending: boolean
  readonly fetching: boolean
  readonly items: CartStateItem[]
  readonly message: string
}

const initialState: CartState = {
  fetching: false,
  sending: false,
  items: [],
  message: ''
}

type CartAction =
  | IReduxAction<typeof REQUEST_CART>
  | IReduxAction<typeof SEND_CART_SUCCESS, string>
  | IReduxAction<typeof SEND_CART_ERROR, string>
  | IReduxAction<typeof SET_CART_ITEM, CartStateItem>
  | IReduxAction<typeof SET_CART_ITEM_AMOUNT, CartStateItem>
  | IReduxAction<typeof SEND_CART>
  | IReduxAction<typeof CONFIRM_CART_MESSAGE>
  | IReduxAction<typeof RESET_CART>

// types
const REQUEST_CART = 'REQUEST_CART'
const SEND_CART_SUCCESS = 'SEND_CART_SUCCESS'
const SEND_CART_ERROR = 'SEND_CART_ERROR'
const SET_CART_ITEM = 'SET_CART_ITEM'
const SET_CART_ITEM_AMOUNT = 'SET_CART_ITEM_AMOUNT'
const SEND_CART = 'SEND_CART'
const CONFIRM_CART_MESSAGE = 'CONFIRM_CART_MESSAGE'
const RESET_CART = 'RESET_CART'

// actions
export const requestCartAction = () => ({ type: REQUEST_CART, })
export const setCartAction = () => ({ type: SEND_CART_SUCCESS, })
export const setCartErrorAction = () => ({ type: SEND_CART_ERROR, })
export const setCartItemAction = (item: IAutoModel, amount: number) => ({ type: SET_CART_ITEM, payload: { data: item, amount } })
export const setCartItemAmountAction = (item: IAutoModel, amount: number) => ({ type: SET_CART_ITEM_AMOUNT, payload: { data: item, amount } })
export const sendCartAction = (): ThunkAction<void, RootState, null, CartAction> => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SEND_CART })
      const res = await postCart(getState().cart.items)
      
      if (res.status >= 200 && res.status < 300) {
        dispatch({ type: SEND_CART_SUCCESS, payload: 'Заказ успешно оформлен, наш менеджер свяжется с вами' })
        dispatch({ type: RESET_CART })
      } else {
        dispatch({ type: SEND_CART_ERROR, payload: 'Ошибка сервера' })
      }
    } catch (err) {
      dispatch({ type: SEND_CART_ERROR, payload: 'Ошибка сервера' })
    }
  }
}
export const confirmMessageAction = () => ({ type: CONFIRM_CART_MESSAGE, })


const addHelper = (items: CartStateItem[], newItem: CartStateItem) => {
  const existItems = items.filter(item => item.data.id === newItem.data.id)
  if (existItems.length > 0) return items
  return [...items, { data: newItem.data, amount: newItem.amount }]
}

const setAmountHelper = (items: CartStateItem[], newItem: CartStateItem) => {
  return items.map(item => {
    if (item.data.id === newItem.data.id) return newItem
    else return item
  })
}

// reducer
const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case REQUEST_CART:
      return { ...state, fetching: true }
    case SET_CART_ITEM:
      return { ...state, items: addHelper(state.items, action.payload!) }
    case SET_CART_ITEM_AMOUNT:
      return { ...state, items: setAmountHelper(state.items, action.payload!) }
    case SEND_CART:
      return { ...state, sending: true }
    case SEND_CART_SUCCESS:
      return { ...state, sending: false, message: action.payload ?? '' }
    case SEND_CART_ERROR:
      return { ...state, sending: false, message: action.payload ?? '' }
    case CONFIRM_CART_MESSAGE:
      return { ...state, sending: false, message: '' }
    case RESET_CART:
      return { ...state, items: [] }
    default:
      return state
  }
}

export default cartReducer