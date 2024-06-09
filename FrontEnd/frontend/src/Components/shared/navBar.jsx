import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Assets/Book Store (3).png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Cart from "../CustomerFrontEnd/Cart/cart";
import Account from "../CustomerFrontEnd/Account/account";
import './NavBar.css'
import axios from "axios";
import { useBook2 } from "../../Components/context/BookContext";

export default function NavBar() {
  const [searchHovered, setSearchHovered] = useState(false);
  const [cartHovered, setCartHovered] = useState(false);
  const [userHovered, setUserHovered] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isAccountOpen, setIsAccountOpen] = useState(false); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { selectedBook, setSelectedBook } = useBook2();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/book/all");
        setBooks(response.data.result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isCartOpen || isAccountOpen || isSearchOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isCartOpen, isAccountOpen, isSearchOpen]);

  useEffect(() => {
    const filteredSuggestions = books.filter(book =>
      book.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    console.log("suggestions", suggestions);
  }, [searchInput, books]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); 
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false); 
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSuggestionClick = (book) => {
    setSelectedBook(book);
    setIsSearchOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <div className="header">
      <input type="checkbox" id="toggler" className="hidden" checked={menuOpen} onChange={handleMenuToggle} />
      <label htmlFor="toggler" className="fabar-container">
        <FontAwesomeIcon icon={faBars} className="fabar" style={{ fontSize: '1.3rem' }} />
      </label>
      <div>
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      <div className={`navbar ${menuOpen ? 'open' : ''}`}>
        <Link to="/home" onClick={handleMenuItemClick} className={`text-color-main-2 text-xl font-garamond font-semibold ${isActive('/home')}`}>Home</Link>
        <Link to="/books" onClick={handleMenuItemClick} className={`text-color-main-2 text-xl font-garamond font-semibold ${isActive('/books')}`}>Books</Link>
        <Link to="/discount" onClick={handleMenuItemClick} className={`text-color-main-2 text-xl font-garamond font-semibold ${isActive('/discount')}`}>Discount</Link>
        <Link to="/contact" onClick={handleMenuItemClick} className={`text-color-main-2 text-xl font-garamond font-semibold ${isActive('/contact')}`}>Contact</Link>
        <Link to="/customerCare" onClick={handleMenuItemClick} className={`text-color-main-2 text-xl font-garamond font-semibold ${isActive('/customerCare')}`}>Customer Care</Link>
        <Link to="/aboutUs" onClick={handleMenuItemClick} className={`text-color-main-2 text-xl font-garamond font-semibold ${isActive('/aboutUs')}`}>About Us</Link>
      </div>
      <div>
        <FontAwesomeIcon
          style={{ marginLeft: '1.3rem', color: searchHovered ? '#513820' : '#a89b8f', fontSize: '1.1rem' }}
          icon={faSearch}
          onClick={toggleSearch}
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => setSearchHovered(false)}
          className="hover:text-color-main hover:scale-110"
        />
        <FontAwesomeIcon
          style={{ marginLeft: '1rem', color: cartHovered ? '#513820' : '#a89b8f', fontSize: '1.1rem' }}
          icon={faCartShopping}
          onClick={toggleCart}
          onMouseEnter={() => setCartHovered(true)}
          onMouseLeave={() => setCartHovered(false)}
          className="hover:text-color-main hover:scale-110"
        />
        <FontAwesomeIcon
          style={{ marginLeft: '1rem', color: userHovered ? '#513820' : '#a89b8f', fontSize: '1.1rem' }}
          icon={faUser}
          onClick={toggleAccount}
          onMouseEnter={() => setUserHovered(true)}
          onMouseLeave={() => setUserHovered(false)}
          className="hover:text-color-main hover:scale-110"
        />
        {(isCartOpen || isAccountOpen) && (
          <div className="fixed inset-0 bg-background--overlay opacity-50 z-40" onClick={() => {
            if (isCartOpen) setIsCartOpen(false);
            if (isAccountOpen) setIsAccountOpen(false);
          }} />
        )}
        {(isSearchOpen) && (
          <div className="fixed inset-0  opacity-50 z-40" onClick={() => {
            if (isSearchOpen) setIsSearchOpen(false);
          }} />
        )}
        {isCartOpen && (
          <div className="fixed h-full w-auto top-0 right-0 bottom-0 bg-backgrond--color shadow-md z-50">
            <div className="mx-auto pt-5 pl-10 pr-10">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-color-main text-3xl font-garamond font-light"><i>Your Cart</i></h1>
                </div>
                <FontAwesomeIcon
                  style={{ color: "#a89b8f", fontSize: "1.1rem" }}
                  icon={faXmark}
                  onClick={toggleCart}
                  className="hover:text-color-main hover:scale-110 cursor-pointer"
                />
              </div>
              <Cart />
            </div>
          </div>
        )}
        {isAccountOpen && (
          <div className="fixed h-full w-auto top-0 right-0 bottom-0 bg-white--color shadow-md z-50">
            <div className="mx-auto pt-5 pl-10 pr-10">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-color-main text-3xl font-garamond font-light"><i>Account</i></h1>
                </div>
                <FontAwesomeIcon
                  style={{ color: "#a89b8f", fontSize: "1.1rem" }}
                  icon={faXmark}
                  onClick={toggleAccount}
                  className="hover:text-color-main hover:scale-110 cursor-pointer"
                />
              </div>
              <Account />
            </div>
          </div>
        )}
        {isSearchOpen && (
          <div className="fixed top-24 left-0 right-0 w-full h-auto pt-3 pb-3 bg-white--color z-50">
            <div className="flex justify-around">
              <span className="text-color-main text-xl font-garamond mr-3 font-semibold">Search</span>
              <input 
                className="text-color-main text-xl font-garamond font-semibold h-9 border w-2/3 rounded-md pl-1 border-color-main-2" 
                type="text" 
                value={searchInput} 
                onChange={handleSearchInputChange} 
              />
              <FontAwesomeIcon
                style={{ color: "#a89b8f", fontSize: "1.1em" }}
                icon={faXmark}
                onClick={toggleSearch}
                className="hover:text-color-main hover:scale-110 cursor-pointer"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="suggestions bg-white--color border border-color-main-2 rounded-md mt-2">
                {suggestions.map((suggestion) => (
                  <Link
                    to="/detailBook"
                    onClick={() => handleSuggestionClick(suggestion)}
                    key={suggestion.id}
                    className="link-book"
                  >
                    <div className="suggestion-item text-color-main text-l font-garamond p-2 hover:bg-color-main-2 cursor-pointer">
                      {suggestion.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
