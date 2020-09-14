
export function mentorValidator(req, res,next){
    // req.check('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.'),
    //   //  .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    // req.check('last_name').isLength({ min: 1 }).trim().withMessage('last name must be specified.'),
      //  .isAlphanumeric().withMessage('last name has non-alphanumeric characters.'),
    req.check('about_me').optional().trim() ,   
    req.check('language').optional().isArray({ max: 3}).withMessage('max 3 languages must be specified.'),
    req.check('college').isLength({ min: 1 }).trim().withMessage('college name must be specified.'),
    req.check('college_type').trim().isIn(['IIT','NIT','AIIMS','IIIT','OTHER']),
   // req.check('phone').optional().isInt(),       
    req.check('year').isInt({ min:1,max:5}).withMessage('year should be between 0 and 6'),    
    req.check('category').isIn(['JEE', 'NEET','CAREER','DEVELOPMENT']).withMessage('choose a category.'),
    req.check('rank').optional(),
    req.check('expertise').optional().
    isIn(['PHYSICS','MATHS','CHEMESTRY','BIOLOGY','PCM','PCB','CAREER','WEBD']).withMessage('choose from possible values'),
   // req.check('expertise').optional().,
    req.check('start_time').trim(),
    req.check('end_time').trim(),
    req.check('fb_link').optional().trim(),
    req.check('linkedin_link').optional().trim(),
    req.check('branch').optional().trim().withMessage('branch name should be proper.');
    
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     return next();
    // Process request after validation and sanitization.
   
}

export function mentorReviewValidator(req, res, next){
    req.check('feedback').isLength({ maxlength: 200}).withMessage('req.check must be specified.'),
    req.check('stars').isInt({min: 1, max:5}).withMessage('stars must be between 1 and 5 stars')
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     return next();


}