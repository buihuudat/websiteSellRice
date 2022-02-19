var flagHD=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemHD").on("click", function(){
        //mờ nút thêm
        $(".btnthemHD").prop("disabled",true);
        $(".btnluuHD").prop("disabled",false);
        $(".btnsuaHD").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewHD();
        flagHD=1; //đang nhấn nút thêm 
        $(".txtmaHD").prop("disabled",false);
    });
    $(".btnsuaHD").on("click", function(){
        //mờ nút thêm
        $(".btnthemHD").prop("disabled",true);
        $(".btnluuHD").prop("disabled",false);
        $(".btnsuaHD").prop("disabled",true);
        flagHD=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaHD").prop("disabled",true);
    });
    $(".btnlamlaiHD").on("click", function(){
        //mờ nút thêm    
        resetViewHD();   
        $(".btnthemHD").prop("disabled",false);
        $(".btnluuHD").prop("disabled",true);
        $(".btnsuaHD").prop("disabled",true);
        flagHD=0; 
    });
    $(".btnluuHD").on("click", function(){
        if(flagHD==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var mahoadon=$(".txtmaHD").val();
            var tenmonan=$(".txttenmonHD").val();
            var soluong=$(".txtSLHD").val();
            var thanhtoan=$(".txtthanhtoan").val();
            var ngaylaphoadon=$(".txtngaythanhtoan").val();
            var makh=$(".txtmaKHHD").val();
            if(mahoadon==""){
                alert_info("mã hóa đơn không được phép trống");
                $(".txtmaHD").focus();
            }else if(tenmonan==""){
                alert_info("tên món ăn không được phép trống");
                $(".txttenmonHD").focus();
            }else if(soluong==""){
                alert_info("số lượng không được phép trống");
                $(".txtSLHD").focus();
            }else if(thanhtoan==""){
                alert_info("thanh toán không được phép trống");
                $(".txtthanhtoan").focus();
            }else if(ngaylaphoadon==""){
                alert_info("ngày lập hóa đơn không được phép trống");
                $(".txtngaythanhtoan").focus();
            }else if(makh==""){
                alert_info("mã KH không được phép trống");
                $(".txtmaKHHD").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    mahoadon:mahoadon,
                    tenmonan:tenmonan,
                    soluong:soluong,
                    thanhtoan:thanhtoan,
                    ngaylaphoadon:ngaylaphoadon,
                    makh:makh,
                    event:"insertHD",
                }
                //gọi hàm querry                
                queryData("php/api-HD.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagHD=0;   
                        resetViewHD();
                        
                        $(".btnthemHD").prop("disabled",false);
                        $(".btnluuHD").prop("disabled",true);
                        $(".btnsuaHD").prop("disabled",true);
                        showDataHD();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagHD==2){
            console.log("update");
            var mahoadon=$(".txtmaHD").val();
            var tenmonan=$(".txttenmonHD").val();
            var soluong=$(".txtSLHD").val();
            var thanhtoan=$(".txtthanhtoan").val();
            var ngaylaphoadon=$(".txtngaythanhtoan").val();
            var makh=$(".txtmaKHHD").val();
            if(mahoadon==""){
                alert_info("mã hóa đơn không được phép trống");
                $(".txtmaHD").focus();
            }else if(tenmonan==""){
                alert_info("tên món ăn không được phép trống");
                $(".txttenmonHD").focus();
            }else if(soluong==""){
                alert_info("số lượng không được phép trống");
                $(".txtSLHD").focus();
            }else if(thanhtoan==""){
                alert_info("thanh toán không được phép trống");
                $(".txtthanhtoan").focus();
            }else if(ngaylaphoadon==""){
                alert_info("ngày lập hóa đơn không được phép trống");
                $(".txtngaythanhtoan").focus();
            }else if(makh==""){
                alert_info("mã KH không được phép trống");
                $(".txtmaKHHD").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    mahoadon:mahoadon,
                    tenmonan:tenmonan,
                    soluong:soluong,
                    thanhtoan:thanhtoan,
                    ngaylaphoadon:ngaylaphoadon,
                    makh:makh,
                    event:"updateHD",
                }
                //gọi hàm querry                
                queryData("php/api-HD.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){
                        showDataHD();
                        alert_success("Insert Thành Công");                 
                        flagHD=0;   

                        $(".btnthemHD").prop("disabled",false);
                        $(".btnluuHD").prop("disabled",true);
                        $(".btnsuaHD").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaHD").click(function(){
        var mahoadon=$(".txtmaHD").val();       
	 bootbox.confirm("Bạn có chắc xóa [ "+mahoadon+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteHD",
                mahoadon:mahoadon,
                
            };
       		
            queryData("php/api-HD.php", dataSend, function (data) {
              if(data.success==1){
				showDataHD();
                resetViewHD();
			  }else if(data.success==2){
				  alert_info(" hóa đơn này đã được sử dụng trong bảng khác");
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
    $(".addListHoaDon").on('click','.click_view_HD', function(){
        var MaHoaDon=  $(this).parent().attr("data-mahoadon");
        var TenMonAn=  $(this).parent().attr("data-tenmonan");
        var SoLuong=  $(this).parent().attr("data-soluong");
        var ThanhToan=  $(this).parent().attr("data-thanhtoan");
        var NgayLapHoaDon=  $(this).parent().attr("data-ngaylapthanhtoan");
        var MaKH=  $(this).parent().attr("data-makh");
        $(".txtmaHD").val(MaHoaDon);
        $(".txtngaythanhtoan").val(NgayLapHoaDon);
        $(".txtmaKHHD").val(MaKH);
        $(".txttenmonHD").val(TenMonAn);
        $(".txtSLHD").val(SoLuong);
        $(".txtthanhtoan").val(ThanhToan);
        $(".btnthemHD").prop("disabled",false);
        $(".btnluuHD").prop("disabled",true);
        $(".btnsuaHD").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataHD(){
    var dataSend={
        event:"getALLHD"
    }
    $('.addListHoaDon').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    console.log("s");
    queryData("php/api-HD.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaHoaDon='+d.mahoadon+' data-TenMonAn="'+d.tenmonan+'" data-SoLuong="'+d.soluong+'" data-ThanhToan="'+d.thanhtoan+'" data-NgayLapHoaDon="'+d.ngaylaphoadon+'" data-MaKH="'+d.makh+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.mahoadon+'</td>'+
                            '<td>'+d.tenmonan+'</td>'+
                            '<td>'+d.soluong+'</td>'+
                            '<td>'+d.thanhtoan+'</td>'+     
                            '<td>'+d.ngaylaphoadon+'</td>'+   
                            '<td>'+d.makh+'</td>'+       
                            '<td class="click_view_HD"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListHoaDon").html(htmls);
    });
}
function resetViewHD(){
    $(".txtmaHD").val("");
    $(".txttenmonHD").val("");
    $(".txtSLHD").val("");
    $(".txtthanhtoan").val("");
    $(".txtngaythanhtoan").val("");
    $(".txtmaKHHD").val("");
    $(".txtmaHD").focus();
}
