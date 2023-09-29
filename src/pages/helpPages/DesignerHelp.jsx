import React, { Component } from 'react';
import './company.css'
import Footer from "../../components/Footer";

class DesignerHelp extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() { 
        return ( <>
        <div className='help-outer'>
        <div id="company-help" className='help-wrapper company-help'>
            <div className="head-section">
                <h3>Designer Official page</h3>
                <p>For architects, interior designers, landscapers, product designers and profissionals.</p>
                <a href="/designeraccount">Join Now</a>
                <div className="head-image">
                    <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676435507/Mask_Group_13_oklagy.png" alt="" />
                </div>
            </div>

            <section className='help-alternate'>
                <div className="alter-row img-left">
                    <div className="side-img">
                        <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676439452/Screen_Shot_202_kd3cdo.png" alt="" />
                    </div>
                    <h6>Showcase your work and get Discovered online</h6>
                    <p>Publish unlimited projects architecture, interior, products design, and more online featuring descriptions, videos, photos, All projects pages come with a request form to allow new clients and other professionals to discover your company to get in touch with your company to send a design quote request.</p>
                </div>
                <div className="alter-row img-right">
                    <h6>
                    Share your design choice
                    </h6>
                    <p>
                    Tag the products you use on your projects page. It is the best way to show your talent and keeps you connected with the brands and manufacturers you work with before.
                    </p>
                    <div className="side-img">
                        <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676445042/Group_707_tzhaet.png" alt="" />
                    </div>
                </div>
                <div className="alter-row img-left">
                    <div className="side-img">
                        <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676447592/Screen_Shot_202_1_pqgvbc.png" alt="" />
                    </div>
                    <h6>For product designers</h6>
                    <p>
                    If you are a designer, we allow the brands you work with to tag you in their products and show their products on your page; It is the best way to keep you connected with your brand clients and help common users to discover and buy your design products online.
                        </p>
                </div>
                <div className="alter-row img-right">
                    <h6>
                    Spread your idea
                    </h6>
                    <p>
                    Write unlimited design blogs in the design and inspire others by your thoughts, it the best way to build a better reputation about your self.
                    </p>
                    <div className="side-img">
                        <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676450141/Group_710_3_wryzr9.png" alt="" />
                    </div>
                </div>
                
            </section>

            <a href='/designeraccount' className='black-join my-5'>
                Join now
            </a>
           
        </div>
        <Footer/>
        </div>

        </> );
    }
}
 
export default DesignerHelp;