import React, { Fragment } from 'react';

import { Container, Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';

class AdminPlace extends React.Component {
  constructor(props) {
    super(props);
    // Needed secretId and userCount from the parent class 

    this.state = {
      currentTab: 1,   // Initially starting with tab 1
      users: [],
      loading: true,
      error: false
    }
  }

  fetchNewData(tabValue) {
    console.log("Fetch new data", tabValue);

    this.setState({
      loading: true
    });

    const API_KEY = this.props.secretId;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ API_KEY: API_KEY, skip: (tabValue - 1) * 20, limit: 20 })
    };

    fetch(`http://${window.location.hostname}:5005/admin/users`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log("Data got", res)
        this.setState({
          users: res,
          loading: false
        });
      })
      .catch(err => {
        console.log("Errror came", err);
        this.setState({
          loading: false,
          error: false
        })
      });
  }

  changeCurrentTab(val) {
    console.log("Tab value", val);
    this.setState({
      currentTab: val
    });
  }

  // For change in the state
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTab !== this.state.currentTab) {
      console.log("Tab is changed", prevState.currentTab, this.state.currentTab);
      this.fetchNewData(this.state.currentTab);
    } else {
      console.log("Tab not changed");
    }
  }

  componentDidMount() {
    const currentTab = this.state.currentTab;
    this.fetchNewData(currentTab);
  }

  render() {

    const userCount = this.props.userCount;
    const currentTab = this.state.currentTab;

    const tabs = [];
    for (let i = 0; i < userCount; i += 20) {
      const tabValue = i / 20 + 1;
      let btnType = currentTab === tabValue ? 'btn-success' : 'btn-warning';    // For tab color

      tabs.push(
        <div
          key={tabValue}
          style={{ margin: "4px" }}
          className={`col-1 btn ${btnType}`}
          onClick={() => this.changeCurrentTab(tabValue)}
        >
          {tabValue}
        </div>
      );
    }

    let usersComponent = <ReactLoading style={{ color: "black", margin: "auto", height: "20%", width: "20%" }} type={"spinningBubbles"} />
    if (!this.state.loading) {
      // The data is being fetched change the loading true

      // The error in fetch failed
      usersComponent = <h2>Fetch Failed</h2>;

      if (!this.state.error) {
        // No error has came in the fetch

        const users = this.state.users;

        usersComponent = users.map((val, index) => {
          return (
            <div
              key={index}
              className="jumbotron"
            >
              {/* Change according to the user data to be shown */}
             <a href={val.history.length>0?'/profile/' + val._id:"#"} target="_blank">
                <div className="row">
                  <div className="col"> <b> {val.role}</b> </div>
                  <div className="col"> <b>{val.firstName}</b> </div>
                  <div className="col"> <b> {val.lastName}</b> </div>
                  <div className="col"> {val.mobile} </div>
                  <div className="col"> {val.category} </div>
                  <div className="col"> {val.email} </div>
                  <div className="col"> {val.gender} </div>  
                  <div className="col"> {val.history.length>0?'PROFILE YES':"PROFILE NO"} </div>                 
               
                </div>
              </a>
            </div>
          )
        });
      }

    }

    return (
      <Fragment>
        <Container>
          <Row id="tabs" style={{ margin: "12px 0" }}>
            {tabs}
          </Row>
          {usersComponent}
        </Container>
      </Fragment>
    )
  }
}

export default AdminPlace;
