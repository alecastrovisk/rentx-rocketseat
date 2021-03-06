import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import 'reflect-metadata';

import { router } from './routes/index';

import { AppError } from '../../errors/AppError';
import "../../../shared/container";
import createConnection from '../typeorm';


createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use(
    (err: Error, request: Request, response:  Response, next: NextFunction) => {
        if(err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
});

app.get('/', (request, response) => {
    return response.json({ message: 'hello world' });
});

app.listen(3333, () => console.log('server is running on port 3333!'));