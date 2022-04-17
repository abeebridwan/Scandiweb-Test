import React from 'react'
import { DataContext } from "./context/contextData";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './container/header';
import Cart from "./container/pageCart"
import PLP from './container/products';
import PDP from './container/desc';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changeCategoryTo: sessionStorage.getItem("name") || "all",
      currencyIndex: localStorage.getItem("index") || 0,
      cartIdValues: JSON.parse(localStorage.getItem("cartIdValues")) || {},
      category: null,
      productId: null
    };
    this.changeCategory = this.changeCategory.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.addRemoveFromCart = this.addRemoveFromCart.bind(this);
    this.pickedProduct = this.pickedProduct.bind(this);
    this.setToCatNull = this.setToCatNull.bind(this);

  }
  setToCatNull() {
    this.setState({ category: null })
  }

  pickedProduct(productId, category) {
    console.log({ productId, category })
    this.setState({ productId, category })
  }

  changeCurrency(currencyIndex) {
    this.setState({ currencyIndex })
  }

  changeCategory(changeCategoryTo) {
    this.setState({ changeCategoryTo })
  }

  addRemoveFromCart(idValue, decrement = false) {
    const { cartIdValues } = this.state;
    if (decrement) {
      if (!cartIdValues[idValue]) { return }
      cartIdValues[idValue] -= 1;
      if (cartIdValues[idValue] === 0) { delete cartIdValues[idValue] }
    } else {
      !cartIdValues[idValue] && !decrement ? cartIdValues[idValue] = 1 : cartIdValues[idValue] += 1;
    }
    localStorage.setItem("cartIdValues", JSON.stringify(cartIdValues))
    this.setState({ cartIdValues })
  }
  render() {
    const { cartIdValues, changeCategoryTo, currencyIndex, productId, category } = this.state;
    return (
      <DataContext.Provider value={{
        changeCurrency: this.changeCurrency,
        addRemoveFromCart: this.addRemoveFromCart,
        changeCategory: this.changeCategory,
        changeCategoryTo: changeCategoryTo,
        pickedProduct: this.pickedProduct,
        setToCatNull: this.setToCatNull,
        currencyIndex,
        cartIdValues,
        productId,
        category
      }}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PLP />} />
              <Route path="cart" element={<Cart />} />
              <Route path="pdp" element={<PDP />} />
            </Route>
          </Routes>
        </Router>
      </DataContext.Provider>
    )
  }
}

export default App;
