import React from 'react';
import '../../cssFiles/home.scss'

function Footer(props) {
    return (
        <div>
             <hr id="foot-hr"/>
            <div id="footer-section">
                <div className='about-shop'>
                    <img id="shop-logo" src="/logo1.png" alt="" />
                    <p> Fashion is an enchanting and easy to use <br/>
                        e-commerce WP theme that allows you to sell <br/>
                        your porducts in a dynamic way.<br/> <br/>

                        The theme is packed with everything you need <br/>
                        to create a new website.
                    </p>
                    <div className='login-feild'>
                         <button id="social-media-icons"><a href="https://www.facebook.com/"><i class="fa-brands fa-facebook-f"></i></a></button>
                         <button id="social-media-icons"><a href="https://twitter.com/i/flow/login"><i class="fa-brands fa-twitter"></i></a></button>
                         <button id="social-media-icons"><a href="https://accounts.google.com/v3/signin/identifier?dsh=S33579128%3A1685579702060854&continue=https%3A%2F%2Fplus.google.com%2F&followup=https%3A%2F%2Fplus.google.com%2F&ifkv=Af_xneH9DmPJXTG0N4Fr6XvI2srApcHfaY0d9QS6nEaOD3j8lj3l7OaW-ks_hv5fEDw-Lm5xpHM6&osid=1&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin"><i class="fa-brands fa-google-plus-g"></i></a></button>
                         <button id="social-media-icons"><a href="https://vimeo.com/"><i class="fa-brands fa-vimeo-v"></i></a></button>
                         <button id="social-media-icons"><a href="https://in.pinterest.com/"><i class="fa-brands fa-pinterest"></i></a></button>
                    </div>
                </div>

                <div className='use-link'>
                    <h3>Useful Links</h3>
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Home</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> About Us</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Shop</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Contact Us</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Privacy Policy</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Terms Condition</h5> 
                </div>
                <div className='use-link'>
                    <h3>Information</h3>
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Look Book </h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i>Information </h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Instagram Wall</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Typography</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Parallax presentation</h5> 
                   <h5 className='about-links'><i class="fas fa-angle-right"></i> Modern Process</h5> 
                </div>

                <div className='cotacts-section'>
                    <h3>Contact Info</h3>
                    <p><i class="fa-solid fa-location-dot"></i>1635 Franklin street Montgomery, Near <br/> <p style={{marginLeft:"1.8rem",marginTop:"0.3rem"}}>Sherwood Mall. AL 36104</p> </p>
                    <p><i class="fa-solid fa-envelope"></i>support@sparksshop.com</p>
                    <p><i class="fa-solid fa-phone"></i>126-234-2354</p>
                    <h4 className='news-letter'>Newsletter</h4>
                    <div className='email-section'>
                        <input type="email" placeholder='Enter your email' />
                        <div className='tele-icon'><i class="fa-brands fa-telegram"></i></div>
                    </div>
               </div>                      
            </div>
            <hr/>
            <div className='avialable-app'>
             <p>Fashion Store Mobile app is Available now. Download it now on your favorite device and indulge in a <br/> seamless shopping experiance </p>
             <img src="https://p.kindpng.com/picc/s/114-1144140_available-on-the-app-store-and-google-play.png" alt="" />
            </div>

            
        </div>
    );
}

export default Footer;