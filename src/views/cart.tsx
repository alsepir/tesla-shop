import { useSelector, useDispatch } from 'react-redux'
import { Box, List, Text, Button, } from "grommet"
import { Header, CarCard } from '../components'
import { RootState } from '../store/index'
import { CartStateItem, sendCartAction } from '../store/reducers/cart'

const CartView = () => {
  const dispath = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalPrice = cartItems.reduce((acc, value) => acc + value.data.price * value.amount, 0)

  const sendCart = () => {
    dispath(sendCartAction())
  }

  return (
    <Box fill>
      <Header
        title='tesla-shop'
      />
      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        <Box flex align='center' justify='start'>
          <List
            border={false}
            data={cartItems}
            children={(item: CartStateItem) => <CarCard
              type='cart'
              key={item.data.id}
              data={item.data}
              amount={item.amount}
            />}
          />
        </Box>
      </Box>
      {!!totalPrice && <Button
        primary
        margin={{ vertical: '16px', horizontal: '20vw' }}
        onClick={sendCart}
        label={
          <Box direction='row' justify='center'>
            <Text>Оплатить</Text>
            <Text margin={{ left: '20px', }}>{`${totalPrice}₽`}</Text>
          </Box>}
      />}
    </Box>
  )
}

export default CartView
