import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
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
        return ['array'];
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Req() request: Request, @Param('id') id: string): string {
        console.log("Will return only one cat");
        console.log("Request params - ", request.params, "Request headers - ", request.headers);
        return `This actions returns #${id} cats`;
    }

    @Post()
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Req() request: Request, @Body() createCatDto: CreateCatDto) {
        console.log("Will create cats here is the request body - ", request.body, "DTO ",createCatDto);
        return 'This action will create cat';
    }
}
