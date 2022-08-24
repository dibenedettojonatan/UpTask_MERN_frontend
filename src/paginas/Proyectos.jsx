import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos()

 
  const { msg } = alerta
  
  return (
    <>
      <h1 className="text-4xl font-black text-center">Proyectos</h1>
      { msg && <Alerta alerta={alerta} />}
      <div className="bg-white shadow mt-10 rounded-md">

        {proyectos.length ?
                          proyectos.map( proyecto => (
                          <PreviewProyecto
                            key={proyecto._id}
                            proyecto={proyecto}
                          />
                          ))
                          : <p className=" p-5 text-center text-gray-600 uppercase">No hay proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos