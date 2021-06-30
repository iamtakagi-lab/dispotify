import { Router } from 'express'
import { callback, logout, login } from './auth/authController'
import { deleteUser, me, playing, update } from './users/usersController'

const router = Router()

router.get('/auth/login', login)
router.get('/auth/callback', callback)
router.get('/auth/logout', logout)

router.get('/users/me', me)
router.put('/users', update)
router.delete('/users', deleteUser)

/* router.get('/users/playing', playing) */

export default router
