import express from 'express'
import {newQuestion, editQuestion, questionViews, getAllUnansQuestions, questionCount, answerCount, getAllQuestByMaxLike, editAnswer, getAllQuestions, answerToQuest, questLike, ansLikes, getAnsByQId, getQuestByCategory, commentOnAns} from '../../controllers/quora/index.js'
import authorizer from '../../helpers/authorizers/index.js'

const quoraRouter = express.Router();

quoraRouter.post('/quora/question/', authorizer(), newQuestion)
quoraRouter.post('/quora/answer/:uid/question/:qid', authorizer(), answerToQuest)
quoraRouter.get('/quora/question/count/', questionCount)
quoraRouter.get('/quora/answer/:qid/count/', answerCount)
quoraRouter.get('/quora/question/:qid', getAnsByQId)
quoraRouter.get('/quora/question/category/:category', getQuestByCategory)
quoraRouter.get('/quora/question/', getAllQuestions)
quoraRouter.get('/quora/unanswered/', getAllUnansQuestions)
quoraRouter.get('/quora/votedquestion/', getAllQuestByMaxLike)
quoraRouter.put('/quora/question/view/:qid', questionViews)

// update-------
quoraRouter.put('/quora/question/:qid/user/:uid', editQuestion)
quoraRouter.put('/quora/answer/:aid/user/:uid', editAnswer)

// likes---
quoraRouter.post('/quora/like/:uid/question/:qid', questLike)
quoraRouter.post('/quora/like/:uid/question/:qid/answer/:aid', ansLikes)

//comments---------
quoraRouter.post('/quora/question/:qid/answer/:aid/comment/:uid/', authorizer(), commentOnAns)


export default quoraRouter;
