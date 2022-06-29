
import React, { useState } from 'react'
import { useFormik } from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import { Lock, User } from 'react-feather';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
    let auth = getAuth();
    let navigate = useNavigate();

    const [error, setError] = useState();
    const [submitButton, setSubmitButton] = useState(false);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        enableReinitialization: true,
        onSubmit: values => {
            if (!values?.email) {
                setError('Email is blank');
            } else if (!values?.email) {
                setError('password is blank');
            }  else if (!values?.password) {
                setError('Password is blank');
            } else if (values?.email && values?.password) {
                setSubmitButton(true);
               signInWithEmailAndPassword(auth, values?.email, values?.password).then((res) => {
                    console.log('login', res?.accessToken);
                    localStorage.setItem('token', JSON.stringify(res.user.stsTokenManager.accessToken))
                    navigate('/products')
                    toast.success('Welcome to Concrete!');
                    setSubmitButton(false);
                }).catch(error => {
                    console.log('error', error.message);
                    setError(error.message)
                    toast.warn(error);
                    setSubmitButton(false);
                });
                //  <navigate to={'/products'}/>

            }
            console.log('logi', values)

        }

    })

let src =""
    return (
        <div className='login-container' style={ { backgroundImage: ` url(${src})` } }>

            <div className="login-form-container">
                <div className="login-heading"><Lock size={ 20 } color="#363a45" className='lock-icon'/>&nbsp; Welcome back in Concrete.</div>

                {error && <div className="error-field">{error}</div>}
                    <div className="input-field-box-w">
                   
                        <label className='input-field-label'>Email</label>
                        <input type="email" className="input-field-w" placeholder='johndoe@mail.com' onChange={(e)=>{formik.setFieldValue('email', e.target.value)}} />
                        </div>
                    <div className="input-field-box-w">
                        <label className='input-field-label'>Password</label>
                    <input type="password" className="input-field-w"onChange={ (e) => { formik.setFieldValue('password', e.target.value) } }/>

                    <button className="getStarted-btn" type="submit" disabled={ submitButton }   onClick={formik.handleSubmit}>Sign in</button>

                        <div className="signup">Not have any account? <Link to={'/signup'}>Signup</Link></div>
                        </div>

               
            </div>

        </div>
    )
}

export default Login
