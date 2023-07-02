import { Fragment, useEffect, useState } from 'react'
import{clearAuthError, login, register} from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import '../../cssFiles/login.scss';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router';

export default function Signin(){

    const[userData,setUserData] = useState({
        name:"",
        email:"",
        password:"",
        address:""
    });
 
    const onChange= (e)=> {
       setUserData({...userData, [e.target.name]: e.target.value})
    }

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [loginContainer,setloginContainer] = useState(true);
    const[showregister,setRegister]=useState(false);
    const[showContainer,setContainer]=useState(true);
    const dispatch = useDispatch();
    const navigate= useNavigate();


    const {loading, error, isAuthenticated} = useSelector(state=>state.authState)
   
    const submitHandler= (e)=>{
        e.preventDefault();
        dispatch(login(email,password))
        setContainer(!showContainer)
   
        // if(!isAuthenticated){
        //     toast('Please Register',{
        //         position:toast.POSITION.TOP_RIGHT,
              
        //       })
        // }

    }

    const submitRegister=(e)=>{
       e.preventDefault();
       const formData = new FormData();
       formData.append('name', userData.name)
       formData.append('email', userData.email)
       formData.append('password', userData.password)
       formData.append('address', userData.address)  

       dispatch(register(formData))
       
    }
    const showSignin = ()=>{
        if(showregister === true){
            setRegister(!showregister)
           
        }
        else{
            setloginContainer(!loginContainer)
        }

    }
    const ShowRegister= ()=>{
        if(loginContainer === true ){
            setloginContainer(!loginContainer)
        }
        else{
            setRegister(!showregister)

        }

    }
    useEffect(()=>{
         if(error){
            toast(error, {
              position:toast.POSITION.TOP_CENTER,
              type:'error',
              onOpen:()=>{dispatch(clearAuthError)}
            })
             return
         }
    },[error, isAuthenticated, navigate,dispatch])

    return (
        <Fragment>
         
  { showContainer &&     
       <div className='blur-div'>

 
          <div className="login-container">
             <div className='header-title'>
                <h2>SignIn Or Register</h2>
                <i class="fa-solid fa-circle-xmark" id="times" onClick={()=>setContainer(!showContainer)}></i>
             </div>
             <div className="register-btn">
            <button className="sign-btn" onClick={showSignin}>Sign In</button>
            <button className='reg-btn' onClick={ShowRegister}>Register</button>
             </div>
           
              
          
           
             {showregister &&              
                <Fragment>
         
               <form onSubmit={submitRegister}>
               <div  className="mail-password-sec" id="register-sec">
               <label>Name</label>
               <input type="text"  name='name' onChange={onChange} placeholder="Name" />
               <label>Email</label>
               <input type="email" name='email' onChange={onChange} placeholder="Email" />
               <label>Password</label>
               <input type="password" name='password' onChange={onChange} placeholder="Password" />
               <label>Address</label>
               <input type="text" name='address' onChange={onChange}   placeholder="address" />
               <div className="register-btn" id="log-btns">
               <button className="sign-btn" type="submit" disabled={loading} >Register</button>
               <button className='reg-btn' onClick={()=>setContainer(!showContainer)}>Cancel</button>
               </div>
               </div>
              </form> 
            
                </Fragment> 
               
             }

                <Fragment>
                {  loginContainer &&
                 <form onSubmit={submitHandler}> 
                           <div  className="mail-password-sec">
                          <label>Email</label>
                          <input type="email" value={email}  onChange={e=> setEmail(e.target.value)} placeholder="Enter email" />
                          <label>Password</label>
                          <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Password" />
                          <div className="register-btn" id="log-btns">
                          <button className="sign-btn" type="submit" disabled={loading}>Log in</button>
                          <button className='reg-btn' onClick={()=>setContainer(!showContainer)}>Cancel</button>
                          </div>            
                          </div>
                 </form>
                }
                </Fragment>
            

            </div>
     
            </div>
 } 
        </Fragment>
    )
}