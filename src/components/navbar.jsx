import {Link, useHistory} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/firebase";
import {useEffect, useState} from "react";

const Navbar = () => {

    const [navLink, setNavLink] = useState('');

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        if (user) setNavLink(<Link>Logout</Link>)
        else setNavLink(<Link>Auth</Link>)
    }, [user, loading])

    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>Time Tracker</Link>
                {navLink}
            </div>
        </nav>
    );
}

export default Navbar;
