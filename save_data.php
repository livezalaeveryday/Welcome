<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = $_POST['data'];

    // ระบุไฟล์ที่ต้องการบันทึกข้อมูล
    $file = 'data.txt';

    // บันทึกข้อมูลลงในไฟล์
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
        echo 'บันทึกข้อมูลเรียบร้อยแล้ว';
    } else {
        echo 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
    }
} else {
    echo 'ไม่ได้รับข้อมูล';
}
?>