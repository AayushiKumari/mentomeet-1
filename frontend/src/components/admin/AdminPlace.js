import React, { Fragment } from 'react';

import { Container, Row } from 'react-bootstrap';

class AdminPlace extends React.Component {
  constructor(props) {
    super(props);
    // Needed secretId and userCount from the parent class 

    this.state = {
      currentTab: 0
    }
  }

  changeCurrentTab(val) {
    console.log("Tab value", val);
  }

  componentDidMount() {
    const currentTab = this.state.currentTab; 
  }

  render() {

    const userCount = this.props.userCount;

    const tabs = [];
    for (let i=0; i<userCount; i+=20) {
      const tabValue = i/20 + 1;
      tabs.push(
        <div 
          key={tabValue}
          style={{ margin: "4px"}} 
          className="col-1 btn btn-warning"
          onClick={() => this.changeCurrentTab(tabValue)}
        >
          {tabValue}
        </div>
      );
    }

    return (
      <Fragment>
        <Container>
          <Row id="tabs" style={{ margin: "12px 0" }}>
            {tabs}
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default AdminPlace;
