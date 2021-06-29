import React from 'react'
import { useDispatch } from 'react-redux'
import { ADD_BASKET, REMOVE_ITEM } from '../redux/features/BasketSlice'
import { PlusIcon, MinusIcon } from '@heroicons/react/outline'

const BasketProduct = ({ item, click }) => {
  const dispatch = useDispatch()
  const { title, price, description, image, quantity } = item

  const DelQuan = item => {
    if (quantity > 1) {
      dispatch(REMOVE_ITEM(item))
    }
  }

  return (
    <div className="flex items-center justify-between rounded bg-white">
      <img src={image} className="w-32 h-44 lg:w-48 lg:h-48" />
      <div className="ml-4 flex flex-col w-44 mt-6 mr-60">
        <h1 className="font-bold text-sm lg:w-96">{title}</h1>
        <p className="w-60 sm:w-60 lg:w-96 text-sm mt-4 ">
          {description.split('.')[0]}.
        </p>
        <p>${price}</p>
      </div>
      <div className="flex flex-col space-y-3 mr-4">
        <div className="flex justify-center items-center space-x-2 ">
          <div
            onClick={() => DelQuan(item)}
            className="w-6 h-6 rounded cursor-pointer hover:bg-gray-300 bg-gray-400"
          >
            <MinusIcon className="h-6" />
          </div>
          <p>{quantity}</p>
          <div
            onClick={() => dispatch(ADD_BASKET(item))}
            className="w-6 h-6 cursor-pointer rounded hover:bg-gray-300 bg-gray-400"
          >
            <PlusIcon className="h-6" />
          </div>
        </div>
        <button
          onClick={() => click(item)}
          className=" w-62 h-8 mb-4 rounded mt-4 border-0 outline-none bg-gradient-to-b from-yellow-300 to-yellow-500 hover:opacity-90"
        >
          Remove from Basket
        </button>
      </div>
    </div>
  )
}

export default BasketProduct
