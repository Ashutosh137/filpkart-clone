import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../service/Auth';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
const Login = ({ onenter, role }) => {

  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')

  const navigate = useNavigate()

  const handelsubmit = async () => {
    await onenter(email, pass);
  }

  const handelgooglesignup = async () => {
    await signInWithGoogle();
    role==='signup' && navigate('./create-account')
    role==='login' && navigate('/home')
  }

  useEffect(() => {
    if (auth.currentUser) return navigate("/home")
  }, [auth.currentuser])
  return (
    <div className="flex flex-col my-5 w-96">
      <h3 className='text-3xl my-2 font-bold '> join now . </h3>
      <div className=" my-5 sm:w-96 bg-white text-black text-center hover:scale-105 transition-all ease font-semibold outline rounded-2xl ">
        <button className='m-auto capitalize flex p-2 px-6 text-base sm:text-xl ' onClick={handelgooglesignup}><i className='mx-2'><GoogleIcon /> </i>sign-up with Google</button>
      </div>
      <div className='my-4 '>
        <hr  />
        <h2 className='text-xl text-center py-2 font-semibold mx-4'>
          or , continue with email
        </h2>
        <hr  />
      </div>


      <form className='flex flex-col w-96 ' onSubmit={(e) => {
        e.preventDefault()
        handelsubmit()
      }}>

        <input type="email" placeholder="Email" value={email} className='px-3 m-auto w-96  text-xl p-2 border-1 border-black rounded-sm my-2 border text-black  ' onChange={e => setemail(e.target.value)} required></input>
        <input type="password" placeholder="password" value={pass} className='px-3 m-auto w-96 text-xl p-2 border-1 border-black rounded-sm my-2 border text-black ' onChange={e => setpass(e.target.value)} required></input>
        <label className="text-xs sm:text-sm my-3 font-serif">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</label>
        <button type="submit" className='rounded-2xl w-80 my-4 text-xl p-1 capitalize bg-sky-600  m-auto hover:scale-105 transition-all ease'>sign-up</button>

      </form>
      {role === "signup" && <div className='my-3 w-96 capitalize text-xl flex flex-col '>
        <label className='my-3' >already have an account ?  </label>
        <button className='my-3 w-80 mx-auto border-1 rounded-2xl border font-semibold py-1 text-sky-600 capitalize'><Link to='/login'>sign-in</Link> </button>
      </div>}
      {role === "login" && <div className='my-2 w-96 capitalize text-xl flex flex-col '>
        <label className='my-3' >don't have an account ?  </label>
        <button className='my-3 w-80 mx-auto border-1 rounded-2xl border font-semibold py-1 text-sky-600 capitalize'><Link to='/'>sign-up</Link> </button>
      </div>}
    </div>
  )
}
export default Login;
