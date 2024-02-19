import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { Cat } from '../interfaces/cat.interface';

@Injectable()
export class CatService {
    private readonly cats: Cat[] = [];

    create(cat: Cat){
        this.cats.push(cat);
        log('create cats - ', this.cats);
    }

    findAll(): Cat[] {
        log("find all cat - ", this.cats);
        return this.cats;
    }
}
