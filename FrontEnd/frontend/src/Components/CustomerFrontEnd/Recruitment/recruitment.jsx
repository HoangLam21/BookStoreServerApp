import React from "react";
import bgOrder from "../../Assets/www.reallygreatsite.com1.png"
import { Link } from "react-router-dom";


export default function AboutUs(){
    return (
        <div className="bg-color-background-main ">
        <img className="m-auto h-52 max-h-full max-w-full"  src={bgOrder} alt=""/>
        <div>
        <div>
          <div className="flex ml-20">
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-3" to="/">
                <span className="hover:underline hover:tracking-wider">Home</span>
              </Link>
            </div>
            <span className="text-color-main-2 text-xl mr-3"> / </span>
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/recruitment">
                <span className="hover:underline hover:tracking-wider">Recruitment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
        <div className="grid grid-cols-2 gap-x-3 mt-10 pb-10 justify-between">
       

            <div className="mx-auto">
                <h6 className="text-color-main text-3xl font-garamond font-light">Thông tin liên hệ</h6>
                <div className="grid grid-cols-2 gap-x-3 w-80 mt-6">
                    <div>
                        <p className="text-color-main text-xl font-garamond font-light">Hotline</p>
                        <p className="text-color-main text-l font-garamond font-light">+84 348775966</p>
                    </div>
                    <div>
                        <button className="w-full bg-color-main-2 hover:bg-color-main h-9 border rounded-md text-white active font-garamond text-1xl font-light">Gọi ngay</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 w-80 mt-6">
                    <div>
                        <p className="text-color-main text-xl font-garamond font-light">Email</p>
                        <p className="text-color-main text-l font-garamond font-light">bookstore@gmail.com</p>
                    </div>
                    <div>
                        <button className="w-full bg-color-main-2 hover:bg-color-main h-9 border rounded-md text-white active font-garamond text-1xl font-ligh">Gửi Email</button>
                    </div>
                </div>
            </div>
            <div className="mx-auto">
                <h6 className="text-color-main text-3xl font-garamond font-light">Tuyển dụng</h6>
                <p className="text-color-main text-xl font-garamond font-light">Chúng mình có mở tuyển dụng trực tiếp tại store hoặc online </p>
                <p className="text-color-main text-xl font-garamond font-light">
  *Nếu muốn phỏng vấn trực tiếp, vui lòng đến địa chỉ: Dĩ An, Bình Dương. 
  Liên hệ số điện thoại: 0987654321 và gặp staff để được tư vấn kỹ hơn. 
  Bạn cũng có thể gửi email cho store trước khi đến.
</p>
<p className="text-color-main text-xl mt-16 font-garamond font-light">
  *Nếu muốn phỏng vấn online, vui lòng liên hệ qua email của store, gửi thông tin cá nhân và tình trạng công việc để chúng mình có thể sắp lịch phỏng vấn online.
</p>


                {/* <div className="pt-5">
                    <span className="text-color-main text-xl font-garamond font-light">Họ tên</span>
                    <div>
                    <input className="text-color-main text-xl font-garamond h-9 font-light border w-96 rounded-md pl-1 border-color-main-2" type="text" placeholder="Nhập họ tên"/>
                    </div>
                    
                </div>
                <div className="mt-2">
                    <span className="text-color-main text-xl font-garamond font-light">Số điện thoại</span>
                    <div>
                    <input className="text-color-main text-xl font-garamond h-9 font-light border w-96 rounded-md pl-1 border-color-main-2" type="text" placeholder="Nhập số điện thoại"/>
                    </div>
                    
                </div>
                <div className="mt-2">
                    <span className="text-color-main text-xl font-garamond font-light">Email</span>
                    <div>
                    <input className="text-color-main text-xl font-garamond h-9 font-light border w-96 rounded-md pl-1 border-color-main-2" type="text" placeholder="Nhập email"/>
                    </div>
                    
                </div>
                <div className="flex w-96">
                <div className="w-full pr-2 mt-2">
                    <span className="text-color-main text-xl font-garamond font-light">Ngày sinh</span>
                    <div>
                    <input className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2" type="date" placeholder="Nhập ngày sinh"/>
                    </div>
                    
                </div>
                <div className="w-full mt-2">
                    <span className="text-color-main text-xl font-garamond font-light">Giới tính</span>
                    <div className="w-full">
                    <select className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2">
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
            </select>                    </div>
                    
                </div>
                </div>
                <button className="mx-auto w-full mt-5 bg-color-main-2 hover:bg-color-main h-9 border rounded-md text-white active font-garamond text-1xl font-light">Gửi thông tin</button> */}
            </div>
        </div>
        </div>
    )
}
