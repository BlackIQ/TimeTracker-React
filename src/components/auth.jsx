import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, googleAuth, anonAuth, emailPasswordAuth, register, facebookAuth, githubAuth, yahooAuth} from "../firebase/firebase";
import {useHistory} from "react-router-dom";

const Auth = () => {

    const history = useHistory();

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        if (user) history.push('/');
    }, [user, loading])

    const [form, setForm] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmit = e => {
        e.preventDefault();
        emailPasswordAuth(email, password);
    }

    const registerSubmit = e => {
        e.preventDefault();
        register(email, password);
    }

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-md-8 text-center'>
                    <div className='card border'>
                        <div className='card-body'>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="m-1">
                                    {
                                            form
                                                ?
                                                <form onSubmit={loginSubmit} style={{'textAlign': 'left'}}>
                                                    <h4>Login with Email</h4>
                                                    <hr/>
                                                    <label className='form-label' htmlFor='email'>Email</label>
                                                    <input type='email' id='email' className='form-control' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                                                    <br/>
                                                    <label className='form-label' htmlFor='password'>Password</label>
                                                    <input type='password' id='password' className='form-control' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                                                    <br/>
                                                    <button type='submit' className='btn btn-lg btn-primary shadow-0 w-100'>Login</button>
                                                    <br/>
                                                    <br/>
                                                    <button type='button' onClick={() => setForm(false)} className='btn btn-lg btn-link w-100 text-primary'>I don't have an account</button>
                                                </form>
                                                :
                                                <form onSubmit={registerSubmit} style={{'textAlign': 'left'}}>
                                                    <h4>Create an account</h4>
                                                    <hr/>
                                                    <label className='form-label' htmlFor='email'>Email</label>
                                                    <input type='email' id='email' className='form-control' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                                                    <br/>
                                                    <label className='form-label' htmlFor='password'>Password</label>
                                                    <input type='password' id='password' className='form-control' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                                                    <br/>
                                                    <button type='submit' className='btn btn-lg btn-primary shadow-0 w-100'>Create</button>
                                                    <br/>
                                                    <br/>
                                                    <button type='button' onClick={() => setForm(true)} className='btn btn-lg btn-link w-100 text-primary'>I have an account</button>
                                                </form>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="m-1">
                                        <button onClick={() => googleAuth()} className='btn btn-danger shadow-0 w-100'>Continue with Google account</button>
                                        <br/>
                                        <br/>
                                        <button onClick={() => facebookAuth()} className='btn btn-info shadow-0 w-100'>Continue with Twitter account</button>
                                        <br/>
                                        <br/>
                                        <button onClick={() => facebookAuth()} className='btn btn-primary shadow-0 w-100'>Continue with Facebook account</button>
                                        <br/>
                                        <br/>
                                        <button onClick={() => githubAuth()} className='btn btn-dark shadow-0 w-100'>Continue with Github account</button>
                                        <br/>
                                        <br/>
                                        <button onClick={() => yahooAuth()} className='btn btn-secondary shadow-0 w-100'>Continue with Yahoo account</button>
                                        <br/>
                                        <br/>
                                        <button onClick={() => anonAuth()} className='btn btn-outline-black shadow-0 w-100'>Continue with Anonymous account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;