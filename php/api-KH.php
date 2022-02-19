<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertKH":
        $makh=$_POST['makh'];
        $diachikh=$_POST['diachikh'];
        $tenkh=$_POST['tenkh'];
        $sdtkh=$_POST['sdtkh'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  kh where makh='" . $makh . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `kh`(`makh`, `tenkh`,`diachikh`, `sdtkh`) VALUES ('" . $makh . "','" . $tenkh . "','" . $diachikh . "','" . $sdtkh . "')";
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
        
    case "updateKH":
        $makh=$_POST['makh'];
        $diachikh=$_POST['diachikh'];
        $tenkh=$_POST['tenkh'];
        $sdtkh=$_POST['sdtkh'];
                       
        $sql = "update kh set TenKH='" . $tenkh . "',DiaChiKH='" . $diachikh . "',sdtKH='" . $sdtkh . "' where MaKH='" . $makh . "'";
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

case "deleteKH":
                $makh = $_POST['makh'];

                    $sql = "delete  from kh  where MaKH='" . $makh . "'";
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
  case "getALLKH":
    $mang = array();
    $sql = mysqli_query($conn, "select * from kh");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['makh'] = $rows['MaKH'];
      $usertemp['tenkh'] = $rows['TenKH'];
      $usertemp['diachikh'] = $rows['DiaChiKH'];
      $usertemp['sdtkh'] = $rows['sdtKH'];
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