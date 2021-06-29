import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Carousal = () => {
  return (
    <div className=" bg-blue-600 relative top-24  z-1">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        renderIndicator={false}
        showThumbs={false}
        showStatus={false}
      >
        <div className=" w-full">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg"
            alt=""
          />
        </div>
        <div className=" w-full">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Launches/Arabic/Fuji_TallHero_Arabic_Language_en_US_1x._CB424660381_.jpg"
            alt=""
          />
        </div>
        <div className=" w-full">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg"
            alt=""
          />
        </div>
      </Carousel>
      <div className="sm:w-full sm:h-44 bg-gradient-to-b from-transparent to-gray-100  absolute bottom-0 "></div>
    </div>
  )
}

export default Carousal
