import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/firebase";

const Home = () => {

    const history = useHistory();

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        if (!user) history.push('/auth');
    }, [user, loading])

    return (
        <div className='justify-content-center row p-5 m-1'>
            <div className='col-md-4 text-center p-5 m-1'>
                <span>{user?.email}</span>
            </div>
        </div>
    );
}

export default Home;
