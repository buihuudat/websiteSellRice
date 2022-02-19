<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertCB":
        $macombo=$_POST['macombo'];
        $macuahang=$_POST['macuahang'];
        $giakhuyenmai=$_POST['giakhuyenmai'];
        $monphuankem=$_POST['monphuankem'];
        $soluong=$_POST['soluong'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  combo where macombo='" . $macombo . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `combo`(`macombo`, `macuahang`,`giakhuyenmai`, `monphuankem`, `soluong`) VALUES ('" . $macombo . "','" . $macuahang . "','" . $giakhuyenmai . "','" . $monphuankem . "','" . $soluong . "')";
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
        
    case "updateCB":
        $macombo=$_POST['macombo'];
        $macuahang=$_POST['macuahang'];
        $giakhuyenmai=$_POST['giakhuyenmai'];
        $monphuankem=$_POST['monphuankem'];
        $soluong=$_POST['soluong'];
                       
        $sql = "update ComBo set soluong='" . $soluong . "',macuahang='" . $macuahang . "',giakhuyenmai='" . $giakhuyenmai . "',monphuankem='" . $monphuankem . "' where macombo='" . $macombo . "'";
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

case "deleteCB":
                $macombo = $_POST['macombo'];

                    $sql = "delete  from combo  where MaComBo='" . $macombo . "'";
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
  case "getALLCB":
    $mang = array();
    $sql = mysqli_query($conn, "select * from combo");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['macombo'] = $rows['MaComBo'];
      $usertemp['macuahang'] = $rows['MaCuaHang'];
      $usertemp['giakhuyenmai'] = $rows['GiaKhuyenMai'];
      $usertemp['monphuankem'] = $rows['MonPhuAnKem'];
      $usertemp['soluong'] = $rows['SoLuong'];
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