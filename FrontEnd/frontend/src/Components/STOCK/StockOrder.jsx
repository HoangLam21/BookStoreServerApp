import React from 'react'
import { useState, useEffect} from 'react';
import { IoSearchOutline } from "react-icons/io5";
import StockOrderData from "../../Data/StockData" 
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import Overlay from "./overlayStock";
import AddStock from './AddStock'
import AllBookData from '../../Data/AllBookData'
import axios from 'axios';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stockfinfor = "flex gap-4 font-light text-primary--color";
const stockInfTitle = "font-medium text-header--lightcolor";
const BOOKALL_URL = 'http://167.172.69.8:8010/BookStore/book/all';
const IMPORTALL_URL = 'http://167.172.69.8:8010/BookStore/import/all';
const UPDATESTATUS_URL = 'http://167.172.69.8:8010/BookStore/import/verify/';
const BOOKADD_URL = 'http://167.172.69.8:8010/BookStore/import/add';

export default function StockOrder() {
    const[searchStock, getSearchStock] = useState('');
    const [booklistdata, setBookListData] = useState([]);
    const [importlist, setImportListData] = useState([]);
    const [statuses, setStatuses] = useState({});
   

    useEffect(() => {
    
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(BOOKALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setBookListData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response.data);
                }
            }
        };

        fetchUserData();
    }, []);
    
    useEffect(() => {
    
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(IMPORTALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setImportListData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response.data);
                }
            }
        };

        fetchUserData();
    }, []);


    const handleSearchStock = (event) => {
        const value = event.target.value;
        getSearchStock(value);
    }

    const filteredData = importlist.filter((item) =>
   
    item.createBy.toLowerCase().includes(searchStock.toLowerCase()) || 
    item.createAt.toLowerCase().includes(searchStock.toLowerCase()) || 
    item.import_total.toLowerCase().includes(searchStock.toLowerCase()))

    function ShippingStatus(ordstatus){
        let status = "";
        if(ordstatus===false){
            status="Chờ xác nhận"
        }
        if(ordstatus===true){
            status="Đã xác nhận"
        }
        return status
    }

    function TextColor(orderstatus){
        let color=""
        if(orderstatus===false){
            color="text-status--0"
        }
        if(orderstatus===true){
            color="text-status--1-3"
        }
        return color

    }

    

    const [showAddStock, setshowAddStock] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false); // State để điều khiển hiển thị overlay


    const openDialog = () => {
        setshowAddStock(true);
        setOverlayVisible(true); // Hiển thị overlay khi mở dialog
    };

    const closeDialog = () => {
        setshowAddStock(false);
        setOverlayVisible(false); // Ẩn overlay khi đóng dialog
    };


    let maxStockId = 0;
    importlist.forEach(order =>{
        const stockId = order.id

        if(stockId>maxStockId){
            maxStockId=stockId;
        }
        console.log(order)

    });

    const newOrderId = 'DH' +(maxStockId + 1).toString().padStart(3,'0'); 


    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    // Định dạng ngày thành chuỗi 'dd/mm/yyyy'
    const formattedDate = `${year}/${month}/${day}`;

    const ProductItem = ({ imageUrl, productName, price, addToCart }) => {
        return (
            <div className="border border-gray-200 p-4 rounded-lg">
                {/* Sử dụng onClick để gọi hàm addToCart khi người dùng nhấp vào sản phẩm */}
                <div onClick={addToCart} className="flex flex-col cursor-pointer">
                    <img src={`data:image/jpeg;base64,${imageUrl}` || 'https://via.placeholder.com/150'} alt={productName} className="w-full  h-64 object-cover mb-2 rounded-lg" />
                    <p className="text-xs font-semibold p-2 overflow-hidden whitespace-normal break-words h-10 ">{productName}</p>
                    <p className="text-gray-700 text-xs py-2 flex justify-end align-text-bottom w-full">{price} vnd</p>
                </div>
            </div>
        );
    };

    
   
    const [cartItems, setCartItems] = useState([]); // State để lưu thông tin về sản phẩm trong giỏ hàng

        // Hàm thêm sản phẩm vào giỏ hàng
        const addToCart = (product) => {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng của sản phẩm đó lên 1
            const updatedCart = cartItems.map((item, index) =>
                index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng là 1
            const productWithInitialQuantity = { ...product, quantity: 1 };
            setCartItems([...cartItems, productWithInitialQuantity]);
        }
    };

    const handleAddOrder = async () => {
        const token = localStorage.getItem('token');
        const importDetailRequests = cartItems.map(item => ({
          book_id: item.id,
          quantity: item.quantity,
          import_cost: item.price*item.quantity // Assuming import_cost is the price of the item
        }));
    
        const requestData = { importDetailRequests };
    
        try {
          const response = await axios.post(BOOKADD_URL, requestData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log('Order added:', response.data);
          // Clear the cart after successful submission
          setCartItems([]);
        } catch (error) {
          console.error('Error adding order:', error);
          if (error.response?.data) {
            console.error("Error response:", error.response.data);
          }
        }
      };

  

    const handleQuantityChange = (e, item) => {
        const newQuantity = parseInt(e.target.value);
        const updatedCart = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        });
        setCartItems(updatedCart);
    };

    const decreaseQuantity = (item) => {
        const updatedCart = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                // Nếu sản phẩm có số lượng lớn hơn 1, giảm số lượng đi 1
                if (cartItem.quantity > 1) {
                    return { ...cartItem, quantity: cartItem.quantity - 1 };
                } else {
                    // Nếu số lượng là 1, loại bỏ sản phẩm khỏi giỏ hàng
                    return null;
                }
            }
            return cartItem;
        }).filter(Boolean); // Loại bỏ các phần tử null khỏi mảng
        setCartItems(updatedCart);
    };

    const increaseQuantity = (item) => {
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCartItems(updatedCart);
    };

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
   

    const totalDiscount = cartItems.reduce((total, item) => total + (item.discount * item.quantity), 0);
   
   


    const handleUpdateStatus = async (event, id) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const url = `${UPDATESTATUS_URL}${id}`;
        console.log(url);

        try {
            const response = await axios.patch(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Status changed:', response.data);
            toast.success('Xác nhận thành công!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Optionally update the orderlistdata if needed
        } catch (error) {
            console.error('Error changing status:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    const handleStatusChange = (id, newStatus) => {
        const currentStatus = statuses[id];
        if (newStatus > currentStatus + 1) {
            toast.error(`Chỉ được cập nhật lên 1 đơn vị từ trạng thái hiện tại: ${ShippingStatus(currentStatus)}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setStatuses((prevStatuses) => ({
                ...prevStatuses,
                [id]: newStatus,
            }));
        }
    };

  return (
    <div className='w-full h-full'>
        <div className="list-chat-search relative flex items-center  w-full border-b h-16 -top-0  border-border--lightcolor">
            <div className='w-2/5 relative flex items-center'>
                <input type="text" value={searchStock} placeholder="Tìm kiếm" className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" onChange={handleSearchStock}/>
                <span className='text-xl absolute right-3 text-primary--color '><IoSearchOutline/></span>
            </div>
            <button
            onClick={openDialog}
            className="btn_addworkshift bg-primary--color text-white--color rounded-full ml-4 cursor-pointer hover:opacity-70 border 
                        h-10 w-28 text-xs 
                        sm:w-26 sm:text-sm
                        md:w-26 md:text-sm
                        lg:w-26 lg:text-sm"
            >
            Nhập Hàng
            </button>
        </div>

        <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-hidden">
                <div className="overflow-x-auto md:overflow-hidden md:w-full sm:w-[96%]">
                    <table className="min-w-full">
                        <thead className="bg-header--lightcolor text-primary--color">
                            <tr>
                                <th className='w-1/5 text-center py-2'>Mã đơn hàng</th>
                                <th className='w-1/6 text-center py-2'>Mã nhân viên</th>
                                <th className='w-1/5 text-center py-2'>Ngày hóa đơn</th>
                                <th className='w-1/6 text-center py-2'>Tổng tiền</th>
                                <th className='w-1/3 text-center py-2'>Trạng thái</th>
                                <th className='w-5/12 text-center py-2'>Xác nhận</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredData.map((item) => {
                                // Định dạng lại ngày createAt
                                const formattedDate = format(new Date(item.createAt), 'dd/MM/yyyy');
                                return (
                                <tr key={item.id} className="hover:bg-backgrond--color">
                                    <td className="w-1/5 text-center py-2">
                                    <Link to={`/admin/DonHang/${item.id}`} key={item.id} className="hover:underline">{item.id}</Link>
                                    </td>
                                    <td className="w-1/6 text-center py-2">{item.createBy}</td>
                                    <td className="w-1/5 text-center py-2">{formattedDate}</td>
                                    <td className="w-1/6 text-center py-2">{item.import_total} vnd</td>
                                    <td className={classNames("w-1/3 text-center py-2", TextColor(item.import_status))}>
                                        {ShippingStatus(item.import_status)}
                                    </td>
                                    <td className=" text-center py-2 flex flex-1 border-t-0">
                                        <select
                                            value={statuses[0]}
                                            onChange={(e) => handleStatusChange(item.id, Number(e.target.value))}
                                            className="border-2 h-7 rounded-md px-2 w-28 text-xs"
                                        >
                                            <option value={0}>Chờ xác nhận</option>
                                            <option value={1}>Đã xác nhận</option>
                                        </select>
                                        <button onClick={(event) => handleUpdateStatus(event, item.id)} className="px-1 text-xs ml-2 w-fit text-white--color whitespace-nowrap bg-primary--color rounded-md">
                                            Xác nhận
                                        </button>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

       
        {showAddStock && (
            <AddStock trigger={setshowAddStock} setTrigger={setshowAddStock}>
                <Overlay isOpen={overlayVisible} onClose={closeDialog}>
                    <h2 className='text-header--lightcolor border-b border-border--color p-2'>Thêm hóa đơn nhập hàng</h2>
                    <div className='flex flex-col w-full h-full'>
                        <div className="HDNH_maincontent_body1 flex gap-8 py-4 text-primary--color w-full h-1/6 items-center">
                            <div className="body1_stocknumber w-32 h-full flex justify-center items-center border-2 rounded-xl border-primary--color">{newOrderId}</div>
                            <div className="body1_des flex flex-col gap-4">
                                <div className={stockfinfor}>
                                    <label for="stockdate" className={stockInfTitle}>Ngày tạo hóa đơn: </label>
                                    <div className="stockdate">{formattedDate}</div>
                                </div>
                                <div className={classNames(stockfinfor, 'flex items-center')}>
                                    <label for="staffnumber" className={stockInfTitle}>Nhân viên tạo: </label>
                                    <input type="text" className="border-2 h-7 border-border--color rounded-md px-2"/>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-4/6 flex overflow-hidden'>
                            <div className='grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 w-2/6 gap-4 h-full md:w-2/3 lg:w-3/4 overflow-auto pr-2'>
                                {booklistdata.map((book, index) => (
                                    <ProductItem key={index} imageUrl={book.galleryManage[0]?.thumbnail || ''} productName={book.title} price={book.price} addToCart={() => addToCart(book)} />
                                ))}
                            </div>
                            <div className='md:w-2/5 w-2/3 lg:w-2/5 h-full p-2 pt-0 flex flex-col gap-4 overflow-hidden'>
                                <h4 className='border-b border-border--lightcolor pb-1'>Chi tiết phiếu nhập</h4>
                                <div className='w-full h-4/6 flex flex-col gap-2 overflow-auto'>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex w-full">
                                            <div className="w-1/4 flex gap-8 items-center justify-center">
                                            <div className="h-14 w-8 rounded-md bg-sky-500 bg-cover bg-no-repeat bg-center">
                                                    <img 
                                                        src={`data:image/jpeg;base64,${item.galleryManage[0]?.thumbnail || ''}`} 
                                                        alt="avatar" 
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex w-3/6 flex-col by-1 justify-around '>
                                                <span className='text-xs font-bold overflow-hidden whitespace-normal break-words'>{item.title}</span>
                                                <span className='text-xs '>{item.price} vnd</span>
                                            </div>
                                            <div className='w-1/3 flex items-center justify-center'>
                                                {/* Nút để giảm số lượng sản phẩm */}
                                                <button onClick={() => decreaseQuantity(item)} className="mr-2">-</button>
                                                {/* Input hiển thị số lượng sản phẩm */}
                                                <input
                                                    type="number"
                                                    value={item.quantity} 
                                                    min={1}
                                                    className="w-10 h-8 border border-gray-300 rounded-md px-2 text-sm focus:outline-none mx-2 "
                                                    onChange={(e) => handleQuantityChange(e, item)}
                                                />
                                                {/* Nút để tăng số lượng sản phẩm */}
                                                <button onClick={() => increaseQuantity(item)}>+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='w-full flex flex-col gap-4 p-2'>
                                    <div className="HDNH_maincontent_footer_total flex justify-between">
                                        <span className={stockInfTitle}>Tổng tiền hàng</span>
                                        <div className="HDNH_total">{totalAmount}</div>
                                    </div>
                                    <div className="HDNH_maincontent_footer_discount flex justify-between">
                                        <span className={stockInfTitle}>Giảm giá</span>
                                        <div className="HDNH_discount ">{totalDiscount}</div>
                                    </div>
                                    <div className="HDNH_maincontent_footer_finaltotal flex justify-between">
                                        <span className=' text-primary--color font-bold'>Tổng thanh toán</span>
                                        <div className="HDNH_finaltotal  text-primary--color font-bold">{totalAmount-totalDiscount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full mt-10 flex justify-center items-center'>
                            <button
                                onClick={handleAddOrder}
                                className=" bg-primary--color text-white--color h-10 w-52 rounded-full ml-4 cursor-pointer hover:opacity-70 border text-xs">
                                Thêm hóa đơn nhập hàng
                            </button>
                        </div>
                        
                    </div>
                    

                </Overlay>
            </AddStock>
        )}
    </div>
  )
}


 