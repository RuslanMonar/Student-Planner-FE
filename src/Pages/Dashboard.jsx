import { Header } from './../Components/Navigation/Header';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem } from 'react-icons/fa';
import { BsFillFolderFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from 'react';
import { Task } from './../Components/Dashboard/Task';
import { IconContext } from "react-icons";
import { Modal } from './../Components/Shared/Modal';


export const Dashboard = () => {
    const [collapsed, changeCollapsed] = useState(true);
    let [isOpen, setIsOpen] = useState(false)

    return (
        <div className="h-full">
            <Header style={{ height: '10%' }}></Header>
            <div style={{ height: '89%' }} className="h-full bg-red-100 flex">
                <ProSidebar className="bg-white w-1/6">
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaGem style={{ color: '#8d10fa' }} />}>Dashboard</MenuItem>
                            <SubMenu title="English" icon={<BsFillFolderFill style={{ color: 'orange' }} />}>
                                <MenuItem>Component 1</MenuItem>
                                <MenuItem>Component 2</MenuItem>
                            </SubMenu>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter className="pt-3 pl-3" style={{ height: "10%" }}>
                        <div className="flex cursor-pointer">
                            <IconContext.Provider value={{ className: "shared-class", size: 22 }}>
                                <IoMdAddCircle style={{ color: '#6366f1' }} />
                                <span onClick={() => setIsOpen(!isOpen)} className="flex justify-between ml-3"> Add project</span>
                            </IconContext.Provider>
                        </div>
                    </SidebarFooter>
                </ProSidebar>
                <div className='bg-red-100 flex items-center flex-col relative' style={{ minWidth: "55%", width: "100%" }}>
                    <Task taskState={{ collapsed, changeCollapsed }}>
                    </Task>
                    <Modal isOpen={isOpen} setIsOpen={setIsOpen} />

                </div>
                <ProSidebar collapsedWidth="0px" collapsed={collapsed} width={"23%"}>

                </ProSidebar>
            </div>
        </div>
    );
};
