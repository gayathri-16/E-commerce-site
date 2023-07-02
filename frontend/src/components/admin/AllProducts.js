import React, { Fragment,useEffect } from 'react';
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import AdminPanel from './AdminPanel';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify'
import { clearError } from '../../slice/productsSlice';
import {getAdminProducts} from '../../actions/productActions';
import Loader from '../layouts/Loader';
import {MDBDataTable} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteProduct } from '../../actions/productActions';
import { clearProductDeleted } from '../../slice/productSlice';

function AllProducts(props) {
    const {products = [], loading = true, error} = useSelector (state => state.productsState)
    const dispatch = useDispatch();

    const{ isProductDeleted, error:productError } = useSelector(state => state.productState)
    const setProducts = () =>{
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
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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
        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price : `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/updateproduct/${product._id}`} className="btn btn-primary  py-1 px-2 ml-"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-5">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }
    const deleteHandler = (e,id)=>{
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(()=>{
       if(error || productError){
        toast(error || productError,{
            position:toast.POSITION.BOTTOM_CENTER,
            type:'error',
            onOpen: ()=>{dispatch(clearError())}
        })
        return
       }
       if(isProductDeleted){
        toast('Product Deleted Succesfully!',{
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearProductDeleted())
        })
        return;
    }
       dispatch(getAdminProducts)
    },[dispatch,error, isProductDeleted, productError])
    return (
       <Fragment>
        <AdminPanel/>
        <div className="components-render" style={{marginTop:"-3rem"}}>
            <h1 className='ml-1' >Product List</h1>
            {loading ? <Loader/> :
            <div style={{width:"100%",height:"70vh"}}>

            
                <MDBDataTable
                data={setProducts()}
                bordered
                striped
                hover
                className="py-1 w-100 h-10 mt-2"
                />
                </div>
            }
        </div>
       </Fragment>
    );
}

export default AllProducts;