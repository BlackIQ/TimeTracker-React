import {useState} from "react";

const Home = () => {
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
