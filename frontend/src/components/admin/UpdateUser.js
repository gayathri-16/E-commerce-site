import React,{Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import AdminPanel from './AdminPanel';
import '../../cssFiles/login.scss'
import {useParams } from 'react-router';
import { getUser, updateUser } from '../../actions/userActions';
import {toast} from 'react-toastify'
import { clearUserUpdated,clearError } from '../../slice/userSlice';
function UpdateUser(props) {
    const [name,setName] = useState("");
    const[email,setEmail]=useState("");
    const[role,setRole]=useState("");
    const{id:userId} = useParams()
    const{loading, isUserUpdated, error, user } = useSelector(state => state.userState)
    const{ user:authUser } = useSelector(state => state.authState)
  

   const dispatch = useDispatch();




const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name' , name);
    formData.append('email' , email);
    formData.append('role' , role);
   
 
    dispatch(updateUser(userId, formData))
}

  



  useEffect(()=>{
    if(isUserUpdated){
        toast('User Updated Succesfully!',{
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearUserUpdated())
        })
        
        return;
    }
    if(error)  {
        toast(error, {
            position: toast.POSITION.BOTTOM_CENTER,
            type: 'error',
            onOpen: ()=> { dispatch(clearError()) }
        })
        return
    }
    dispatch(getUser(userId))
  },[isUserUpdated,error,dispatch,userId])
   
  
  useEffect(() => {
    if(user._id) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
     
    }
},[user])

    return (
        <Fragment>
        <AdminPanel/>
        <div className="components-render"> 
          
        <div className="login-container">
            <div className='header-title' style={{height:""}}>
                <h2>Update User</h2>
             </div>
        <form onSubmit={submitHandler}>
               <div id="update-sec">
               
               <label>Name</label>
               <input name='name' onChange={e => setName(e.target.value)}  value={name} placeholder="Name" />
               <label >Email</label>
               <input type="email"   name='email' onChange={e => setEmail(e.target.value)} value={email}  placeholder="Email" />
               <label >Role</label>
                {/* <select disabled={user._id === authUser._id} value={role} className='slct-category' style={{width:"400px",height:"5vh",color:"rgb(63, 63, 63)",marginBottom:"3rem", background:"#fff"}} onChange={e => setRole(e.target.value)} >
                <option value=""></option>
                <option value="user">Admin</option>
                <option value="admin">User</option>
                </select> */}
                  <input type="text" disabled={user._id === authUser._id}  name='role' onChange={e => setRole(e.target.value)} value={role}  placeholder="role" />
          
                <button id="log-btns" type="submit" disabled={loading} >UPDATE</button>
   
                </div>  
               
              </form> 
        </div>
        </div>
       </Fragment>
    );
}

export default UpdateUser;