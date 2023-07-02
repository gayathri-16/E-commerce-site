import React from 'react';
import '../../cssFiles/categories.scss'
function Categories(props) {
    return (
        <div>
            <div className='categories'>
                <div className='end-season'>
                    <h3>End Of <br/> Season</h3>
                    <p>Avail massive discounts and get exciting offers <br/> with our shopping across all new arrival <br/> categories </p>
                     <hr/>
                     <button> Shop Now</button>
                </div>
                <div className='women'>
                   <img id="girl" src="https://i.pinimg.com/564x/ce/24/39/ce2439743c24a66caea0542efe4305c4.jpg" alt="" />
                 
                   <hr/>  <h6>Women</h6>
                </div>
                
                <div className='kids'>
                   <img src="https://i.pinimg.com/564x/2d/e1/3f/2de13f9072f7affa9e875ddd0fe219e4.jpg" alt="" />
                
                   <hr/>  <h6>Kids</h6>
                </div>
                <div className='men'>
                   <img src="https://i.pinimg.com/564x/79/c7/1c/79c71c4bc24310db681bc453f78ab5ff.jpg" alt="" />
                   
                   <hr/>  <h6>Men</h6>
                </div>
            </div>
        </div>
    );
}

export default Categories;