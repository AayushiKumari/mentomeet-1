import React, { Fragment } from "react";
import { Link } from 'react-router-dom'

import brand from '../assets/brand.png'

import '../css/footer.css';

import Dialog from '@material-ui/core/Dialog';
import { Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPrivacy: false,
      openTC: false,
      newsLetterEmail: ''
    }
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token')
  }


  handleClose = () => {
    this.setState({
      openPrivacy: false,
      openTC: false
    });
  }

  openTCDialog = () => {
    this.setState({
      openTC: true
    });
  }

  openPrivacyDialog = () => {
    this.setState({
      openPrivacy: true
    })
  }

  handleSubmit = () => {
    
  }

  render() {
    return (
      <Fragment>
        <footer id="footer">
          <div className="container-fluid" style={{ maxWidth: "1400px", margin: "auto" }}>
            <div className="row">
              <div className="col-sm-4">
                <div className="left-menu">
                  <h3><img className="logo" src={brand} /></h3>
                  <div className="row social-links">
                    {/* To be created */}

                    {/* Twiiter */}
                    <div className="col">
                    <a href="https://twitter.com" target="_none">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABTElEQVRIS92V4TGEMRCGn6uAEnSAClABKkAF6IAK6IAO0IEOUAEqQAfmMclNvlySS8zcn9uZ+3PZ3Xf33d33m7Fim604P+sHsAl8d9B2BJwD+8AHcA9chzjfHmOOnCKddXhtgFwAN4V3Y3aAswD455IC+PgSOjgGngtJtoD3Brggb8BtLDIFkJ6vJDi2bVfR7O6hAfATaJszkFNk1XtZAvn0J9BuhZ4Y8hQonqfIO3BoVr7RMeiSi4O+Sh9aFP0H4zLwX+zAP0sUjQBJ4WQD8xm4JfK9PZI1+H4Cxk+sJBXOwSNyY0ZsgZ78DmKyU+BuJDNg9d7RggrUxM5DsYteO6gcZlNN5dOVO1mCMpGGnhnoY7t2IF0182rVJe+mailFDteAww5evFh9UxkphpVmYNWC2UVcVwXMAaay0VHHVE27Akad1u+TOcrAUv9fv6M4GaSJj2wAAAAASUVORK5CYII="/>
                    </a>
                    </div>

                    {/* Facebook */}
                    <div className="col">
                    <a href="https://twitter.com" target="_none">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABTElEQVRIS92V4TGEMRCGn6uAEnSAClABKkAF6IAK6IAO0IEOUAEqQAfmMclNvlySS8zcn9uZ+3PZ3Xf33d33m7Fim604P+sHsAl8d9B2BJwD+8AHcA9chzjfHmOOnCKddXhtgFwAN4V3Y3aAswD455IC+PgSOjgGngtJtoD3Brggb8BtLDIFkJ6vJDi2bVfR7O6hAfATaJszkFNk1XtZAvn0J9BuhZ4Y8hQonqfIO3BoVr7RMeiSi4O+Sh9aFP0H4zLwX+zAP0sUjQBJ4WQD8xm4JfK9PZI1+H4Cxk+sJBXOwSNyY0ZsgZ78DmKyU+BuJDNg9d7RggrUxM5DsYteO6gcZlNN5dOVO1mCMpGGnhnoY7t2IF0182rVJe+mailFDteAww5evFh9UxkphpVmYNWC2UVcVwXMAaay0VHHVE27Akad1u+TOcrAUv9fv6M4GaSJj2wAAAAASUVORK5CYII="/>
                    </a>
                    </div>

                    {/* Twiiter */}
                    <div className="col">
                    <a href="https://twitter.com" target="_none">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABTElEQVRIS92V4TGEMRCGn6uAEnSAClABKkAF6IAK6IAO0IEOUAEqQAfmMclNvlySS8zcn9uZ+3PZ3Xf33d33m7Fim604P+sHsAl8d9B2BJwD+8AHcA9chzjfHmOOnCKddXhtgFwAN4V3Y3aAswD455IC+PgSOjgGngtJtoD3Brggb8BtLDIFkJ6vJDi2bVfR7O6hAfATaJszkFNk1XtZAvn0J9BuhZ4Y8hQonqfIO3BoVr7RMeiSi4O+Sh9aFP0H4zLwX+zAP0sUjQBJ4WQD8xm4JfK9PZI1+H4Cxk+sJBXOwSNyY0ZsgZ78DmKyU+BuJDNg9d7RggrUxM5DsYteO6gcZlNN5dOVO1mCMpGGnhnoY7t2IF0182rVJe+mailFDteAww5evFh9UxkphpVmYNWC2UVcVwXMAaay0VHHVE27Akad1u+TOcrAUv9fv6M4GaSJj2wAAAAASUVORK5CYII="/>
                    </a>
                    </div>

                    {/* Twiiter */}
                    <div className="col">
                    <a href="https://twitter.com" target="_none">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABTElEQVRIS92V4TGEMRCGn6uAEnSAClABKkAF6IAK6IAO0IEOUAEqQAfmMclNvlySS8zcn9uZ+3PZ3Xf33d33m7Fim604P+sHsAl8d9B2BJwD+8AHcA9chzjfHmOOnCKddXhtgFwAN4V3Y3aAswD455IC+PgSOjgGngtJtoD3Brggb8BtLDIFkJ6vJDi2bVfR7O6hAfATaJszkFNk1XtZAvn0J9BuhZ4Y8hQonqfIO3BoVr7RMeiSi4O+Sh9aFP0H4zLwX+zAP0sUjQBJ4WQD8xm4JfK9PZI1+H4Cxk+sJBXOwSNyY0ZsgZ78DmKyU+BuJDNg9d7RggrUxM5DsYteO6gcZlNN5dOVO1mCMpGGnhnoY7t2IF0182rVJe+mailFDteAww5evFh9UxkphpVmYNWC2UVcVwXMAaay0VHHVE27Akad1u+TOcrAUv9fv6M4GaSJj2wAAAAASUVORK5CYII="/>
                    </a>
                    </div>
                    
                  </div>
                  <div className="copyright" style={{ marginTop: "auto", marginLeft: "12px", padding: "12px 12px" }} >
                    <a className="text-warning w-100" href="index">Copyright &copy; MentoMeet 2020</a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <ul className="links">
                  <li><Link to="/mentee">Careers</Link></li>
                  <li><Link to="/blogs">Blogs</Link></li>
                  <li><Link to="/mentor">Be a mentor</Link></li>
                  <li><Link to="/mentee">Be a Mentee</Link></li>
                  <li>FAQs</li>
                  <li onClick={this.openPrivacyDialog}>Privacy Policy</li>
                  <li onClick={this.openTCDialog}>Terms & Conditions</li>
                </ul>
              </div>
              <div className="col-sm-5">
                <div className="join-us">
                  <div>
                    <h3 style={{ margin: "0 12px 12px 12px" }}>Join our Newsletter</h3>
                    <form className="join-us-form">
                      <input className="form-control" placeholder="Enter your Email" />
                      <button className="btn btn-warning" type="submit">Submit</button>
                    </form>
                    <div className="contact-details">
                      <p>Feel free to contact us</p>
                      <div className="row">
                        <div className="col text-success">9811567932</div>
                        <div className="col text-success">contact@mentomeet.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </footer >

        {/* Modal or dialog to show Privacy policy */}
        <Dialog
          open={this.state.openPrivacy}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="Privacy Policy"
          aria-describedby="MentoMeet"
          fullWidth={true}
          maxWidth = {'lg'}
        >
          <DialogTitle >Privacy Policy</DialogTitle>
          <DialogContent>
            <DialogContentText >

              <h3>A. General</h3>
              <p>In this policy, the words "we", "our", and "us" refer to MentoMeet and the privacy mechanism outlined identifies personally identifiable or personal information that may be collected, how such information is used, and the choices you have regarding our use of this information.
              
              In addition to the terms stated in Terms of Service provided under this Website application, we are committed to protecting your privacy. Authorized representatives of MentoMeet on a need to know basis only use any information received from you. We constantly review our systems and data to secure your personal information. We will investigate any complaint or such actions with a view to prosecuting and/or taking civil proceedings to recover damages against those responsible. Any User who does not agree with any provisions of this Privacy Policy and the Terms of Service is required to leave the Platform immediately. Should you disagree with this Policy (defined below) and still continue to access the Platform and provide your personal information, MentoMeet disclaim all the liabilities arising therefrom and it shall be assumed by your continued use of the Platform that you have accepted the Policy and any other online terms and conditions available on the Platform.
              
              </p>

              <h3>B. Applicability</h3>
              <p>This privacy policy (“Policy”) applies to all Users who access the Platform and are therefore required to read and understand the Policy before submitting any Personal Information (defined hereinafter). If you have inadvertently submitted any Personal Information to MentoMeet prior to reading the Policy statements set out herein, and you do not agree with the manner in which the Personal Information is collected, stored or used, then you may access, modify and delete all information stored about You by writing to us at contact@mentomeet.com. MentoMeet is keeping personal data of the User, and every User is also entitled to require MentoMeet to delete and destroy all such information (but not that of other Users).
              This Policy applies to the Platform and any other services that are owned and operated by MentoMeet. Third party websites may place their own cookies or other files on the Users' computer, collect data or solicit personal information from the Users, for which MentoMeet is not responsible or liable. Accordingly, MentoMeet does not make any representations concerning the privacy practices or policies of such third parties or terms of use of such websites, nor does MentoMeet guarantee the accuracy, integrity, or quality of the information, data, text, software, sound, photographs, graphics, videos, messages or other materials available on such websites. The inclusion or exclusion does not imply any endorsement by MentoMeet of the website, the website's provider, or the information on the website. MentoMeet encourages the User to read the privacy policies of that website.
              MentoMeet has taken all reasonable precautions to treat Personal Information as confidential with industry standards that it has implemented to protect from unauthorized access, improper use or disclosure, modification and unlawful destruction or accidental loss of the Personal Information.
              </p>
              

              <h3>C. Access</h3>
              <p>
              User are allowed to access the Platform, register for  avail services available with MentoMeet as a guest and without creating an account on the Platform or providing any Personal Information, MentoMeet takes no responsibility or validate the information provided by the guest, except as otherwise required under any law, regulation or an order of competent authority. In order to have access to all the features and benefits on our Platform, a User is required to first create an account on our Platform. To create an account, a User is required to provide Personal Information as may be required during the time of registration. Other information requested on the registration page, including the ability to receive promotional offers from MentoMeet, is optional. MentoMeet may, in future, include other optional requests for information from the User to help MentoMeet to customize the Platform to deliver personalized information to the User. Without User's agreement, MentoMeet will not share, rent or sell any Personal Information with third parties in any way other than what is disclosed in this Policy. MentoMeet may keep records of telephone calls received and made for making enquiries, registered courses, feedback or other purposes for the purpose of rendering services effectively and efficiently.
              </p>
              
              <h3>D. Personal Information</h3>
              <p>
                “Personal Information” shall mean the information which identifies the User, name, identification number, email address, age, phone number, password or any financial account information provided to MentoMeet at the time of registration or any time thereafter.
              </p>
              
              <h3>E. Automatic Information Collection</h3>
              <p>
                Our system collects information that is sent over the internet without your control. Some examples of the information we collect and analyse include the Internet protocol (IP) address used to connect your computer to the internet; login; email; password; computer and connection information such as browser type and version, operating system, and platform; course enrolled history, which we sometimes aggregate with similar information from other users to create features, reports such as popular courses, most used features etc; the full Uniform Resource Locator (URL) click stream to, and from our Platform, including date and time; cookie number; courses or videos you viewed or searched for; the email id you used to call our customer service.
              During some visits we may use software tools such as JavaScript to measure and collect session information, including page response times, download errors, length of visits to certain page, course and videos, page interaction information (such as scrolling, clicks and mouse overs), and methods used to browse away from the page.
              </p>
              
              <h3>F. Information Security</h3>
              To protect the security of your Personal information during transmission, we use Secure Sockets Layer (SSL) software, which encrypts information you input. To prevent unauthorized access to sensitive information, it is important for you to monitor those who have access to your password and to your computer, laptop or any other device through which your account can be accessed. Be sure to sign off when finished while using a shared computer.
              
              
              <h3>G. Use of your personal information</h3>
              While availing our services you will provide access to MentoMeet with your Personal Information. If that information is wrong, you can request us to modify or delete the same. MentoMeet will take all reasonable measures to ensure that the Personal Information is modified and used for rendering services to you and as otherwise in compliance with laws. When editing or deleting Personal Information, we may ask you to verify your identity before we can act on your request. MentoMeet may at its discretion reject any request that is contrary to law, requiring un-reasonable technical efforts. We do not assure that we will delete all residual copies and archives made by any third party without our knowledge and consent.
              MentoMeet shall use your Personal Information to communicate with you. The said communication can either be by calls, text or emails. If at any time you wish to not receive any communication from our end you can opt-out of the same by writing to us on contact@mentomeet.com.
              
              
              <h3>H. Exceptions</h3>
              Your Personal Information may be shared with third parties who have a need or authority to receive such information, if we have a good-faith belief that access, use, preservation or disclosure of the information is reasonably necessary to comply with (i) in response to any authority having to receive such information under law (ii) any order of court (iii) detect, prevent, or otherwise address fraud, security or technical issues (iv) protect against harm to the rights, property or safety of MentoMeet, our users or the public as required or permitted by law.
              
              
              <h3>User choices with regard to access of information</h3>
              MentoMeet does not make any unsolicited calls or otherwise market any products or services, except for in relation to the purpose for which such information has been provided or taking any feedback, addressing any complaints, informing you about new features or free/paid courses. User shall not disclose their Personal Information to any third parties that us not authorised by MentoMeet and verify the identity of such person who seek information. MentoMeet will communicate with the Users through call, SMS, email or notices posted on the Platform or through any other means available, which shall include but not be limited to text, other forms of messaging, calls etc. The Users can change their e-mail and contact preferences at any time by logging into their account or by emailing at contact@mentomeet.com.
              MentoMeet may, if you so choose, send direct mailers to you at the address given by you. You have the option to 'opt-out' of this direct mailer by way of links provided at the bottom of each mailer. We respect your privacy and to the extent that you choose not to receive such mailers, we will take all steps to remove you from the list. Should you evidence any violation of our terms and policies, please write to us at contact@mentomeet.com and report such incident.
              All the information provided to MentoMeet by you, you as a User confirms that the same including sensitive Personal Information, is true, accurate and voluntary. User has the right to withdraw information at any time, in accordance with the terms of this Policy and the Terms of Service.
              
              
              <h3>Report, Analysis & Confidentiality</h3>
              MentoMeet may have to use Personal Information without reference to any persona or identity for research, statistical analysis and business intelligence purpose and may transfer such research, statistical or intelligence data in an aggregated or non-personally identifiable form to third parties and affiliates.
              All MentoMeet employees and data processors, who have access to, and are associated with the processing of sensitive personal data or information, are obliged to respect the confidentiality of every User's sensitive personal data and information.
              
              
              <h3>Sharing of Information</h3>
              MentoMeet may also disclose or transfer User's personal and other information which a User provides, to another third party as part of reorganization or a sale of the assets of MentoMeet corporation division or company. Any third party to which MentoMeet transfers or sells its assets will have the right to continue to use the personal and other information that a User provides to us.
              To the extent necessary to provide Users with the services on the Platform, MentoMeet may provide User’s Personal Information to third party contractors who work on behalf of or with MentoMeet to provide Users with such services, to help MentoMeet communicate with Users or to maintain the Platform. Generally, these contractors do not have any independent right to share this information, however certain contractors who provide services on the Platform, including the providers of online communications services, online payment gateway services, will have rights to use and disclose the Personal Information collected in connection with the provision of these services in accordance with their own privacy policies.
              
              
              <h3>Interest-Based Ads</h3>
              On unaffiliated sites, MentoMeet may display interest-based advertising using information you make available to us when you interact with our Platform, content, or services. Interest-based ads, also sometimes referred to as personalised or targeted ads, are displayed to you based on information from activities such as subscription on our Platform, visiting sites that contain MentoMeet content or ads. In providing interest-based ads, we follow applicable laws, as well as the Code for Self-Regulation in Advertising by the Advertising Standards Council of India and the Self-Regulatory Principles for Online Behavioral Advertising developed by the Digital Advertising Alliance (a coalition of marketing, online advertising, and consumer advocacy organizations).
              Like other online ad networks, we use cookies, web beacons (also known as action tags or single-pixel gifs), and other technologies (collectively, “cookies”). Cookies enable us to learn about what ads you see, what ads you click, and other actions you take on our sites and other sites. This allows us to provide you with more useful and relevant ads. For example, if we know what ads you are shown we can be careful not to show you the same ones repeatedly. We do not associate your interaction with unaffiliated sites with your identity in providing you with interest-based ads.
              We do not provide any personal information to advertisers or to third party sites that display our interest-based ads. However, advertisers and other third-parties (including the ad networks, ad-serving companies, and other service providers they may use) may assume that users who interact with or click on a personalised ad or content are part of the group that the ad or content is directed towards (for example, users in eastern India who bought or browsed for literature books). Also, some third-parties may provide us information about you (such as the sites where you have been shown ads or demographic information) from offline and online sources that we may use to provide you more relevant and useful advertising.
              Advertisers or ad companies working on their behalf sometimes use technology to serve the ads that appear on our sites directly to your browser. They automatically receive your IP address when this happens. They may also use cookies to measure the effectiveness of their ads and to personalise ad content. We do not have access to or control over cookies or other features that advertisers and third party sites may use, and the information practices of these advertisers and third party websites are not covered by our Policy. Please contact them directly for more information about their privacy practices.
              
              
              <h3>Revision of terms & Grievance reporting</h3>
              MentoMeet may update or amend this Policy at any time, with or without advance notice. In the event there are significant changes in the way MentoMeet treats User's personally identifiable information, MentoMeet will display a notice on the Platform or send Users an email. MentoMeet's current Policy relates to all information that MentoMeet has about Users and their account.
              Notwithstanding the above, MentoMeet shall not be required to notify the Users of any changes made to the privacy policy. Should you have any concern or reject the changes in the privacy policy you can refuse to accept the amendments and opt for withdrawing your Personal Information by writing to us at  contact@mentomeet.com .
              If you have any complaints or grievances with respect to Website or Privacy Policy please write to us at contact@mentomeet.com
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              close
          </Button>
          </DialogActions>
        </Dialog>

        {/* Terms and conditions dialog or modal */}
        <Dialog
          open={this.state.openTC}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="Terms and conditions"
          aria-describedby="MentoMeet"
          fullWidth={true}
          maxWidth = {'lg'}
        >
          <DialogTitle >Terms and Conditions</DialogTitle>
          <DialogContent>
            <DialogContentText >
              Here Terms and conditions will come
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              close
          </Button>
          </DialogActions>
        </Dialog>
      </Fragment >
    )
  }
}

export default Footer;