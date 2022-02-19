<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertHD":
        $mahoadon=$_POST['mahoadon'];
        $tenmonan=$_POST['tenmonan'];
        $soluong=$_POST['soluong'];
        $thanhtoan=$_POST['thanhtoan'];
        $ngaylaphoadon=$_POST['ngaylaphoadon'];
        $makh=$_POST['makh'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  hoadon where mahoadon='" . $mahoadon . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `hoadon`(`mahoadon`, `tenmonan`,`soluong`, `thanhtoan`, `ngaylaphoadon`, `makh`) VALUES ('" . $mahoadon . "','" . $tenmonan . "','" . $soluong . "','" . $thanhtoan . "','" . $ngaylaphoadon . "','" . $makh . "')";
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
        
    case "updateHD":
        $mahoadon=$_POST['mahoadon'];
        $tenmonan=$_POST['tenmonan'];
        $soluong=$_POST['soluong'];
        $thanhtoan=$_POST['thanhtoan'];
        $ngaylaphoadon=$_POST['ngaylaphoadon'];
        $makh=$_POST['makh'];
                       
        $sql = "update hoadon set tenmonan='" . $tenmonan . "',soluong='" . $soluong . "',thanhtoan='" . $thanhtoan . "',ngaylaphoadon='" . $ngaylaphoadon . "',makh='" . $makh . "' where mahoadon='" . $mahoadon . "'";
            if (mysqli_query($conn, $sql)) {      
                if (mysqli_affected_rows($conn) > 0) {
                    $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                    $res["success"] = $sql; //Không thành công
                }
                } else {
                $res["success"] = 0;  //Không thành công
            }      
           
            echo json_encode($res);
            mysqli_close($conn);
            break; 

case "deleteHD":
                $mahoadon = $_POST['mahoadon'];

                    $sql = "delete  from hoadon  where MaHoaDon='" . $mahoadon . "'";
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
  case "getALLHD":
    $mang = array();
    $sql = mysqli_query($conn, "select * from hoadon");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['mahoadon'] = $rows['MaHoaDon'];
      $usertemp['tenmonan'] = $rows['TenMonAn'];
      $usertemp['soluong'] = $rows['SoLuong'];
      $usertemp['thanhtoan'] = $rows['ThanhToan'];
      $usertemp['ngaylaphoadon'] = $rows['NgayLapHoaDon'];
      $usertemp['makh'] = $rows['MaKH'];
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