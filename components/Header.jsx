import React, { useState, useEffect } from 'react'
import {
  SearchIcon,
  ShoppingCartIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { selectBasket } from '../redux/features/BasketSlice'
import { Input } from '../redux/features/SearchSlice'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

const Header = ({}) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const basket = useSelector(selectBasket)

  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const HandleBasket = () => {
    router.push('/Cart')
  }

  const handleInput = e => {
    setSearch(e.target.value)
  }

  const handleClickSearch = e => {
    e.preventDefault()
    dispatch(Input(search))
    setSearch('')
  }

  return (
    <header className="w-full fixed z-10 ">
      <div className="w-full h-12 bg-gray-700 flex  items-center justify-between  ">
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="amazon logo"
            className="h-6 ml-4 cursor-pointer"
          />
        </Link>
        <div className=" items-center rounded bg-white justify-between ml-4 mr-4 h-8 flex-grow hidden lg:flex ">
          <form onSubmit={handleClickSearch}>
            <input
              type="text"
              value={search}
              onChange={handleInput}
              className="flex-grow h-8 ml-1  rounded-l outline-none "
            />
          </form>
          <button
            type="submit"
            className="w-10  h-8 rounded-r bg-red-600 hover:bg-red-400  cursor-pointer flex items-center justify-center"
          >
            <SearchIcon className="h-6" />
          </button>
        </div>
        <div className="flex items-center cursor-pointer space-x-3 mr-4  text-white">
          <div onClick={!session?.user ? signIn : signOut}>
            <p className="text-sm">Heloo, {session?.user?.name}</p>
            <p>Account and Lists</p>
          </div>
          <div>
            <p className="text-sm ">Returns</p>
            <p>& Orders</p>
          </div>
          <div
            className="sm:flex sm:items-center relative"
            onClick={HandleBasket}
          >
            <ShoppingCartIcon className="h-7" />
            <p className="hidden sm:inline sm:ml-2">basket</p>
            <div className="absolute -right-2 sm:right-11 -top-1 w-4 h-4 bg-yellow-300 rounded-full flex items-center justify-center">
              {basket.length}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-10 bg-gray-600  flex items-center">
        <div className="flex ml-4 space-x-2 text-white cursor-pointer">
          <div className="flex items-center text-white">
            <MenuIcon className="h-6" />
            <p className="ml-1">All</p>
          </div>
          <p className="">Prime Video</p>
          <p>Amazon Business</p>
          <p>Today's Deal </p>
          <p className="hidden  sm:block">Electronics</p>
          <p className="hidden  sm:block">Food & Grocery </p>
          <p className="hidden  sm:block">Prime </p>
          <p className="hidden  lg:block">Buy Again</p>
          <p className="hidden  lg:block">Shopper Toolkit </p>
          <p className="hidden  lg:block">Healh & Personal Care </p>
        </div>
      </div>
    </header>
  )
}

export default Header
