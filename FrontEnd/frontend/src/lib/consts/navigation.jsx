
import { BiHome } from "react-icons/bi";
import { FaPeopleGroup,FaChartLine,FaBox,FaBook } from "react-icons/fa6";
import { IoIosPeople,IoMdSettings } from "react-icons/io";
import { IoReaderSharp  } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { BsChatDotsFill } from "react-icons/bs";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Trang chủ',
		path: '/manage/Dashboard',
		icon: <BiHome />
	},
	{
		key: 'staff',
		label: 'Nhân Viên',
		path: '/manage/Staff',
		icon: <FaPeopleGroup/>
	},
	{
		key: 'book',
		label: 'Sách',
		path: '/manage/Book',
		icon: <FaBook />
	},
	{
		key: 'customers',
		label: 'Khách hàng',
		path: '/manage/Customer',
		icon: <IoIosPeople />
	},
	{
		key: 'order',
		label: 'Đơn hàng',
		path: '/manage/Order', // Sử dụng đường dẫn tương đối thay vì tuyệt đối
		icon: <IoReaderSharp />
	},
	{
		key: 'stock',
		label: 'Nhập hàng',
		path: '/manage/Stock',
		icon: <FaBox />
	},
    {
		key: 'revenue',
		label: 'Doanh thu',
		path: '/manage/Revenue',
		icon: <FaChartLine />
	},
    {
		key: 'celander',
		label: 'Lịch làm việc',
		path: '/manage/Celander',
		icon: <LuCalendarDays />
	},
	{
		key: 'chatting',
		label: 'Tin nhắn',
		path: '/manage/Chatting',
		icon: <BsChatDotsFill />
	},
    {
		key: 'setting',
		label: 'Cài đặt',
		path: '/manage/Setting',
		icon: <IoMdSettings />
	},

	
	
]
