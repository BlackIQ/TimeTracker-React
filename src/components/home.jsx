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

    const [tracks, setTracks] = useState([
        {name: 'Amir', id: 1},
    ]);

    return (
        <div>
            {
                tracks.map(track =>
                    <div key={track.id}>
                        <div className='p-3 text-white bg-primary bg-gradient'>
                            {track.name}
                        </div>
                        <br/>
                    </div>
                )
            }
        </div>
    );
}

export default Home;
