import { Box, List } from "grommet"
import { Header, CarCard } from '../components'
import data from '../data.json'
import { IAutoModel } from '../store/types'

const MainView = () => {
  return (
    <Box fill>
      <Header
        title='tesla-shop'
      />
      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        <Box flex align='center' justify='start'>
          <List
            border={false}
            data={data}
            children={(item: IAutoModel) => <CarCard
              key={item.id}
              data={item}
            />}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default MainView
