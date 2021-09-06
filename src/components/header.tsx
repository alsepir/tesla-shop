import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Box, Button, Heading, Stack, Text } from 'grommet'
import { Car, Cart } from 'grommet-icons'
import { RootState } from '../store/index'

interface Props {
  title?: string
}

const Header = (props: Props) => {
  const history = useHistory()
  const location = useLocation()
  const cartItems = useSelector((state: RootState) => state.cart.items.length)

  const onCartClick = () => {
    if (location.pathname !== '/cart') history.push('/cart')
  }

  const goHome = () => {
    history.replace('/')
  }

  return (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: 1 }}
    >
      <Box
        direction='row'
        align='center'
        justify='between'
        onClick={goHome}
      >
        <Box pad={{ right: 'small' }}>
          <Car />
        </Box>
        <Heading level='3' margin='none'>{props.title}</Heading>
      </Box>
      <Button onClick={onCartClick}>
        <Stack anchor="top-right">
          <Cart size="30px" />
          <Box
            background="brand"
            pad={{ horizontal: '2px' }}
            round
          >
            {!!cartItems && <Text color='white'>{cartItems}</Text>}
          </Box>
        </Stack>
      </Button>
    </Box>
  )
}

export default Header