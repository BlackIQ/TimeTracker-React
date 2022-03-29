import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>Time Tracker</Link>
            </div>
        </nav>
    );
}

export default Navbar;
