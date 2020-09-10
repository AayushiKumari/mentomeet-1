import validator from 'express-validator'
const { body } = validator
export function blogValidator(req, res, next){
  console.log(req.body)
    req.check('author').withMessage('author is required.')     
    req.check('minute_read').optional({nullable: true}),     
    req.check('category').isIn(['JEE', 'NEET','CAREER','DEVELOPMENT']).withMessage('category name must be specified.'),
    req.check('title').isLength({ min: 1 }).trim().withMessage('title name must be specified.'),
       // .isAlphanumeric().withMessage('title has non-alphanumeric characters.'),
    req.check('body_text').isLength({ min: 1 ,max:10000000}).trim().withMessage('body name must be specified.'),
  // req.check('body_image').optional().isImage().withMessage('image format not supported.'),
    req.check('tag').optional().isIn(['PHYSICS','CHEMESTRY','MATHS','PCM','PCB','BIOLOGY','JEE-EXAM',
    'JEE-ADVANCED','AIIMS','NEET-EXAM','EXAM','JEE-11','JEE-12','JEE-DROPPER','NEET-DROPPER','DEV-BLOG' ]).withMessage(' tags can be specified.'),
    req.check('body_image').optional()

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     return next();

    
}

export function commentValidator(req, res, next) {
        req.check('body').isLength({ min: 1 }).withMessage('body must be specified.')
        const errors = req.validationErrors();
        if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
        }
        return next();

}