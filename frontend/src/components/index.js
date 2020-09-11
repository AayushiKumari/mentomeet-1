import React from 'react';

import './../css/App.css';

import WhyChooseUs from '../components/WhyChooseUs'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import CareerSolutionEveryone from "../components/CareerSolutionEveryone"
import BlogDetailedPage from '../components/Blog/BlogDetailedPage'
import BlogList from './Blog/BlogList'
import About from './About'
import BeyondMentorship from './BeyondMentorship'
import WhyChooseMentomeet from './WhyChooseMentomeet'
import Footer from './Footer'
import Mentor from './Mentor'
// import WordFromStudents from './WordFromStudents.js'


function Index() {
  return (
    <div>
      <NavBar/>
      <Home/>
      <CareerSolutionEveryone/>
      <WhyChooseUs/> 
      {/* <BlogDetailedPage/> */}
      <Mentor/>
      <About/>
      <BeyondMentorship/>     
      <WhyChooseMentomeet/>
       <Footer />
    </div>
  )
}

export default Index;
