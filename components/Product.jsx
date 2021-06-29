import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_BASKET } from '../redux/features/BasketSlice'
import { selectInput, Input } from '../redux/features/SearchSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import { ChevronDoubleUpIcon } from '@heroicons/react/outline'
import sortArray from 'sort-array'
import 'react-toastify/dist/ReactToastify.css'

const Product = ({ data, categories }) => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState(data)
  const [productPrice, setProductPrice] = useState([])
  const [active, setActive] = useState(-1)
  const input = useSelector(selectInput)
  const ref = useRef()

  useEffect(() => {
    if (input) {
      if (input.split(' ').length == 1) {
        let filterByInput = []
        const OriginalProduct = [...product]
        OriginalProduct.map(item => {
          item.title.split(' ').map(word => {
            if (word.toLowerCase() === input.toLowerCase()) {
              filterByInput.push(item)
            }
          })
        })

        filterByInput.length !== 0
          ? setProductPrice(filterByInput)
          : toast('nothing found in the store')
        dispatch(Input(''))
      } else {
        const filtered = [...product].filter(item =>
          item.title.toLowerCase().includes(input.toLowerCase())
        )
        setProductPrice(filtered)
      }
    }
  }, [input])

  const Change = (item1, id) => {
    setProductPrice([])
    setActive(id)
    if (item1 === 'All Products') return setProduct(data)
    const filtered = data.filter(item => item.category === item1)
    setProduct(filtered)
  }

  const handleClickBasket = item => {
    dispatch(ADD_BASKET(item))
    toast(`${item.title} is added to the basket`)
  }
  const ScrollIntoTop = () => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  const SortByPrice = type => {
    if (type == 0) {
      const sorted = [...product]
      setProductPrice(sorted)
    } else {
      const sorted = sortArray([...product], {
        by: 'price',
        order: type == 1 ? 'desc' : 'asc',
      })
      setProductPrice(sorted)
    }
  }

  return (
    <div className="flex flex-col lg:grid lg:place-items-center relative bottom-4   lg:grid-cols-4 items-center    justify-evenly w-full bg-tranparent">
      <div ref={ref} className="absolute -top-96 -mt-12"></div>
      <div className="lg:col-span-1 w-44 p-2 flex flex-col space-y-2 absolute left-9 top-24 bg-white ">
        {categories?.map((item, id) => (
          <p
            key={id}
            onClick={() => Change(item, id)}
            className={`h-9 flex items-center p-2 ${
              id === active ? 'bg-gray-500 text-white' : ''
            } rounded hover:text-white  cursor-pointer hover:bg-gray-500`}
          >
            {item}
          </p>
        ))}
        <p>Sort by price</p>

        <select
          onChange={e => SortByPrice(e.target.value)}
          className="cursor-pointer"
        >
          <option value="0">Default prices</option>
          <option value="1">High to Low</option>
          <option value="2">Low to High</option>
        </select>
      </div>

      <div className="lg:col-span-3 grid grid-cols-1 lg:relative lg:left-1/4 ml-20 lg:w-full lg:place-items-center   lg:grid-cols-3   ">
        {productPrice.length === 0
          ? product.map(item => (
              <AnimatePresence key={item.id}>
                <motion.div
                  className=" w-64 p-2 bg-white rounded text-black relative space-y-2  flex mt-4 items-center justify-center"
                  initial={{ y: 15, display: 'none', opacity: 0 }}
                  animate={{
                    y: 0,
                    display: 'block',
                    opacity: 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    delay: item.id / 6,
                  }}
                  exit={{ display: 'none', y: 15, opacity: 0 }}
                  key={item.id}
                >
                  <p className="absolute top-1 right-2 text-gray-300">
                    {item.category}
                  </p>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    className="w-20 h-20  "
                    alt=""
                  />
                  <p className=" h-12 text-center font-bold overflow-hidden">
                    {item.title}
                  </p>
                  <p className="h-12 font-bold text-sm">
                    {item.description.substr(0, 60)}...
                  </p>
                  <div className="relative flex  top-0">
                    {Array(item.rating)
                      .fill('')
                      .map((item, id) => (
                        <p key={id}>⭐</p>
                      ))}
                  </div>
                  <p className="relative top-0">${item.price}</p>
                  <button
                    onClick={() => handleClickBasket(item)}
                    className="w-5/6 h-8 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:opacity-90 rounded"
                  >
                    Add to basket
                  </button>
                </motion.div>
              </AnimatePresence>
            ))
          : productPrice.map(item => (
              <AnimatePresence key={item.id}>
                <motion.div
                  className=" w-64 p-2 bg-white rounded text-black relative space-y-4  flex mt-4 items-center justify-center"
                  initial={{ y: 15, display: 'none', opacity: 0 }}
                  animate={{
                    y: 0,
                    display: 'block',
                    opacity: 1,
                    duration: 1.5,
                  }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  exit={{ display: 'none', y: 15, opacity: 0 }}
                  key={item.id}
                >
                  <p className="absolute top-1 right-2 text-gray-300">
                    {item.category}
                  </p>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    className="w-20 h-20  "
                    alt=""
                  />
                  <p className=" h-12 font-bold text-center overflow-hidden">
                    {item.title}
                  </p>
                  <p className="h-12 font-bold">
                    {item.description.substr(0, 60)}...
                  </p>
                  <div className="relative flex top-5">
                    {Array(item.rating)
                      .fill('')
                      .map((item, id) => (
                        <p key={id}>⭐</p>
                      ))}
                  </div>
                  <p className="relative top-2">${item.price}</p>
                  <button
                    onClick={() => handleClickBasket(item)}
                    className="w-5/6 h-8  rounded bg-gradient-to-b from-yellow-300 to-yellow-500 hover:opacity-90"
                  >
                    Add to basket
                  </button>
                </motion.div>
              </AnimatePresence>
            ))}
      </div>

      <div
        onClick={ScrollIntoTop}
        className="absolute bottom-2 w-10 flex items-center justify-center cursor-pointer rounded-sm animate-bounce h-10 bg-green-500 -right-24 "
      >
        <ChevronDoubleUpIcon className="h-6" />
      </div>
      <ToastContainer className="mt-20" />
    </div>
  )
}

export default Product
