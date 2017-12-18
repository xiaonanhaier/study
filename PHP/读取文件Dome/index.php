<?php
header('Content-Type: text/html; charset=UTF-8');
$file = fopen('description.csv', 'r');
while ($result = fgetcsv($file)) {
	$data = eval('return '.iconv('gbk','utf-8',var_export($result,true)).';');
	print_r($data[1]);
	print_r("</br>");
}