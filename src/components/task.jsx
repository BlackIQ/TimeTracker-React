import {doc, deleteDoc} from "firebase/firestore";
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

    return (
        <div key={task.id}>
            <div className='border border-primary rounded-4 p-3'>
                <span>{task.name}</span>
                <hr className='text-primary'/>
                <span className={'pointer text-danger'} onClick={() => handleDelete()}>Delete</span>
            </div>
            <br/>
        </div>
    );
}

export default Task;
