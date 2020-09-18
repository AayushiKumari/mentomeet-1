import React from 'react';

class LoginHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    // console.log('From submit called');
    // console.log('Value', this.state.inputValue);

    if (typeof this.props.submitHandler === 'function') {
      this.props.submitHandler(this.state.inputValue.trim());
    }
  }


  handleInputChange(event) {
    // console.log(event.target.value);
    this.setState({
      inputValue: event.target.value,
    });    
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <form onSubmit={this.handleFormSubmit} className="from">
            <div className="form-group">
              <input
                value={this.state.inputValue}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter your secret ID"
                required
              />
            </div>
            <div style={{ display: "flex" }}>
              <button className="btn btn-info btn-lg" style={{ margin: "auto" }} type="submit">Submit</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default LoginHandler;
