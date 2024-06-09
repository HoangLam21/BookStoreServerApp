import React from "react";
import logo from "../../Assets/Beige And Blue Minimal Modern Book Store Logo (1).png"
import ab1 from "../../Assets/background2.png"
import ab2 from "../../Assets/ab2.png"
import ab3 from "../../Assets/ab3.png"
import { Link } from "react-router-dom";




export default function AboutUs(){
    return (
        <div className=" justify-center bg-color-background-main">
         <div>
        <div>
          <div className="flex ml-20 pt-10">
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-3" to="/home">
                <span className="hover:underline hover:tracking-wider">Home</span>
              </Link>
            </div>
            <span className="text-color-main-2 text-xl mr-3"> / </span>
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/aboutUs">
                <span className="hover:underline hover:tracking-wider">About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
            <div >
                <img className="p-10 mx-auto my-auto h-48 w-48" src={logo} alt="">
                </img>      
            </div>
            <h1 className="text-color-main text-center active font-garamond text-7xl font-semibold mr-6">Book Store</h1>
            <div className="mt-10 mb-10">
                <div>
                    <h5  className="text-color-main-2 text-center active font-garamond text-2xl font-semibold mr-6">WHO WE ARE

                    </h5>
                     <p className="text-color-main text-center active font-garamond text-2xl font-light mr-6">

                         Cửa hàng sách "Tri thức" - Nơi tri thức và đam mê gặp nhau.
                    </p>
                    <p className="text-color-main text-center active font-garamond text-2xl font-light mr-6">
                        Điểm đến lý tưởng cho những ai yêu thích đọc sách và khám phá tri thức.
                        Cung cấp đa dạng các loại sách, đáp ứng nhu cầu của mọi đối tượng khách hàng.</p>

                </div>
            </div>
            <div>
               <img src={ab1} alt=""></img>
             </div>
            <div className="mt-10 mb-10">
                <h5 className="text-color-main-2 text-center active font-garamond text-2xl font-semibold mr-6">WHAT WE DO</h5>
                <p className="text-color-main text-center active font-garamond text-2xl font-light mr-6">Mang đến cho cộng đồng một không gian văn hóa lành mạnh, nơi mọi người có thể tìm kiếm tri thức và nuôi dưỡng tình yêu đọc sách.
                     Góp phần nâng cao trình độ học vấn và đời sống tinh thần của người dân.
                    Phát triển văn hóa đọc trong cộng đồng.</p>
            </div>
            <div>
                <img src={ab2} alt=""></img>
            </div>
            <div className="mt-10 mb-10">
                <h5 className="text-color-main-2 text-center active font-garamond text-2xl font-semibold mr-6">WHY WE DO</h5>

                <p className="text-color-main text-center active font-garamond text-2xl font-light mr-6">Vì chúng tôi tin rằng tri thức là sức mạnh, là chìa khóa để mở ra cánh cửa thành công.
                    Vì chúng tôi mong muốn góp phần xây dựng một xã hội học tập, nơi mọi người đều có cơ hội tiếp cận tri thức.
                     Vì chúng tôi yêu thích đọc sách và muốn chia sẻ niềm đam mê này với mọi người.</p>
            </div>
            <div>
                <img src={ab3} alt=""></img>
            </div>
            <div className="mt-10">
                <h5 className="text-color-main-2  text-center active font-garamond text-2xl font-semibold mr-6">Cửa hàng sách "Tri thức" cam kết</h5>

                <p className="text-color-main text-center active font-garamond text-2xl font-light mr-6">Cung cấp sách chất lượng cao, giá cả hợp lý.
                     Phục vụ khách hàng chuyên nghiệp, chu đáo.
                    Tạo dựng môi trường đọc sách thân thiện, thoải mái.
                    Hãy đến với Cửa hàng sách "Tri thức" để:
            
                    Khám phá thế giới tri thức vô tận.
                    Tìm cho mình những cuốn sách yêu thích.
                    Nuôi dưỡng tình yêu đọc sách và phát triển bản thân.</p>
                <p  className=" text-color-main-2 mt-10 text-center active font-garamond text-2xl font-semibold mr-6">Cửa hàng sách "Tri thức" - Nơi bạn bắt đầu hành trình chinh phục tri thức!</p>
            
                <h5 className="text-color-main  text-center active font-garamond text-2xl font-light mr-6">Ngoài ra, bạn có thể tham khảo thêm các thông tin sau:</h5>
            
                <p className="text-color-main mb-10 text-center active font-garamond text-2xl font-light mr-6">Địa chỉ: [Điền địa chỉ cụ thể]
                    Điện thoại: [Điền số điện thoại]
                    Website: [Điền website nếu có]
                    Facebook: [Điền link Facebook nếu có]
                    Chúc bạn có những trải nghiệm thú vị tại Cửa hàng sách "Tri thức"!</p>
            </div>
        </div>
    )
}