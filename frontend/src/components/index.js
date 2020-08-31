import React from 'react';

import './../css/App.css';

import WhyChooseUs from '../components/WhyChooseUs'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import CareerSolutionEveryone from "../components/CareerSolutionEveryone"
import BlogDetailedPage from '../components/BlogPostDetailed/BlogDetailedPage'
import BlogList from './BlogList/BlogList'
import About from './About'
import BeyondMentorship from './BeyondMentorship'
import WhyChooseMentomeet from './WhyChooseMentomeet'
import WordFromStudents from './WordFromStudents.js'


function Index() {

  return (
    <div>
      <NavBar/>
      <Home/>
      <CareerSolutionEveryone/>
      <WhyChooseUs/> 
      {/* <BlogDetailedPage/> */}
      <BlogList/>
      <About/>
      <BeyondMentorship/>
      <WordFromStudents />
      {/* <WhyChooseMentomeet/> */}
    </div>
  )
}

export default Index;
