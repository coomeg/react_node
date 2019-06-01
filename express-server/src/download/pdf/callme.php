<?php
error_reporting(-1);
$stdin = file_get_contents('php://stdin');
$data = json_decode($stdin, true);

// var_dump($data);

if ( is_array($data) === false )
{
    echo json_encode(array(
        'status'  => 'error',
        'message' => 'フォーマットに誤りがあります。JSONの配列で送ってこいｺﾞﾙｧ',
    ));
    exit(1);
}
else
{
    echo json_encode(array(
        'status'  => 'success',
        'message' => 'OKです',
    ));
    exit(0);
}