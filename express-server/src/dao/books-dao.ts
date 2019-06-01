import Books from '../db/models/books.model'
import BooksDto from './dto/books-dto';
import { BaseDao } from './base-dao';
import { Transaction } from 'sequelize';
export class BooksDao extends BaseDao {
    static async create(booksDto: BooksDto): Promise<any> {
        return new Books(booksDto).save();
    }

    static async findAll(tran): Promise<any> {
        return Books.findAll({
            transaction: tran
          })
    }   
}