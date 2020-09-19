import React, { Fragment } from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import Rating from "@material-ui/lab/Rating";
import { Avatar} from "@material-ui/core";
import "../../css/ourMentor.css";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import  { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavbarExample = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="#">JEE</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#">NEET</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">CAREER</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">DEVELOPMENT</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                COLLEGE SORT
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  AIIMS
                </DropdownItem>
                <DropdownItem>
                  IIT 
                </DropdownItem>
                <DropdownItem>
                  NIT
                </DropdownItem>
                <DropdownItem>
                  IIIT
                </DropdownItem>
                <DropdownItem>
                  OTHER
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>:SORT BY</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}           


const StyledRating = withStyles({
  iconFilled: {
    color: " #00ced1",
  },
  iconHover: {
    color: "#00ced1",
  },
})(Rating);


function MentorTile(props) {
  /**
   * Needed Props:
   * name
   * description
   * imgSrc
   * 
   */

  const [value, setValue] = React.useState(3);

  return (
    <div className="big-brother col-md-4 mt-4 mt-md-0 col-12 d-flex align-items-center justify-content-center">
      <div className="sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between">
        <div className="rating">
          {" "}
          <StyledRating
            name="customized-color"
            getLabelText={(value) =>
              `${value} Heart${value !== 1 ? "s" : ""}`
            }
            max={1}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
        </div>
        <div
          style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
        >
          <Avatar
            style={{
              width: 150,
              height: 150,
              borderRadius: 80,
              border: "3px solid grey",
            }}
          >
            <img
              src={props.imgSrc}
              width="150"
              height="150"
            ></img>
          </Avatar>
        </div>
        <div>
          <div className="li-items" style={{ width: "20%" }}>
            <p> {props.name} </p>
          </div>
          <div className="li-items" style={{ width: "10%" }}>
            {props.description}
          </div>
        </div>
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          {" "}
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
      </div>
    </div>
  )
} // End of function MentorTile



class OurMentor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorsData: {
        jee_mentors: [],
        neet_mentors: []
      }
    }
  }


  componentDidMount() {
    fetch(`http://${window.location.hostname}:5005/mentors`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("MentorsList Data", result);
          this.setState({
            mentorsData: result
          });
        },
        (error) => {
          console.log("Error in Mentorlist", error);
        }
      )
  } // End of componentDidMount

  render() {
    const mentorsData = this.state.mentorsData;
    const allMentorsComponents = {}

    for (var key in mentorsData) {
      // Here key is jee_mentors and neet_mentors
      const mentorType = mentorsData[key];
      const tempArray = [];

      // Loop in reverse order so that the new ones will come at top
      // Make this later in whatever order you want
      for (let i = mentorType.length - 1; i >= 0; i--) {
        const mentor = mentorType[i];
        // profile url- /profile/{mentor._id}
        // img-mentor.history[0].profile_picture
        // Expertise-mentor.history[0].expertise,mentor.history[0].start_time,mentor.history[0].end_time

        tempArray.push(
          // TODO this data needs to be added more if want to show
          <MentorTile
            name={mentor.firstName+mentor._id} 
            description={mentor.history[0].year +mentor.history[0].college}
            imgSrc="https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
          />
        )
      } // End of mentor Array creation loop

      allMentorsComponents[key] = tempArray;
    }

    console.log("all", allMentorsComponents)

    return (
      <Fragment>
        <div id="career-solution-everyone" className="container-lg  py-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h1 id="everyone">Our Mentors</h1>

            <div style={{ marginRight: -426 }}>
              <TextField
                InputProps={{
                  className: "search-box",
                  endAdornment: (
                    <div
                      style={{
                        padding: "1px",
                        width: "30px",
                        backgroundColor: " darkturquoise",
                        borderRadius: 30,
                        marginTop: -1,
                      }}
                    >
                      <SearchIcon style={{ color: "white" }} size="small" />{" "}
                    </div>
                  ),
                }}
                placeholder="search.."
                id="standard-name"
              />
            </div>
            <div></div>
          </div>
          <NavbarExample/>
          <h2>JEE Mentors</h2>
          <div className="row align-items-start justify-content-center mt-5">
            {allMentorsComponents.jee_mentors}
          </div>
          <h2>Neet Mentors</h2>
          <div className="row align-items-start justify-content-center mt-5">
            {allMentorsComponents.neet_mentors}
          </div>
        </div>
      </Fragment>
    ) // End of return
  } // End of render of MentorList class
} // End of class MentorList




// function OurMentor() {
//   const [value, setValue] = React.useState(2);

//   return (
//     <div id="career-solution-everyone" className="container-lg  py-4">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           flexDirection: "row",
//           alignItems: "center",
//         }}
//       >
//         <h1 id="everyone">Our Mentors</h1>

//         <div style={{ marginRight: -426 }}>
//           <TextField
//             InputProps={{
//               className: "search-box",
//               endAdornment: (
//                 <div
//                   style={{
//                     padding: "1px",
//                     width: "30px",
//                     backgroundColor: " darkturquoise",
//                     borderRadius: 30,
//                     marginTop: -1,
//                   }}
//                 >
//                   <SearchIcon style={{ color: "white" }} size="small" />{" "}
//                 </div>
//               ),
//             }}
//             placeholder="search.."
//             id="standard-name"
//           />
//         </div>
//         <div></div>
//       </div>
//       <div className="row align-items-start justify-content-center mt-5">
//         <div className="big-brother col-md-4 col-12 col-sm-6 d-flex align-items-center justify-content-center">
//           <div className="sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between">
//             <div className="rating">
//               {" "}
//               <StyledRating
//                 name="customized-color"
//                 getLabelText={(value) =>
//                   `${value} Heart${value !== 2 ? "s" : ""}`
//                 }
//                 max={1}
//                 icon={<FavoriteIcon fontSize="inherit" />}
//               />
//             </div>
//             <div
//               style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
//             >
//               <Avatar
//                 style={{
//                   width: 150,
//                   height: 150,
//                   borderRadius: 80,
//                   border: "3px solid grey",
//                 }}
//               >
//                 <img
//                   src="https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
//                   width="150"
//                   height="150"
//                 ></img>
//               </Avatar>
//             </div>
//             <div>
//               <div className="li-items" style={{ width: "20%" }}>
//                 <p> Joey</p>
//               </div>
//               <div className="li-items" style={{ width: "10%" }}>
//                 post
//               </div>
//             </div>
//             <div style={{ marginRight: "auto", marginLeft: "auto" }}>
//               {" "}
//               <Rating
//                 name="simple-controlled"
//                 value={value}
//                 onChange={(event, newValue) => {
//                   setValue(newValue);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="big-brother col-md-4 mt-4 mt-sm-0 col-12 col-sm-6 d-flex align-items-center justify-content-center">
//           <div className="sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between">
//             <div className="rating">
//               {" "}
//               <StyledRating
//                 name="customized-color"
//                 getLabelText={(value) =>
//                   `${value} Heart${value !== 1 ? "s" : ""}`
//                 }
//                 max={1}
//                 icon={<FavoriteIcon fontSize="inherit" />}
//               />
//             </div>
//             <div
//               style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
//             >
//               <Avatar
//                 style={{
//                   width: 150,
//                   height: 150,
//                   borderRadius: 80,
//                   border: "3px solid grey",
//                 }}
//               >
//                 <img
//                   src="https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
//                   width="150"
//                   height="150"
//                 ></img>
//               </Avatar>
//             </div>
//             <div>
//               <div className="li-items" style={{ width: "20%" }}>
//                 <p> Joey</p>
//               </div>
//               <div className="li-items" style={{ width: "10%" }}>
//                 post
//               </div>
//             </div>
//             <div style={{ marginRight: "auto", marginLeft: "auto" }}>
//               {" "}
//               <Rating
//                 name="simple-controlled"
//                 value={value}
//                 onChange={(event, newValue) => {
//                   setValue(newValue);
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="big-brother col-md-4 col-12 col-sm-6 d-flex align-items-center justify-content-center">
//           <div className="sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between">
//             <div className="rating">
//               {" "}
//               <StyledRating
//                 name="customized-color"
//                 getLabelText={(value) =>
//                   `${value} Heart${value !== 1 ? "s" : ""}`
//                 }
//                 max={1}
//                 icon={<FavoriteIcon fontSize="inherit" />}
//               />
//             </div>
//             <div
//               style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
//             >
//               <Avatar
//                 style={{
//                   width: 150,
//                   height: 150,
//                   borderRadius: 80,
//                   border: "3px solid grey",
//                 }}
//               >
//                 <img
//                   src="https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
//                   width="150"
//                   height="150"
//                 ></img>
//               </Avatar>{" "}
//             </div>
//             <div>
//               <div className="li-items" style={{ width: "20%" }}>
//                 <p> Joey</p>
//               </div>
//               <div className="li-items" style={{ width: "10%" }}>
//                 post
//               </div>
//             </div>
//             <div style={{ marginRight: "auto", marginLeft: "auto" }}>
//               {" "}
//               <Rating
//                 name="simple-controlled"
//                 value={value}
//                 onChange={(event, newValue) => {
//                   setValue(newValue);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="big-brother col-md-4 mt-4 mt-sm-0 col-12 col-sm-6 d-flex align-items-center justify-content-center">
//           <div className="sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between">
//             <div className="rating">
//               {" "}
//               <StyledRating
//                 name="customized-color"
//                 getLabelText={(value) =>
//                   `${value} Heart${value !== 1 ? "s" : ""}`
//                 }
//                 max={1}
//                 icon={<FavoriteIcon fontSize="inherit" />}
//               />
//             </div>
//             <div
//               style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
//             >
//               <Avatar
//                 style={{
//                   width: 150,
//                   height: 150,
//                   borderRadius: 80,
//                   border: "3px solid grey",
//                 }}
//               >
//                 <img
//                   src="https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
//                   width="150"
//                   height="150"
//                 ></img>
//               </Avatar>
//             </div>
//             <div>
//               <div className="li-items" style={{ width: "20%" }}>
//                 <p> Joey</p>
//               </div>
//               <div className="li-items" style={{ width: "10%" }}>
//                 post
//               </div>
//             </div>
//             <div style={{ marginRight: "auto", marginLeft: "auto" }}>
//               {" "}
//               <Rating
//                 name="simple-controlled"
//                 value={value}
//                 onChange={(event, newValue) => {
//                   setValue(newValue);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="big-brother col-md-4 mt-4 mt-md-0 col-12 d-flex align-items-center justify-content-center">
//           <div className="sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between">
//             <div className="rating">
//               {" "}
//               <StyledRating
//                 name="customized-color"
//                 getLabelText={(value) =>
//                   `${value} Heart${value !== 1 ? "s" : ""}`
//                 }
//                 max={1}
//                 icon={<FavoriteIcon fontSize="inherit" />}
//               />
//             </div>
//             <div
//               style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
//             >
//               <Avatar
//                 style={{
//                   width: 150,
//                   height: 150,
//                   borderRadius: 80,
//                   border: "3px solid grey",
//                 }}
//               >
//                 <img
//                   src="https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
//                   width="150"
//                   height="150"
//                 ></img>
//               </Avatar>
//             </div>
//             <div>
//               <div className="li-items" style={{ width: "20%" }}>
//                 <p> Joey</p>
//               </div>
//               <div className="li-items" style={{ width: "10%" }}>
//                 post
//               </div>
//             </div>
//             <div style={{ marginRight: "auto", marginLeft: "auto" }}>
//               {" "}
//               <Rating
//                 name="simple-controlled"
//                 value={value}
//                 onChange={(event, newValue) => {
//                   setValue(newValue);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>


//     </div>
//   );
// }

export default OurMentor;
