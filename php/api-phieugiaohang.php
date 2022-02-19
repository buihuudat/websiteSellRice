<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertPGH":
        $maphieugiaohang=$_POST['maphieugiaohang'];
        $madathang=$_POST['madathang'];
        $ngaygiaohang=$_POST['ngaygiaohang'];
        $tg=$_POST['tg'];
        $diachikh=$_POST['diachikh'];
        $sophieu=$_POST['sophieu'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  phieugiaohang where maphieugiaohang='" . $maphieugiaohang . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `phieugiaohang`(`maphieugiaohang`, `madathang`,`ngaygiaohang`, `tg`, `diachikh`, `sophieu`) VALUES ('" . $maphieugiaohang . "','" . $madathang . "','" . $ngaygiaohang . "','" . $tg . "','" . $diachikh . "','" . $sophieu . "')";
            if (mysqli_query($conn, $sql)) {      
                if (mysqli_affected_rows($conn) > 0) {
                  $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                  $res["success"] = 0; //Không thành công
                }
              } else {
                $res["success"] = $sql;  //Không thành công
            }      
        }
            echo json_encode($res);
            mysqli_close($conn);
            break;    
        
    case "updatePGH":
        $maphieugiaohang=$_POST['maphieugiaohang'];
        $madathang=$_POST['madathang'];
        $ngaygiaohang=$_POST['ngaygiaohang'];
        $tg=$_POST['tg'];
        $diachikh=$_POST['diachikh'];
        $sophieu=$_POST['sophieu'];
                       
        $sql = "update phieugiaohang set madathang='" . $madathang . "',ngaygiaohang='" . $ngaygiaohang . "',tg='" . $tg . "',diachikh='" . $diachikh . "',sophieu='" . $sophieu . "' where maphieugiaohang='" . $maphieugiaohang . "'";
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

case "deletePGH":
                $maphieugiaohang = $_POST['maphieugiaohang'];

                    $sql = "delete  from phieugiaohang  where MaPhieuGiaoHang='" . $maphieugiaohang . "'";
                    if (mysqli_query($conn, $sql)) {
                        if (mysqli_affected_rows($conn) > 0) {
                            $res["success"] = 1; //xóa dữ liệu thành công
                        } else {
                            $res["success"] = 0; //xóa thành công
                        }
                    } else {
                        $res["success"] = 0;  //xóa thành công
                    }
                
                echo json_encode($res);
                mysqli_close($conn);
                break;


echo json_encode($res);
mysqli_close($conn);
break;
    //Get tất cả các Combo
  case "getALLPGH":
    $mang = array();
    $sql = mysqli_query($conn, "select * from phieugiaohang");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['maphieugiaohang'] = $rows['MaPhieuGiaoHang'];
      $usertemp['madathang'] = $rows['MaDatHang'];
      $usertemp['ngaygiaohang'] = $rows['NgayGiaoHang'];
      $usertemp['tg'] = $rows['TG'];
      $usertemp['diachikh'] = $rows['DiaChiKH'];
      $usertemp['sophieu'] = $rows['SoPhieu'];
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