import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const Success = () => {
  const router = useRouter()
  return (
    <div className="w-full h-screen bg-green-100">
      <AnimatePresence>
        <motion.div
          className="w-4/5 p-5 relative top-24 bg-white m-auto"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, duration: 1.5 }}
          transition={{ type: 'spring', stiffness: 200 }}
          exit={{ opacity: 0, y: -100 }}
        >
          <div className="flex space-x-4">
            <CheckCircleIcon className="h-6 bg-green-500 rounded-full" />
            <p>Thanks for, your order has been confirmed</p>
          </div>
          <p className="mt-2">
            Thank you for shopping with us. We will send a conformation once
            your items has shipped, if you would like to chect the status
            order(s) phase press the link below.
          </p>
          <button
            onClick={() => router.push('/Orders')}
            className=" w-full h-8   rounded mt-4  bg-gradient-to-b from-yellow-300 to-yellow-500 hover:opacity-90"
          >
            Go to my orders
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Success
