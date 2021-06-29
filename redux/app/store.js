import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from '../features/ProductSlice'
import BasketReducer from '../features/BasketSlice'
import SearchReducer from '../features/SearchSlice'

export default configureStore({
  reducer: {
    Product: ProductReducer,
    basket: BasketReducer,
    Search: SearchReducer,
  },
})
