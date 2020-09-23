import React, { Component } from 'react'

import AllMentors from './AllMentors'
import CategoryMentor from './CategoryMentor'


const Routes = [
    { path: '/mentors', exact: true, name: "mentors", component: AllMentors },
    { path: '/mentors/:category', exact: true, name: "CategoryMentor", component: CategoryMentor },
]

export default Routes;