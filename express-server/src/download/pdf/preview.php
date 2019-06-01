<?php

include(__DIR__ . "/TCPDF/tcpdf.php");

define("MY_PDF_PAGE_ORIENTATION"   , "P");  // P:Portrait, L:Landscape
define("MY_PDF_FONT_NAME"          , "kozgopromedium");  // kozminproregular
define("MY_PDF_FONT_SIZE"          , 10);
define("MY_PDF_UNIT"               , "mm");
define("MY_PDF_PAGE_FORMAT"        , "A4");
define("MY_PDF_IMAGE_SCALE_RATIO"  , 1); 
define("MY_PDF_MARGIN_HEADER"      , 0); 
define("MY_PDF_MARGIN_FOOTER"      , 0); 
define("MY_PDF_MARGIN_TOP"         , 10);
define("MY_PDF_MARGIN_LEFT"        , 15);
define("MY_PDF_MARGIN_RIGHT"       , 15);
define("MY_PDF_MARGIN_BOTTOM"      , 20);

class MYPDF extends TCPDF {
    // フッタのカスタマイズ(ページ番号を出力する)
    public function Footer() {
        $this->SetY(-15);  // Position at 15 mm from bottom
        $this->SetFont('helvetica', 'I', 8); 
        $this->Cell(0, 10, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }   
}

$pdf = new MYPDF(MY_PDF_PAGE_ORIENTATION, MY_PDF_UNIT, MY_PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetTitle('PDF出力テスト');
//$pdf->SetSubject('TCPDF Tutorial');
//$pdf->SetHeaderData(null, null, null, null);
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 006', PDF_HEADER_STRING);
//$pdf->setHeaderFont(Array(MY_PDF_FONT_NAME, '', MY_PDF_FONT_SIZE));
//$pdf->setFooterFont(Array(MY_PDF_FONT_NAME, '', MY_PDF_FONT_SIZE));
//$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetMargins(MY_PDF_MARGIN_LEFT, MY_PDF_MARGIN_TOP, MY_PDF_MARGIN_RIGHT);
//$pdf->SetHeaderMargin(MY_PDF_MARGIN_HEADER);
//$pdf->SetFooterMargin(MY_PDF_MARGIN_FOOTER);
$pdf->SetAutoPageBreak(TRUE, MY_PDF_MARGIN_BOTTOM);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(true);
$pdf->setImageScale(MY_PDF_IMAGE_SCALE_RATIO);
$pdf->SetFont(MY_PDF_FONT_NAME, "", 10);

// ページを追加
$pdf->AddPage();

// PDFに変換するHTML
$html =<<<_EO_HTML_
<style>
table {
    border-collapse: collapse;
}
table tr th {
    background-color: #efe;
    border: 1px solid #333;
    padding: 10px; /* 効かない */  
}
table tr td {
    border: 1px solid #333;
    padding: 10px; /* 効かない */  
}
.center {
    text-align: center;
}
</style>

<h1>TCPDFテスト</h1>
<table cellpadding="5">
<thead>
<tr>
    <th>列1</th><th>列2</th><th>列3</th>
</tr>
</thead>
<tbody>
<tr>
    <td>2018-01-01</td><td>テスト1</td><td class="center">100</td>
</tr>
<tr>
    <td>2018-01-02</td><td>テスト2</td><td class="center">200</td>
</tr>
</tbody>
</table>
_EO_HTML_;

$pdf->writeHTML($html, true, false, true, false, '');

// 2ページ目追加
//$pdf->lastPage();
//$pdf->AddPage();
//$pdf->writeHTML($html, true, false, true, false, '');

/*
 * Output の第2引数にI,D,FI,FD を指定すればHTTPレスポンスヘッダ(Content-TypeやContent-Disposition)を自動的に出力してくれる。
 * 自分でヘッダを調整したい場合は、S でデータだけ取得して自分でヘッダを吐く。
 * (ファイル名に日本語を含めたい場合など.)
 */
$data = null;
$fileName = "テスト.pdf";
//$pdf->Output($fileName, 'I');     // ブラウザに表示
//$pdf->Output($fileName, 'D');     // ダウンロードダイアログを表示
//$pdf->Output($fileName, 'F');     // サーバにファイルを保存
$data = $pdf->Output(null,'S');     // PDFドキュメントを文字列として返却
//$pdf->Output($fileName, 'FI');    // ファイルに保存して、ブラウザにも表示
//$pdf->Output($fileName, 'FD');    // ファイルに保存して、ダウンロードダイアログを表示
//$data = $pdf->Output(null, 'E');  // Base64エンコード済みのPDFドキュメントを返却(メールに添付するmultipartコンテンツ用なのでContent-Typeなどのヘッダーが付く)

if ($data != null) {
    // ブラウザにそのまま表示
    // header('Content-Type: application/pdf');
    // header('Content-Disposition: inline; filename="'.basename($fileName).'"');
    // ダウンロード
    //header('Content-Type: application/octet-stream', false);
    //header('Content-Disposition: attachment; filename="'.basename($fileName).'"');
    echo $data;
}

?>