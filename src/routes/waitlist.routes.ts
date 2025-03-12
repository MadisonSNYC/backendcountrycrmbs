import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../server';

const router = express.Router();

// Validation middleware
const validateWaitlistEntry = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
];

// Add email to waitlist
router.post('/', validateWaitlistEntry, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single();

    if (existingEntry) {
      return res.status(409).json({
        message: 'This email is already on the waitlist'
      });
    }

    // Create new waitlist entry
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      message: 'Successfully added to the waitlist',
      data
    });

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return res.status(500).json({
      message: 'An error occurred while processing your request'
    });
  }
});

export default router; 