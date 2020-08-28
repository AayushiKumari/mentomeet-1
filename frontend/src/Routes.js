import React, { Component } from 'react'

import AllQuestion from './components/Question/AllQuestion'
import VotedAns from './components/Question/VotedAns'
import UnAnswered from './components/Question/UnAnswered'

const Routes = [
    { path: '/qna', exact: true, name: "AllQuestion", component: AllQuestion },
    { path: '/qna/votes', exact: true, name: "VotedAns", component: VotedAns },
    { path: '/qna/unanswered', exact: true, name: "UnAnswered", component: UnAnswered }
]

export default Routes;