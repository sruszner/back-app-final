const{Router} = require('express');
const router = Router();
const {viewsController, updateViews} = require('../controllers/viewsController');

router.get('/', viewsController);
router.post('/', updateViews);

module.exports = router;