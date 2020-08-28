import express from 'express'
// import {submitEvent, fetchEventForAdmin, fetchEventForUser, approveEvent} from '../../controllers/events/index.js'
import {submitEvent, fetchEventforUser, getEventforUser, submitAdmin1Event, fetchApprovals,fetchApprovals2, setApproval1, setApproval2, setDecline1, setDecline2, fetchEmptySlots, fetchBookings, fetchLhcBookings} from './../../controllers/bookings/index.js'
import {isAuth, isAdmin1, isAdmin2} from '../../helpers/authorizers/index.js'
import authorizer from '../../helpers/authorizers/index.js'

const bookingRouter  = express.Router()


// bookingRouter.get('/event/fetch',fetchEventForUser)
bookingRouter.post('/booking/submit',authorizer(), isAuth, submitEvent)

bookingRouter.get('/bookings/fetch/:userId',authorizer(),fetchEventforUser)
bookingRouter.get('/booking/fetch/:bookingId',authorizer(),getEventforUser)
// bookingRouter.get('/event/admin/fetch',fetchEventForAdmin)

//------------admin1
bookingRouter.post('/admin1/booking/submit',authorizer(), isAuth, isAdmin1, submitAdmin1Event)
bookingRouter.post('/approvals/fetch/', authorizer(), isAuth, isAdmin1, fetchApprovals)

bookingRouter.put('/booking/approval1/:id', authorizer(), isAuth, isAdmin1, setApproval1)
bookingRouter.put('/booking/decline1/:id', authorizer(), isAuth, isAdmin1, setDecline1)
// bookingRouter.get('/admin1/bookings/fetch/:userId',authorizer(),fetchEventforUser)
// bookingRouter.get('/admin1/booking/fetch/:bookingId',authorizer(),getEventforUser)


// admin2
bookingRouter.post('/approvals2/fetch/', authorizer(), isAuth, isAdmin2, fetchApprovals2)
bookingRouter.put('/booking/approval2/:id', authorizer(), isAuth, isAdmin2, setApproval2)
bookingRouter.put('/booking/decline2/:id', authorizer(), isAuth, isAdmin2, setDecline2)

bookingRouter.get('/slots/fetch', fetchEmptySlots)
bookingRouter.get('/bookings/fetch', fetchBookings)

bookingRouter.get('/bookings/lhc/fetch', fetchLhcBookings)


export default bookingRouter