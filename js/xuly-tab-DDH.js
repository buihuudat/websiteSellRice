var flagDDH=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemDDH").on("click", function(){
        //mờ nút thêm
        $(".btnthemDDH").prop("disabled",true);
        $(".btnluuDDH").prop("disabled",false);
        $(".btnsuaDDH").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewDDH();
        flagDDH=1; //đang nhấn nút thêm 
        $(".txtmadat").prop("disabled",false);
    });
    $(".btnsuaDDH").on("click", function(){
        //mờ nút thêm
        $(".btnthemDDH").prop("disabled",true);
        $(".btnluuDDH").prop("disabled",false);
        $(".btnsuaDDH").prop("disabled",true);
        flagDDH=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmadat").prop("disabled",true);
    });
    $(".btnlamlaiDDH").on("click", function(){
        //mờ nút thêm    
        resetViewDDH();   
        $(".btnthemDDH").prop("disabled",false);
        $(".btnluuDDH").prop("disabled",true);
        $(".btnsuaDDH").prop("disabled",true);
        flagDDH=0; 
    });
    $(".btnluuDDH").on("click", function(){
        if(flagDDH==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var madathang=$(".txtmadat").val();
            var macuahang=$(".txtmacuaa").val();
            var makh=$(".txtmaaKH").val();
            var ngaydathang=$(".txtngaydathang").val();
            if(madathang==""){
                alert_info("mã đặt hàng không được phép trống");
                $(".txtmadat").focus();
            }else if(macuahang==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmacuaa").focus();
            }else if(makh==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmaaKH").focus();
            }else if(ngaydathang==""){
                alert_info("ngày đặt hàng không được phép trống");
                $(".txtngaydathang").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    madathang:madathang,
                    ngaydathang:ngaydathang,
                    macuahang:macuahang,
                    makh:makh,
                    event:"insertDDH",
                }
                //gọi hàm querry                
                queryData("php/api-DDH.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagDDH=0;   
                        resetViewDDH();
                        
                        $(".btnthemDDH").prop("disabled",false);
                        $(".btnluuDDH").prop("disabled",true);
                        $(".btnsuaDDH").prop("disabled",true);
                        showDataDDH();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagDDH==2){
            console.log("update");
            var madathang=$(".txtmadat").val();
            var macuahang=$(".txtmacuaa").val();
            var makh=$(".txtmaaKH").val();
            var ngaydathang=$(".txtngaydathang").val();
            if(madathang==""){
                alert_info("mã đặt hàng không được phép trống");
                $(".txtmadat").focus();
            }else if(macuahang==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmacuaa").focus();
            }else if(makh==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmaaKH").focus();
            }else if(ngaydathang==""){
                alert_info("ngày đặt hàng không được phép trống");
                $(".txtngaydathang").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    madathang:madathang,
                    ngaydathang:ngaydathang,
                    macuahang:macuahang,
                    makh:makh,
                    event:"updateDDH",
                }
                //gọi hàm querry                
                queryData("php/api-DDH.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){
                        showDataDDH();
                        alert_success("Insert Thành Công");                 
                        flagDDH=0;   

                        $(".btnthemDDH").prop("disabled",false);
                        $(".btnluuDDH").prop("disabled",true);
                        $(".btnsuaDDH").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert 0 Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaDDH").click(function(){
        var madathang=$(".txtmadat").val();       
	 bootbox.confirm("Bạn có chắc xóa [ "+madathang+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteDDH",
             madathang:madathang,               
            };
       		
            queryData("php/api-DDH.php", dataSend, function (data) {
              if(data.success==1){
				showDataDDH();
                resetViewDDH();
			  }else if(data.success==2){
				  alert_info("đơn đặt hàng này đã được sử dụng trong bảng khác");
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
    $(".addListDDH").on('click','.click_view_DDH', function(){
        var MaDatHang=  $(this).parent().attr("data-madathang");
        var NgayDatHang=  $(this).parent().attr("data-ngaydathang");
        var MaCuaHang=  $(this).parent().attr("data-macuahang");
        var MaKH=  $(this).parent().attr("data-makh");
        $(".txtmadat").val(MaDatHang);
        $(".txtmacuaa").val(MaCuaHang);
        $(".txtmaaKH").val(MaKH);
        $(".txtngaydathang").val(NgayDatHang);
        $(".btnthemDDH").prop("disabled",false);
        $(".btnluuDDH").prop("disabled",true);
        $(".btnsuaDDH").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataDDH(){
    var dataSend={
        event:"getALLDDH"
    }
    $('.addListDDH').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    console.log("s");
    queryData("php/api-DDH.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaDatHang='+d.madathang+' data-MaCuaHang="'+d.macuahang+'" data-MaKH="'+d.makh+'" data-NgayDatHang="'+d.ngaydathang+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.madathang+'</td>'+
                            '<td>'+d.macuahang+'</td>'+
                            '<td>'+d.makh+'</td>'+
                            '<td>'+d.ngaydathang+'</td>'+            
                            '<td class="click_view_DDH"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListDDH").html(htmls);
    });
}
function resetViewDDH(){
    $(".txtmadat").val("");
    $(".txtmacuaa").val("");
    $(".txtmaaKH").val("");
    $(".txtngaydathang").val("");
    $(".txtmadat").focus();
}
