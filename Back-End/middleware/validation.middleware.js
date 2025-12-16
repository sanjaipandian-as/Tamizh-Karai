import { body, param, query, validationResult } from 'express-validator';
import { AppError } from './error.middleware.js';

// Validation result handler
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join(', ');
        return next(new AppError(errorMessages, 400));
    }
    next();
};

// User validation rules
export const signupValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    validate
];

export const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required'),

    validate
];

export const profileUpdateValidation = [
    body('fullName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),

    body('phone')
        .optional()
        .trim()
        .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),

    validate
];

export const passwordResetValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    validate
];

// Place validation rules
export const createPlaceValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Place name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Place name must be between 2 and 100 characters'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),

    body('location')
        .trim()
        .notEmpty().withMessage('Location is required'),

    body('category')
        .optional()
        .trim()
        .isIn(['temple', 'beach', 'hill', 'museum', 'park', 'heritage', 'other']).withMessage('Invalid category'),

    validate
];

// Hotel validation rules
export const createHotelValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Hotel name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Hotel name must be between 2 and 100 characters'),

    body('location')
        .trim()
        .notEmpty().withMessage('Location is required'),

    body('price')
        .optional()
        .isNumeric().withMessage('Price must be a number')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),

    validate
];

// ID validation
export const mongoIdValidation = [
    param('id')
        .isMongoId().withMessage('Invalid ID format'),

    validate
];

// Pagination validation
export const paginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),

    validate
];
