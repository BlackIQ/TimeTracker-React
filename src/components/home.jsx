import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, taskReference, addNewTask} from "../firebase/firebase";
import {query, where, onSnapshot, serverTimestamp} from "firebase/firestore";
import Task from "./task";

const Home = () => {
    const [user, loading, error] = useAuthState(auth);

    const history = useHistory();

    const [name, setName] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = e => {
        e.preventDefault();

        const data = {
            'uid': user.uid,
            'name': name,
            'created': serverTimestamp(),
        };

        addNewTask(data);

        setName('');
    }

    const getTasks = async () => {
        const q = query(taskReference, where('uid', '==', user.uid));
        return onSnapshot(q, (querySnapshot) => {
            setTasks(querySnapshot.docs.map(doc => ({...doc.data(), 'id': doc.id})));
        })
    }

    useEffect(() => {
        if (loading) return;
        if (!user) history.push('/auth');
        getTasks();
    }, [user, loading])

    if (!tasks) return null;

    return (
        <div>
            <h3>Welcome.</h3>
            <br/>
            <div className='row'>
                <div className='col-md-6'>
                    {tasks && tasks.map(task => <Task key={task.id} task={task}/>)}
                </div>
                <div className='col-md-6'>
                    <div className='shadow-6 rounded-5 m-1 p-3'>
                        <h4 className='text-primary'>New one</h4>
                        <br/>
                        <form onSubmit={addTask}>
                            <label htmlFor='name' className='form-label'>Task name</label>
                            <input type='text' id='name' className='form-control' value={name} placeholder='Name'
                                   onChange={e => setName(e.target.value)}/>
                            <br/>
                            {name ? <button type='submit' className='btn btn-primary w-100'>Add task</button> :
                                <button type='submit' className='btn btn-primary w-100' disabled>Add task</button>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
