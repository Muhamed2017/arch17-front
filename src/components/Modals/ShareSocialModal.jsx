import React, { Component } from "react";
import {
 FacebookShareButton,
 LinkedinShareButton,
 TwitterShareButton,
 PinterestShareButton,
 TumblrShareButton,
 EmailShareButton,
 PinterestIcon,
 FacebookIcon,
 LinkedinIcon,
 TwitterIcon,
 TumblrIcon,
 EmailIcon,
} from "react-share";
class ShareSocialModal extends Component {
 constructor(props) {
  super(props);
  this.state = {
   shareUrl: this.props.page_url,
   media: this.props.media,
   tags: this.props.tags,
   title: this.props.title,
   description: this.props.description,
  };
 }
 render() {
  return (
   <>
    <div id="social_shares">
     <p className="mb-2 sharetype">Social</p>
     <div className="share-row mt-1">
      <FacebookShareButton
       url={this.state.shareUrl}
       hashtag={this.state.tags[0]}
      >
       <FacebookIcon size={35} />
       Facebook
      </FacebookShareButton>
     </div>
     <div className="share-row">
      <TwitterShareButton url={this.state.shareUrl} title={this.state.title}>
       <TwitterIcon size={35} />
       Twitter
      </TwitterShareButton>
     </div>
     <div className="share-row">
      <PinterestShareButton
       url={this.state.shareUrl}
       title={this.state.title}
       media={this.state.media}
      >
       <PinterestIcon size={35} />
       Pinterest
      </PinterestShareButton>
     </div>
     <div className="share-row">
      <LinkedinShareButton url={this.state.shareUrl} title={this.state.title}>
       <LinkedinIcon size={35} />
       Linkedin
      </LinkedinShareButton>
     </div>
     <div className="share-row">
      <TumblrShareButton
       url={this.state.shareUrl}
       title={this.state.title}
       tags={this.state.tags}
       caption={this.state.description || this.state.title}
      >
       <TumblrIcon size={35} />
       Tumblr
      </TumblrShareButton>
     </div>
     <div className="share-row">
      <EmailShareButton
       url={this.state.shareUrl}
       title={this.state.title}
       tags={this.state.tags}
       caption={this.state.title}
      >
       <EmailIcon size={35} />
       Email
      </EmailShareButton>
     </div>
    </div>
   </>
  );
 }
}

export default ShareSocialModal;
