import mongoose from 'mongoose';

export interface IWaitlist {
  email: string;
  createdAt: Date;
}

const waitlistSchema = new mongoose.Schema<IWaitlist>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Waitlist = mongoose.model<IWaitlist>('Waitlist', waitlistSchema); 