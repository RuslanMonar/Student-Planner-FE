import Chrome from "react-color/lib/components/chrome/Chrome"
import Circle from "react-color/lib/components/circle/Circle"
import { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ProjectGateway from "../../Gateway/ProjectGateway"

export const Modal = ({ isOpen, setIsOpen, isProject, setIsProject }) => {
    const [groups, setGroups] = useState([])
    const [selected, setSelected] = useState([]);
    const [color, changeColor] = useState({ hex: '#E965FF' });
    const [Name, setName] = useState('');
    const [GroupId, setGroupId] = useState();

    const createGroup = () => {
        ProjectGateway.AddGroup(Name, color.hex).then(response => {
            console.log(response.data);
        })
    }

    const createProject = () => {
        ProjectGateway.AddProject(Name, color.hex, GroupId).then(response => {
            
        })
    }


    useEffect(() => {
        if (isProject) {
            ProjectGateway.GetGroups().then(response => {
                setGroups(response.data);
                setSelected(response.data[0]);
            })
        }
    }, [isProject]);


    return (

        <div tabindex="-1" style={{ visibility: isOpen ? "visible" : "hidden", opacity: isOpen ? "1" : "0" }} class="bg-black transition duration-500 bg-opacity-20 w-full h-full absolute flex justify-center items-center">
            <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                            {isProject ? "Add project" : "Add Group"}
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="medium-modal">
                            <svg onClick={() => { setIsOpen(false); setIsProject(false) }} class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div class="p-6 space-y-6 flex">
                        <Chrome
                            color={color}
                            onChange={e => changeColor(e)} />
                        <div className=" flex flex-col justify-center w-full pl-10">
                            <div className="mb-5  flex justify-between">
                                <input
                                    name="text"
                                    type="text"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={isProject ? "Add new project" : "Add new group"}
                                    style={{ borderColor: color.hex }}
                                    className={
                                        "w-full mr-10 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                                    }
                                />
                                {isProject && groups.length ? (
                                    <Listbox value={selected} onChange={setSelected}>
                                        <div className="relative mt-1 w-96">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                <span className="block truncate">{selected.title}</span>
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
                                                    {groups.map((group, personIdx) => (
                                                        <Listbox.Option
                                                            key={personIdx}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={group}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {group.title}
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

                            <Circle circleSize={25} onChange={e => { changeColor(e); console.log(e) }} />
                        </div>
                    </div>

                    <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button
                            onClick={() => isProject ? createProject() : createGroup()}
                            data-modal-toggle="medium-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                        <button data-modal-toggle="medium-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>

    )
}