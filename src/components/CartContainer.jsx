import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import {RiRefreshFill} from 'react-icons/ri'
import {motion} from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import EmptyCart from '../img/emptyCart.svg'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import CartItem from './CartItem'

const CartContainer = () => {
  const [{cartOpen, cartItems, user}, dispatch] = useStateValue()
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

   const closeCart = () => {
    dispatch({
      type: actionType.SET_CART_OPEN,
      cartOpen: !cartOpen,
    })
  }

  const login = async () => {
    if (!user) {
      const { user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
    return accumulator + item.qty * item.price;
  }, 0);
  setTot(totalPrice);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: []
    })

    localStorage.setItem("cartItems", JSON.stringify([]));
  }
  
  return (
    <motion.div 
    initial={{opacity:0, x: 200}} 
    animate={{opacity:1, x: 0}} 
    exit={{opacity:0, x: 200}} 
    className='fixed top-0 right-0 w-full md:w-460 h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div
         whileTap={{scale:0.75}}
         className="flex flex-between" onClick={closeCart}>
          <MdOutlineKeyboardBackspace className='text-textColor text-3xl' />
        </motion.div>

        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base" onClick={clearCart}>
          Clear <RiRefreshFill />{" "}
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        {/* cart Items section */}
        <div className="w-full h-340 md:h-42 px-6 py-14 pb-20 flex flex-col gap-3 overflow-y-scroll scrollbar-none">

          {/*cart item */}
          {cartItems && cartItems.map((item) => (
            <CartItem 
              key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
            />
          ))}
        </div>

        {/* cart total section */}
        <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
          <div className="w-full flex items-center justify">
            <p className="text-gray-400 text-lg">Sub Total</p>
            <p className="text-gray-400 text-lg">$ {tot}</p>
          </div>
          <div className="w-full flex items-center justify">
            <p className="text-gray-400 text-lg">Dilivery</p>
            <p className="text-gray-400 text-lg">$ 2.5</p>
          </div>

          <div className="w-full border-b border-gray-600 my-2"></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-gray-200 text-xl font-semibold">Total</p>
            <p className="text-gray-200 text-xl font-semibold">${tot + 2.5}</p>
          </div>

          {user ? (
            <motion.button 
          className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg  outline-none' whileTap={{scale: 0.8}}>Check Out</motion.button>
          ) : (
            <motion.button 
          className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg  outline-none' whileTap={{scale: 0.8}} onClick={login}>Login to Check Out</motion.button>
          )}
        </div>
      </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className='w-300' alt="Empty cart" />
          <p className="text-xl text-textColor font-semibold">Add some items to your cart</p>
        </div>
      )}
    </motion.div>
  )
}

export default CartContainer