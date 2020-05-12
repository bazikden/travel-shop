import React, { useEffect } from 'react';
import AppNavbar from './components/Navbar';
import { Route } from 'react-router';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Register } from './components/Register';
import { Login } from './components/Login';
import { AUTH, LOGIN, GET_ALL_PRODUCTS } from './redux/reducers/types'
import { UploadProduct } from './components/UplaodProduct';
import { Auth } from './hoc/auth';
import { LandingPage } from './components/LandingPage/LandingPage';


function App() {
  const dispatch = useDispatch()
  const renderProps = useSelector(state => state.products.renderProps)

  useEffect(() => {
    Axios.get('api/users/auth')
      .then(res => {
        if (res.data.success) {
          const user = res.data.user

          dispatch({
            type: AUTH, payload: {
              name: user.name,
              user: user.email,
              id: user._id
            }
          })
          dispatch({ type: LOGIN, payload: true })
        } else {
          dispatch({ type: LOGIN, payload: false })
        }
      })
      .catch(err => console.log(err))

  }, [dispatch])

  useEffect(() => {
    const variables = {
      skip: renderProps.skip,
      limit: renderProps.limit,
      filter: renderProps.filter
    }

    Axios.post('api/products/getAllProducts', variables)
      .then(res => {
        if (res.data.success) {
          dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.products })
        } else {
          alert('Failed to load Products from Databasw')
        }
      })
      .catch(err => console.log(err))

  }, [renderProps,dispatch])



  return (
    <div className="App">
      <AppNavbar />
      <Route path='/' exact render={() => <LandingPage />} />
      <Route path='/register' render={() => <Register />} />
      <Route path='/login' render={() => <Login />} />
      <Route path='/upload' component={Auth(UploadProduct)} />
    </div>
  );
}

export default App;
