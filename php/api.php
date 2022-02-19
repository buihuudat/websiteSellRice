<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "login":
        $mang=array();
            $username=$_POST['username'];
            $password=sha1($_POST['password']);
            $rs=mysqli_query($conn,"select * from users u where  username='".$username."' and `password`='".$password."'");
            if(mysqli_num_rows($rs)>0){
            while ($rows=mysqli_fetch_array($rs)){
                
                
                $usertemp['username']=$rows['username'];
                $usertemp['password']=$rows['password'];
                
                $usertemp['fullname']=$rows['fullname'];
                
                $usertemp['avartar']=$rows['avartar'];
                
                $usertemp['permission']=$rows['permission'];
                
               array_push($mang,$usertemp);
            }
        
            $jsondata['success'] =1;
            
            $jsondata['items'] =$mang;
            
            echo json_encode($jsondata);
            }
            else{
            $jsondata['success'] =0;
            
            $jsondata['items'] =$mang;
            echo json_encode($jsondata);
            }
    
            mysqli_close($conn);
            break;
    case "updatepass":
            $username=$_POST['username'];
            $pass=sha1($_POST['pass']);
            $sql="update `users` set password='$pass' where username='".$username."'";
                 
                if (mysqli_query($conn,$sql)) {
                    if(mysqli_affected_rows($conn)>0){
                        $res[$event] = 1;
                    }
                    else
                    {
                        $res[$event] = 0;
                    }
                } else {
                    $res[$event] = 0;
                }
                echo json_encode($res);
                mysqli_close($conn);
            break;            
    case "insertCH":
        $macuahang=$_POST['macuahang'];
        $tencuahang=$_POST['tencuahang'];
        $diachicuahang=$_POST['diachicuahang'];
        $sdt=$_POST['sdt'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  cuahang where macuahang='" . $macuahang . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `cuahang`(`macuahang`, `tencuahang`,`diachicuahang`, `sdt`) VALUES ('" . $macuahang . "','" . $tencuahang . "','" . $diachicuahang . "','" . $sdt . "')";
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
        
    case "updateCH":
        $macuahang=$_POST['macuahang'];
        $tencuahang=$_POST['tencuahang'];
        $diachicuahang=$_POST['diachicuahang'];
        $sdt=$_POST['sdt'];
                       
        $sql = "update CuaHang set TenCuaHang='" . $tencuahang . "',DiaChiCuaHang='" . $diachicuahang . "',sdt='" . $sdt . "' where MaCuaHang='" . $macuahang . "'";
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

case "deleteCH":
                $macuahang = $_POST['macuahang'];

                    $sql = "delete  from cuahang  where MaCuaHang='" . $macuahang . "'";
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
  case "getALLTL":
    $mang = array();
    $sql = mysqli_query($conn, "select * from cuahang");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['macuahang'] = $rows['MaCuaHang'];
      $usertemp['tencuahang'] = $rows['TenCuaHang'];
      $usertemp['diachicuahang'] = $rows['DiaChiCuaHang'];
      $usertemp['sdt'] = $rows['sdt'];
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