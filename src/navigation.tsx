import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainView from './views/main'
import CartView from './views/cart'
import { Modal } from './components'
import { RootState } from './store'
import { confirmMessageAction } from './store/reducers/cart'

function App() {
  const message = useSelector((state: RootState) => state.cart.message)
  const dispatch = useDispatch()

  return (
    <>
      <Router>
        <Switch>
          <Route path='/cart'>
            <CartView />
          </Route>
          <Route path='/'>
            <MainView />
          </Route>
        </Switch>
      </Router>

      <Modal
        visible={!!message}
        onClose={() => dispatch(confirmMessageAction())}
        description={message}
      />
    </>
  )
}

export default App;
