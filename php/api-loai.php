<?php
require_once("server.php");
$event=$_POST['event'];

switch ($event) {
    case "insertLM":
        $maloaimonan=$_POST['maloaimonan'];
        $tenloai=$_POST['tenloai'];
        $macuahang=$_POST['macuahang'];

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  loaimonan where maloaimonan='" . $maloaimonan . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
          } else {
            $sql = "INSERT INTO `loaimonan`(`maloaimonan`, `tenloai`,`macuahang`) VALUES ('" . $maloaimonan . "','" . $tenloai . "','" . $macuahang . "')";
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
        
    case "updateLM":
        $maloaimonan=$_POST['maloaimonan'];
        $tenloai=$_POST['tenloai'];
        $macuahang=$_POST['macuahang'];
                       
        $sql = "update loaimonan set MaLoaiMonAn='" . $maloaimonan . "',MaCuaHang='" . $macuahang . "',TenLoai='" . $tenloai . "' ";
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

case "deleteLM":
                $maloaimonan = $_POST['maloaimonan'];

                    $sql = "delete  from loaimonan  where MaLoaiMonAn='" . $maloaimonan . "'";
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
    //Get tất cả các lo
  case "getALLLM":
    $mang = array();
    $sql = mysqli_query($conn, "select * from loaimonan");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['maloaimonan'] = $rows['MaLoaiMonAn'];
      $usertemp['macuahang'] = $rows['MaCuaHang'];
      $usertemp['tenloai'] = $rows['TenLoai'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; 
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;    

    default:
    # code...
    break; 
    
    case "getLoaiMonan":
		$mang=array();
        $record=$_POST['record']; //số dòng sẽ lấy về từ server
        $page=$_POST['page']; //số số trang mà client
		$search=$_POST['search']; //Tìm kiếm dữ liệu
		$vt=$page*$record;  //page=1,record=2
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select l.MaLoaiMonAn,l.MaCuaHang, l.TenLoai, t.TenMonAn FROM loaimonan l, monan t WHERE l.MaLoaiMonAn = t.MaLoaiMonAn and (l.MaLoaiMonAn like '%".$search."%' or l.TenLoai like '%".$search."%') order by l.MaLoaiMonAn asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['maloaimonan'] = $rows['MaLoaiMonAn'];
            $usertemp['macuahang'] = $rows['MaCuaHang'];
            $usertemp['tenloai'] = $rows['TenLoai'];
            $usertemp['tenmonan']=$rows['TenMonAn'];
			//$usertemp['matl']=$rows['matl'];
			//$usertemp['tenxb']=$rows['tenxb'];
			//$usertemp['tentl']=$rows['tentl'];
			//$usertemp['urlsach']=$rows['urlsach'];
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from loaimonan l, monan t WHERE l.MaLoaiMonAn = t.MaLoaiMonAn and (l.MaLoaiMonAn like '%".$search."%' or l.TenLoai like '%".$search."%') order by l.MaLoaiMonAn asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
		default:
        # code...
        break;
}