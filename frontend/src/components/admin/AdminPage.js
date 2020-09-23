import React, { Fragment, useState } from 'react';
import AdminPlace from './AdminPlace';

import LoginHandler from './LoginHandler';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      secretId: '' // Initially Empty means not loggined, and this should be equal to the API_KEY set on backend
    }
  }

  onLoginSubmit = (val) => {
    console.log("Handle submit of admin login", val);

    // Now we will make the API call to nusers, using the val
    // This val is the API_KEY and if the request is succcessful wihtout any errors
    // That is API key is valid and store it in the state and show the user details component 

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ API_KEY: val })
    };

    const endpoint = `http://${window.location.hostname}:5005/admin/nusers`;
    fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      // This means the Request is successfull
      // Now it must contains count
      // console.log("Data got", data);
      if (data.count) {
        console.log("count", data.count)
        
        this.setState({
          userCount: data.count,
          secretId: val
        });

      } else {
        alert('The count variable not defined');
      }
    })
    .catch(error => {
      // This error comes when the API_KEY is false
      console.log("Error", error);
      alert("Login Failed!");
    });

  }

  render () {

    if (this.state.secretId) {
      // The secret Id for API requests exists, show the suer details page
      return <AdminPlace userCount={this.state.userCount} secretId={this.state.secretId}  />
    
    } else {
      return (
        <Fragment>
          <LoginHandler submitHandler={this.onLoginSubmit} />
        </Fragment>
      ) 
    }
  }
}

export default AdminPage;
