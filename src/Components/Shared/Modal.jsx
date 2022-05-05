import { SketchPicker } from "react-color"
import Chrome from "react-color/lib/components/chrome/Chrome"
import Circle from "react-color/lib/components/circle/Circle"
import Compact from "react-color/lib/components/compact/Compact"
import { useState } from 'react';

import ProjectGateway from "../../Gateway/ProjectGateway"

export const Modal = ({ isOpen, setIsOpen }) => {

    const [color, changeColor] = useState({hex:'#E965FF'});
    const [groupName, setGroupname] = useState('');

    const createGroup = () => {
        ProjectGateway.AddGroup( groupName, color.hex ).then(response => {
            console.log(response.data);
        })
    }

    return (

        <div tabindex="-1" style={{ visibility: isOpen ? "visible" : "hidden", opacity: isOpen ? "1" : "0" }} class="bg-black transition duration-500 bg-opacity-20 w-full h-full absolute flex justify-center items-center">
            <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                            Add project
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="medium-modal">
                            <svg onClick={() => setIsOpen(false)} class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div class="p-6 space-y-6 flex">
                        <Chrome
                            color={color}
                            onChange={e => changeColor(e)} />
                        <div className=" flex flex-col justify-center w-full items-center">
                            <div className="mb-5 w-3/4">
                                <input
                                    name="text"
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupname(e.target.value)}
                                    placeholder="New project name"
                                    style={{borderColor: color.hex}}
                                    className={
                                        "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                                    }
                                />
                            </div>
                            <Circle circleSize={25} onChange={e => { changeColor(e); console.log(e)}} />
                        </div>
                    </div>

                    <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button
                            onClick={() => createGroup()}
                            data-modal-toggle="medium-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                        <button data-modal-toggle="medium-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>

    )
}