import { NextFunction, Request, Response } from "express";

const catchAsync = (controller: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res).catch((err: any) => {
      const statusCode = err.statusCode || 500; 
      next({ statusCode, message: err.message }); 
    });
  };
};
export default catchAsync