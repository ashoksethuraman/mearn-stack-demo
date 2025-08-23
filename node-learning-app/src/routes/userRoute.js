import { Router } from "express";
import { getUsers, createUser, getUserFile, updateUser, deleteUser } from '../controllers/userController.js'
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id/file', getUserFile);
userRouter.post('/create', upload.single('bioDetails'), createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;