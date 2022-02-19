var flagPGH=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemPGH").on("click", function(){
        //mờ nút thêm
        $(".btnthemPGH").prop("disabled",true);
        $(".btnluuPGH").prop("disabled",false);
        $(".btnsuaPGH").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewPGH();
        flagPGH=1; //đang nhấn nút thêm 
        $(".txtMPGH").prop("disabled",false);
    });
    $(".btnsuaPGH").on("click", function(){
        //mờ nút thêm
        $(".btnthemPGH").prop("disabled",true);
        $(".btnluuPGH").prop("disabled",false);
        $(".btnsuaPGH").prop("disabled",true);
        flagPGH=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtMPGH").prop("disabled",true);
    });
    $(".btnlamlaiPGH").on("click", function(){
        //mờ nút thêm    
        resetViewPGH();   
        $(".btnthemPGH").prop("disabled",false);
        $(".btnluuPGH").prop("disabled",true);
        $(".btnsuaPGH").prop("disabled",true);
        flagPGH=0; 
    });
    $(".btnluuPGH").on("click", function(){
        if(flagPGH==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var maphieugiaohang=$(".txtMPGH").val();
            var madathang=$(".txtMDH").val();
            var ngaygiaohang=$(".txtNgayDH").val();
            var tg=$(".txtTGG").val();
            var diachikh=$(".txtDCKH").val();
            var sophieu=$(".txtSPKH").val();
            if(maphieugiaohang==""){
                alert_info("mã phiếu giao hàng không được phép trống");
                $(".txtMPGH").focus();
            }else if(madathang==""){
                alert_info("mã đặt hàng không được phép trống");
                $(".txtMDH").focus();
            }else if(ngaygiaohang==""){
                alert_info("ngày giao hàng không được phép trống");
                $(".txtNgayDH").focus();
            }else if(tg==""){
                alert_info("TG không được phép trống");
                $(".txtTGG").focus();
            }else if(diachikh==""){
                alert_info("dia chi không được phép trống");
                $(".txtDCKH").focus();
            }else if(sophieu==""){
                alert_info("so phieu không được phép trống");
                $(".txtSPKH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    maphieugiaohang:maphieugiaohang,
                    madathang:madathang,
                    ngaygiaohang:ngaygiaohang,
                    tg:tg,
                    diachikh:diachikh,
                    sophieu:sophieu,
                    event:"insertPGH",
                }
                //gọi hàm querry                
                queryData("php/api-phieugiaohang.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagPGH=0;   
                        resetViewPGH();
                        
                        $(".btnthemPGH").prop("disabled",false);
                        $(".btnluuPGH").prop("disabled",true);
                        $(".btnsuaPGH").prop("disabled",true);
                        showDataPhieuGH();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagPGH==2){
            console.log("update");
            var maphieugiaohang=$(".txtMPGH").val();
            var madathang=$(".txtMDH").val();
            var ngaygiaohang=$(".txtNgayDH").val();
            var tg=$(".txtTGG").val();
            var diachikh=$(".txtDCKH").val();
            var sophieu=$(".txtSPKH").val();
            if(maphieugiaohang==""){
                alert_info("mã phiếu giao hàng không được phép trống");
                $(".txtMPGH").focus();
            }else if(madathang==""){
                alert_info("mã đặt hàng không được phép trống");
                $(".txtMDH").focus();
            }else if(ngaygiaohang==""){
                alert_info("ngày giao hàng không được phép trống");
                $(".txtNgayDH").focus();
            }else if(tg==""){
                alert_info("TG không được phép trống");
                $(".txtTGG").focus();
            }else if(diachikh==""){
                alert_info("dia chi không được phép trống");
                $(".txtDCKH").focus();
            }else if(sophieu==""){
                alert_info("so phieu không được phép trống");
                $(".txtSPKH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    maphieugiaohang:maphieugiaohang,
                    madathang:madathang,
                    ngaygiaohang:ngaygiaohang,
                    tg:tg,
                    diachikh:diachikh,
                    sophieu:sophieu,
                    event:"updatePGH",
                }
                //gọi hàm querry                
                queryData("php/api-phieugiaohang.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ComBO");  
                                        
                    }else if(res.success==1){
                        showDataPhieuGH();
                        alert_success("Insert Thành Công");                 
                        flagPGH=0;   

                        $(".btnthemPGH").prop("disabled",false);
                        $(".btnluuPGH").prop("disabled",true);
                        $(".btnsuaPGH").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaPGH").click(function(){
        var maphieugiaohang=$(".txtMPGH").val();
        var madathang=$(".txtMDH").val();
        var ngaygiaohang=$(".txtNgayDH").val();
        var tg=$(".txtTGG").val();
        var macuahang=$(".txtDCKH").val();
	 bootbox.confirm("Bạn có chắc xóa [ "+maphieugiaohang+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deletePGH",
                maphieugiaohang:maphieugiaohang,
                
            };
       		
            queryData("php/api-phieugiaohang.php", dataSend, function (data) {
              if(data.success==1){
				showDataPhieuGH();
                resetViewPGH();
			  }else if(data.success==2){
				  alert_info("Phieu giao Hàng này đã được sử dụng trong bảng khác");
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
    $(".addListPhieuGiaoHang").on('click','.click_view_PGH', function(){
        var MaPhieuGiaoHang=  $(this).parent().attr("data-maphieugiaohang");
        var MaDatHang=  $(this).parent().attr("data-madathang");
        var NgayGiaoHang=  $(this).parent().attr("data-ngaygiaohang");
        var TG=  $(this).parent().attr("data-tg");
        var DiaChiKH=  $(this).parent().attr("data-diachikh");
        var SoPhieu=  $(this).parent().attr("data-sophieu");
        $(".txtMPGH").val(MaPhieuGiaoHang);
        $(".txtDCKH").val(DiaChiKH);
        $(".txtNgayDH").val(NgayGiaoHang);
        $(".txtMDH").val(MaDatHang);
        $(".txtTGG").val(TG);
        $(".txtSPKH").val(SoPhieu);
        $(".btnthemPGH").prop("disabled",false);
        $(".btnluuPGH").prop("disabled",true);
        $(".btnsuaPGH").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataPhieuGH(){
    var dataSend={
        event:"getALLPGH"
    }
    $('.addListPhieuGiaoHang').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    console.log("s");
    queryData("php/api-phieugiaohang.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaPhieuGiaoHang='+d.maphieugiaohang+' data-MaDatHang="'+d.madathang+'" data-NgayGiaoHang="'+d.ngaygiaohang+'" data-TG="'+d.tg+'" data-DiaChiKH="'+d.diachikh+'"data-SoPhieu="'+d.sophieu+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.maphieugiaohang+'</td>'+
                            '<td>'+d.madathang+'</td>'+
                            '<td>'+d.ngaygiaohang+'</td>'+
                            '<td>'+d.tg+'</td>'+     
                            '<td>'+d.diachikh+'</td>'+     
                            '<td>'+d.sophieu+'</td>'+       
                            '<td class="click_view_PGH"><span class="badge bg-warning">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListPhieuGiaoHang").html(htmls);
    });
}
function resetViewPGH(){
    $(".txtMPGH").val("");
    $(".txtMDH").val("");
    $(".txtNgayDH").val("");
    $(".txtTGG").val("");
    $(".txtDCKH").val("");
    $(".txtSPKH").val();
    $(".txtMPGH").focus();
}
