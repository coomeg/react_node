import {NextFunction, Request, Response, } from 'express';
import * as express from 'express';
// import {User} from '../db/models/user.model';

const router = express.Router();
// const models = require("../db/models");

/* GET api listing. */
router.get('/api', (req: Request, res: Response) => {
    res.send('api works');
});

// router.get('/api/v1/list', (req, res) => {
//     console.log("クエリ発行前");

//     User.findAll({
//         where: {
//             id: 1
//         }
//     })
//     .then(function(results) {
//         console.log("クエリ発行後");
//         res.json(results);
//     });
//     // クライアントに送るJSONデータ
//     // const todoList = [
//     //     { status: 200, response: '変更した', title: 'JavaScriptを勉強する', done: true , messages: "メッセージ"}
//     // ];

//     // JSONを送信する
//     // res.json(todoList);
//     console.log("終了");
// });

// router.get('/api/selectBooks', (req, res) => {
//     models.sequelize.query("SELECT * FROM `books`", 
//     { type: models.sequelize.QueryTypes.SELECT})
//     .then(books => {
//         console.log("クエリ発行後");
//         res.json(books);
//     })
// });

// /**
//  * booksテーブル1行挿入
//  */
// router.get('/api/insertBooks/:name/:price', (req, res) => {
//     models.book
//         .build({ name: req.params.name, price: req.params.price })
//         .save()
//         .then(anotherBook => {
//             // 成功の場合：自動コミット
//             res.json(anotherBook);
//         })
//         .catch(error => {
//             // 失敗の場合：自動ロールバック
//             res.json(error);
//         })
// });

// /**
//  * booksテーブル複数行挿入
//  */
// router.get('/api/bulkinsertBooks', (req, res) => {
//     models.book
//         .bulkCreate([
//             { name: "test3", price: 502 },
//             { name: "test4", price: 120 },
//             { name: "test5", price: 260 },
//             { name: "test6", price: 800 }
//         ])
//         .then(() => {
//             // 成功の場合：自動コミット
//             res.json("OK");
//         })
//         .catch(error => {
//             // 失敗の場合：自動ロールバック
//             res.json(error);
//         })
// });

// /**
//  * booksテーブル更新
//  */
// router.get('/api/updateBooks/:id/:name/:price', (req, res) => {
//     models.book
//         .update(
//             { name: req.params.name, price: req.params.price },
//             { where: { id: req.params.id }}
//         )
//         .then(anotherBook => {
//             // 成功の場合：自動コミット
//             res.json(anotherBook);
//         })
//         .catch(error => {
//             // 失敗の場合：自動ロールバック
//             res.json(error);
//         })
// });

// /**
//  * booksテーブル削除
//  */
// router.get('/api/deleteBooks/:id', (req, res) => {
//     models.book
//         .destroy({ 
//             where: {
//                  id: req.params.id 
//             }
//         } )
//         .then(affectedRows => {
//             // 成功の場合：自動コミット
//             res.json(affectedRows);
//         })
//         .catch(error => {
//             // 失敗の場合：自動ロールバック
//             res.json(error);
//         })
// });

// /**
//  * ユーザ名変更
//  * トランザクションを使用。
//  */
// router.get('/api/changeName/:id/:name', (req, res) => {
//     models.sequelize.transaction(tran => {
//         return models.user.findOne({where: {id: req.params.id }}, {transaction: tran})
//           .then(user => user.update({name: req.params.name}, {transaction: tran}))
//       }).then(() => {
//         res.json("OK");
//       }).catch(err => {
//         res.json(err);
//       });
// });

// /**
//  * ユーザ作成
//  * 渡されたIDがすでに存在した場合は、作成しない
//  */
// router.get('/api/findOrCreateUser/:id/:name', (req, res) => {
//     var output = {};
//     models.sequelize.transaction(tran => {
//         return models.user.findOrCreate({
//             where: {id: req.params.id},
//             defaults: {name: req.params.name, birth: new Date(), country_code: 150},
//             transaction: tran
//         })
//         .then(result => {
//             console.log(result);
//             return result;
//         });
//       }).then((re) => {
//           output = {
//             result: "OK",
//             data: re[0],
//             inserted: re[1],
//             stats: 200
//           }
//           res.json(output);
//       }).catch(err => {
//         console.log(err)
//         output = {
//             result: "NG",
//             stats: 500
//         }
//         res.json(output);
//       });
// });

// /**
//  * book情報更新または、登録
//  * upsert
//  */
// router.get('/api/upsertBook/:name/:price', (req, res) => {
//     models.sequelize.transaction(tran => {
//         return models.book.upsert(
//             {
//                 name: req.params.name,
//                 price: req.params.price
//             },
//             {
//                 fields: ['name', 'price'],
//                 transaction: tran
//             }
//         )
//         .then(result => {
//             // 成功の場合：自動コミット
//             return result;
//         });
//       }).then((result) => {
//         res.json(result);
//       }).catch(err => {
//         res.json(err);
//       });
// });

// /**
//  * book情報更新または、登録
//  * upsert
//  */
// router.get('/api/transactioinTest', (req, res) => {
//     models.sequelize.transaction(tran => {
//         return models.book
//         .build({ name: "transactiontest1", price: 200 })
//         .save({transaction: tran})
//         .then(anotherBook => {
//             return models.book
//             .build({ name: "transactiontest2", price: 201 })
//             .save({transaction: tran})
//             .then(anotherBook => {
//                 return models.book
//                 .build({ name: "transactiontest2", price: 202 })
//                 .save({transaction: tran})
//                 .then(anotherBook => {
//                     return anotherBook;
//                 })
//             })
//             .catch(err => {
//                 console.log(err);
//                 throw new Error();
//             });
//         })
//       }).then((result) => {
//         res.json(result);
//       }).catch(err => {
//         res.json(err);
//       });
// });

// module.exports.api = router;
export const api = router;