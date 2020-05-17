import React, { useEffect } from 'react';
import AppNavbar from './components/Navbar';
import { Route } from 'react-router';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { Register } from './components/Register';
import { Login } from './components/Login';
import { AUTH, LOGIN, SET_PRODUCTS_COUNT,SET_LOADING } from './redux/reducers/types'
import { UploadProduct } from './components/UplaodProduct';
import { Auth } from './hoc/auth';
import { LandingPage } from './components/LandingPage/LandingPage';
import { DetailProductPage } from './components/DetailProductPage/DetailProductPage';
import {Cart} from './components/Cart/Cart'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    document.cookie && Axios.get('api/users/auth')
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

      dispatch({ type: SET_LOADING, payload: true })
      Axios.post('http://localhost:5000/api/products/getAllProducts')
        .then(res => {
            console.log('App')
            if (res.data.success) {
              dispatch({ type: SET_LOADING, payload: false })
              dispatch({type:SET_PRODUCTS_COUNT,payload:res.data.products.length})

            } else {
                alert('Failed to load data')
                dispatch({ type: SET_LOADING, payload: false })
            }
        })
        .catch(err => console.log('Server error', err))

  }, [dispatch])





  return (
    <div className="App">
      <AppNavbar />
      <Route path='/' exact render={() => <LandingPage />} />
      <Route path='/register' render={() => <Register />} />
      <Route path='/login' render={() => <Login />} />
      <Route path='/upload' component={Auth(UploadProduct)} />
      <Route path='/cart' component={Auth(Cart)} />
      <Route exact path='/products/:productId' render={() => <DetailProductPage />} />
    </div>
  );
}

export default App;
