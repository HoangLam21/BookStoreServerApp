import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ORDERALL_URL = 'http://167.172.69.8:8010/BookStore/order/all';
const CUSTOMERALL_URL = 'http://167.172.69.8:8010/BookStore/customer/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzc1NTUxMywiaWF0IjoxNzE3NzQ0NzEzLCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBDUkVBVEVfT1JERVIgR0VUX01ZX1BBWU1FTlRTIENBTkNMRV9PUkRFUiBBRE1JTiBBRE1JTl9NQU5BR0UgU1RBRkYgR0VUX1BBWU1FTlRfSU5GT1MgSU1QT1JUX1dPUktfQ1JFQVRFIElNUE9SVF9XT1JLX0ZJTkQgSU1QT1JUX1dPUktfREVMRVRFIFZFUklGWV9PUkRFUiBJTVBPUlRfV09SS19VUERBVEUgR0VUX0NVU1RPTUVSX0lORk9TIn0.KZDLpKMCftzew0K3W6JEtmBHT0MAw2v4kVzATPRGiio';

export default function Income() {
    const [customerListData, setCustomerListData] = useState([]);
    const [orderListData, setOrderListData] = useState([]);

    useEffect(() => {
        //localStorage.setItem('token', token);
        const token = localStorage.getItem('token');

        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(CUSTOMERALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setCustomerListData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching customer data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };
        fetchCustomerData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');


        const fetchOrderData = async () => {
            try {
                const response = await axios.get(ORDERALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setOrderListData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching order data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };
        fetchOrderData();
    }, []);

    useEffect(() => {
        // Ensure data is processed only when both customer and order data are available
        if (Array.isArray(orderListData) && Array.isArray(customerListData)) {
            // Count orders per customer
            const orderCountByCustomer = {};
            orderListData.forEach(order => {
                if (orderCountByCustomer[order.customerId]) {
                    orderCountByCustomer[order.customerId]++;
                } else {
                    orderCountByCustomer[order.customerId] = 1;
                }
            });

            // Get the top 5 customers by order count
            const topCustomers = Object.entries(orderCountByCustomer)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([customerId]) => {
                    const customer = customerListData.find(customer => customer.id === parseInt(customerId));
                    return {
                        ...customer,
                        orderCount: orderCountByCustomer[customerId]
                    };
                });

            setTopCustomers(topCustomers);
        }
    }, [orderListData, customerListData]);

    const [topCustomers, setTopCustomers] = useState([]);

    return (
        <div className="income bg-backgrond--color px-2 pt-2 h-full w-full rounded-lg text-primary--color">
            <h4 className='text-lg'>Khách hàng thân thiết</h4>
            
            <div className="income-content flex justify-around py-2 mb-2 relative text-header--lightcolor border-b-2">
                <div className='justify-start flex w-28 whitespace-nowrap'>Mã khách hàng</div>
                <div lassName=" outcome-total justify-start flex w-44 ">Tên khách hàng</div>
                <div className="outcome-cus-ordernumber  justify-center flex w-32 whitespace-nowrap">Số lượng đơn hàng</div>
            </div>
           

            <div className="income-content-detail overflow-auto w-full h-2/4 mt-2 text-sm ">
                {topCustomers.map((item) => (
                    <Link to={`/admin/KhachHang/${item.id}`} key={item.id} className="  income-detail flex justify-around py-2 mb-2 relative hover:bg-border--color gap-4 hover:no-underline">
                            <div className="outcome-cus-ordernumber  flex w-32 justify-center">KH{item.id}</div>
                            <div className=" outcome-total  w-44 justify-start flex">{item.fullname}</div>
                            <div className="outcome-cus-ordernumber  justify-center flex w-32 ">{item.orderCount}</div>

                    </Link>
                ))}
            </div>
        </div>
    );
}
