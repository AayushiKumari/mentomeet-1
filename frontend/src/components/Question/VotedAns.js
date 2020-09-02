import React, {Component} from 'react'
import Axios from 'axios'

import EachQuestion from "./EachQuestion"

class VotedAns extends Component{
    constructor(props){
        super(props)
        this.state = {
            votedQuestion : [],            
            isDataReturned: false
        }
    }

    componentDidMount(){
        Axios.get(`http://${window.location.hostname}:5005/quora/votedquestion/`).then(votedQues => {
            console.log(votedQues);
            this.setState({
                votedQuestion: votedQues.data,
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
                    {this.state.votedQuestion.map((data, index) => {
                        return(
                            <EachQuestion question={{"eachQuest": data}}/>                            
                        )
                    })}
                    
                </div>
            : <></>
        )
    }
}

export default VotedAns;