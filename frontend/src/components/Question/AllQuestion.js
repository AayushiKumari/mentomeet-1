import React, {Component} from 'react'
import Axios from 'axios'

class AllQuestion extends Component{
    constructor(props){
        super(props)
        this.state = {
            allQuestion : []
        }
    }

    componentDidMount(){
        Axios.get("http://localhost:5005/quora/question/").then(allQuest => {
            console.log(allQuest);
            this.setState({
                allQuestion: allQuest.data
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })
    }

    Vote(event, id){
        console.log(event.target.classList.add("abhishek"))
        console.log(id)
        Axios.post("http://localhost:5005/quora/like/5f3a6c1ec944801a08a6b2f1/question/"+id).then(result => {
            console.log(result);
            if(result.data == "upvote"){
                console.log(event.target)
                event.target.classList.remove("text-info");
                event.target.classList.add("text-warning");
            }
        }).catch(error => {
            console.log("Axios Error");
            console.log(error);
        })
    }

    render(){
        return(                
            <div>
                {this.state.allQuestion.map((data, index) => {
                    return(
                        <div class="card my-2">
                            <div class="card-body">
                                <div className="d-flex align-items-baseline">
                                    <h6 className="card-text mr-2">Nasim Shaikh</h6>
                                    <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                                </div>
                                <h5 class="card-title"><a href="answer" className="text-decoration-none">{data.question}</a></h5>
                                { data.images? <img class="card-img-top w-100" src={data.images} alt="alternate image"/>: "" }
                                <div className="mt-3">
                                    {data.tags.map((tag, index) => {
                                        return(
                                            <a href="#" class="badge badge-warning mr-2">{tag.toUpperCase()}</a>
                                        )                                        
                                    })}
                                </div>
                                
                            </div>
                            <div className="card-footer bg-white">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="d-flex align-items-center pr-3">
                                            <h5 className="vote-btn cursor-pointer" ><i class="far fa-arrow-alt-circle-up text-info" onClick={(e)=>this.Vote(e, data._id)}></i></h5>
                                            <h6 className="vote-counter pl-1 small">123</h6>
                                        </div>
                                        <div className="d-flex align-items-center pr-3">
                                            <h5 className="time-btn text-info cursor-pointer"><i class="far fa-clock"></i></h5>
                                            <h6 className="time-counter pl-1 small">10 hrs ago</h6>
                                        </div>
                                        <div className="d-flex align-items-center pr-3">
                                            <h5 className="views-btn text-info cursor-pointer"><i class="far fa-eye"></i></h5>
                                            <h6 className="views-counter pl-1 small">123</h6>
                                        </div>
                                    </div>
                                    <div className="">
                                        <h5 className="dot-btn text-info cursor-pointer"><i class="fas fa-ellipsis-h"></i></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* <div class="card my-2">
                    <div class="card-body">
                        <div className="d-flex align-items-baseline">
                            <h6 className="card-text mr-2">Nasim Shaikh</h6>
                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                        </div> 
                        <h5 class="card-title"><a href="answer" className="text-decoration-none">How much do web developers earn? What is their salary?</a></h5>
                        <p class="card-text small text-muted">I am thinking of pursuing web developing as a career & was just wondering. I’ve heard that that location is a big factor when it comes to salary of web developers. Kindly state: 1) Country 2) Salary Monthly/Yearly 3) Years of experience. P.s) You can ...</p>
                        <div>
                            <a href="#" class="badge badge-warning mr-2">NEET</a>
                            <a href="#" class="badge badge-warning mr-2">JEE</a>
                            <a href="#" class="badge badge-warning mr-2">CET</a>
                            <a href="#" class="badge badge-warning mr-2">MCA</a>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="vote-btn text-info cursor-pointer" ><i class="far fa-arrow-alt-circle-up"></i></h5>
                                    <h6 className="vote-counter pl-1 small">123</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="time-btn text-info cursor-pointer"><i class="far fa-clock"></i></h5>
                                    <h6 className="time-counter pl-1 small">10 hrs ago</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="views-btn text-info cursor-pointer"><i class="far fa-eye"></i></h5>
                                    <h6 className="views-counter pl-1 small">123</h6>
                                </div>
                            </div>
                            <div className="">
                                <h5 className="dot-btn text-info cursor-pointer"><i class="fas fa-ellipsis-h"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card my-2">
                    <div class="card-body">
                        <div className="d-flex align-items-baseline">
                            <h6 className="card-text mr-2">Nasim Shaikh</h6>
                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                        </div> 
                        <h5 class="card-title"><a href="answer" className="text-decoration-none">How much do web developers earn? What is their salary?</a></h5>
                        <p class="card-text small text-muted">I am thinking of pursuing web developing as a career & was just wondering. I’ve heard that that location is a big factor when it comes to salary of web developers. Kindly state: 1) Country 2) Salary Monthly/Yearly 3) Years of experience. P.s) You can ...</p>
                        <div>
                            <a href="#" class="badge badge-warning mr-2">NEET</a>
                            <a href="#" class="badge badge-warning mr-2">JEE</a>
                            <a href="#" class="badge badge-warning mr-2">CET</a>
                            <a href="#" class="badge badge-warning mr-2">MCA</a>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="vote-btn text-info cursor-pointer" ><i class="far fa-arrow-alt-circle-up"></i></h5>
                                    <h6 className="vote-counter pl-1 small">123</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="time-btn text-info cursor-pointer"><i class="far fa-clock"></i></h5>
                                    <h6 className="time-counter pl-1 small">10 hrs ago</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="views-btn text-info cursor-pointer"><i class="far fa-eye"></i></h5>
                                    <h6 className="views-counter pl-1 small">123</h6>
                                </div>
                            </div>
                            <div className="">
                                <h5 className="dot-btn text-info cursor-pointer"><i class="fas fa-ellipsis-h"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card my-2">
                    <div class="card-body">
                        <div className="d-flex align-items-baseline">
                            <h6 className="card-text mr-2">Nasim Shaikh</h6>
                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                        </div> 
                        <h5 class="card-title"><a href="answer" className="text-decoration-none">How much do web developers earn? What is their salary?</a></h5>
                        <p class="card-text small text-muted">I am thinking of pursuing web developing as a career & was just wondering. I’ve heard that that location is a big factor when it comes to salary of web developers. Kindly state: 1) Country 2) Salary Monthly/Yearly 3) Years of experience. P.s) You can ...</p>
                        <div>
                            <a href="#" class="badge badge-warning mr-2">NEET</a>
                            <a href="#" class="badge badge-warning mr-2">JEE</a>
                            <a href="#" class="badge badge-warning mr-2">CET</a>
                            <a href="#" class="badge badge-warning mr-2">MCA</a>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="vote-btn text-info cursor-pointer" ><i class="far fa-arrow-alt-circle-up"></i></h5>
                                    <h6 className="vote-counter pl-1 small">123</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="time-btn text-info cursor-pointer"><i class="far fa-clock"></i></h5>
                                    <h6 className="time-counter pl-1 small">10 hrs ago</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="views-btn text-info cursor-pointer"><i class="far fa-eye"></i></h5>
                                    <h6 className="views-counter pl-1 small">123</h6>
                                </div>
                            </div>
                            <div className="">
                                <h5 className="dot-btn text-info cursor-pointer"><i class="fas fa-ellipsis-h"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card my-2">
                    <div class="card-body">
                        <div className="d-flex align-items-baseline">
                            <h6 className="card-text mr-2">Nasim Shaikh</h6>
                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                        </div> 
                        <h5 class="card-title"><a href="answer" className="text-decoration-none">How much do web developers earn? What is their salary?</a></h5>
                        <p class="card-text small text-muted">I am thinking of pursuing web developing as a career & was just wondering. I’ve heard that that location is a big factor when it comes to salary of web developers. Kindly state: 1) Country 2) Salary Monthly/Yearly 3) Years of experience. P.s) You can ...</p>
                        <div>
                            <a href="#" class="badge badge-warning mr-2">NEET</a>
                            <a href="#" class="badge badge-warning mr-2">JEE</a>
                            <a href="#" class="badge badge-warning mr-2">CET</a>
                            <a href="#" class="badge badge-warning mr-2">MCA</a>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="vote-btn text-info cursor-pointer" ><i class="far fa-arrow-alt-circle-up"></i></h5>
                                    <h6 className="vote-counter pl-1 small">123</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="time-btn text-info cursor-pointer"><i class="far fa-clock"></i></h5>
                                    <h6 className="time-counter pl-1 small">10 hrs ago</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="views-btn text-info cursor-pointer"><i class="far fa-eye"></i></h5>
                                    <h6 className="views-counter pl-1 small">123</h6>
                                </div>
                            </div>
                            <div className="">
                                <h5 className="dot-btn text-info cursor-pointer"><i class="fas fa-ellipsis-h"></i></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card my-2">
                    <div class="card-body">
                        <div className="d-flex align-items-baseline">
                            <h6 className="card-text mr-2">Nasim Shaikh</h6>
                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                        </div> 
                        <h5 class="card-title"><a href="answer" className="text-decoration-none">How much do web developers earn? What is their salary?</a></h5>
                        <p class="card-text small text-muted">I am thinking of pursuing web developing as a career & was just wondering. I’ve heard that that location is a big factor when it comes to salary of web developers. Kindly state: 1) Country 2) Salary Monthly/Yearly 3) Years of experience. P.s) You can ...</p>
                        <div>
                            <a href="#" class="badge badge-warning mr-2">NEET</a>
                            <a href="#" class="badge badge-warning mr-2">JEE</a>
                            <a href="#" class="badge badge-warning mr-2">CET</a>
                            <a href="#" class="badge badge-warning mr-2">MCA</a>
                        </div>
                    </div>
                    <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="vote-btn text-info cursor-pointer" ><i class="far fa-arrow-alt-circle-up"></i></h5>
                                    <h6 className="vote-counter pl-1 small">123</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="time-btn text-info cursor-pointer"><i class="far fa-clock"></i></h5>
                                    <h6 className="time-counter pl-1 small">10 hrs ago</h6>
                                </div>
                                <div className="d-flex align-items-center pr-3">
                                    <h5 className="views-btn text-info cursor-pointer"><i class="far fa-eye"></i></h5>
                                    <h6 className="views-counter pl-1 small">123</h6>
                                </div>
                            </div>
                            <div className="">
                                <h5 className="dot-btn text-info cursor-pointer"><i class="fas fa-ellipsis-h"></i></h5>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default AllQuestion;