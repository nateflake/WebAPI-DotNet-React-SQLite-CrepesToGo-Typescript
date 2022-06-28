import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
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
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import CheckoutPage from "../../features/checkout/CheckoutPage";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
    else {
      setLoading(false);
    }
  }, [setBasket])

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

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/catalog' component={Catalog}></Route>
          <Route path='/catalog/:id' component={ProductDetails}></Route>
          <Route path='/basket' component={BasketPage}></Route>
          <Route path='/checkout' component={CheckoutPage}></Route>
          <Route path='/about' component={AboutPage}></Route>
          <Route path='/contact' component={ContactPage}></Route>
          <Route path='/server-error' component={ServerError}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
