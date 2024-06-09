import {createContext,useState} from 'react'
import {booksData} from "../data/booksData"

export const ShoppingContext = createContext(null);

const getDefaultCart=()=>{
    let cart ={}
    for(let i=1;i<booksData.length+1;i++)
        {
            cart[i]=0;
        }
        return cart;
}

export const ShoppingContextProvider =(props)=>{
    const [cartItem,setCartItem] = useState(getDefaultCart());

    const addToCart=(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    const removeFromCart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue ={cartItem,addToCart,removeFromCart}
    return <ShoppingContext.Provider value={contextValue}>{props.children}</ShoppingContext.Provider>
} 
