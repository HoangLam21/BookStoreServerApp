
import { BiHome } from "react-icons/bi";
import { FaPeopleGroup,FaChartLine,FaBox,FaBook } from "react-icons/fa6";
import { IoIosPeople,IoMdSettings } from "react-icons/io";
import { IoReaderSharp  } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <BiHome />
	},
	{
		key: 'staff',
		label: 'Nhân Viên',
		path: '/Staff',
		icon: <FaPeopleGroup/>
	},
	{
		key: 'book',
		label: 'Sách',
		path: '/Book',
		icon: <FaBook />
	},
	{
		key: 'customers',
		label: 'Khách hàng',
		path: '/Customer',
		icon: <IoIosPeople />
	},
	{
		key: 'order',
		label: 'Đơn hàng',
		path: '/Order',
		icon: <IoReaderSharp />
	},
	{
		key: 'stock',
		label: 'Nhập hàng',
		path: '/Stock',
		icon: <FaBox />
	},
    {
		key: 'revenue',
		label: 'Doanh thu',
		path: '/Revenue',
		icon: <FaChartLine />
	},
    {
		key: 'celander',
		label: 'Lịch làm việc',
		path: '/Celander',
		icon: <LuCalendarDays />
	},
    {
		key: 'setting',
		label: 'Cài đặt',
		path: '/Setting',
		icon: <IoMdSettings />
	}
]

