import React, { Component } from 'react'

import AllBlogs from './BlogCat/AllBlogs'
import CategoryBlog from './BlogCat/CategoryBlog'
import TagBlogs from './BlogCat/TagBlogs'
import BlogDetail from './BlogDetail'

const Routes = [
    { path: '/blogs', exact: true, name: "AllBlogs", component: AllBlogs },
    { path: '/blogs/:category', exact: true, name: "CategoryBlog", component: CategoryBlog },
    { path: '/blogs/tag/:tag', exact: true, name: "TagBlogs", component: TagBlogs },
    // { path: '/qna/question/:category', exact: true, name: "CategoryQuest", component: CategoryQuest },
    // { path: '/qna/voted', exact: true, name: "VotedAns", component: VotedAns },
    // { path: '/qna/unanswered', exact: true, name: "UnAnswered", component: UnAnswered }
]

export default Routes;