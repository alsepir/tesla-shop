import { CSSProperties } from 'react'
import { Box, Text, Button } from 'grommet'

interface Props {
  value: number
  onClick: (value: number) => void
}

const Counter = (props: Props) => {
  const inc = () => { props.onClick(props.value + 1) }
  const dec = () => { props.value > 0 && props.onClick(props.value - 1) }

  return (
    <Box direction='row' justify='between' style={container}>
      <Button style={buttonLeft} label='-' onClick={dec} />
      <Box flex align='center' justify='center' border={[{ color: 'brand', size: '2px', side: 'horizontal' }]}>
        <Text>{props.value}</Text>
      </Box>
      <Button style={buttonRight} label='+' onClick={inc} />
    </Box>
  )
}

const container: CSSProperties = {
  width: '200px'
}

const buttonLeft: CSSProperties = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
}

const buttonRight: CSSProperties = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}

export default Counter
