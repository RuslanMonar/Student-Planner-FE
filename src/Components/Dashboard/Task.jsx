import CheckBox from "react-animated-checkbox"
import { useState, useEffect, useRef } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdTimer } from "react-icons/md";
import { BsCalendar3, BsFlagFill, BsPlusCircle, BsStopCircle, BsPauseCircle, BsPlayCircleFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import ReactCircleModal from 'react-circle-modal'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FiPlay } from "react-icons/fi";
import ProjectGateway from "../../Gateway/ProjectGateway";

export const Task = ({ taskState, task, setSelectedTask }) => {
    const buttonStyle = " mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

    const [check, setCheck] = useState(task?.completed);
    const [background, setBackground] = useState("#DAAD86");
    const [breakeMode, setsetBreakMode] = useState(false);

    const STATUS = {
        STARTED: 'Started',
        STOPPED: 'Stopped',
        BreakMode: "BreakMode",
    }


    function useInterval(callback, delay) {
        const savedCallback = useRef()

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback
        }, [callback])

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current()
            }
            if (delay !== null) {
                let id = setInterval(tick, delay)
                return () => clearInterval(id)
            }
        }, [delay])
    }

    const twoDigits = (num) => String(num).padStart(2, '0')

    const [INITIAL_COUNT, setINITIAL_COUNT] = useState(task.tomatoCount * task.tomatoLength * 60);
    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
    const [status, setStatus] = useState(STATUS.STOPPED)
    const [timeSpent, setTimeSpent] = useState(0)

    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

    

    const handleStart = () => {
        setStatus(STATUS.STARTED);
        setBackground("#DAAD86");
        var data = {
            Date: new Date().toISOString(),
            TaskId: task.id,
        }
        ProjectGateway.StartTask(data);
    }

    const handleStop = () => {
        status == STATUS.STARTED && setBackground("#F64C72");
        setStatus(STATUS.STOPPED);
    }

    const handleReset = () => {
        setStatus(STATUS.STOPPED)
        setSecondsRemaining(INITIAL_COUNT)
        setBackground("#DAAD86");
        var timeSpant = (INITIAL_COUNT - secondsRemaining) / 60;

        var data = {
            Date: new Date().toISOString(),
            TaskId: task.id,
            TimeSpentMinutes: timeSpant
        }
        ProjectGateway.EndTask(data);
    }
    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                setStatus(STATUS.STOPPED);
                if (breakeMode) {
                    setsetBreakMode(false);
                    setSecondsRemaining(INITIAL_COUNT);
                    setBackground("#DAAD86");
                }
                else {
                    setsetBreakMode(true);
                    setSecondsRemaining(0.3 * 60);
                    setBackground("#659DBD");
                }
            }
        },
        status === STATUS.STARTED ? 1000 : null,
    )

    const TaskCompleted = () => {
        var data = {
            taskId: task.id,
            taskIsCompleted : !task.completed
        }
        setCheck(!check);
        setTimeout(ProjectGateway.TaskCompleted(data).then(r => {
            window.location.reload();
        }), 1000);
    }

    const deleteTask = () => {
        var data = { TaskId: task.id }
        ProjectGateway.DeleteTask(data).then(r => {
            window.location.reload();
        })
    }

    return (
        <div className="flex w-4/5 p-3 bg-white rounded-lg cursor-pointer mt-5 border-x-4" style={{ borderColor: task.flag }}>

            <IconContext.Provider value={{ color: "#2F2FA2", className: "shared-class", size: 18 }}>
                <ReactCircleModal
                    backgroundColor={background}
                    toogleComponent={onClick => (
                        <button className="mr-3" onClick={onClick}>
                            <BsPlayCircleFill />
                        </button>
                    )}
                    offsetX={0}
                    offsetY={0}
                >
                    {(onClick) => (
                        <div className='flex flex-col justify-center items-center' style={{ backgroundColor: { background }, color: "white", padding: '1em', height: "100%", zIndex: 10000000000000000000000 }}>

                            <div className="bg-white rounded-lg text-black p-1 mb-10 flex items-center justify-between" style={{ width: "max-content", }}>
                                <div className="flex items-center">
                                    <CheckBox
                                        checked={check}
                                        checkBoxStyle={{
                                            checkedColor: "#34b93d",
                                            size: 20,
                                            //unCheckedColor: "#b8b8b8"
                                            unCheckedColor: task.flag
                                        }}
                                        duration={130}
                                        onClick={() => setCheck(!check)}
                                    />
                                    <span className="ml-5 mr-3">
                                        {task.title}
                                    </span>
                                </div>

                                <div className="flex items-center">

                                    <div className="flex mr-1 items-center">
                                        {(task.timeComplited / task.tomatoLength)} /
                                        {task?.tomatoCount}
                                        <MdTimer style={{ color: '#6366f1' }} />
                                    </div>



                                </div>
                            </div>

                            <div className='flex'>
                                <div className=" bg-white text-black text-9xl  w-fit p-5 rounded-full">
                                    {twoDigits(hoursToDisplay)}
                                </div>
                                <span className=" text-9xl pt-5  p-2 ">:</span>
                                <div className=" bg-white text-black text-9xl  w-fit p-5 rounded-full">
                                    {twoDigits(minutesToDisplay)}
                                </div>
                                <span className="text-9xl  pt-5 p-2 ">:</span>
                                <div className=" bg-white text-black text-9xl  w-fit p-5 rounded-full">
                                    {twoDigits(secondsToDisplay)}
                                </div>
                            </div>

                            <div className='flex mt-10 mb-10 justify-between'>
                                <IconContext.Provider value={{ className: "shared-class", size: 22 }}>
                                    <button className={buttonStyle} onClick={handleStart} type="button">
                                        <FiPlay />
                                    </button>
                                    <button className={buttonStyle} onClick={handleStop} type="button">
                                        <BsPauseCircle />
                                    </button>
                                    <button className={buttonStyle} onClick={handleReset} type="button">
                                        <BsStopCircle />
                                    </button>
                                </IconContext.Provider>
                            </div>
                            <IconContext.Provider value={{ className: "shared-class", size: 55 }}>
                                <button onClick={onClick}>
                                    <IoIosCloseCircleOutline />
                                </button>
                            </IconContext.Provider>
                        </div>
                    )}
                </ReactCircleModal>
            </IconContext.Provider>

            <CheckBox
                checked={check}
                checkBoxStyle={{
                    checkedColor: "#34b93d",
                    size: 20,
                    //unCheckedColor: "#b8b8b8"
                    unCheckedColor: task.flag
                }}
                duration={130}
                onClick={() => TaskCompleted()}
            />
            <div className="ml-3 " style={{ width: "70%" }} onClick={() => { taskState.changeCollapsed(false); setSelectedTask(task) }}>
                <span className={check ? 'completed' : ''}>{task.title}</span>
            </div>
            <div className="flex justify-end" style={{ width: "30%" }}>
                <IconContext.Provider value={{ className: "shared-class", size: 22 }}>
                    <div className=" ml-5 flex flex-row">
                        <span className="flex items-center" style={{width:"max-content"}}>
                            <div style={{ background: task.project.color }} className="rounded-full mr-3 w-px w-3 h-3"></div>
                            {task.project.title}
                        </span>
                        <div className="flex items-center ml-20" style={{minWidth:"80px"}}>
                            {(task.timeComplited / task.tomatoLength)} /
                            {task?.tomatoCount}
                            <MdTimer style={{ color: '#6366f1' }} />
                        </div>

                        <RiDeleteBin6Line onClick={() => deleteTask()} className=" ml-5" style={{ color: 'red', width: "22px !important", height: "22px !important" }} />
                    </div>


                </IconContext.Provider>


            </div>

        </div >
    )
}