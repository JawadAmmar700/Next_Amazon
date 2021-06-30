import React, { useState, useEffect } from 'react'
import { selectBasket, REMOVE_ITEM } from '../redux/features/BasketSlice'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Product from '../components/BasketProduct'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { motion, AnimatePresence } from 'framer-motion'
const promise = loadStripe(
  'pk_test_51ICWPNGmEcEmaWVS0lJzvO7M8jrKAeHkSroAyzFNS1USzBtWxtFeGYKJC0GpIWXMmVVeBGNEfI0nAgCes30OcLav0004kbtrco'
)

const Cart = () => {
  const basket = useSelector(selectBasket).slice().reverse()
  const dispatch = useDispatch()
  const [session] = useSession()
  let totalPrice = 0
  for (var i = 0; i < basket.length; i++) {
    totalPrice =
      parseInt(totalPrice) + parseInt(basket[i].price) * basket[i].quantity
  }
  const handleDelete = item => {
    dispatch(REMOVE_ITEM(item))
  }

  const handlePay = async () => {
    const response = await axios.post(`/api/Stripe`, {
      items: basket,
      email: session.user.email,
    })

    const stripe = await promise
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    })
    if (result.error) {
      console.log(result.error)
    }
  }

  return (
    <div className="flex lg:flex-row flex-col bg-gray-100  w-11/12  relative top-24 m-auto">
      <div className="w-full lg:p-5">
        <Image
          src="https://techcrunch.com/wp-content/uploads/2020/07/ECO-Cart-Header_1500x540_Option-1.png"
          width={900}
          height={250}
        />
        <div className="w-full h-20  flex items-center ml-10 border-b border-gray-800 ">
          {basket.length === 0 ? (
            <h1 className="font-bold text-4xl">0 items in basket </h1>
          ) : (
            <h1 className="font-bold text-4xl">Shopping Cart</h1>
          )}
        </div>
        <div className="w-full lg:w-auto bg-white space-y-4 mt-4 ">
          {basket.map((item, id) => (
            <AnimatePresence key={id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: id / 3 }}
                exit={{ opacity: 0 }}
              >
                <Product key={id} item={item} click={handleDelete} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-72 mt-10 h-24 mr-4 bg-white  flex flex-col justify-center items-center ">
        <p>
          Subtotal({basket.length} items): ${basket.length ? totalPrice : 0}
        </p>
        <button
          onClick={handlePay}
          disabled={!session?.user || basket.length === 0 ? true : false}
          className={`w-4/5 h-8 ${
            !session?.user || basket.length === 0
              ? 'bg-gradient-to-b from-gray-300 to-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-b from-yellow-300 to-yellow-500  hover:opacity-90 cursor-pointer'
          }   rounded mt-4   `}
        >
          Proceed to CheckOut
        </button>
      </div>
    </div>
  )
}

export default Cart
