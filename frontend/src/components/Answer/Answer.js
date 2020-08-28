import React, {Component} from "react"
import $ from "jquery"


class Answer extends Component{


    componentDidMount(){
        $(".custom-file-input").on("change", function() {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
          });
    }

    render(){
        return(
            <div className="my-4">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div class="card-body">
                                    <div className="d-flex align-items-baseline">
                                        <h6 className="card-text mr-2">Nasim Shaikh</h6>
                                        <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                                    </div> 
                                    <h5 class="card-title mb-0"><a  className="text-decoration-none">How much do web developers earn? What is their salary?</a></h5>
                                    <p className="card-text text-muted small mr-2">May 1, 2020</p>                         
                                    <div>
                                        <a href="#" class="badge badge-warning mr-2">NEET</a>
                                        <a href="#" class="badge badge-warning mr-2">JEE</a>
                                        <a href="#" class="badge badge-warning mr-2">CET</a>
                                        <a href="#" class="badge badge-warning mr-2">MCA</a>
                                    </div>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div className="user d-flex justify-content-between">
                                            <div>
                                                <div className="d-flex align-items-baseline">
                                                    <h6 className="mr-2 m-0">Sagar Jhaa</h6>
                                                    <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">Mentor</a>
                                                </div>
                                                <div className="d-flex align-items-baseline">
                                                    <p className="text-muted small pr-2">May 10, 2020</p>
                                                    <p className="text-muted small">150 votes</p>
                                                </div>
                                                
                                            </div>
                                            <div>
                                                <h4 className="vote-btn text-info cursor-pointer" ><i class="far fa-arrow-alt-circle-up"></i></h4>
                                            </div>
                                        </div>                                        
                                        <div>
                                            <p className="text-muted ">Back-End Developers concentrate on what goes on behind the scenes of a website. 
                                                These are the people who build the databases that host the site’s content and implement the technologies that runs its search and e-commerce capabilities. 
                                                Focused more on the website’s responsiveness and speed than what its pages look like, they’re skilled in languages such as Python and PHP, and frameworks like Django and Ruby on Rails. 
                                                Their pay ranges from $43,000 to $116,000, PayScale says, with a median of $75,000.
                                                <br/>Back-End Developers concentrate on what goes on behind the scenes of a website. 
                                                These are the people who build the databases that host the site’s content and implement the technologies that runs its search and e-commerce capabilities. 
                                                Focused more on the website’s responsiveness and speed than what its pages look like, they’re skilled in languages such as Python and PHP, and frameworks like Django and Ruby on Rails. 
                                                Their pay ranges from $43,000 to $116,000, PayScale says, with a median of $75,000.
                                            </p>
                                        </div>
                                    </li>
                                    <div class="card-header bg-white py-2">
                                        <h6 className="text-warning mb-0">2 Comments</h6>
                                    </div>
                                    <li class="list-group-item">
                                        <div className="user d-flex justify-content-between">
                                            <div>
                                                <div className="d-flex align-items-baseline">
                                                    <h6 className="mr-2 m-0">Sagar Jhaa</h6>
                                                    <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">Mentor</a>
                                                </div>
                                                <div className="d-flex align-items-baseline">
                                                    <p className="text-muted small pr-2">May 10, 2020</p>
                                                    <p className="text-muted small">150 votes</p>
                                                </div>
                                                
                                            </div>
                                            <div>
                                                <h4 className="vote-btn text-info cursor-pointer" ><i class="far fa-arrow-alt-circle-up"></i></h4>
                                            </div>
                                        </div>                                        
                                        <div>
                                            <p className="text-muted ">Back-End Developers concentrate on what goes on behind the scenes of a website. 
                                                These are the people who build the databases that host the site’s content and implement the technologies that runs its search and e-commerce capabilities. 
                                                Focused more on the website’s responsiveness and speed than what its pages look like, they’re skilled in languages such as Python and PHP, and frameworks like Django and Ruby on Rails. 
                                                Their pay ranges from $43,000 to $116,000, PayScale says, with a median of $75,000.
                                                <br/>Back-End Developers concentrate on what goes on behind the scenes of a website. 
                                                These are the people who build the databases that host the site’s content and implement the technologies that runs its search and e-commerce capabilities. 
                                                Focused more on the website’s responsiveness and speed than what its pages look like, they’re skilled in languages such as Python and PHP, and frameworks like Django and Ruby on Rails. 
                                                Their pay ranges from $43,000 to $116,000, PayScale says, with a median of $75,000.
                                            </p>
                                        </div>
                                    </li>
                                    <div>
                                        <div class="card-header bg-white py-2">
                                            <h6 className="text-warning mb-0">2 Comments</h6>
                                        </div>
                                        <div class="card-body">
                                        <div className="mb-3">
                                            <div className="d-flex align-items-baseline">
                                                <h6 class="card-title mb-0 mr-2">Prashant Jhaa</h6>
                                                <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                                            </div>                                     
                                            <h6 className="text-muted mb-1 small">2 hrs ago</h6>                                   
                                            <p class="card-text small">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex align-items-baseline">
                                                <h6 class="card-title mb-0 mr-2">Prashant Jhaa</h6>
                                                <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                                            </div>                                     
                                            <h6 className="text-muted mb-1 small">2 hrs ago</h6>                                   
                                            <p class="card-text small">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>

                                        <div class="input-group">
                                            <input type="text" class="form-control form-control-sm" placeholder="Add Comment" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <div class="input-group-append">
                                                <button class="btn btn-info btn-sm" type="button">Comment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    
                                </ul>
                            </div>
                            <div className="card my-3">
                                <div class="card-header bg-white py-2">
                                    <h6 className="text-warning mb-0">2 Comments</h6>
                                </div>
                                <div class="card-body">
                                    <div className="mb-3">
                                        <div className="d-flex align-items-baseline">
                                            <h6 class="card-title mb-0 mr-2">Prashant Jhaa</h6>
                                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                                        </div>                                     
                                        <h6 className="text-muted mb-1 small">2 hrs ago</h6>                                   
                                        <p class="card-text small">With supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex align-items-baseline">
                                            <h6 class="card-title mb-0 mr-2">Prashant Jhaa</h6>
                                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                                        </div>                                     
                                        <h6 className="text-muted mb-1 small">2 hrs ago</h6>                                   
                                        <p class="card-text small">With supporting text below as a natural lead-in to additional content.</p>
                                    </div>

                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="Add Comment" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <button class="btn btn-info btn-sm" type="button">Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-md-4">
                            <div> 
                            <button type="button" className="btn btn-info w-100" data-toggle="modal" data-target="#answerModal">Write Answer</button>                               
                                <div className="card my-2">
                                    <div className="card-body pb-0">
                                        <h5 className="card-title text-warning pb-2 border-bottom">Stats</h5>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">Answers (4)</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">Votes (15)</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">Coments (5)</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card my-2">
                                    <div className="card-body pb-2">
                                        <h5 className="card-title text-warning pb-2 border-bottom">Related Questions</h5>
                                        <div>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How much do web developers earn? What is their salary?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">Does Google force employees who have offers from Facebook to leave immediately?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How to evaluate whether a career coach is beneficial?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">Why are the British confused about us calling bread rolls “biscuits” when they call bread rolls “puddings”?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How do I tell my new employer that I can’t use the computer they gave me?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How to evaluate whether a career coach is beneficial?</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header py-2">
                                <h6 class="modal-title" id="exampleModalLabel">Write Answer</h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <textarea class="form-control" id="answer-text" rows="5" placeholder="Write Answer..." required></textarea>
                                    </div>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="customFile" />
                                        <label class="custom-file-label" for="customFile">Choose file</label>
                                    </div>
                                    <div className="my-3 text-center">
                                        <button type="submit" class="btn btn-info w-100">Submit Question</button>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Answer;