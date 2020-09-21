import React, { Fragment,useState } from 'react'
import BlogPost from './BlogPost'

import '../../sass/BlogList/BlogList.scss'

import resTable from '../../img/restaurant-table.jpg'
import bulb from '../../img/pendant-bulb.jpg'
import cook from '../../img/restaurant-cook.jpg'
import iftekharRiyad from '../../img/Iftekhar-Riyad.jpg'

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
                TAG SORT
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  PHYSICS
                </DropdownItem>
                <DropdownItem>
                  CHEMESTRY 
                </DropdownItem>
                <DropdownItem>
                  MATHS
                </DropdownItem>
                <DropdownItem>
                  BIOLOGY
                </DropdownItem>
                <DropdownItem>
                  PCB
                </DropdownItem>
                <DropdownItem>
                  PCM
                </DropdownItem>
                <DropdownItem>
                  JEE-EXAM
                </DropdownItem>
                <DropdownItem>
                  NEET-EXAM
                </DropdownItem>
                <DropdownItem>
                  DEV-BLOG
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

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogData: {
        "jee_blogs": [],
        "neet_blogs": [],
        "career_blogs": [],
        "development_blogs": []
      }
    }
  }   // End of constructor

  componentDidMount() {
    // Have to change the URL detail here afterwards
    fetch(`http://${window.location.hostname}:5005/blogs`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Result of /blogs fetch", result);
          this.setState({
            blogData: result
          })
        },
        (error) => {
          console.log("Error in BlogList", error);
        }
      )
  }

  render() {

    // First take the state variable for all the blogs
    const blogData = this.state.blogData;

    // Now we will create the blogs using the above data
    // We will create components and add them in this one by one
    const allBlogsComponent = {}

    for (let key in blogData) {
      // Here key is jee_blog, neet_bblog, etc.
      const blogType = blogData[key];
      const tempArray = [];

      // Creating jee_blogs division by looping in reverse order
      for (let i = blogType.length - 1; i >= 0; i--) {
        const blog = blogType[i];

        tempArray.push(
          <BlogPost
            data={{
              title: blog['title'],
              category: blog['tag'],
              // TODO Have to change this and get the data usign Authorid add
              author: {
                name: 'Iftekhar Riyad',
                imgUrl: iftekharRiyad
              },
              // TODO Change this imgUrl to have dynamic value from the API or have it stored somewhere
              imgUrl: cook,
              // TODO Change this to a good format
              date: blog['created_at']
            }}
          />
        )
      }   // End of list creating for

      // Finally adding the array to the component
      allBlogsComponent[key] = tempArray;

    } // End of all components key creation


    return (
      <Fragment>
    <div><NavbarExample/></div>      
        <div id='container' className='container-fluid container-md my-5'>
          {/* All Blogs will be created and added here which was creating using the data stored in this.state */}

          <h2>JEE Blogs</h2>
          <div className='my-5 row px-2 px-sm-5 px-md-3 px-lg-3 flex-wrap'>
            {allBlogsComponent.jee_blogs}
          </div>

          <h2>Neet Blogs</h2>
          <div className='my-5 row px-2 px-sm-5 px-md-3 px-lg-3 flex-wrap'>
            {allBlogsComponent.neet_blogs}
          </div>

          <h2>Career Blogs</h2>
          <div className='my-5 row px-2 px-sm-5 px-md-3 px-lg-3 flex-wrap'>
            {allBlogsComponent.career_blogs}
          </div>

          <h2>Development Blogs</h2>
          <div className='my-5 row px-2 px-sm-5 px-md-3 px-lg-3 flex-wrap'>
            {allBlogsComponent.development_blogs}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default BlogList



/* older data I haven't removed this */
// function BlogListF() {
//   return (
//     <div id='container' className='container-fluid container-md my-5'>
//       <div className='my-5 row px-2 px-sm-5 px-md-3 px-lg-3 flex-wrap'>
//         <BlogPost
//           data={{
//             title: 'Go for what you love',
//             category: 'Video',
//             author: {
//               name: 'AWWWARDS',
//               imgUrl: iftekharRiyad
//             },
//             imgUrl: resTable,
//             date: 'December 12, 2019'
//           }}
//         />
//         <BlogPost
//           data={{
//             title: 'If you want something in life, just reach out and grab it.',
//             category: 'Motivation',
//             author: {
//               name: 'Christopher McCandless',
//               imgUrl: iftekharRiyad
//             },
//             imgUrl: bulb,
//             date: 'September 2, 2019'
//           }}
//         />
//         <BlogPost
//           data={{
//             title: 'My blog post title ideas are finished!',
//             category: 'Unknown',
//             author: {
//               name: 'Iftekhar Riyad',
//               imgUrl: iftekharRiyad
//             },
//             imgUrl: cook,
//             date: 'July 8, 2020'
//           }}
//         />

//         <BlogPost
//           data={{
//             title: 'Go for what you love',
//             category: 'Video',
//             author: {
//               name: 'AWWWARDS',
//               imgUrl: iftekharRiyad
//             },
//             imgUrl: resTable,
//             date: 'December 12, 2019'
//           }}
//         />
//         <BlogPost
//           data={{
//             title: 'If you want something in life, just reach out and grab it.',
//             category: 'Motivation',
//             author: {
//               name: 'Christopher McCandless',
//               imgUrl: iftekharRiyad
//             },
//             imgUrl: bulb,
//             date: 'September 2, 2019'
//           }}
//         />
//         <BlogPost
//           data={{
//             title: 'My blog post title ideas are finished!',
//             category: 'Unknown',
//             author: {
//               name: 'Iftekhar Riyad',
//               imgUrl: iftekharRiyad
//             },
//             imgUrl: cook,
//             date: 'July 8, 2020'
//           }}
//         />

//       </div>
//     </div>

//   )
// }
