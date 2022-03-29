import {useState} from "react";

const Auth = () => {
    const [form, setForm] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmit = e => {
        e.preventDefault();

        const user = {email, password};

        console.log(user);
    }

    const registerSubmit = e => {
        e.preventDefault();

        const user = {email, password};

        console.log(user);
    }

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-md-4 text-center'>
                    <div className='card border'>
                        <div className='card-body'>
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
                                        <button type='submit' className='btn btn-lg btn-primary w-100'>Login</button>
                                        <br/>
                                        <br/>
                                        <small onClick={() => setForm(false)} className='pointer text-primary'>I don't have an account</small>
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
                                        <button type='submit' className='btn btn-lg btn-primary w-100'>Create</button>
                                        <br/>
                                        <br/>
                                        <small onClick={() => setForm(true)} className='pointer text-primary'>I have an account</small>
                                    </form>
                            }
                            <br/>
                            <p>Or</p>
                            <button className='btn btn-lg btn-danger w-100'>Continue with Google account</button>
                            <br/>
                            <br/>
                            <button className='btn btn-lg btn-dark w-100'>Continue with Anonymous account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
