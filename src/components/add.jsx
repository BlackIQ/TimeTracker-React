import {serverTimestamp} from "firebase/firestore";
import {addNewTask, auth} from "../firebase/firebase";
import {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";

const Add = () => {

    const [user, loading, error] = useAuthState(auth);

    const [name, setName] = useState('');

    const addTask = e => {
        e.preventDefault();

        const data = {
            'uid': user?.uid,
            'name': name,
            'status': false,
            'created': serverTimestamp(),
        };

        addNewTask(data);

        setName('');
    }

    return (
        <div className='shadow-6 rounded-5 m-1 p-3'>
            <h4 className='text-primary'>New one</h4>
            <br/>
            <form onSubmit={addTask}>
                <label htmlFor='name' className='form-label'>Task name</label>
                <input type='text' id='name' className='form-control' value={name} placeholder='Name'
                       onChange={e => setName(e.target.value)} autoComplete='off'/>
                <br/>
                {name ? <button type='submit' className='btn btn-primary w-100'>Add task</button> :
                    <button type='submit' className='btn btn-primary w-100' disabled>Add task</button>}
            </form>
        </div>
    );
}

export default Add;
