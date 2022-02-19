<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertPH":
        $maphieuhen=$_POST['maphieuhen'];
        $ngaylapphieu=$_POST['ngaylapphieu'];
        $ngaygiaocom=$_POST['ngaygiaocom'];
        $makh=$_POST['makh'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  phieuhen where maphieuhen='" . $maphieuhen . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `phieuhen`(`maphieuhen`, `ngaylapphieu`,`ngaygiaocom`, `makh`) VALUES ('" . $maphieuhen . "','" . $ngaylapphieu . "','" . $ngaygiaocom . "','" . $makh . "')";
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
        
    case "updatePH":
        $maphieuhen=$_POST['maphieuhen'];
        $ngaylapphieu=$_POST['ngaylapphieu'];
        $ngaygiaocom=$_POST['ngaygiaocom'];
        $makh=$_POST['makh'];
                       
        $sql = "update phieuhen set MaKH='" . $makh . "',NgaylapPhieu='" . $ngaylapphieu . "',NgayGiaoCom='" . $ngaygiaocom . "' where MaPhieuHen='" . $maphieuhen . "'";
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

case "deletePH":
                $maphieuhen = $_POST['maphieuhen'];

                    $sql = "delete  from phieuhen  where MaPhieuHen='" . $maphieuhen . "'";
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
    //Get tất cả các PH
  case "getALLPH":
    $mang = array();
    $sql = mysqli_query($conn, "select * from phieuhen");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['maphieuhen'] = $rows['MaPhieuHen'];
      $usertemp['ngaylapphieu'] = $rows['NgaylapPhieu'];
      $usertemp['ngaygiaocom'] = $rows['NgayGiaoCom'];
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