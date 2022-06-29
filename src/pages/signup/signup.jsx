
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { Lock } from 'react-feather';
import { auth } from '../../firebase';



import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth';
import { toast } from 'react-toastify';


const Signup = () => {
  
    let navigate = useNavigate();


    const [error, setError] = useState();
    const [submitButton, setSubmitButton] = useState(false);


    const formik = useFormik({
        initialValues: {
            name:'',
            email: '',
            password: ''
        },
        enableReinitialization: true,
        onSubmit: values => {
            if (!values?.email) {
                setError('Email is blank');
            } else if (!values?.email ) {
                setError('password is blank');
            }  else if (!values?.name) {
                setError('Name is blank');
            }  else if (!values?.password) {
                setError('Password is blank');
            } else if (values?.email && values?.password && values?.name) {
                setSubmitButton(true);
                createUserWithEmailAndPassword(auth, values?.email, values?.password).then(async(res) => {
                    console.log('login', res);
                    const user = res?.user;
                   await updateProfile(user, {
                        displayName: values?.name
                    });
                    navigate('/login')
                    toast.success('Signup is Completed');
                    setSubmitButton(false);
                }).catch(error =>{ 
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

    return (
        <div className='login-container'>

            <div className="login-form-container">

                { error && <div className="error-field">{ error }</div> }
                <div className="input-field-box-w">
                    <div className="login-heading"><Lock size={ 20 } color="#363a45" className='lock-icon' />&nbsp; Welcome in Concrete.</div>
                    <label className='input-field-label'>Name</label>
                    <input type="text" className="input-field-w" placeholder='John Doe' onChange={ (e) => { formik.setFieldValue('name', e.target.value) } } />
                </div>
                <div className="input-field-box-w">
                    <label className='input-field-label'>Email</label>
                    <input type="email" className="input-field-w" placeholder='johndoe@mail.com' onChange={ (e) => { formik.setFieldValue('email', e.target.value) } } />
                </div>
                <div className="input-field-box-w">
                    <label className='input-field-label'>Password</label>
                    <input type="password" className="input-field-w" onChange={ (e) => { formik.setFieldValue('password', e.target.value) } } />

                    <button className="getStarted-btn" type="submit" disabled={submitButton}  onClick={ formik.handleSubmit }>Sign up</button>

                    <div className="signup">Already have an account? <Link to={ '/login' }>Signin</Link></div>
                </div>


            </div>

        </div>
    )
}

export default Signup
