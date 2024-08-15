
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const CartContext = createContext();



const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCardItem = localStorage.getItem('cart');
        if (existingCardItem)
            setCart(JSON.parse(existingCardItem));
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);


export { useCart, CartProvider };