import { Header } from './../Components/Navigation/Header';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { MdOutlineAddTask } from 'react-icons/md';
import { BsFillFolderFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { BiAddToQueue } from "react-icons/bi";
import { useState, useEffect, Fragment, useRef } from 'react';
import { Task } from './../Components/Dashboard/Task';
import { IconContext } from "react-icons";
import { Modal } from './../Components/Shared/Modal';
import ProjectGateway from '../Gateway/ProjectGateway';
import { TaskModal } from './../Components/Shared/TaskModal';
import { BsFlagFill, BsStopCircle, BsPauseCircle } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { GiTomato } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';
import ReactCircleModal from 'react-circle-modal'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const Dashboard = () => {
    const [collapsed, changeCollapsed] = useState(true);
    let [isOpen, setIsOpen] = useState(false);
    let [isProject, setIsProject] = useState(false);
    const [projects, setProject] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [projectsNoGrop, setProjectNoGroup] = useState([]);
    const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
    const [tasks, setTaks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(tasks[0]);
    const buttonStyle = " mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

    const people = [
        { id: "red", name: <BsFlagFill style={{ color: "red" }} /> },
        { id: "orange", name: <BsFlagFill style={{ color: "orange" }} /> },
        { id: "green", name: <BsFlagFill style={{ color: "green" }} /> },
        { id: "gray", name: <BsFlagFill style={{ color: "gray" }} /> },
    ];

    const convertMinsToHrsMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
        m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
        return `${h}:${m}`;
    }

    function parseISOString(s) {
        if (s) {
            var b = s.split(/\D+/);
            return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        }
        return new Date()
    }

    useEffect(() => {

        ProjectGateway.GetProjetcsByGroups().then(response => {
            setProject(response.data);
        })

        ProjectGateway.GetProjetcsWithoutGroup().then(response => {
            setProjectNoGroup(response.data);
        })

        ProjectGateway.GetAllTasks().then(response => {
            setTaks(response.data);
        })

        ProjectGateway.GetAllProjects().then(response => {
            setAllProjects(response.data);

        })

    }, []);

    const saveTask = () => {
        var data = {
            Id: selectedTask.id,
            Title: selectedTask.title,
            TomatoCount: selectedTask.tomatoCount,
            TomatoLength: selectedTask.tomatoLength,
            TotalTime: selectedTask.totalTime,
            Flag: selectedTask.flag,
            Date: selectedTask.date,
            Description: selectedTask.description,
            ProjectId: selectedTask.project.id,
        }

        ProjectGateway.EditTask(data).then(response => {
            window.location.reload();
        })
    }

    const loadTasks = (id) => {
        ProjectGateway.GetTasksById(id).then(response => {
            setTaks(response.data);
        })
    }

    return (
        <div className="h-full">
            <Header style={{ height: '10%' }}></Header>

            <div style={{ height: '93%' }} className="h-full bg-red-100 overflow-y-scroll flex">
                <ProSidebar className="bg-white w-1/6">
                    <SidebarContent>
                        <Menu iconShape="square">
                            {projects.map((group, id) => (

                                <SubMenu title={group.title} icon={<BsFillFolderFill style={{ color: group.color }} />}>
                                    {group.projects.map((project, idk) => (
                                        <MenuItem style={{ borderLeft: "2px solid" + group.color }} >
                                            <div onClick={() => loadTasks(project.id)} className="flex items-center">
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
                                        <div onClick={() => loadTasks(project.id)} className="flex items-center">
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

                    <div onClick={() => setIsOpenTaskModal(true)} className="flex justify-start items-center mt-5 mb-3 border-2 border-soli p-3 rounded-full cursor-pointer hover:bg-white" style={{ color: '#6366f1', borderColor: '#6366f1' }}>
                        <IconContext.Provider value={{ className: "shared-class", size: 45 }} >
                            <MdOutlineAddTask />
                            <span className="ml-3 text-lg">Add new Task</span>
                        </IconContext.Provider>

                    </div>

                    {tasks.length ? (
                        tasks.map(task => (
                            <Task key={task.id} setSelectedTask={setSelectedTask} task={task} taskState={{ collapsed, changeCollapsed }} >
                            </Task>
                        ))

                    ) : null}


                    <Modal isOpen={isOpen} setIsOpen={setIsOpen} isProject={isProject} setIsProject={setIsProject} />
                    <TaskModal isOpen={isOpenTaskModal} setIsOpen={setIsOpenTaskModal} />

                </div>

                <ProSidebar collapsedWidth="0px" collapsed={collapsed} width={"23%"}>
                    <div className="flex items-center justify-center" >
                        <div style={{ width: "80%" }}>
                            <div className='flex items-center'>
                                <input
                                    name="text"
                                    type="text"
                                    value={selectedTask?.title}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                                    placeholder="Add new task"
                                    className={
                                        "w-full mt-5 border-2 border-black  mr-10 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
                                    }
                                />
                                <Listbox value={people.find((e) => e.id == selectedTask?.flag)} onChange={(e) => setSelectedTask({ ...selectedTask, flag: e.id })}>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{people.find((e) => e.id == selectedTask?.flag)?.name}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <SelectorIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1  ring-opacity-5 focus:outline-none sm:text-sm">
                                                {people.map((person, personIdx) => (
                                                    <Listbox.Option
                                                        key={personIdx}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-3 pr-4 `
                                                        }
                                                        style={{ color: person.id + "!important" }}
                                                        value={person}
                                                    >
                                                        {({ selectedFlag }) => (
                                                            <>
                                                                <span style={{ color: person.id }} className={`block truncate ${selectedFlag ? 'font-medium' : 'font-normal'}`}>
                                                                    {person.name}
                                                                </span>
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>

                            <div className="flex flex-col mt-10  mb-5">
                                <div className='flex items-center'>
                                    <span>Загальна кількість часу </span>
                                    <span className=' mt-1 ml-5 border-2 border-soli w-min  pr-2 pl-2 rounded-full border-lime-600'>{convertMinsToHrsMins(selectedTask?.tomatoCount * selectedTask?.tomatoLength)}</span>
                                </div>

                                <div className='flex flex-col '>
                                    <div className='flex flex-col '>
                                        <div className='flex items-center'>
                                            <span className='mr-3'>Кількість томатів</span>
                                            <GiTomato style={{ color: "red" }} />
                                        </div>
                                        <input
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                    //setPomidors(event.target.value)
                                                }
                                            }}
                                            value={selectedTask?.tomatoCount}
                                            onChange={(e) => setSelectedTask({ ...selectedTask, tomatoCount: e.target.value })}
                                            className={
                                                "mr-10 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
                                            }
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center'>
                                            <span className='mr-3'>Довжина томата</span>
                                            <BiTime style={{ color: "purple" }} />
                                        </div>
                                        <input
                                            value={selectedTask?.tomatoLength}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                    //setMinutes(event.target.value)
                                                }
                                            }}
                                            onChange={(e) => setSelectedTask({ ...selectedTask, tomatoLength: e.target.value })}
                                            className={
                                                "mr-10 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
                                            }
                                        />
                                    </div>
                                </div>
                                <span className='mt-5'>Project:</span>
                                <Listbox className="mb-10" value={selectedTask?.project} onChange={(e) => setSelectedTask({ ...selectedTask, project: e })}>
                                    <div className="relative mt-1 ">
                                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{selectedTask?.project.title}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <SelectorIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {projects.map((project, personIdx) => (
                                                    <Listbox.Option
                                                        key={personIdx}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={project}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {project.title}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>

                                <Calendar onChange={value => setSelectedTask({ ...selectedTask, date: value.toISOString() })} value={new Date(parseISOString(selectedTask?.date))} />
                                <button
                                    onClick={() => saveTask()}
                                    data-modal-toggle="medium-modal" type="button" class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                            </div>
                        </div>
                    </div>
                </ProSidebar>
            </div>
        </div>
    );
};
