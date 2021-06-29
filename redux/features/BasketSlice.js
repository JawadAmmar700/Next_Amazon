import { createSlice } from '@reduxjs/toolkit'

export const BasketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: [],
  },
  reducers: {
    ADD_BASKET: (state, action) => {
      if (state.basket.length > 0) {
        state.basket.map(item => {
          if (item.id === action.payload.id) {
            let prevQuan = item.quantity
            console.log(item.id, prevQuan)
            const index = state.basket.findIndex(
              basketItem => basketItem.id === action.payload.id
            )
            console.log(index)
            state.basket.splice(index, 1)

            state.basket = [
              ...state.basket,
              { ...action.payload, quantity: prevQuan + 1 },
            ]
            console.log(state.basket)
          } else {
            const index = state.basket.findIndex(
              basketItem => basketItem.id === action.payload.id
            )
            console.log(index)
            if (index < 0) {
              state.basket = [
                ...state.basket,
                { ...action.payload, quantity: 1 },
              ]
            }
            console.log(state.basket)
          }
        })
      } else {
        state.basket = [...state.basket, { ...action.payload, quantity: 1 }]
      }
    },
    REMOVE_ITEM: (state, action) => {
      if (action.payload.quantity === 1) {
        const index = state.basket.findIndex(
          basketItem => basketItem.id === action.payload.id
        )
        let newBasket = [...state.basket]
        if (index >= 0) {
          newBasket.splice(index, 1)
        } else {
          alert('cannot remove ')
        }
        state.basket = newBasket
      } else {
        state.basket.map((item, id) => {
          if (item.id === action.payload.id) {
            let prevQuan = item.quantity
            state.basket.splice(id, 1)
            state.basket = [
              ...state.basket,
              { ...action.payload, quantity: prevQuan - 1 },
            ]
          }
        })
      }
    },
  },
})

export const { ADD_BASKET, REMOVE_ITEM } = BasketSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBasket = state => state.basket.basket

export default BasketSlice.reducer
