import React, {Component} from "react"
import {Link} from 'react-router-dom'
import Login from'./Login'
import axios from 'axios'
import brand from './brand.png'

class Otp extends React.Component {
 
  handleSubmit = (event) => {
    event.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
const data = urlParams.getAll('q');
    const values=JSON.parse(data);
    console.log(values);console.log(values);
    
    
    console.log(event.target[0].value)
    
    if(send_otp==event.target[0].value)
    {
  
    // alert(JSON.stringify(values));
    axios.post(`http://${window.location.hostname}:5005/signUp`, values)
    .then(response => {

        console.log("Response is - ")
        console.log(response)
        this.setState({register:false})

    }).catch(function(err){      
        console.log("catch err is ");
        console.log(err)  
        alert("Alert of Error!")
    });
    console.log("sucess")
  }
  else{
    console.log("failed");
  }

    
   
   
    
  }
  render() {
    return (
      <div>
                <nav className="navbar shadow  navbar-expand sticky-top navbar-light bg-light">
                    <a className="navbar-brand text-warning" href="/index"><img src={brand} alt="Brand" width="120"/></a>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                    </div>
                </nav>
                <div class="container" background-color="black" color="white" padding="20px">
               
                <form onSubmit={this.handleSubmit}>
        <label>
          Enter the OTP :
          <input
            type="text"
            name="username"
            ref={node => (this.inputNode = node)}
          />
        </label>
        
        <button type="submit" class="btn btn-info" position="relative" top= "-43px"
  left= "410px">Submit</button>
      </form>
      </div>
                
            </div>
     
    )
  }
}
export default Otp;
