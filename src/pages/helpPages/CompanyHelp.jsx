import React, { Component } from 'react';
import './company.css'
import Footer from "../../components/Footer";

class CompanyHelp extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() { 
        return ( <>
        <div className='help-outer'>
        <div id="company-help" className='help-wrapper company-help'>
            <div className="head-section">
                <h3>Company Official page</h3>
                <p>For architecture, interior design, landscape, products design studios and decoration, construction companies.</p>
                <a href="/createdesigncompany">Create your company now</a>
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
                    <h6>For product design company</h6>
                    <p>If you are a product design company, we allow the brands you work with to tag you in their products and show their products on your page; It is the best way to keep you connected with your brand clients and help common users to discover and buy your design products online.</p>
                </div>
                <div className="alter-row img-right">
                    <h6>
                    Build a better reputation about Your company
                    </h6>
                    <p>
                    Publish unlimited design blog and news and let other people learn more about your company.
                    </p>
                    <div className="side-img">
                        <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676447905/Group_710_2_hhyzov.png" alt="" />
                    </div>
                </div>
                <div className="alter-row img-left">
                    <div className="side-img">
                        <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676448208/Mask_Group_16_1_picvuv.png" alt="" />
                    </div>
                    <h6>Connect your teem online</h6>
                    <p>Add your team members with the title of each one and keep them connected and updated online to allow other people to learn more about them and know your company’s strength.</p>
                </div>
                <div className="alter-row img-right">
                    <h6>
                    Stay in touch
                    </h6>
                    <p>
                    At arch17, we allow others to follow your company activity And keep them updated with your published projects and news. Moreover, you can attach your company contacts and make it easier for others to get in touch with you.
                    </p>
                    <div className="side-img">
                        <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1676448368/Group_715_jlk235.png" alt="" />
                    </div>
                </div>
            </section>

            <a href='/designeraccount' className='black-join mt-5 mb-3'>
                Join now
            </a>
            <p className='text-center help-tail'>
            Please create a designer account then create your company at your page
            </p>
        </div>
        <Footer/>
        </div>

        </> );
    }
}
 
export default CompanyHelp;