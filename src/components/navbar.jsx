import {Link, useHistory} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../firebase/firebase";
import {useEffect, useState} from "react";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);


    useEffect(() => {
        if (loading) return;
    }, [user, loading])

    return (
        <nav className='navbar navbar-light bg-primary shadow-0'>
            <div className='container'>
                <Link className='navbar-brand text-white' to='/'>Time Tracker</Link>
                {
                    user ? <div className='btn-group shadow-0'>
                        <span className="text-white pointer" data-mdb-toggle="dropdown">Options</span>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item pointer text-primary" to={'/'}>All</Link></li>
                            <li><Link className="dropdown-item pointer text-success" to={'/done'}>Done</Link></li>
                            <li><Link className="dropdown-item pointer text-danger" to={'/not'}>Not done</Link></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><span className="dropdown-item pointer" onClick={() => logout()}>Logout</span></li>
                        </ul>
                    </div> : <Link className='text-white'>Auth</Link>
                }
            </div>
        </nav>
    );
}

export default Navbar;
