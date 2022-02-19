var flagCH=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemCH").on("click", function(){
        //mờ nút thêm
        $(".btnthemCH").prop("disabled",true);
        $(".btnluuCH").prop("disabled",false);
        $(".btnsuaCH").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewCH();
        flagCH=1; //đang nhấn nút thêm 
        $(".txtmaCH").prop("disabled",false);
    });
    $(".btnsuaCH").on("click", function(){
        //mờ nút thêm
        $(".btnthemCH").prop("disabled",true);
        $(".btnluuCH").prop("disabled",false);
        $(".btnsuaCH").prop("disabled",true);
        flagCH=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaCH").prop("disabled",true);
    });
    $(".btnlamlaiCH").on("click", function(){
        //mờ nút thêm    
        resetViewCH();   
        $(".btnthemCH").prop("disabled",false);
        $(".btnluuCH").prop("disabled",true);
        $(".btnsuaCH").prop("disabled",true);
        flagCH=0; 
    });
    $(".btnluuCH").on("click", function(){
        if(flagCH==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var macuahang=$(".txtmaCH").val();
            var tencuahang=$(".txttenCH").val();
            var diachicuahang=$(".txtdiachiCH").val();
            var sdt=$(".txtsdtCH").val();
            if(macuahang==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmaCH").focus();
            }else if(tencuahang==""){
                alert_info("Tên cửa hàng không được phép trống");
                $(".txttenCH").focus();
            }else if(diachicuahang==""){
                alert_info("địa chỉ cửa hàng không được phép trống");
                $(".txtdiachiCH").focus();
            }else if(sdt==""){
                alert_info("số điện thoại cửa hàng không được phép trống");
                $(".txtsdtCH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    macuahang:macuahang,
                    tencuahang:tencuahang,
                    diachicuahang:diachicuahang,
                    sdt:sdt,
                    event:"insertCH",
                }
                //gọi hàm querry                
                queryData("php/api.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã CH");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   
                        resetViewCH();
                        
                        $(".btnthemCH").prop("disabled",false);
                        $(".btnluuCH").prop("disabled",true);
                        $(".btnsuaCH").prop("disabled",true);
                        showDataCuaHang();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagCH==2){
            console.log("update");
            var macuahang=$(".txtmaCH").val();
            var tencuahang=$(".txttenCH").val();
            var diachicuahang=$(".txtdiachiCH").val();
            var sdt=$(".txtsdtCH").val();
            if(macuahang==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmaCH").focus();
            }else if(tencuahang==""){
                alert_info("Tên cửa hàng không được phép trống");
                $(".txttenCH").focus();
            }else if(diachicuahang==""){
                alert_info("địa chỉ cửa hàng không được phép trống");
                $(".txtdiachiCH").focus();
            }else if(sdt==""){
                alert_info("số điện thoại cửa hàng không được phép trống");
                $(".txtsdtCH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    macuahang:macuahang,
                    tencuahang:tencuahang,
                    diachicuahang:diachicuahang,
                    sdt:sdt,
                    event:"updateCH",
                }
                //gọi hàm querry                
                queryData("php/api.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã CH");  
                                        
                    }else if(res.success==1){
                        showDataCuaHang();
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   

                        $(".btnthemCH").prop("disabled",false);
                        $(".btnluuCH").prop("disabled",true);
                        $(".btnsuaCH").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaCH").click(function(){
        var macuahang=$(".txtmaCH").val();
        var tencuahang=$(".txttenCH").val();
        var diachicuahang=$(".txtdiachiCH").val();
        var sdt=$(".txtsdtCH").val();
	 bootbox.confirm("Bạn có chắc xóa Cửa Hàng[ "+tencuahang+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteCH",
                macuahang:macuahang,               
            };
       		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
				showDataCuaHang();
                resetViewCH();
			  }else if(data.success==2){
				  alert_info("Cửa Hàng này đã được sử dụng trong bảng khác");
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
    $(".addListCuaHang").on('click','.click_view_CuaHang', function(){
        var MaCuaHang=  $(this).parent().attr("data-macuahang");
        var TenCuaHang=  $(this).parent().attr("data-tencuahang");
        var DiaChiCuaHang=  $(this).parent().attr("data-diachicuahang");
        var sdt=  $(this).parent().attr("data-sdt");
        $(".txtmaCH").val(MaCuaHang);
        $(".txttenCH").val(TenCuaHang);
        $(".txtdiachiCH").val(DiaChiCuaHang);
        $(".txtsdtCH").val(sdt);
        $(".btnthemCH").prop("disabled",false);
        $(".btnluuCH").prop("disabled",true);
        $(".btnsuaCH").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataCuaHang(){
    var dataSend={
        event:"getALLTL"
    }
    $('.addListCuaHang').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    queryData("php/api.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaCuaHang='+d.macuahang+' data-TenCuaHang="'+d.tencuahang+'" data-DiaChiCuaHang="'+d.diachicuahang+'" data-sdt="'+d.sdt+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.macuahang+'</td>'+
                            '<td>'+d.tencuahang+'</td>'+
                            '<td>'+d.diachicuahang+'</td>'+
                            '<td>'+d.sdt+'</td>'+            
                            '<td class="click_view_CuaHang"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListCuaHang").html(htmls);
    });
}
function resetViewCH(){
    $(".txtmaCH").val("");
    $(".txttenCH").val("");
    $(".txtdiachiCH").val("");
    $(".txtsdtCH").val("");
    $(".txtmaCH").focus();
}
