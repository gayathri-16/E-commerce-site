import React  from 'react';
import Categories from '../cart/Categories';
import Products from '../product/Products'
import '../../cssFiles/home.scss'
import MetaData from '../layouts/MetaData';
function Home(props) {
      return (

        <div className='shop-container'>
          <MetaData title={'Buy Best Products'}/>
         
              <div className='body-content'>
                 <div className='offer'>
                    <h4>20 <sup style={{fontSize:"23px"}}>%</sup> <sub>off</sub></h4>
                 </div>
                 <div className='off-name'>
                    <h1>Spring</h1>
                    <h2>Season festival</h2>
                    <div className='catalogue'> CATALOGUE 2023</div>
                 </div>
                
                 <div className='green-bg'>
                    <img id="photo" src="https://www.pngmart.com/files/1/Mens-Fashion-PNG-Transparent-Image.png" alt="" />
                 </div>
                  <div className='off-time'>
                    <h4>Limited <br/> Time  <br/>Offer </h4>
                    <p>GET THE OFFER <hr/> </p>
                  </div>
             </div>
             
             <div className='products'>
                <Categories/>
             </div>

             <div className='top-products'>
                <Products/>
             </div>

         
        </div>
    );
}

export default Home;