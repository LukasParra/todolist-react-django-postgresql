import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TasksFormPage() {

    const {register, handleSubmit, formState : {errors}, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        if (!params.id) {
            await createTask(data);
            toast.success("Tarea creada", {
                style: {
                    backgroundColor: "#101010",
                    color: "#fff",
                }
            });
        } else {
            await updateTask(params.id, data);
            toast.success("Tarea actualizada", {
                style: {
                    backgroundColor: "#101010",
                    color: "#fff",
                }
            });
        }
        navigate("/tasks");
    })

    useEffect(() => {
        async function loadTasks() {
            if (params.id) {
                const {data : {title, description}} = await getTask(params.id);
                setValue("title", title);
                setValue("description", description);
                }
            } loadTasks();
        }, [])

    return(
        <div className='max-v-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Título" {...register("title", { required: true})}
                className='bg-zinc-700 p-3 rouded-lg block w-full mb-3'/>
                {errors.title && <span>El título es requerido</span>}
                <textarea rows="3" placeholder="Descripción" {...register("description", { required: true})}
                className='bg-zinc-700 p-3 rouded-lg block w-full mb-3'/>
                {errors.title && <span>La descripción es requerida</span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Guardar</button>
            </form>
            {params.id && <button className="bg-red-500 p-3 rounded-lg w-48 mt-3" onClick={ async () => {
            const accepted = window.confirm("¿Estás seguro de eliminar esta tarea?");
            if (accepted){
                await deleteTask(params.id);
                toast.success("Tarea eliminada", {
                    style: {
                        backgroundColor: "#101010",
                        color: "#fff",
                    }
                });
                navigate("/tasks");
            }
            }}>Eliminar</button>}
        </div>
    )
}