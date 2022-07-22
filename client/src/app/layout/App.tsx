import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";
import LoadingComponent from "./LoadingComponent";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  })

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Initialising app...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Route exact path='/' component={HomePage}></Route>
      <Route path={'/(.+)'} render={() => (
        <Container sx={{ mt: 8 }}>
          <Switch>
            <Route exact path='/catalog' component={Catalog}></Route>
            <Route path='/catalog/:id' component={ProductDetails}></Route>
            <Route path='/basket' component={BasketPage}></Route>
            <PrivateRoute path='/checkout' component={CheckoutWrapper}></PrivateRoute>
            <PrivateRoute path='/orders' component={Orders}></PrivateRoute>
            <PrivateRoute roles={['Admin']} path='/inventory' component={Inventory}></PrivateRoute>
            <Route path='/about' component={AboutPage}></Route>
            <Route path='/contact' component={ContactPage}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/server-error' component={ServerError}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Container>
      )}>
      </Route>
    </ThemeProvider>
  );
}

export default App;
