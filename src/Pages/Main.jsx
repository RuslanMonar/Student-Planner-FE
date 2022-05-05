import { Header } from "../Components/Navigation/Header"

export const Main = () => {
      return (
        <div>
            <Header></Header>
            <div className="w-full flex justify-center test">
                <div className="max-w-7xl  flex justify-center align-middle flex-col ">

                    {/* <div className="w-full flex justify-center align-middle flex-col justify-center items-center mb-20">
                        <img className=" max-w-7xl" src="/img/Main/valor-de-uma-equipe-img.jpg" />
                        <span className="text-5xl font-medium tracking-wide ">Student-Planner powerfull productivity app</span>
                    </div> */}

                    <div className="w-full flex justify-center align-middle">
                        <div className="w-4/12 flex justify-center items-center flex-col">
                            <h1 className="text-4xl font-bold mb-10 "> Organize it all with Student-Planner</h1>
                            <div className="w-12/12">
                                <span className="text-2xl font-bold mb-10 ">Free up your mental space. </span>
                                <span className="text-xl">Regain clarity and calmness by getting all those tasks out of your head and onto your to-do list (no matter where you are or what device you use).</span>
                            </div>
                        </div>
                        <div className="w-7/12">
                            <img src="/img/Main/super.png" />
                        </div>
                    </div>

                    <div className="w-full flex justify-center align-middle test2">
                        <div className="w-6/12">
                            <img src="/img/Main/46ffe0b31464e98fce82a34a115b1f49.jpg" />
                        </div>
                        <div className="w-5/12 flex justify-center items-center flex-col">
                            <h1 className="text-4xl font-bold mb-10 "> Organize it all with Student-Planner</h1>
                            <div className="w-12/12">
                                <span className="text-2xl font-bold mb-10 ">Free up your mental space. </span>
                                <span className="text-xl">Regain clarity and calmness by getting all those tasks out of your head and onto your to-do list (no matter where you are or what device you use).</span>
                            </div>
                        </div>
                      </div>
                      
                      <div className="w-full flex justify-center align-middle test3">
                        <div className="w-4/12 flex justify-center items-center flex-col">
                            <h1 className="text-4xl font-bold mb-10 "> Organize it all with Student-Planner</h1>
                            <div className="w-12/12">
                                <span className="text-2xl font-bold mb-10 ">Free up your mental space. </span>
                                <span className="text-xl">Regain clarity and calmness by getting all those tasks out of your head and onto your to-do list (no matter where you are or what device you use).</span>
                            </div>
                        </div>
                        <div className="w-6/12">
                            <img src="/img/Main/sd.webp" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}