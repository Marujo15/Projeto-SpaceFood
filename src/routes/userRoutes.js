const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userRoutesRegister = require('./userRoutesRegister');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: 'src/uploads/',
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop();
            const filename = `${uuidv4()}.${ext}`;
            cb(null, filename);
        }
    }),
});

router.get('/', authMiddleware, userController.getPerfil);
router.get('/:user_id', authMiddleware, userController.getPerfil);
router.post('/login', userController.login);
router.put('/:user_id', authMiddleware, upload.single('file'), userController.updatePerfil);
router.delete('/login', authMiddleware, userController.clearCookies)
router.use('/register', userRoutesRegister);

module.exports = router;