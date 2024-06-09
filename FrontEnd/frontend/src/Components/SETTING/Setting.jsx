// import React, { useEffect, useState } from 'react'
// import SettingBody from './SettingBody'
// import userData from '../../Data/userData'
// import axios from 'axios';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SettingBody from './SettingBody';

const BASE_URL = 'http://167.172.69.8:8010/BookStore/staff/myinfo';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzY3MTk2NywiaWF0IjoxNzE3NjYxMTY3LCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQ0FOQ0xFX09SREVSIENSRUFURV9PUkRFUiBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgSU1QT1JUX1dPUktfRklORCBHRVRfQ1VTVE9NRVJfSU5GT1MgR0VUX1BBWU1FTlRfSU5GT1MgSU1QT1JUX1dPUktfREVMRVRFIElNUE9SVF9XT1JLX1VQREFURSBWRVJJRllfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.BeebnrEP8FI7pbjJ4fOSesqGorO2QZTR0TnYz85TWNM';

export default function Setting() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lưu token vào localStorage

    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage.

      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            'Authorization': `Bearer ${token}` // Thêm token vào header của request.
          }
        });
        const result = response.data.result
        setUser(result);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
        if(error.response.data){
          console.error("Error response:", error.response.data)
        }
      }
    };

    fetchUserData(); // Gọi hàm fetch dữ liệu khi component được mount.
  }, []); // Mảng phụ thuộc rỗng nghĩa là chỉ chạy một lần khi component được mount.

  if (!user) return <div>Loading...</div>; // Hiển thị "Loading..." khi dữ liệu chưa được fetch xong.

  return (
    <div>
    {user ? <SettingBody user={user} /> : <p>Loading...</p>}
  </div>
  );
}