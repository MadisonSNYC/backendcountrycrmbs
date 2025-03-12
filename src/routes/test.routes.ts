import { Router, Request, Response } from 'express';
import { supabase } from '../server'; // Assuming supabase client is exported from server.ts

const router = Router();

router.get('/test-connection', async (req: Request, res: Response) => {
  try {
    // Test query to fetch the current timestamp from Supabase
    const { data, error } = await supabase
      .from('waitlist') // Using your existing waitlist table
      .select('created_at')
      .limit(1);

    if (error) {
      console.error('Supabase connection test failed:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to connect to Supabase',
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully connected to Supabase',
      data
    });
  } catch (err) {
    const error = err as Error;
    console.error('Test endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

export default router; 