<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertDDH":
        $madathang=$_POST['madathang'];
        $ngaydathang=$_POST['ngaydathang'];
        $macuahang=$_POST['macuahang'];
        $makh=$_POST['makh'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  dondathang where madathang='" . $madathang . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `dondathang`(`madathang`, `ngaydathang`,`macuahang`, `makh`) VALUES ('" . $madathang . "','" . $ngaydathang . "','" . $macuahang . "','" . $makh . "')";
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
        
    case "updateDDH":
        $madathang=$_POST['madathang'];
        $ngaydathang=$_POST['ngaydathang'];
        $macuahang=$_POST['macuahang'];
        $makh=$_POST['makh'];
                       
        $sql = "update dondathang set MaCuaHang='" . $macuahang . "',NgayDatHang='" . $ngaydathang . "',MaKH='" . $makh . "' where MaDatHang='" . $madathang . "'";
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

case "deleteDDH":
                $madathang = $_POST['madathang'];

                    $sql = "delete  from dondathang  where MaDatHang='" . $madathang . "'";
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
    //Get tất cả các TheLoai
  case "getALLDDH":
    $mang = array();
    $sql = mysqli_query($conn, "select * from dondathang");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['madathang'] = $rows['MaDatHang'];
      $usertemp['ngaydathang'] = $rows['NgayDatHang'];
      $usertemp['macuahang'] = $rows['MaCuaHang'];
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