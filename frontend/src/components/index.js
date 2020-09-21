import React from 'react';

import './../css/App.css';

import WhyChooseUs from '../components/WhyChooseUs'
import Home from '../components/Home'
import CareerSolutionEveryone from "../components/CareerSolutionEveryone"
import BlogDetailedPage from '../components/Blog/BlogDetailedPage'
import BlogList from './Blog/BlogList'
import About from './About'
import BeyondMentorship from './BeyondMentorship'
import WhyChooseMentomeet from './WhyChooseMentomeet'
import Footer from './Footer'
import Mentor from './Team'
// import WordFromStudents from './WordFromStudents.js'


function Index() {
  return (
    <div>
      <Home/>
      <CareerSolutionEveryone/>
      <WhyChooseUs/> 
      {/* <BlogDetailedPage/> */}
      
      <About/>
      {/* <Mentor/> */}
      <BeyondMentorship/>     
      <WhyChooseMentomeet/>
       {/* <Footer /> */}
    </div>
  )
}

export default Index;
