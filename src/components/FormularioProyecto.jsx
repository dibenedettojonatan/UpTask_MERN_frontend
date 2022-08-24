import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos()
    
    useEffect(() =>{
        if( params.id ){
           setId(proyecto._id)
           setNombre(proyecto.nombre)
           setDescripcion(proyecto.descripcion)
           setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
           setCliente(proyecto.cliente)
           
        }
    },[params])

   

    const handleSubmit = async e => {
        e.preventDefault()
        if([nombre, descripcion, fechaEntrega, cliente].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorio',
                error: true
            })
            return
        }
        // Pasar los datos hacia el provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }
    const {msg} = alerta
    return (
        <form 
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta}/>}

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >Nombre Proyecto</label>
                <input 
                    id="nombre"
                    type="text"
                    className="border rounded-md w-full p-2 mt-2 placeholder-gray-400"
                    placeholder="Nombre del proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="decripcion"
                >Descripción</label>
                <textarea 
                    id="decripcion"
                    className="border rounded-md w-full p-2 mt-2 placeholder-gray-400"
                    placeholder="Descripción del proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-entrega"
                >Fecha Entrega</label>
                <input 
                    id="fecha-entrega"
                    type="date"
                    className="border rounded-md w-full p-2 mt-2 placeholder-gray-400"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente"
                >Nombre Cliente</label>
                <input 
                    id="cliente"
                    type="text"
                    className="border rounded-md w-full p-2 mt-2 placeholder-gray-400"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value={ id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-800 transition-colors"
            />

        </form>
    )
}

export default FormularioProyecto