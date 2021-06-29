import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { getSession } from 'next-auth/client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const getServerSideProps = async context => {
  const session = await getSession(context)
  const data = await db
    .collection('users')
    .doc(session?.user?.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get()
  const orders = data.docs.map(item => item.data())

  return { props: { orders: JSON.stringify(orders) } }
}

const Orders = ({ orders }) => {
  return (
    <div className="w-full h-screen overflow-y-auto bg-green-100">
      <div className="relative top-24 w-4/5 m-auto rounded">
        <h1 className="w-full font-bold border-b border-gray-600">
          Your Orders
        </h1>
        <p className="mt-2">{JSON.parse(orders).length} orders</p>
        {JSON.parse(orders).map((item, id) => (
          <motion.div
            className="w-full mt-4"
            key={id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: id / 3 }}
          >
            <div className="w-full rounded  bg-gray-200 flex justify-between p-1 items-center">
              <p>{new Date(item.timestamp.seconds).toUTCString()} </p>
              <p>{item.images.length} items</p>
            </div>
            <div className="flex space-x-4 overflow-x-auto w-full bg-white  mt-2">
              {item.images.map(img => (
                <Image
                  src={img}
                  alt=""
                  width={150}
                  height={150}
                  className="ml-4"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Orders
