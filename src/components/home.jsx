import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {db, auth, taskReference, addNewTask, usersReference} from "../firebase/firebase";
import {query, where, onSnapshot, serverTimestamp, doc, updateDoc} from "firebase/firestore";
import Task from "./task";
import {FaUser} from "react-icons/fa";

const Home = () => {
    const [user, loading, error] = useAuthState(auth);

    const history = useHistory();

    const [name, setName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [userData, setUserData] = useState('');

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

    const getTasks = async () => {
        const q = query(taskReference, where('uid', '==', user?.uid));
        return onSnapshot(q, (querySnapshot) => {
            setTasks(querySnapshot.docs.map(doc => ({...doc.data(), 'id': doc.id})));
        })
    }

    const getUser = async () => {
        const q = query(usersReference, where('uid', '==', user?.uid));
        return onSnapshot(q, (querySnapshot) => {
            setUserData(({'user': querySnapshot.docs[0].data(), 'id': querySnapshot.docs[0].id}));
        })
    }

    const [userName, setUserName] = useState('');

    const handleUserChangeName = async () => {
        const userNew = {
            'name': userName,
        }
        try {
            const u = doc(db, 'users', userData.id);
            await updateDoc(u, userNew);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    useEffect(() => {
        if (loading) return;
        if (!user) history.push('/auth');
        getTasks();
        getUser();
    }, [user, loading])

    if (!tasks) return null;

    return (
        loading
            ?
            <p>Loading . . .</p>
            :
            <div>
                <h3>Welcome <span className='text-primary pointer' data-mdb-toggle='modal' data-mdb-target='#profile'>{userData?.user?.name ? userData?.user?.name : 'No name'}</span>.</h3>
                <br/>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='m-1'>
                            {tasks != '' ? tasks.map(task => <Task key={task.id} task={task}/>) : <span>Not found</span>}
                        </div>
                    </div>
                    <div className='col-md-6'>
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
                    </div>
                </div>
                <div className='modal fade' id='profile'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header text-white bg-primary'>
                                <h5 className="modal-title">Profile</h5>
                            </div>
                            <div className='modal-body' style={{padding: 0}}>
                                <div className='p-5 text-center bg-primary text-white'>
                                    {
                                        user?.photoURL ? <img src={user?.photoURL} className='rounded-circle'/> : <FaUser />
                                    }
                                    <br/>
                                    <br/>
                                    <h5>{user?.displayName ? user?.displayName : 'No name'}</h5>
                                </div>
                                <div className='p-3'>
                                    <h5>Change your name</h5>
                                    <form>
                                        <label className='form-label' htmlFor='name'>Name</label>
                                        <input className='form-control' id='name' placeholder='Name' onChange={e => setUserName(e.target.value)}/>
                                        <br/>
                                        <button type='button' onClick={() => handleUserChangeName()} className='btn btn-primary w-100'>Change name</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Home;
