var flagNV=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemNV").on("click", function(){
        //mờ nút thêm
        $(".btnthemNV").prop("disabled",true);
        $(".btnluuNV").prop("disabled",false);
        $(".btnsuaNV").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewNV();
        flagNV=1; //đang nhấn nút thêm 
        $(".txtmaphieu").prop("disabled",false);
    });
    $(".btnsuaNV").on("click", function(){
        //mờ nút thêm
        $(".btnthemNV").prop("disabled",true);
        $(".btnluuNV").prop("disabled",false);
        $(".btnsuaNV").prop("disabled",true);
        flagNV=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaphieu").prop("disabled",true);
    });
    $(".btnlamlaiNV").on("click", function(){
        //mờ nút thêm    
        resetViewNV();   
        $(".btnthemNV").prop("disabled",false);
        $(".btnluuNV").prop("disabled",true);
        $(".btnsuaNV").prop("disabled",true);
        flagNV=0; 
    });
    $(".btnluuNV").on("click", function(){
        if(flagNV==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var maphieugiaohang=$(".txtmaphieu").val();
            var tennv=$(".txttenNV").val();
            var maphieuhen=$(".txtmaphieuHenNV").val();
            var sdt=$(".txtsdtNV").val();
            var luongphieucon=$(".txtluongphieuNV").val();
            if(maphieugiaohang==""){
                alert_info("mã phieu giao hang không được phép trống");
                $(".txtmaphieu").focus();
            }else if(tennv==""){
                alert_info("tên nhân viên không được phép trống");
                $(".txttenNV").focus();
            }else if(maphieuhen==""){
                alert_info("mã phiếu hẹn không được phép trống");
                $(".txtmaphieuHenNV").focus();
            }else if(sdt==""){
                alert_info("sdt không được phép trống");
                $(".txtsdtNV").focus();
            }else if(luongphieucon==""){
                alert_info("lượng phiếu còn không được phép trống");
                $(".txtluongphieuNV").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    maphieugiaohang:maphieugiaohang,
                    tennv:tennv,
                    maphieuhen:maphieuhen,
                    sdt:sdt,
                    luongphieucon:luongphieucon,
                    event:"insertNV",
                }
                //gọi hàm querry                
                queryData("php/api-NV.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagNV=0;   
                        resetViewNV();
                        
                        $(".btnthemNV").prop("disabled",false);
                        $(".btnluuNV").prop("disabled",true);
                        $(".btnsuaNV").prop("disabled",true);
                        showDataNhanVien();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagNV==2){
            console.log("update");
            var maphieugiaohang=$(".txtmaphieu").val();
            var tennv=$(".txttenNV").val();
            var maphieuhen=$(".txtmaphieuHenNV").val();
            var sdt=$(".txtsdtNV").val();
            var luongphieucon=$(".txtluongphieuNV").val();
            if(maphieugiaohang==""){
                alert_info("mã phiếu giao hàng không được phép trống");
                $(".txtmaphieu").focus();
            }else if(tennv==""){
                alert_info("tên nv không được phép trống");
                $(".txttenNV").focus();
            }else if(maphieuhen==""){
                alert_info("ma phiếu hẹn không được phép trống");
                $(".txtmaphieuHenNV").focus();
            }else if(sdt==""){
                alert_info("số dt không được phép trống");
                $(".txtsdtNV").focus();
            }else if(luongphieucon==""){
                alert_info("lượng phiếu còn không được phép trống");
                $(".txtluongphieuNV").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    maphieugiaohang:maphieugiaohang,
                    tennv:tennv,
                    maphieuhen:maphieuhen,
                    sdt:sdt,
                    luongphieucon:luongphieucon,
                    event:"updateNV",
                }
                //gọi hàm querry                
                queryData("php/api-NV.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){
                        showDataNhanVien();
                        alert_success("Insert Thành Công");                 
                        flagNV=0;   

                        $(".btnthemNV").prop("disabled",false);
                        $(".btnluuNV").prop("disabled",true);
                        $(".btnsuaNV").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaNV").click(function(){
        var maphieugiaohang=$(".txtmaphieu").val();
        var tennv=$(".txttenNV").val();
        var maphieuhen=$(".txtmaphieuHenNV").val();
        var sdt=$(".txtsdtNV").val();
        var luongphieucon=$(".txtluongphieuNV").val();
	 bootbox.confirm("Bạn có chắc xóa [ "+tennv+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteNV",
                maphieugiaohang:maphieugiaohang,
                
            };
       		
            queryData("php/api-NV.php", dataSend, function (data) {
              if(data.success==1){
				showDataNhanVien();
                resetViewNV();
			  }else if(data.success==2){
				  alert_info("NV này đã được sử dụng trong bảng khác");
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
    $(".addListNV").on('click','.click_view_NhanVien', function(){
        var MaPhieuGiaoHang=  $(this).parent().attr("data-maphieugiaohang");
        var TenNV=  $(this).parent().attr("data-tennv");
        var MaPhieuHen=  $(this).parent().attr("data-maphieuhen");
        var sdt=  $(this).parent().attr("data-sdt");
        var luongphieucon=  $(this).parent().attr("data-luongphieucon");
        $(".txtmaphieu").val(MaPhieuGiaoHang);
        $(".txtluongphieuNV").val(luongphieucon);
        $(".txtmaphieuHenNV").val(MaPhieuHen);
        $(".txttenNV").val(TenNV);
        $(".txtsdtNV").val(sdt);
        $(".btnthemNV").prop("disabled",false);
        $(".btnluuNV").prop("disabled",true);
        $(".btnsuaNV").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataNhanVien(){
    var dataSend={
        event:"getALLNV"
    }
    $('.addListNV').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    console.log("s");
    queryData("php/api-NV.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaPhieuGiaoHang='+d.maphieugiaohang+' data-MaPhieuHen="'+d.maphieuhen+'" data-TenNV="'+d.tennv+'" data-sdt="'+d.sdt+'" data-luongphieucon="'+d.luongphieucon+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.maphieugiaohang+'</td>'+
                            '<td>'+d.maphieuhen+'</td>'+
                            '<td>'+d.tennv+'</td>'+
                            '<td>'+d.sdt+'</td>'+     
                            '<td>'+d.luongphieucon+'</td>'+         
                            '<td class="click_view_NhanVien"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListNV").html(htmls);
    });
}
function resetViewNV(){
    $(".txtmaphieu").val("");
    $(".txttenNV").val("");
    $(".txtmaphieuHenNV").val("");
    $(".txtsdtNV").val("");
    $(".txtluongphieuNV").val("");
    $(".txtmaphieu").focus();
}
