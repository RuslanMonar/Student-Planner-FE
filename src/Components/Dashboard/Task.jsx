import CheckBox from "react-animated-checkbox"
import { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdTimer } from "react-icons/md";
import { BsCalendar3, BsFlagFill } from "react-icons/bs";
import { IconContext } from "react-icons";


export const Task = ({taskState}) => {
    const [check, setCheck] = useState(false);

    return (
        <div className="flex w-4/5 p-3 bg-white rounded-lg cursor-pointer mt-5 border-red-600 border-x-4">
        <CheckBox
            checked={check}
            checkBoxStyle={{
                checkedColor: "#34b93d",
                size: 20,
                //unCheckedColor: "#b8b8b8"
                unCheckedColor: "red"
            }}
            duration={130}
            onClick={() => setCheck(!check)}
            />
            <div className="ml-3 w-10/12 " onClick={() => taskState.changeCollapsed(!taskState.collapsed)}>
                <span className={ check ? 'completed' : '' }>English lessong and homework </span>
            </div>

            <IconContext.Provider value={{ className: "shared-class", size: 22 }}>
                <div className=" ml-5 mr-5 flex flex-row">
                    <MdTimer style={{ color: '#6366f1' }}/>
                    <MdTimer style={{ color: '#6366f1' }}/>
                    <MdTimer style={{ color: '#6366f1' }}/>
                    <MdTimer style={{ color: '#6366f1' }} />
                </div>
                <RiDeleteBin6Line className="mr-2" style={{ color: 'red' }} />

            </IconContext.Provider>

            <IconContext.Provider value={{ className: "shared-class", size: 22 }}>
                <BsCalendar3 className="pt-0.5" style={{ color: '#140c39' }} />
            </IconContext.Provider>
        </div>
    )
}