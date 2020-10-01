import React, {Component} from "react"
import {Link} from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, InputGroupText,  InputGroupAddon, InputGroup} from 'reactstrap';
import axios from 'axios'
import brand from './brand.png'


const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)


class Login extends Component{
    constructor(props){
        super(props)
        this.state = ({
            register: false
        })
    }

    onChangeHandler =(e)=>{
        this.setState({
            register: !this.state.register
        })
    }

    handleRegister = (values) => {
        console.log(values)
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
    }

    handleLogin = (values) => {
        console.log(values)
        // alert(JSON.stringify(values));
        axios.post(`http://${window.location.hostname}:5005/signIn`, values)
        .then(response => {

            console.log("Response is - ")
            console.log(response)
            
                if(response.status!== 401 && response.status !== 400 ){
                   
                    if(response.data.user.email) { 
                        console.log(response.data);
                        // console.log("Token is " + response.data.token)
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        alert("Successfully logged in!")
                        window.location.href="/"
                        console.log(localStorage.getItem('user'));
                    }
                }

        }).catch(function(err){      
            console.log("catch err is ");
            console.log(err)  
            alert("Invalid Credentials.Please try Again!");
        });
    }

    render(){

        let LoginDiv = (
            
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card-group shadow">
                                    <div className="card border-warning text-white">
                                        <div className="card-body m-3">                                         
                                        <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                                                <h3 className="text-warning mb-0">MentoMeet</h3>
                                                <p className="text-muted font-weight-bold">Login in your account</p>
                                                <InputGroup className="mb-3 d-block">                                            
                                                    <Control.text  model=".email"
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        className="form-control w-100"
                                                        validators={{
                                                            required
                                                        }}                                                  
                                                    />
                                                    <Errors
                                                        className="text-danger"
                                                        show="touched"
                                                        model=".email"
                                                        messages={{
                                                            required: 'This is a Required Field!'
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3 d-block">                                            
                                                    <Control.password  model=".password"
                                                        id="password"
                                                        name="password"
                                                        placeholder="password"
                                                        className="form-control w-100" 
                                                        validators={{
                                                            required
                                                        }}                                                    
                                                    />
                                                    <Errors
                                                        className="text-danger"
                                                        show="touched"
                                                        model=".password"
                                                        messages={{
                                                            required: 'This is a Required Field!'
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <Button type="submit" block color="info">
                                                            Login
                                                    </Button>
                                                </InputGroup>
                                                
                                                <div className="">
                                                    <h6 className="text-muted mb-0">Don't have account??</h6>
                                                    <a className="text-info font-weight-bold cursor-pointer" onClick={this.onChangeHandler}>register.</a>
                                                </div>
                                                
                                            </LocalForm>
                                        </div>
                                    </div>
                                    <div className="card d-none d-lg-block bg-info">
                                        <div className="card-body text-white m-3">
                                            <h3>MentoMeet</h3>
<p>Meet your true mentors through MentoMeet. We introduce you to the world of true mentorship and building blocks for a strong foundations to your bright future. Let us come together to creat a great teaching and learning experience for both students and mentors.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
        )

        let RegisterDiv = (
            
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <div className="card-group shadow">
                                    <div className="card border-warning text-white">
                                        <div className="card-body m-3">                                         
                                            <LocalForm onSubmit={(values) => this.handleRegister(values)}>
                                                <h3 className="text-warning">MentoMeet</h3>
                                                <p className="text-muted font-weight-bold">Welcome to new world</p>
                                                <div className="d-flex mb-3 w-100">
                                                    <InputGroup className="mr-1 d-block">                                            
                                                        <Control.text  model=".firstName"
                                                            id="firstName"
                                                            name="firstName"
                                                            placeholder="First Name"
                                                            className="form-control w-100"
                                                            validators={{
                                                                required
                                                            }}                                                  
                                                        />
                                                        <Errors
                                                            className="text-danger"
                                                            show="touched"
                                                            model=".firstName"
                                                            messages={{
                                                                required: 'Required! '
                                                            }}
                                                        />
                                                    </InputGroup>
                                                    <InputGroup className="ml-1 d-block">                                            
                                                        <Control.text  model=".lastName"
                                                            id="lastName"
                                                            name="lastName"
                                                            placeholder="Last Name"
                                                            className="form-control w-100"
                                                            validators={{
                                                                required
                                                            }}                                                  
                                                        />
                                                        <Errors
                                                            className="text-danger"
                                                            show="touched"
                                                            model=".lastName"
                                                            messages={{
                                                                required: 'Required! '
                                                            }}
                                                        />
                                                    </InputGroup>
                                                    
                                                </div>
                                                <div className="d-flex w-100 mb-3">
                                                    <InputGroup className="mr-2 d-block">
                                                        <Control.select
                                                            model=".gender"
                                                            id="gender"
                                                            name="gender"
                                                            defaultValue="Male"
                                                            className="custom-select w-100"
                                                            validators={{
                                                                required
                                                            }}                                                
                                                        >
                                                            {/* <option value="-1">gender..</option> */}
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Others">Others</option>
                                                        </Control.select>
                                                        <Errors
                                                            className="text-danger"
                                                            show="touched"
                                                            model=".gender"
                                                            messages={{
                                                                required: 'Required! '
                                                            }}
                                                        />
                                                    </InputGroup>
                                                    <InputGroup clasName="d-block">
                                                        <Control.select
                                                            model=".role"
                                                            id="role"
                                                            name="role"
                                                            defaultValue="Mentee"
                                                            className="custom-select w-100" 
                                                            validators={{
                                                                required
                                                            }}                                                
                                                        >
                                                            {/* <option value="-1">Categories..</option> */}
                                                            <option value="Mentor">Mentor</option>
                                                            <option value="Mentee">Mentee</option>
                                                        </Control.select>
                                                        <Errors
                                                            className="text-danger"
                                                            show="touched"
                                                            model=".role"
                                                            messages={{
                                                                required: 'Required! '
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </div>
                                                <InputGroup clasName="mb-3 d-block">
                                                    <Control.select
                                                        model=".category"
                                                        id="category"
                                                        name="category"
                                                        defaultValue="JEE"
                                                        className="custom-select w-100" 
                                                        validators={{
                                                            required
                                                        }}                                                
                                                    >
                                                        {/* <option value="-1">Categories..</option> */}
                                                        <option value="JEE">JEE</option>
                                                        <option value="NEET">NEET</option>
                                                        <option value="CAREER">CAREER</option>
                                                    </Control.select>
                                                    <Errors
                                                        className="text-danger"
                                                        show="touched"
                                                        model=".category"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3 mt-3 d-block">                                            
                                                    <Control.input  model=".mobile"
                                                        type="number"
                                                        id="mobile"
                                                        name="mobile"
                                                        placeholder="Mobile"
                                                        className="form-control w-100"
                                                        validators={{
                                                            required
                                                        }}                                                  
                                                    />
                                                    <Errors
                                                        className="text-danger"
                                                        show="touched"
                                                        model=".mobile"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3 d-block">                                            
                                                    <Control.text  model=".email"
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        className="form-control w-100"
                                                        validators={{
                                                            required, validEmail
                                                        }}                                                  
                                                    />
                                                    <Errors
                                                        className="text-danger"
                                                        show="touched"
                                                        model=".email"
                                                        messages={{
                                                            required: 'Required! ',
                                                            validEmail: ' Invalid Email!'
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3 d-block">                                            
                                                    <Control.password  model=".password"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        className="form-control w-100"
                                                        validators={{
                                                            required
                                                        }}                                                  
                                                    />
                                                    <Errors
                                                        className="text-danger"
                                                        show="touched"
                                                        model=".password"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <Button type="submit" block color="info">
                                                            Register
                                                    </Button>
                                                </InputGroup>

                                                <div className="text-center">
                                                    <h6 className="text-muted mb-0">Already have an account? <a className="text-info font-weight-bold cursor-pointer" onClick={this.onChangeHandler}>Login.</a></h6>
                                                    
                                                </div>
                                                        <hr />
                                                <div className="text-center text-muted" >
                                                    <p className="mb-0">By registering you agree to our Terms & conditions and Privacy Policies</p>
                                                </div>
                                                
                                            </LocalForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        )




        return(
            <div>
                {/* <nav className="navbar shadow  navbar-expand sticky-top navbar-light bg-light">
                    <a className="navbar-brand text-warning" href="/index"><img src={brand} alt="Brand" width="120"/></a>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mx-3 font-weight-bold different">
                                <a className="nav-link text-info cursor-pointer login" onClick={this.onChangeHandler}>{this.state.register?"Register":"Login"}</a>
                            </li>
                        </ul>
                    </div>
                </nav> */}
                <div className="d-flex align-items-center " style={{height:"100vh"}}>
                    {this.state.register ? RegisterDiv: LoginDiv}
                </div>
                
            </div>
        )
    }
}

export default Login;
