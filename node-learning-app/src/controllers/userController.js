import { user } from '../models/user.js';

async function getUsers(req, res, next) {
    try {
        const users = await user.find();
        // console.log('users Fetch::', users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

// Get user file by userId
async function getUserFile(req, res) {
    try {
        const user = await user.findById(req.params.id);
        if (!user || !user.file) {
            return res.status(404).json({ error: "File not found" });
        }
        // Set headers so browser knows it's a file
        res.set({
            "Content-Type": user.file.mimetype,
            "Content-Disposition": `attachment; filename="${user.file.filename}"`,
        });
        res.send(user.file.data); // send buffer directly
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving file" });
    }
};


async function createUser(req, res, next) {
    console.log('req.body: createUser:', JSON.stringify(req.body));
    // console.log('req.file: createUser:', req.file);
    const { name, email, password, dob: dateOfBirth } = JSON.parse(JSON.stringify(req.body));
    const file = {
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer
    };
    // console.log('file', file);
    try {
        const newUser = new user({ name, email, password, dateOfBirth, file });
        // console.log('User create Value:', newUser);
        const userResponse = await newUser.save();
        console.log('response:', userResponse._id);
        res.status(201).json({ "userId": userResponse._id });
    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: error.message });
    }
}

async function updateUser(req, res) {
    console.log('update user ', req.params.id);
    console.log('update data ', req.body);
    try {
        const { name, email, password, dob: dateOfBirth } = JSON.parse(JSON.stringify(req.body));
    // const file = {
    //     filename: req.file.originalname,
    //     mimetype: req.file.mimetype,
    //     size: req.file.size,
    //     data: req.file.buffer
    // };
        const updatedUser = await user.findByIdAndUpdate(req.params.id, { name, email, password, dateOfBirth }, { new: true });
        res.status(200).json({ message: `Update user with ID ${req.params.id}`, body: updatedUser });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
}

async function deleteUser(req, res) {
    console.log('delete user ', req.params.id)
    console.log('delete user data ', req.body);
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);
        console.log('deletedUser', deletedUser);
        res.status(204).send();
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
}

export { getUsers, createUser, getUserFile, updateUser, deleteUser };