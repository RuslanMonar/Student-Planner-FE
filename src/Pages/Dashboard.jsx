import { Header } from './../Components/Navigation/Header';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem } from 'react-icons/fa';
import { BsFillFolderFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { BiAddToQueue } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { Task } from './../Components/Dashboard/Task';
import { IconContext } from "react-icons";
import { Modal } from './../Components/Shared/Modal';
import ProjectGateway from '../Gateway/ProjectGateway';


export const Dashboard = () => {
    const [collapsed, changeCollapsed] = useState(true);
    let [isOpen, setIsOpen] = useState(false);
    let [isProject, setIsProject] = useState(false);
    const [projects, setProject] = useState([]);
    const [projectsNoGrop, setProjectNoGroup] = useState([]);

    useEffect(() => {

        ProjectGateway.GetProjetcsByGroups().then(response => {
            setProject(response.data);
        })

        ProjectGateway.GetProjetcsWithoutGroup().then(response => {
            setProjectNoGroup(response.data);
        })

    }, []);


    return (
        <div className="h-full">
            <Header style={{ height: '10%' }}></Header>
            <div style={{ height: '93%' }} className="h-full bg-red-100 flex">
                <ProSidebar className="bg-white w-1/6">
                    <SidebarContent>
                        <Menu iconShape="square">
                            {projects.map((group, id) => (

                                <SubMenu title={group.title} icon={<BsFillFolderFill style={{ color: group.color }} />}>
                                    {group.projects.map((project, idk) => (
                                        <MenuItem style={{ borderLeft: "2px solid" + group.color }} >
                                            <div className="flex items-center">
                                                <div style={{ background: project.color }} className="rounded-full mr-3 w-px w-3 h-3"></div>
                                                {project.title}
                                            </div>
                                        </MenuItem>
                                    ))}
                                </SubMenu>
                            ))}
                            {projectsNoGrop.length ? (
                                projectsNoGrop.map((project, idk) => (
                                    <MenuItem >
                                        <div className="flex items-center">
                                            <div style={{ background: project.color }} className="rounded-full mr-3 w-px w-3 h-3"></div>
                                            {project.title}
                                        </div>
                                    </MenuItem>
                                ))
                            ) : null}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter className="pt-3 pl-3" style={{ height: "10%" }}>
                        <div className="flex cursor-pointer ">
                            <IconContext.Provider value={{ className: "shared-class", size: 22 }}>

                                <span onClick={() => { setIsProject(false); setIsOpen(true) }} className="flex justify-between ml-1"><IoMdAddCircle style={{ color: '#6366f1' }} /> Add Group</span>
                                <span onClick={() => { setIsProject(true); setIsOpen(true) }} className="flex justify-between ml-4"> <BiAddToQueue style={{ color: '#6366f1' }} /> Add project </span>
                            </IconContext.Provider>
                        </div>
                    </SidebarFooter>
                </ProSidebar>
                <div className='bg-red-100 flex items-center flex-col relative' style={{ minWidth: "55%", width: "100%" }}>
                    <Task taskState={{ collapsed, changeCollapsed }}>
                    </Task>
                    <Modal isOpen={isOpen} setIsOpen={setIsOpen} isProject={isProject} setIsProject={setIsProject} />

                </div>
                <ProSidebar collapsedWidth="0px" collapsed={collapsed} width={"23%"}>

                </ProSidebar>
            </div>
        </div>
    );
};
