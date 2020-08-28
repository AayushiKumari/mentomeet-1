import express from 'express'
import {newQuestion, editQuestion, getAllQuestByMaxLike, editAnswer, getAllQuestions, answerToQuest, questLike, ansLikes, getAnsByQId} from '../../controllers/quora/index.js'
// var quoraController = require('../../controllers/Quora')

const quoraRouter = express.Router();

quoraRouter.post('/quora/question/:uid', newQuestion)
quoraRouter.post('/quora/answer/:uid/question/:qid', answerToQuest)
quoraRouter.get('/quora/question/:qid', getAnsByQId)
quoraRouter.get('/quora/question/', getAllQuestions)
quoraRouter.get('/quora/votedquestion/', getAllQuestByMaxLike)

// update-------
quoraRouter.put('/quora/question/:qid/user/:uid', editQuestion)
quoraRouter.put('/quora/answer/:aid/user/:uid', editAnswer)

// likes---
quoraRouter.post('/quora/like/:uid/question/:qid', questLike)
quoraRouter.post('/quora/like/:uid/answer/:aid', ansLikes)


export default quoraRouter;
