import React,{useState,Fragment} from 'react'
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
export default function BlogList(){
    return(
        <Fragment>
        <div>
        <NavbarExample/>
        </div>
        <div id='container' className='container-fluid container-md my-5'>
             <div className='my-5 row px-2 px-sm-5 px-md-3 px-lg-3 flex-wrap'>
            <BlogPost
            data={{
                title:'Go for what you love',
                category: 'Video',
                author:{
                    name:'AWWWARDS',
                    imgUrl:iftekharRiyad
                },
                imgUrl:resTable,
                date:'December 12, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'If you want something in life, just reach out and grab it.',
                category: 'Motivation',
                author:{
                    name:'Christopher McCandless',
                    imgUrl:iftekharRiyad
                },
                imgUrl:bulb,
                date:'September 2, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'My blog post title ideas are finished!',
                category: 'Unknown',
                author:{
                    name:'Iftekhar Riyad',
                    imgUrl:iftekharRiyad
                },
                imgUrl:cook,
                date:'July 8, 2020'
            }}
            />

            <BlogPost
            data={{
                title:'Go for what you love',
                category: 'Video',
                author:{
                    name:'AWWWARDS',
                    imgUrl:iftekharRiyad
                },
                imgUrl:resTable,
                date:'December 12, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'If you want something in life, just reach out and grab it.',
                category: 'Motivation',
                author:{
                    name:'Christopher McCandless',
                    imgUrl:iftekharRiyad
                },
                imgUrl:bulb,
                date:'September 2, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'My blog post title ideas are finished!',
                category: 'Unknown',
                author:{
                    name:'Iftekhar Riyad',
                    imgUrl:iftekharRiyad
                },
                imgUrl:cook,
                date:'July 8, 2020'
            }}
            />
         
        </div>
    </div>
    </Fragment>
    )
}