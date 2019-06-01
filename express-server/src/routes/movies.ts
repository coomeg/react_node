import {Router} from 'express';
import { Request, Response } from 'express'
import { promises } from 'fs';
import Books from '../db/models/books.model'
import {sequelize} from '../db/sequelize';
import { BooksDao } from '../dao/books-dao';
import { Logger } from '../util/logger';

export const movies = Router();
movies.get('/create', async (req: Request, res: Response) => {
  try {
      const result = await sequelize.transaction(async tran => {
        // const bookObj = new Books({name: 'test1', price: 800});
        // await bookObj.save({transaction: tran});
      return await BooksDao.findAll(tran);
    });
  
    // await sequelize.query('show tables').then(result=>console.log(result)).catch(result=>console.log('DBエラー'));
    // const test = await Books.findAll();
    // const bookObj = new Books({name: 'test1', price: 800}, {transaction: tran});
    // bookObj.save();
    // const test2 = await  BooksDao.findAll(tran);
    Logger.info('テスト');
    const resultJson = {
      code: 200,
      message: 'create user ok.',
      data: result
    }
    return res.send(resultJson);
  } catch (e) {
    console.log(`エラー${e}`);
    return res.status(502).send(e);
  }
});