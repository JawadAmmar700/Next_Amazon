import React from "react"
import Carousal from "./Carousal"
import Product from "./Product"

const Main = ({ data, categories }) => {
  return (
    <div className="w-full sm:w-4/5 relative  bg-gray-100   mr-auto ml-auto ">
      <Carousal />
      <Product data={data} categories={categories} />
    </div>
  )
}

export default Main
