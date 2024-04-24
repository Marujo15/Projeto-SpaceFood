const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const recipeController = require('../controllers/recipeController')
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

router.get('/', authMiddleware, recipeController.getAllRecipes);
router.get('/search', authMiddleware, recipeController.searchRecipes);
router.get('/following', authMiddleware, recipeController.getRecipeByFollowing);
router.get('/:recipe_id', authMiddleware, recipeController.getRecipeDetailed);
 router.post('/create', authMiddleware, upload.single('file'), recipeController.createRecipe);

module.exports = router;