import { Router } from "express";
import * as rh from './reqhandler.js'

const router = Router()

router.route('/adduser').post(rh.addUser)
router.route('/add').post(rh.addData)
router.route('/login').post(rh.login)
router.route('/get').get(rh.getData)
router.route('/get/:id').get(rh.getoneData)
router.route('/update/:id').put(rh.updateData)
router.route('/delete/:id').delete(rh.deleteData)

export default router