import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";

const Task = (props) => {
    const task = props.task;

    const handleDelete = async () => {
        try {
            const t = doc(db, 'tasks', task.id);
            await deleteDoc(t);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    const handleUpdate = async () => {
        try {
            const data = {
                'status': !task.status,
            };
            const t = doc(db, 'tasks', task.id);
            await updateDoc(t, data);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div key={task.id}>
            <div className='border border-primary rounded-4 p-3'>
                <div className='pointer' onClick={() => handleUpdate()}>
                    <input type='checkbox' className='form-check-input' checked={task.status}/>
                    <span>{task.name}</span>
                </div>
                <hr className='text-primary'/>
                <span className={'pointer text-danger'} onClick={() => handleDelete()}>Delete</span>
            </div>
            <br/>
        </div>
    );
}

export default Task;
