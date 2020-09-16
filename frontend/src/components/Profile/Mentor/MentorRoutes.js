import React, { Component } from 'react'

import AllMentors from './AllMentors'
import CategoryMentor from './CategoryMentor'


const Routes = [
    { path: '/mentors', exact: true, name: "mentors", component: AllMentors },
    { path: '/mentors/:category', exact: true, name: "CategoryMentor", component: CategoryMentor },
    // { path: '/blogs/tag/:tag', exact: true, name: "TagBlogs", component: TagBlogs },
    // // { path: '/qna/question/:category', exact: true, name: "CategoryQuest", component: CategoryQuest },
    // { path: '/qna/voted', exact: true, name: "VotedAns", component: VotedAns },
    // { path: '/qna/unanswered', exact: true, name: "UnAnswered", component: UnAnswered }
]

export default Routes;