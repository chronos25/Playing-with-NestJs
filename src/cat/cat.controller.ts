import { Controller, Get } from '@nestjs/common';

@Controller('cat')
export class CatController {
    @Get()
    findAll(): string {
        return 'This actions returns all cats';
    }
}
