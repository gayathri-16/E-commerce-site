import React, { Fragment,useEffect } from 'react';
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import AdminPanel from './AdminPanel';
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {deleteUser, getUsers} from '../../actions/userActions';
import Loader from '../layouts/Loader';
import {MDBDataTable} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {clearError, clearUserDeleted } from '../../slice/userSlice';



function Orders(props) {
    const { users = [], loading = true, error, isUserDeleted }  = useSelector(state => state.userState)

    const dispatch = useDispatch();

    const setUsers = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        users.forEach( user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email : user.email,
                role: user.role,
                actions: (
                    <Fragment>
                        <Link to={`/admin/updateuser/${user._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, user._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isUserDeleted) {
            toast('User Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }

        dispatch(getUsers)
    },[dispatch, error, isUserDeleted])


    return (
       <Fragment>
        <AdminPanel/>
        <div className="components-render" style={{marginTop:"-3rem"}}>
            <h1 className='ml-1' >User List</h1>
            {loading ? <Loader/> :
            <div style={{width:"100%",height:"70vh"}}>

            
                       <MDBDataTable
                        data={setUsers()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                </div>
            }
        </div>
       </Fragment>
    );
}

export default Orders;