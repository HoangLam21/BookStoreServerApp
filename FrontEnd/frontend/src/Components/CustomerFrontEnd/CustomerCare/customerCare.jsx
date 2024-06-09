import React from "react";
import { Link } from "react-router-dom";
import './customercare.css'
import vanchuyen from "../../Assets/vc.png";
import doitra from "../../Assets/dt.png";
import baohanh from "../../Assets/bh.png";
import cskh from "../../Assets/cskh.png";


export default function CustomerCare() {
    return (
        <div className="bg-color-background-main mx-auto">
            <div className="flex ml-20 pt-10">
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-3" to="/">
                    <span className="hover:underline hover:tracking-wider">Home</span>
                </Link>
                <span className="text-color-main-2 text-xl mr-3"> / </span>
                <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold" to="/customerCare">
                    <span className="hover:underline hover:tracking-wider">Customer Care</span>
                </Link>
            </div>

            <div className="w-5/6 mx-auto">
                <h1 className="text-color-main pt-10 mb-5 text-center active font-garamond text-4xl font-light">
                    Các chính sách chăm sóc khách hàng
                </h1>
                
                <div className="policy-section">
                    <div className="flex items-center mb-10">
                        <img src={vanchuyen} alt="Vận Chuyển" className="mr-6 w-12 h-12"/>
                        <span className="text-color-main-2 active font-garamond text-3xl font-semibold">1. Chính sách vận chuyển</span>
                    </div>
                    <div className="content mb-10">
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Kết hợp với đối tác giao hàng - Viettel Post, hỗ trợ giao hàng đến mọi nơi trong nước và nước ngoài.
                        </h5>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">Các loại dịch vụ giao hàng:</h5>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Giao hàng hỏa tốc: đối với khu vực Hồ Chí Minh (dự kiến thời gian từ 1 - 24h không tính các ngày lễ)
                        </h6>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Giao thường: áp dụng với tất cả khu vực (dự kiến thời gian từ 2 - 5 ngày không tính các ngày lễ)
                        </h6>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Giao hàng tối đa 3 lần
                        </h5>
                        <h5 className="text-color-main mb-10 active font-garamond text-2xl font-light">
                            Bạn có thể kiểm tra tình trạng đơn hàng ở mục “Đơn hàng của tôi” nếu đã tạo tài khoản.
                        </h5>
                    </div>
                </div>

                <div className="policy-section">
                    <div className="flex items-center mb-10">
                        <img src={baohanh} alt="Bảo Hành" className="mr-6 w-12 h-12"/>
                        <span className="text-color-main-2 active font-garamond text-3xl font-semibold">2. Chính sách bảo hành</span>
                    </div>
                    <div className="content mb-10">
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Chúng tôi cam kết cung cấp sản phẩm chất lượng cao và đảm bảo tính trọn vẹn của hàng hóa khi giao đến tay khách hàng.
                        </h5>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Mọi sản phẩm mua từ cửa hàng của chúng tôi đều được bảo hành theo quy định của nhà sản xuất.
                        </h5>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Thời gian bảo hành cụ thể sẽ được ghi rõ trong mô tả sản phẩm hoặc hóa đơn mua hàng.
                        </h6>
                    </div>
                </div>

                <div className="policy-section">
                    <div className="flex items-center mb-10">
                        <img src={doitra} alt="Đổi Trả" className="mr-6 w-12 h-12"/>
                        <span className="text-color-main-2 active font-garamond text-3xl font-semibold">3. Chính sách đổi trả</span>
                    </div>
                    <div className="content mb-10">
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Chúng tôi chấp nhận việc đổi trả sản phẩm trong các trường hợp sau:
                        </h5>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Sản phẩm không đúng với mô tả trên trang web hoặc trên hóa đơn mua hàng.
                        </h6>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Sản phẩm bị hỏng hoặc không hoạt động đúng cách trong thời gian bảo hành.
                        </h6>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Quý khách vui lòng giữ nguyên sản phẩm và liên hệ với chúng tôi trong vòng 7 ngày kể từ ngày nhận hàng để được hỗ trợ về việc đổi trả.
                        </h5>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Chúng tôi sẽ thực hiện việc đổi trả sản phẩm một cách nhanh chóng và hiệu quả, đảm bảo quyền lợi tốt nhất cho khách hàng.
                        </h5>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">* Hướng dẫn đổi trả:</h5>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Để đổi trả sản phẩm, quý khách vui lòng liên hệ với bộ phận chăm sóc khách hàng của chúng tôi qua số điện thoại hoặc email được cung cấp trên trang web.
                        </h6>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Quý khách vui lòng cung cấp thông tin chi tiết về đơn hàng và lý do đổi trả để chúng tôi có thể hỗ trợ một cách tốt nhất.
                        </h6>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">* Lưu ý:</h5>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Chúng tôi chỉ chấp nhận việc đổi trả sản phẩm khi sản phẩm còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ tem mác, bao bì.
                        </h6>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-10">
                            _ Các trường hợp đổi trả sản phẩm vì lý do khách quan khác sẽ được xem xét một cách cụ thể và linh hoạt, tuân theo quy định của pháp luật hiện hành.
                        </h6>
                    </div>
                </div>

                <div className="policy-section">
                    <div className="flex items-center mb-10">
                        <img src={cskh} alt="Chăm Sóc Khách Hàng" className="mr-6 w-12 h-12"/>
                        <span className="text-color-main-2 active font-garamond text-3xl font-semibold">4. Hỗ Trợ Trực Tuyến</span>
                    </div>
                    <div className="content mb-10">
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Chat trực tuyến: Khách hàng có thể dễ dàng liên hệ với đội ngũ chăm sóc khách hàng thông qua hệ thống chat trực tuyến trên website. Đội ngũ sẽ phản hồi nhanh chóng các câu hỏi và yêu cầu hỗ trợ của khách hàng.
                        </h5>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Email và điện thoại: Đối với những vấn đề phức tạp hơn, khách hàng có thể gửi email hoặc gọi điện thoại để nhận được sự hỗ trợ chi tiết từ các chuyên gia.
                        </h6>
                    </div>
                </div>

                <div className="policy-section">
                    <div className="flex items-center mb-10">
                        <img src={cskh} alt="Chương Trình Khuyến Mãi" className="mr-6 w-12 h-12"/>
                        <span className="text-color-main-2 active font-garamond text-3xl font-semibold">5. Chương Trình Khuyến Mãi và Giảm Giá</span>
                    </div>
                    <div className="content pb-10">
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Chúng tôi luôn có những chương trình khuyến mãi và giảm giá đặc biệt dành cho khách hàng.
                        </h5>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Giảm giá theo mùa: Các chương trình giảm giá được áp dụng vào các dịp lễ, tết hoặc các mùa đặc biệt trong năm.
                        </h6>
                        <h6 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            _ Ưu đãi dành cho khách hàng thân thiết: Những khách hàng thân thiết sẽ nhận được những ưu đãi đặc biệt, như chiết khấu khi mua hàng lần sau hoặc quà tặng kèm.
                        </h6>
                        <h5 className="text-color-main active font-garamond text-2xl font-light mb-2">
                            Để cập nhật các chương trình khuyến mãi, quý khách vui lòng theo dõi trên trang web chính thức của chúng tôi hoặc đăng ký nhận thông báo qua email.
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
