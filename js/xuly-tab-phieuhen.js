var flagPH=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemPH").on("click", function(){
        //mờ nút thêm
        $(".btnthemPH").prop("disabled",true);
        $(".btnluuPH").prop("disabled",false);
        $(".btnsuaPH").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewPH();
        flagPH=1; //đang nhấn nút thêm 
        $(".txtmaPH").prop("disabled",false);
    });
    $(".btnsuaPH").on("click", function(){
        //mờ nút thêm
        $(".btnthemPH").prop("disabled",true);
        $(".btnluuPH").prop("disabled",false);
        $(".btnsuaPH").prop("disabled",true);
        flagPH=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaPH").prop("disabled",true);
    });
    $(".btnlamlaiPH").on("click", function(){
        //mờ nút thêm    
        resetViewPH();   
        $(".btnthemPH").prop("disabled",false);
        $(".btnluuPH").prop("disabled",true);
        $(".btnsuaPH").prop("disabled",true);
        flagPH=0; 
    });
    $(".btnluuPH").on("click", function(){
        if(flagPH==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var maphieuhen=$(".txtmaPH").val();
            var ngaylapphieu=$(".txtNLPH").val();
            var ngaygiaocom=$(".txtNGCPH").val();
            var makh=$(".txtmaKHPH").val();
            if(maphieuhen==""){
                alert_info("mã phiếu hẹn không được phép trống");
                $(".txtmaPH").focus();
            }else if(ngaylapphieu==""){
                alert_info("ngày lập phiếu không được phép trống");
                $(".txtNLPH").focus();
            }else if(ngaygiaocom==""){
                alert_info("ngày giao cơm không được phép trống");
                $(".txtNGCPH").focus();
            }else if(makh==""){
                alert_info("mã KH không được phép trống");
                $(".txtmaKHPH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    maphieuhen:maphieuhen,
                    ngaylapphieu:ngaylapphieu,
                    ngaygiaocom:ngaygiaocom,
                    makh:makh,
                    event:"insertPH",
                }
                //gọi hàm querry                
                queryData("php/api-PH.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã CH");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   
                        resetViewPH();
                        
                        $(".btnthemPH").prop("disabled",false);
                        $(".btnluuPH").prop("disabled",true);
                        $(".btnsuaPH").prop("disabled",true);
                        showDataCuaHang();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagPH==2){
            console.log("update");
            var maphieuhen=$(".txtmaPH").val();
            var ngaylapphieu=$(".txtNLPH").val();
            var ngaygiaocom=$(".txtNGCPH").val();
            var makh=$(".txtmaKHPH").val();
            if(maphieuhen==""){
                alert_info("mã phiếu hẹn không được phép trống");
                $(".txtmaPH").focus();
            }else if(ngaylapphieu==""){
                alert_info("ngày lập phiếu không được phép trống");
                $(".txtNLPH").focus();
            }else if(ngaygiaocom==""){
                alert_info("ngày giao cơm không được phép trống");
                $(".txtNGCPH").focus();
            }else if(makh==""){
                alert_info("mã KH không được phép trống");
                $(".txtmaKHPH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    macuahang:macuahang,
                    tencuahang:tencuahang,
                    diachicuahang:diachicuahang,
                    sdt:sdt,
                    event:"updatePH",
                }
                //gọi hàm querry                
                queryData("php/api-PH.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){
                        showDataPhieuHen();
                        alert_success("Insert Thành Công");                 
                        flagPH=0;   

                        $(".btnthemPH").prop("disabled",false);
                        $(".btnluuPH").prop("disabled",true);
                        $(".btnsuaPH").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaPH").click(function(){
        var maphieuhen=$(".txtmaPH").val();
        var ngaylapphieu=$(".txtNLPH").val();
        var ngaygiaocom=$(".txtNGCPH").val();
        var makh=$(".txtmaKHPH").val();
	 bootbox.confirm("Bạn có chắc xóa Cửa Hàng[ "+maphieuhen+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deletePH",
                maphieuhen:maphieuhen,               
            };
       		
            queryData("php/api-PH.php", dataSend, function (data) {
              if(data.success==1){
				showDataPhieuHen();
                resetViewPH();
			  }else if(data.success==2){
				  alert_info("Phiếu hẹn này đã được sử dụng trong bảng khác");
			  }else{
				  alert_error("Xóa lỗi");
			  }
               
				
            });
			
			
        }else
        {
            // alert_info("Lỗi");
        }
     })
    })
    ////Bắt sự kiện click trên mỗi dòng
    $(".addListPhieuHen").on('click','.click_view_PH', function(){
        var MaPhieuHen=  $(this).parent().attr("data-maphieuhen");
        var NgayLapPhieu=  $(this).parent().attr("data-ngaylapphieu");
        var NgayGiaoCom=  $(this).parent().attr("data-ngaygiaocom");
        var MaKH=  $(this).parent().attr("data-makh");
        $(".txtmaPH").val(MaPhieuHen);
        $(".txtNLPH").val(NgayLapPhieu);
        $(".txtNGCPH").val(NgayGiaoCom);
        $(".txtmaKHPH").val(MaKH);
        $(".btnthemPH").prop("disabled",false);
        $(".btnluuPH").prop("disabled",true);
        $(".btnsuaPH").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataPhieuHen(){
    var dataSend={
        event:"getALLPH"
    }
    $('.addListPhieuHen').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    console.log("s");
    queryData("php/api-PH.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaPhieuHen='+d.maphieuhen+' data-NgayLapPhieu="'+d.ngaylapphieu+'" data-NgayGiaoCom="'+d.ngaygiaocom+'" data-MaKH="'+d.makh+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.maphieuhen+'</td>'+
                            '<td>'+d.ngaylapphieu+'</td>'+
                            '<td>'+d.ngaygiaocom+'</td>'+
                            '<td>'+d.makh+'</td>'+            
                            '<td class="click_view_PH"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListPhieuHen").html(htmls);
    });
}
function resetViewPH(){
    $(".txtmaPH").val("");
    $(".txtNLPH").val("");
    $(".txtNGCPH").val("");
    $(".txtmaKHPH").val("");
    $(".txtmaPH").focus();
}
