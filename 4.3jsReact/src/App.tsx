import { useState } from "react"
import Scene from "./components/Scene"

const App = () =>{
  const name="3D Desk"
  const [lightsOn, setLightsOn] = useState(false)

  const swithLights = () =>{
    setLightsOn(!lightsOn)
  }

  return(
    <div className="h-[100vh] w-auto px-20 flex flex-col justify-center items-center bg-black relative">
      <>
    <h1 className="text-white absolute top-10 text-3xl font-extrabold">{name}</h1>

    <button 
        onClick={swithLights} 
        className="absolute top-24 px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200 transition cursor-pointer z-10"
      >
        {lightsOn ? "Turn Off Lights" : "Turn On Lights"}
      </button>
 
      <div className="h-full w-full cursor-grab">
        <Scene lightsOn={lightsOn} />
      </div>

    </>
    </div>
  )
}
export default App