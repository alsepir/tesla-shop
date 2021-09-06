import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Image, Box, Carousel, Heading, Button, Text, ResponsiveContext } from 'grommet'
import { Cart } from 'grommet-icons'
import { Counter } from '.'
import { IAutoModel } from '../store/types'
import { setCartItemAction, setCartItemAmountAction } from '../store/reducers/cart'
import styled, { css } from 'styled-components'

interface Props {
  data: IAutoModel
  type?: 'catalog' | 'cart'
  amount?: number
}

const CarCard = ({ data, type = 'catalog', amount: quantity }: Props) => {
  const [amount, setAmount] = useState(!!quantity ? quantity : 1)
  const dispatch = useDispatch()

  const addToCart = () => {
    if (!!amount)
      dispatch(setCartItemAction(data, amount))
  }

  const onClickCounter = (value: number) => {
    setAmount(value)
    if (type === 'cart') dispatch(setCartItemAmountAction(data, value))
  }

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Card style={{ width: '80vw' }} direction={size === 'small' ? 'column' : 'row'} background='backgroundCard'>
          <CarouselContainer theme={{ size }}>
            {data.imgs && <Carousel fill>
              {data.imgs.map((item, index) => <Image key={index} fit='cover' src={item} />)}
            </Carousel>}
          </CarouselContainer>
          <Box pad={{ vertical: '16px', horizontal: '16px' }}>
            <Heading level={3} margin='none'>{data.name}</Heading>
            <Heading level={4} margin={{ top: '10px', bottom: '10px', horizontal: 'none' }}>{data.type}</Heading>
            <Text>{data.description}</Text>
            <Text margin={{ top: '16px' }}>{`Цена: ${data.price}₽`}</Text>
            <Box flex justify='end' align='center' margin={{ top: '24px', bottom: '0' }}>
              <Counter
                value={amount}
                onClick={onClickCounter}
              />
              {type === 'catalog' && <Button
                primary
                margin={{ top: '8px' }}
                onClick={addToCart}
                label={
                  <Box direction='row' justify='center'>
                    <Text>Добавит в</Text>
                    <Box margin={{ left: '10px' }}><Cart color='white' /></Box>
                  </Box>
                }
              />}
            </Box>
          </Box>
        </Card>
      )
      }
    </ResponsiveContext.Consumer>
  )
}

const CarouselContainer = styled.div`
  height: 400px;
  width: 100%;

  @media screen and (min-width: 960px) {
    width: 400px;
  }
  @media screen and (min-width: 1200px) {
    width: 600px;
  }

  ${props => props.theme.size === 'medium' && css`
      width: 250px;
  `
  }
`

export default CarCard