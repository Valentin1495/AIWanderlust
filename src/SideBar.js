import { FaFire, FaPoo } from "react-icons/fa";
import { BsPlus, BsFillLightningFill } from "react-icons/bs"

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 
                        flex flex-col bg-white 
                        shadow-lg dark:bg-gray-900" >
            <SideBarIcon icon={<FaFire size="28" />} /> 
            <SideBarIcon icon={<BsPlus size="32" />} /> 
            <SideBarIcon icon={<BsFillLightningFill size="20" />} /> 
            <SideBarIcon icon={<FaPoo size="20" />} /> 
        </div>
    )
}

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => {
    return (
        <div className="sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )
}

export default SideBar;