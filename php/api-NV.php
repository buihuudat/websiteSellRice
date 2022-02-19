<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertNV":
        $maphieugiaohang=$_POST['maphieugiaohang'];
        $maphieuhen=$_POST['maphieuhen'];
        $tennv=$_POST['tennv'];
        $sdt=$_POST['sdt'];
        $luongphieucon=$_POST['luongphieucon'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  nv_gh where maphieugiaohang='" . $maphieugiaohang . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `nv_gh`(`maphieugiaohang`, `maphieuhen`,`tennv`, `sdt`, `luongphieucon`) VALUES ('" . $maphieugiaohang . "','" . $maphieuhen . "','" . $tennv . "','" . $monphuankem . "','" . $luongphieucon . "')";
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
        
    case "updateNV":
        $maphieugiaohang=$_POST['maphieugiaohang'];
        $maphieuhen=$_POST['maphieuhen'];
        $tennv=$_POST['tennv'];
        $sdt=$_POST['sdt'];
        $luongphieucon=$_POST['luongphieucon'];
                       
        $sql = "update nv_gh set maphieuhen='" . $maphieuhen . "',tennv='" . $tennv . "',sdt='" . $sdt . "',luongphieucon='" . $luongphieucon . "' where maphieugiaohang='" . $maphieugiaohang . "'";
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

case "deleteNV":
                $maphieugiaohang = $_POST['maphieugiaohang'];

                    $sql = "delete  from nv_gh  where MaPhieuGiaoHang='" . $maphieugiaohang . "'";
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
  case "getALLNV":
    $mang = array();
    $sql = mysqli_query($conn, "select * from nv_gh");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['maphieugiaohang'] = $rows['MaPhieuGiaoHang'];
      $usertemp['maphieuhen'] = $rows['MaPhieuHen'];
      $usertemp['tennv'] = $rows['TenNV'];
      $usertemp['sdt'] = $rows['sdt'];
      $usertemp['luongphieucon'] = $rows['luongphieucon'];
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