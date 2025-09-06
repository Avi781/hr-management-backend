import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: { id: number; email: string; name: string };
    }
  }
}
export {};
