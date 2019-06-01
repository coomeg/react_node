import {Router} from 'express';
import { Request, Response } from 'express'
import { Logger } from 'util/logger';
import fs from 'fs';
export const pdftest = Router();
pdftest.get('/pdf/preview', async (req: Request, res: Response) => {
  try {
  
    var spawn = require('child_process').spawn;

    var php   = spawn('php', ['/projects/src/download/pdf/preview.php']); // $ php callme.php と同じ意味
    // var data = {
    //     'foo': 'something',
    //     'bar': 'something',
    // };
    
    // 標準入力としてPHPに渡す
    // php.stdin.write(JSON.stringify(data));
    php.stdin.end(); // PHPさん、標準入力終わったよ
    
    php.stdout.on('data', function (data) {
        // console.log('stdout: ', JSON.parse(data));
        console.log('stdout: ', data);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=quote.pdf'); // ブラウザで表示
        
        // Content-Disposition: attachment; filename="logo.png"
        // Content-Type: image/png
        // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf'); // ダウンロード

        res.status(200).send(data);
    });
    
    php.stderr.on('data', function (data) {
        console.log('stderr: ', data);
        this.result = data;
        res.status(200).send(data);
    });

    php.on('exit', function (code) {
        console.log('phpプロセスが終了しました: ステータスコード: ' + code);
    });

    console.log('正常');
  } catch (e) {
    console.log(`エラー${e}`);
    return res.status(502).send(e);
  }
});

pdftest.get('/pdf/download', async (req: Request, res: Response) => {
  try {
  
    var spawn = require('child_process').spawn;

    var php   = spawn('php', ['/projects/src/download/pdf/preview.php']); // $ php callme.php と同じ意味
    // var data = {
    //     'foo': 'something',
    //     'bar': 'something',
    // };
    // 標準入力としてPHPに渡す
    // php.stdin.write(JSON.stringify(data));
    php.stdin.end(); // PHPさん、標準入力終わったよ
    
    php.stdout.on('data', function (data) {
        // console.log('stdout: ', JSON.parse(data));
        console.log('stdout: ', data);

        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'inline; filename=quote.pdf'); // ブラウザで表示
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf'); // ダウンロード
        
        res.status(200).send(data);
    });
    
    php.stderr.on('data', function (data) {
        console.log('stderr: ', data);
        this.result = data;
        res.status(200).send(data);
    });

    php.on('exit', function (code) {
        console.log('phpプロセスが終了しました: ステータスコード: ' + code);
    });

    console.log('正常');
  } catch (e) {
    console.log(`エラー${e}`);
    return res.status(502).send(e);
  }
});