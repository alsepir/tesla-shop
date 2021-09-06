import { Box, Button, Layer, Text } from 'grommet'

interface Props {
  visible: boolean
  onClose: () => void
  description?: string
}

const Modal = (props: Props) => {
  return (
    <Box>
      {props.visible && (
        <Layer
          onEsc={props.onClose}
          onClickOutside={props.onClose}
        >
          <Box pad={{ horizontal: '24px', vertical: '24px' }} >
            <Text margin={{ bottom: '24px' }}>{props.description}</Text>
            <Box direction='row' justify='end'>
              <Button label="Ок" onClick={props.onClose} />
            </Box>
          </Box>
        </Layer>
      )
      }
    </Box >
  )
}

export default Modal