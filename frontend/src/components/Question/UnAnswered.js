import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

import {setQDate} from "../CommonFunc/common.js"
import EachQuestion from "./EachQuestion"

class UnAnswered extends Component{
    constructor(props){
        super(props)
        this.state = {
            unAnsQuestion : [],            
            isDataReturned: false
        }
    }

    componentDidMount(){
        Axios.get(`http://${window.location.hostname}:5005/quora/unanswered/`).then(unAnsData => {
            console.log(unAnsData);
            this.setState({
                unAnsQuestion: unAnsData.data,
                isDataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })
    }

    render(){
        return(
            this.state.isDataReturned ?             
                <div>
                    {this.state.unAnsQuestion.map((data, index) => {
                        return(
                            <EachQuestion question={{"eachQuest": data}}/>                            
                        )
                    })}
                    
                </div>
            : <></>
        )
    }
}

export default UnAnswered;