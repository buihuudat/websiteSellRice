var flagMA=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemMA").on("click", function(){
        //mờ nút thêm
        $(".btnthemMA").prop("disabled",true);
        $(".btnluuMA").prop("disabled",false);
        $(".btnsuaMA").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewMA();
        flagMA=1; //đang nhấn nút thêm 
        $(".txtmaMA").prop("disabled",false);
    });
    $(".btnsuaMA").on("click", function(){
        //mờ nút thêm
        $(".btnthemMA").prop("disabled",true);
        $(".btnluuMA").prop("disabled",false);
        $(".btnsuaMA").prop("disabled",true);
        flagMA=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaMA").prop("disabled",true);
    });
    $(".btnlamlaiMA").on("click", function(){
        //mờ nút thêm    
        resetViewMA();   
        $(".btnthemMA").prop("disabled",false);
        $(".btnluuMA").prop("disabled",true);
        $(".btnsuaMA").prop("disabled",true);
        flagMA=0; 
    });
    $(".btnluuMA").on("click", function(){
        if(flagMA==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var mamonan=$(".txtmaMA").val();
            var maloaimonan=$(".txtmaloaiMA").val();
            var tenmonan=$(".txttenMA").val();
            var thongtinmonan=$(".txtttMA").val();
            if(mamonan==""){
                alert_info("mã món ăn không được phép trống");
                $(".txtmaMA").focus();
            }else if(maloaimonan==""){
                alert_info("mã loại món ăn không được phép trống");
                $(".txtmaloaiMA").focus();
            }else if(tenmonan==""){
                alert_info("tên món ăn không được phép trống");
                $(".txttenMA").focus();
            }else if(thongtinmonan==""){
                alert_info("sthông tin món ăn không được phép trống");
                $(".txtttMA").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    mamonan:mamonan,
                    maloaimonan:maloaimonan,
                    tenmonan:tenmonan,
                    thongtinmonan:thongtinmonan,
                    event:"insertMA",
                }
                //gọi hàm querry                
                queryData("php/api-mon.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagMA=0;   
                        resetViewMA();
                        
                        $(".btnthemMA").prop("disabled",false);
                        $(".btnluuMA").prop("disabled",true);
                        $(".btnsuaMA").prop("disabled",true);
                        showDataMonAn();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagMA==2){
            console.log("update");
            var mamonan=$(".txtmaMA").val();
            var maloaimonan=$(".txtmaloaiMA").val();
            var tenmonan=$(".txttenMA").val();
            var thongtinmonan=$(".txtttMA").val();
            if(mamonan==""){
                alert_info("mã món ăn không được phép trống");
                $(".txtmaMA").focus();
            }else if(maloaimonan==""){
                alert_info("mã loại món ăn không được phép trống");
                $(".txtmaloaiMA").focus();
            }else if(tenmonan==""){
                alert_info("tên món ăn không được phép trống");
                $(".txttenMA").focus();
            }else if(thongtinmonan==""){
                alert_info("thông tin món ăn không được phép trống");
                $(".txtttMA").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    mamonan:mamonan,
                    maloaimonan:maloaimonan,
                    tenmonan:tenmonan,
                    thongtinmonan:thongtinmonan,
                    event:"updateMA",
                }
                //gọi hàm querry                
                queryData("php/api-mon.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã");  
                                        
                    }else if(res.success==1){
                        showDataMonAn();
                        alert_success("Insert Thành Công");                 
                        flagMA=0;   

                        $(".btnthemMA").prop("disabled",false);
                        $(".btnluuMA").prop("disabled",true);
                        $(".btnsuaMA").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaMA").click(function(){
        var mamonan=$(".txtmaMA").val();
        var maloaimonan=$(".txtmaloaiMA").val();
        var tenmonan=$(".txttenMA").val();
        var thongtinmonan=$(".txtttMA").val();
	 bootbox.confirm("Bạn có chắc xóa Cửa Hàng[ "+tenmonan+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteMA",
                mamonan:mamonan,               
            };
       		
            queryData("php/api-mon.php", dataSend, function (data) {
              if(data.success==1){
				showDataMonAn();
                resetViewMA();
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
    $(".addListMonAn").on('click','.click_view_MonAn', function(){
        var MaMonAn=  $(this).parent().attr("data-mamonan");
        var MaLoaiMonAn=  $(this).parent().attr("data-maloaimonan");
        var TenMonAn=  $(this).parent().attr("data-tenmonan");
        var ThongTinMonAn=  $(this).parent().attr("data-thongtinmonan");
        $(".txtmaMA").val(MaMonAn);
        $(".txtmaloaiMA").val(MaLoaiMonAn);
        $(".txttenMA").val(TenMonAn);
        $(".txtttMA").val(ThongTinMonAn);
        $(".btnthemMA").prop("disabled",false);
        $(".btnluuMA").prop("disabled",true);
        $(".btnsuaMA").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataMonAn(){
    var dataSend={
        event:"getALLMA"
    }
    $('.addListMonAn').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    console.log("s");
    queryData("php/api-mon.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaMonAn='+d.mamonan+' data-MaLoaiMonAn="'+d.maloaimonan+'" data-TenMonAn="'+d.tenmonan+'" data-ThongTinMonAn="'+d.thongtinmonan+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.mamonan+'</td>'+
                            '<td>'+d.maloaimonan+'</td>'+
                            '<td>'+d.tenmonan+'</td>'+
                            '<td>'+d.thongtinmonan+'</td>'+            
                            '<td class="click_view_MonAn"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListMonAn").html(htmls);
    });
}
function resetViewMA(){
    $(".txtmaMA").val("");
    $(".txtmaloaiMA").val("");
    $(".txttenMA").val("");
    $(".txtttMA").val("");
    $(".txtmaMA").focus();
}
