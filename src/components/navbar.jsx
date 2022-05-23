import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../firebase/firebase";
import {useEffect, useState} from "react";

const Navbar = () => {

    const [navLink, setNavLink] = useState('');

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        if (user) setNavLink(<Link className='text-white' onClick={() => logout()}>Logout</Link>)
        else setNavLink(<Link className='text-white'>Auth</Link>)
    }, [user, loading])

    return (
        <nav className='navbar navbar-light bg-primary shadow-0'>
            <div className='container'>
                <Link className='navbar-brand text-white' to='/'>Time Tracker</Link>
                {navLink}
            </div>
        </nav>
    );
}

export default Navbar;