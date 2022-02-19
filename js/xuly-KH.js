var flagKH=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemKH").on("click", function(){
        //mờ nút thêm
        $(".btnthemKH").prop("disabled",true);
        $(".btnluuKH").prop("disabled",false);
        $(".btnsuaKH").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewKH();
        flagKH=1; //đang nhấn nút thêm 
        $(".txtmaKH").prop("disabled",false);
    });
    $(".btnsuaKH").on("click", function(){
        //mờ nút thêm
        $(".btnthemKH").prop("disabled",true);
        $(".btnluuKH").prop("disabled",false);
        $(".btnsuaKH").prop("disabled",true);
        flagKH=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaKH").prop("disabled",true);
    });
    $(".btnlamlaiKH").on("click", function(){
        //mờ nút thêm    
        resetViewKH();   
        $(".btnthemKH").prop("disabled",false);
        $(".btnluuKH").prop("disabled",true);
        $(".btnsuaKH").prop("disabled",true);
        flagKH=0; 
    });
    $(".btnluuKH").on("click", function(){
        if(flagKH==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var makh=$(".txtmaKH").val();
            var tenkh=$(".txttenKH").val();
            var diachikh=$(".txtDCCKH").val();
            var sdtkh=$(".txtsdtKH").val();
            if(makh==""){
                alert_info("mã khách hàng không được phép trống");
                $(".txtmaKH").focus();
            }else if(tenkh==""){
                alert_info("Tên KH không được phép trống");
                $(".txttenKH").focus();
            }else if(diachikh==""){
                alert_info("địa chỉ KH không được phép trống");
                $(".txtDCCKH").focus();
            }else if(sdtkh==""){
                alert_info("số điện thoại KH không được phép trống");
                $(".txtsdtKH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    makh:makh,
                    tenkh:tenkh,
                    diachikh:diachikh,
                    sdtkh:sdtkh,
                    event:"insertKH",
                }
                //gọi hàm querry                
                queryData("php/api-KH.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã CH");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagKH=0;   
                        resetViewKH();
                        
                        $(".btnthemKH").prop("disabled",false);
                        $(".btnluuKH").prop("disabled",true);
                        $(".btnsuaKH").prop("disabled",true);
                        showDataKhachHang();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagKH==2){
            console.log("update");
            var makh=$(".txtmaKH").val();
            var tenkh=$(".txttenKH").val();
            var diachikh=$(".txtDCCKH").val();
            var sdtkh=$(".txtsdtKH").val();
            if(makh==""){
                alert_info("mã khách hàng không được phép trống");
                $(".txtmaKH").focus();
            }else if(tenkh==""){
                alert_info("Tên KH không được phép trống");
                $(".txttenKH").focus();
            }else if(diachikh==""){
                alert_info("địa chỉ KH không được phép trống");
                $(".txtDCCKH").focus();
            }else if(sdtkh==""){
                alert_info("số điện thoại KH không được phép trống");
                $(".txtsdtKH").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    makh:makh,
                    tenkh:tenkh,
                    diachikh:diachikh,
                    sdtkh:sdtkh,
                    event:"updateKH",
                }
                $('.addListKH').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
                //gọi hàm querry                
                queryData("php/api-KH.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){
                        showDataKhachHang();
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   

                        $(".btnthemKH").prop("disabled",false);
                        $(".btnluuKH").prop("disabled",true);
                        $(".btnsuaKH").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaKH").click(function(){
        var makh=$(".txtmaKH").val();
        var tenkh=$(".txttenKH").val();
        var diachicuahang=$(".txtDCCKH").val();
        var sdt=$(".txtsdtKH").val();
	 bootbox.confirm("Bạn có chắc xóa Cửa Hàng[ "+tenkh+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteKH",
             makh:makh,               
            };
       		
            queryData("php/api-KH.php", dataSend, function (data) {
              if(data.success==1){
				showDataKhachHang();
                resetViewKH();
			  }else if(data.success==2){
				  alert_info("KH này đã được sử dụng trong bảng khác");
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
    $(".addListKH").on('click','.click_view_KH', function(){
        var MaKH=  $(this).parent().attr("data-makh");
        var TenKH=  $(this).parent().attr("data-tenkh");
        var DiaChiKH=  $(this).parent().attr("data-diachikh");
        var sdtKH=  $(this).parent().attr("data-sdtkh");
        $(".txtmaKH").val(MaKH);
        $(".txttenKH").val(TenKH);
        $(".txtDCCKH").val(DiaChiKH);
        $(".txtsdtKH").val(sdtKH);
        $(".btnthemKH").prop("disabled",false);
        $(".btnluuKH").prop("disabled",true);
        $(".btnsuaKH").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataKhachHang(){
    var dataSend={
        event:"getALLKH"
    }
    var htmls='';
    console.log("s");
    queryData("php/api-KH.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaKH='+d.makh+' data-TenKH="'+d.tenkh+'" data-DiaChiKH="'+d.diachikh+'" data-sdtKH="'+d.sdtkh+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.makh+'</td>'+
                            '<td>'+d.tenkh+'</td>'+
                            '<td>'+d.diachikh+'</td>'+
                            '<td>'+d.sdtkh+'</td>'+            
                            '<td class="click_view_KH"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListKH").html(htmls);
    });
}
function resetViewKH(){
    $(".txtmaKH").val("");
    $(".txttenKH").val("");
    $(".txtDCCKH").val("");
    $(".txtsdtKH").val("");
    $(".txtmaKH").focus();
}
