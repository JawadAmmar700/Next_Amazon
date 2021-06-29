import React from 'react'
import Carousal from './Carousal'
import Products from './Product'

const Main = ({ data, categories }) => {
  return (
    <div className="w-full sm:w-4/5 relative  bg-gray-100   mr-auto ml-auto ">
      <Carousal />
      <Products data={data} categories={categories} />
    </div>
  )
}

export default Main
