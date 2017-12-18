<?php
function (){
  $encodeData = $GLOBALS['HTTP_RAW_POST_DATA'];
  $jsonArray = json_decode($encodeData, true);

  $cid = $jsonArray['cid'];
  $content = $jsonArray['content'];
  $time = $jsonArray['time'];

  file_put_contents('xc_middle_log_' . $cid . '_' . $time, $content . "\r\n", FILE_APPEND);
}
