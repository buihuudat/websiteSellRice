<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertMA":
        $mamonan=$_POST['mamonan'];
        $maloaimonan=$_POST['maloaimonan'];
        $tenmonan=$_POST['tenmonan'];
        $thongtinmonan=$_POST['thongtinmonan'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  monan where mamonan='" . $mamonan . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `monan`(`mamonan`, `maloaimonan`,`tenmonan`, `thongtinmonan`) VALUES ('" . $mamonan . "','" . $maloaimonan . "','" . $tenmonan . "','" . $thongtinmonan . "')";
            if (mysqli_query($conn, $sql)) {      
                if (mysqli_affected_rows($conn) > 0) {
                  $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                  $res["success"] = 0; //Không thành công
                }
              } else {
                $res["success"] = 0;  //Không thành công
            }      
        }
            echo json_encode($res);
            mysqli_close($conn);
            break;    
        
    case "updateMA":
        $mamonan=$_POST['mamonan'];
        $maloaimonan=$_POST['maloaimonan'];
        $tenmonan=$_POST['tenmonan'];
        $thongtinmonan=$_POST['thongtinmonan'];
                       
        $sql = "update MonAn set MaLoaiMonAn='" . $maloaimonan . "',TenMonAn='" . $tenmonan . "',ThongTinMonAn='" . $thongtinmonan . "' WHERE MaMonAn='" . $mamonan . "'";
            if (mysqli_query($conn, $sql)) {      
                if (mysqli_affected_rows($conn) > 0) {
                    $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                    $res["success"] = 0; //Không thành công
                }
                } else {
                $res["success"] = 0;  //Không thành công
            }      
           
            echo json_encode($res);
            mysqli_close($conn);
            break; 

case "deleteMA":
                $mamonan = $_POST['mamonan'];

                    $sql = "delete  from monan  where MaMonAn='" . $mamonan . "'";
                    if (mysqli_query($conn, $sql)) {
                        if (mysqli_affected_rows($conn) > 0) {
                            $res["success"] = 1; //update dữ liệu thành công
                        } else {
                            $res["success"] = 0; //Không thành công
                        }
                    } else {
                        $res["success"] = 0;  //Không thành công
                    }
                
                echo json_encode($res);
                mysqli_close($conn);
                break;


echo json_encode($res);
mysqli_close($conn);
break;
    //Get tất cả các monan
  case "getALLMA":
    $mang = array();
    $sql = mysqli_query($conn, "select * from monan");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['mamonan'] = $rows['MaMonAn'];
      $usertemp['maloaimonan'] = $rows['MaLoaiMonAn'];
      $usertemp['tenmonan'] = $rows['TenMonAn'];
      $usertemp['thongtinmonan'] = $rows['ThongTinMonAn'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; 
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;    

    default:
    # code...
    break;       
}