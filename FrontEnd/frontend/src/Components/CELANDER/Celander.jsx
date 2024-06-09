import React, { useState, useEffect } from 'react';
import CelanderTop from './celanderTop';
import CelanderCLD from './celanderCLD';
import CelendarStaff from './celanderStaff';
import AddWorkshift from './AddWorkshift';
import UpdateWorkshift from './AddWorkshift';
import './Celander.css';
import CelanderAdd from './celanderCLDAdd';
import Overlay from "./overlay.js";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Celander = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddWorkShift, setShowAddWorkShift] = useState(false);
    const [showUpdateWorkShift, setShowUpdateWorkShift] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [shiftwork, setShiftWork] = useState('');
    const [staffwork, setStaffWork] = useState('');
    const [staffListData, setStaffListData] = useState([]);
    const [shift_id, setShift_id] = useState('');
    const [staff_id, setStaff_id] = useState('');
    const [new_shift_id, setNewShiftId] = useState('');
    const [new_staff_id, setNewStaffId] = useState('');
    const [selectedShifts, setSelectedShifts] = useState([]);


    //const token = localStorage.getItem('token');
    const SHIFTADD_URL = 'http://167.172.69.8:8010/BookStore/shift/add';
    const SHIFTWORKADD_URL = 'http://167.172.69.8:8010/BookStore/schedule/add';
    const STAFFALL_URL = 'http://167.172.69.8:8010/BookStore/staff/all';
    const SCHEDULEALL_URL = 'http://167.172.69.8:8010/BookStore/schedule/all';
    const url = `http://167.172.69.8:8010/BookStore/schedule/delete/${staff_id}&${shift_id}`;


    const [shiftlistdata, setShiftListData] = useState([]);


    useEffect (() =>{
        //localStorage.setItem('token', token);

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(SCHEDULEALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setShiftListData(result);
                console.log(result);
            }catch(error){
                console.error('Error fetching user data:', error);
                if(error.response?.data){
                    console.error("Error response:", error.response?.data)
                }
            }
        };
        fetchUserData();
    },[])

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(STAFFALL_URL, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = response.data.result;
                setStaffListData(result);
            } catch (error) {
                console.error('Error fetching user data:', error.response?.data || error);
            }
        };

        fetchUserData();
    }, []);

    // useEffect(() => {
    //     const fetchShiftData = async () => {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             console.error('No token found, please log in.');
    //             return;
    //         }

    //         try {
    //             const response = await axios.get(SCHEDULEALL_URL, {
    //                 headers: { 'Authorization': `Bearer ${token}` }
    //             });
    //             const result = response.data.result;
    //             const foundShift = result.find(shift => shift.shift.id === parseInt(workShiftId, 10));
    //             if (foundShift) {
    //                 setSelectedDate(new Date(foundShift.shift.start_time));
    //                 setShiftWork(foundShift.shift.id);
    //                 setStaffWork(foundShift.fullname);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching shift data:', error.response?.data || error);
    //         }
    //     };

    //     if (workShiftId) {
    //         fetchShiftData();
    //     }
    // }, [workShiftId]);

    const handleSearch = (value) => setSearchTerm(value);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    
    const openDialog = () => {
        setShowAddWorkShift(true);
        setShowUpdateWorkShift(false);
        setOverlayVisible(true);
    };

    const closeDialog = () => {
        setShowAddWorkShift(false);
        
        setOverlayVisible(false);
    };

    const openUpdateDialog = () => {
        setShowUpdateWorkShift(true);
        setShowAddWorkShift(false);
        setOverlayVisible(true);
    };

    const closeUpdateDialog = () => {
        setShowUpdateWorkShift(false);
        setOverlayVisible(false);
    };

    const getShiftTimes = (shiftwork, date) => {
        const baseDate = new Date(date);
        let startTime, endTime;
    
        switch (shiftwork) {
            case '1':
                startTime = new Date(baseDate.setHours(6, 0, 0, 0));
                endTime = new Date(baseDate.setHours(9, 0, 0, 0));
                break;
            case '2':
                startTime = new Date(baseDate.setHours(9, 0, 0, 0));
                endTime = new Date(baseDate.setHours(12, 0, 0, 0));
                break;
            case '3':
                startTime = new Date(baseDate.setHours(12, 0, 0, 0));
                endTime = new Date(baseDate.setHours(15, 0, 0, 0));
                break;
            // Add more cases as needed for different shifts
            default:
                startTime = baseDate;
                endTime = baseDate;
        }
    
        return {
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString()
        };
    };

    const handleAddShift = async (event) => {
        const token = localStorage.getItem('token');
        event.preventDefault();

        const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
        const { start_time, end_time } = getShiftTimes(shiftwork, formattedDate);

        const requestShiftData = {
            start_time,
            end_time,
            description: null
        };

        const requestData = {
            staff_id: staffwork,
            shift_id: shiftwork,
            hasWorkThisShift: true
        };

        try {
            const shiftResponse = await axios.post(SHIFTADD_URL, requestShiftData, {
                
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Shift added:', shiftResponse.data);

            const shiftworkResponse = await axios.post(SHIFTWORKADD_URL, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Shiftwork added:', shiftworkResponse.data);

            // Reset form fields
            setStaffWork('');
            setShiftWork('');
            setSelectedDate(null);
            closeDialog();
            // Add any additional logic after successful deletion, e.g., update state or UI
            toast.success("Stock deleted successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
        } catch (error) {
            console.error('Error adding shift:', error.response?.data || error);
        }
    };

    const handleUpdateShift = async (event) => {
        event.preventDefault();
        toast.warn(
            <div className='flex flex-col'>
             <p>Bạn có muốn xóa đơn hàng này</p>
               <div className='flex w-full py-1 justify-between'>
               <button onClick={confirmDelete}>Confirm</button>
               <button onClick={() => toast.dismiss()}>Cancel</button>
               </div>
             
            </div>,
            {
              position: "top-center",
              autoClose: false,
              closeOnClick: true,
              draggable: true,
              pauseOnHover: true,
              progress: undefined
            }
          );
        };
        
        const confirmDelete = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.delete(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Shift updated:', response.data);
                closeUpdateDialog();
                console.log('Stock deleted:', response.data);
                // Add any additional logic after successful deletion, e.g., update state or UI
                toast.success("Stock deleted successfully!", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                });
            }
            catch (error) {
                console.error('Error deleting stock:', error);
                if (error.response?.data) {
                  console.error("Error response:", error.response.data);
                }
                toast.error("Error deleting stock. Please try again later.", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                });
              }
    };

   
    const handleWorkShiftChange = (index, value) => {
        setSelectedShifts(prevShifts => {
          const updatedShifts = [...prevShifts];
          updatedShifts[index] = value;
          return updatedShifts;
        });
      };

    return (
        <div className='w-full h-full overflow-hidden'>
            <div className='flex flex-col w-full h-full lg:overflow-hidden overflow-y-auto'>
                <CelanderTop onSearch={handleSearch} triggerAddWorkShift={openDialog} triggerUpdateWorkShift={openUpdateDialog} />
            
                <div className='flex lg:flex-row lg:flex-1 h-full flex-col text-xs'>
                    <div className='lg:flex-1 lg:flex lg:items-center'>
                        <CelanderCLD />
                    </div>
                    <div className='lg:flex-1 h-auto mt-4 px-3'>
                        <CelendarStaff searchTerm={searchTerm} />
                    </div>
                </div>
            </div>

            {showAddWorkShift && (
                <AddWorkshift trigger={setShowAddWorkShift} setTrigger={setShowAddWorkShift} onDateSelect={handleDateSelect}>
                    <Overlay isOpen={overlayVisible} onClose={closeDialog}>
                        <form onSubmit={handleAddShift}>
                            <div className="pb-2 top-0 text-lg border-b h-10">
                                <h2 className="">Phân chia công việc</h2>
                            </div>
                            <div className="flex flex-col gap-4 text-xs">
                                <div className="flex flex-col h-full">
                                    <div className='flex gap-10 items-center mt-5 h-1/4'>
                                        <span className="">Chọn ngày</span>
                                        <label className='border-2 flex justify-center items-center h-8 md:w-60 w-40 border-border--color rounded-md md:px-2'>
                                            {selectedDate ? selectedDate.toDateString() : ''}
                                        </label>
                                    </div>
                                    <div className='flex items-center justify-center mt-4 h-3/6'>
                                        <CelanderAdd onDateSelect={handleDateSelect} />
                                    </div>
                                </div>
                                <div className='flex flex-col h-40'>
                                    <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
                                        <span>Chọn ca </span>
                                        <input
                                            type="text"
                                            value={shiftwork}
                                            onChange={(e) => setShiftWork(e.target.value)}
                                            name='shift'
                                            className="border-2 h-7 border-border--color rounded-md px-2 ml-1 lg:ml-1 md:ml-0 w-40"
                                        />
                                    </div>
                                    <div className="flex mt-2 gap-6 items-center">
                                        <span>Chọn nhân viên </span>
                                        <select
                                            value={staffwork}
                                            onChange={(e) => setStaffWork(e.target.value)}
                                            name='staff'
                                            className="border-2 h-7 border-border--color rounded-md px-2 w-40"
                                        >
                                            <option value="">Chọn nhân viên</option>
                                            {staffListData.map((staff, index) => (
                                                <option key={index} value={staff.id}>
                                                    {staff.fullname} - NV{staff.id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="choose-workshift_footer flex mt-4 justify-center">
                                        <button
                                            type="submit"
                                            className="border w-32 h-8 rounded-md bg-primary--color text-white--color"
                                        >
                                            Tạo việc
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Overlay>
                </AddWorkshift>
            )}

            {showUpdateWorkShift && (
                <UpdateWorkshift trigger={setShowUpdateWorkShift} setTrigger={setShowUpdateWorkShift} onDateSelect={handleDateSelect}>
                    <Overlay isOpen={overlayVisible} onClose={closeDialog}>
                        <form onSubmit={handleUpdateShift}>
                            <div className="pb-2 top-0 text-lg border-b h-10">
                                <h2 className="">Xóa lịch</h2>
                            </div>
                            <div className="flex flex-col gap-4 text-xs">
                                <div className="flex flex-col h-full">
                                    <div className='flex gap-10 items-center mt-5 h-1/4'>
                                        <span className="">Chọn ngày</span>
                                        <label className='border-2 flex justify-center items-center h-8 md:w-60 w-40 border-border--color rounded-md md:px-2' value={selectedDate}>
                                            {selectedDate ? selectedDate.toDateString() : ''}
                                        </label>
                                    </div>
                                    <div className='flex items-center justify-center mt-4 h-3/6'>
                                        <CelanderAdd onDateSelect={handleDateSelect} />
                                    </div>
                                </div>
                                <div className='flex flex-col h-40'>
                                     <div className="flex mt-2 gap-6 items-center">
                                     <span>Chọn nhân viên </span>
                                        <select
                                            value={staff_id}
                                            onChange={(e) => setStaff_id(e.target.value)}
                                            name='staff'
                                            className="border-2 h-7 border-border--color rounded-md px-2 w-40"
                                        >
                                            <option value="">Chọn nhân viên</option>
                                            {staffListData.map((staff, index) => (
                                                <option key={index} value={staff.id}>
                                                    {staff.fullname} - NV{staff.id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
                                        <span>Chọn ca muốn xóa</span>
                                        <input
                                            type="text"
                                            value={shift_id}
                                            onChange={(e) => setShift_id(e.target.value)}
                                            name='shift'
                                            className="border-2 h-7 border-border--color rounded-md px-2 ml-1 lg:ml-1 md:ml-0 w-40"
                                        />
                                    </div>
                                   
                                   
                                    <div className="choose-workshift_footer flex mt-4 justify-center">
                                        <button
                                            type="submit"
                                            className="border w-32 h-8 rounded-md bg-primary--color text-white--color"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                    </div>
                                </div>
                        </form>
                    </Overlay>
                </UpdateWorkshift>
            )}
        </div>
    );
};

export default Celander;
