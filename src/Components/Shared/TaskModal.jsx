import { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { BsFlagFill } from "react-icons/bs";
import { GiTomato } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';

export const TaskModal = ({ isOpen, setIsOpen }) => {
    const people = [
        { id: "red", name: <BsFlagFill style={{ color: "red" }} /> },
        { id: "orange", name: <BsFlagFill style={{ color: "orange" }} /> },
        { id: "green", name: <BsFlagFill style={{ color: "green" }} /> },
        { id: "gray", name: <BsFlagFill style={{ color: "gray" }} /> },
    ]

    const [projects, setProjects] = useState([
        { id: 1, title: 'Durward Reynolds', unavailable: false },
        { id: 2, title: 'Kenton Towne', unavailable: false },
        { id: 3, title: 'Therese Wunsch', unavailable: false },
        { id: 4, title: 'Benedict Kessler', unavailable: true },
        { id: 5, title: 'Katelyn Rohan', unavailable: false },
    ]);

    const [project, setProject] = useState(projects[0])
    const [taskDescription, setTaskDescription] = useState()

    const [TaskName, setTaskName] = useState('');
    const [selectedFlag, setSelectedFlag] = useState(people[0]);
    const [pomidors, setPomidors] = useState(1);
    const [minutes, setMinutes] = useState(25);
    const [date, setDate] = useState(new Date());

    useEffect(() => {

    }, []);

    const convertMinsToHrsMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
        m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
        return `${h}:${m}`;
    }

    return (

        <div tabindex="-1" style={{ visibility: isOpen ? "visible" : "hidden", opacity: isOpen ? "1" : "0" }} class="bg-black transition duration-500 bg-opacity-20 w-full h-full absolute flex justify-center items-center">
            <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                            Add Task
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="medium-modal">
                            <svg onClick={() => { setIsOpen(false) }} class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div class="p-6 flex items-center">
                        <input
                            name="text"
                            type="text"
                            value={TaskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Add new task"
                            className={
                                "w-full mr-10 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
                            }
                        />
                        <Listbox value={selectedFlag} onChange={setSelectedFlag}>
                            <div className="relative">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{selectedFlag.name}</span>
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

                    <div className="flex items-center justify-center mb-5">
                        <div className='flex flex-col justify-center items-center'>
                            <span>Загальна кількість часу </span>
                            <span className=' mt-1 border-2 border-soli w-min  pr-2 pl-2 rounded-full border-lime-600'>{convertMinsToHrsMins(pomidors * minutes)}</span>
                        </div>

                        <div className='flex ml-5'>
                            <div className='flex flex-col ml-5'>
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
                                    value={pomidors}
                                    onChange={(e) => setPomidors(e.target.value)}
                                    className={
                                        "mr-10 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
                                    }
                                />
                            </div>
                            <div className='flex flex-col ml-5'>
                                <div className='flex items-center'>
                                    <span className='mr-3'>Довжина томата</span>
                                    <BiTime style={{ color: "purple" }} />
                                </div>
                                <input
                                    value={minutes}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            //setMinutes(event.target.value)
                                        }
                                    }}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    className={
                                        "mr-10 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex mb-5 '>
                        <div className='ml-5'>
                            <Calendar onChange={e => setDate(e.value)} value={date} />
                        </div>
                        <div className='flex items-center w-96 flex-col'>
                            <div className='flex'>
                                <span className='mr-5 pt-3'>Project:</span>
                                {projects.length ? (
                                    <Listbox value={project} onChange={(e) => setProject(e)}>
                                        <div className="relative mt-1 ">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                <span className="block truncate">{project.title}</span>
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
                                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                ) : null}
                            </div>
                            <textarea
                                value={taskDescription}
                                type="text"
                                placeholder='Write task description'
                                onChange={(e) => setTaskDescription(e.target.value)}
                                style={{ minHeight: "200px" }}
                                className={
                                    "mr-10 w-72 mt-3 p-2 border-emerald-500 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
                                }
                            />
                        </div>
                    </div>

                    <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button

                            data-modal-toggle="medium-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                        <button data-modal-toggle="medium-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>

    )
}