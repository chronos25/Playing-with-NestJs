import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Redirect, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cat')
export class CatController {
    @Get('')
    @HttpCode(200)
   //@Redirect('http://localhost:3000/')
    findAll(@Req() request: Request): string {
        console.log("Will return all cats");
        console.log("Request headers - ", request.headers);
        return 'This actions returns all cats';
    }

    @Get('/promise')
    @HttpCode(200)
    async promiseMethod(): Promise<any[]>{
        try{
            return ['array'];
        } catch(error){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This request is not allowed'
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ transform: true }))
    findOne(@Req() request: Request, @Param('id') id: string): string {
        console.log("Will return only one cat");
        console.log("Request params - ", request.params, "Request headers - ", request.headers);
        return `This actions returns #${id} cats`;
    }

    @Post()
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Req() request: Request, @Res() res: Response, @Body() createCatDto: CreateCatDto) {
        try{ 
            console.log("Will create cats here is the request body - ", request.body, "DTO ",createCatDto);
            res.status(HttpStatus.CREATED).send('This action will create cat');
        } catch(error){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'This request is not allowed'
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
}
