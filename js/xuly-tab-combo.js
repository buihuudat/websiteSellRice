var flagCB=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemCB").on("click", function(){
        //mờ nút thêm
        $(".btnthemCB").prop("disabled",true);
        $(".btnluuCB").prop("disabled",false);
        $(".btnsuaCB").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewCB();
        flagCB=1; //đang nhấn nút thêm 
        $(".txtmaCB").prop("disabled",false);
    });
    $(".btnsuaCB").on("click", function(){
        //mờ nút thêm
        $(".btnthemCB").prop("disabled",true);
        $(".btnluuCB").prop("disabled",false);
        $(".btnsuaCB").prop("disabled",true);
        flagCB=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaCB").prop("disabled",true);
    });
    $(".btnlamlaiCB").on("click", function(){
        //mờ nút thêm    
        resetViewCB();   
        $(".btnthemCB").prop("disabled",false);
        $(".btnluuCB").prop("disabled",true);
        $(".btnsuaCB").prop("disabled",true);
        flagCB=0; 
    });
    $(".btnluuCB").on("click", function(){
        if(flagCB==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var macombo=$(".txtmaCB").val();
            var monphuankem=$(".txtmonphu").val();
            var giakhuyenmai=$(".txtgiasale").val();
            var soluong=$(".txtsoluong").val();
            var macuahang=$(".txtmacuahang").val();
            if(macombo==""){
                alert_info("mã ComBo không được phép trống");
                $(".txtmaCB").focus();
            }else if(monphuankem==""){
                alert_info("món phụ ăn kèm không được phép trống");
                $(".txtmonphu").focus();
            }else if(giakhuyenmai==""){
                alert_info("giá khuyến mãi không được phép trống");
                $(".txtgiasale").focus();
            }else if(soluong==""){
                alert_info("số lượng không được phép trống");
                $(".txtsoluong").focus();
            }else if(macuahang==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmacuahang").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    macombo:macombo,
                    monphuankem:monphuankem,
                    giakhuyenmai:giakhuyenmai,
                    soluong:soluong,
                    macuahang:macuahang,
                    event:"insertCB",
                }
                //gọi hàm querry                
                queryData("php/api-CB.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ComBO");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   
                        resetViewCB();
                        
                        $(".btnthemCB").prop("disabled",false);
                        $(".btnluuCB").prop("disabled",true);
                        $(".btnsuaCB").prop("disabled",true);
                        showDataComBo();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagCB==2){
            console.log("update");
            var macombo=$(".txtmaCB").val();
            var monphuankem=$(".txtmonphu").val();
            var giakhuyenmai=$(".txtgiasale").val();
            var soluong=$(".txtsoluong").val();
            var macuahang=$(".txtmacuahang").val();
            if(macombo==""){
                alert_info("mã ComBo không được phép trống");
                $(".txtmaCB").focus();
            }else if(monphuankem==""){
                alert_info("món phụ ăn kèm không được phép trống");
                $(".txtmonphu").focus();
            }else if(giakhuyenmai==""){
                alert_info("giá khuyến mãi không được phép trống");
                $(".txtgiasale").focus();
            }else if(soluong==""){
                alert_info("số lượng không được phép trống");
                $(".txtsoluong").focus();
            }else if(macuahang==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmacuahang").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    macombo:macombo,
                    monphuankem:monphuankem,
                    giakhuyenmai:giakhuyenmai,
                    soluong:soluong,
                    macuahang:macuahang,
                    event:"updateCB",
                }
                //gọi hàm querry                
                queryData("php/api-CB.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã ComBO");  
                                        
                    }else if(res.success==1){
                        showDataComBo();
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   

                        $(".btnthemCB").prop("disabled",false);
                        $(".btnluuCB").prop("disabled",true);
                        $(".btnsuaCB").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaCB").click(function(){
        var macombo=$(".txtmaCB").val();
        var monphuankem=$(".txtmonphu").val();
        var giakhuyenmai=$(".txtgiasale").val();
        var soluong=$(".txtsoluong").val();
        var macuahang=$(".txtmacuahang").val();
	 bootbox.confirm("Bạn có chắc xóa [ "+macombo+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteCB",
                macombo:macombo,
                
            };
       		
            queryData("php/api-CB.php", dataSend, function (data) {
              if(data.success==1){
				showDataComBo();
                resetViewCB();
			  }else if(data.success==2){
				  alert_info("ComBO này đã được sử dụng trong bảng khác");
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
    $(".addListComBo").on('click','.click_view_ComBo', function(){
        var MaComBo=  $(this).parent().attr("data-macombo");
        var MaCuaHang=  $(this).parent().attr("data-macuahang");
        var GiaKhuyenMai=  $(this).parent().attr("data-giakhuyenmai");
        var MonPhuAnKem=  $(this).parent().attr("data-monphuankem");
        var SoLuong=  $(this).parent().attr("data-soluong");
        $(".txtmaCB").val(MaComBo);
        $(".txtmacuahang").val(MaCuaHang);
        $(".txtgiasale").val(GiaKhuyenMai);
        $(".txtmonphu").val(MonPhuAnKem);
        $(".txtsoluong").val(SoLuong);
        $(".btnthemCB").prop("disabled",false);
        $(".btnluuCB").prop("disabled",true);
        $(".btnsuaCB").prop("disabled",false);
       
})
});
//Viết 1 hàm lấy dự liệu từ server
function showDataComBo(){
    var dataSend={
        event:"getALLCB"
    }
    $('.addListComBo').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    var htmls='';
    console.log("s");
    queryData("php/api-CB.php", dataSend, function (data) {
        var ar=data.items;//lấy ra mảng 
        var stt=1;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaComBo='+d.macombo+' data-MaCuaHang="'+d.macuahang+'" data-GiaKhuyenMai="'+d.giakhuyenmai+'" data-MonPhuAnKem="'+d.monphuankem+'" data-SoLuong="'+d.soluong+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.macombo+'</td>'+
                            '<td>'+d.macuahang+'</td>'+
                            '<td>'+d.giakhuyenmai+'</td>'+
                            '<td>'+d.monphuankem+'</td>'+     
                            '<td>'+d.soluong+'</td>'+         
                            '<td class="click_view_ComBo"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListComBo").html(htmls);
    });
}
function resetViewCB(){
    $(".txtmaCB").val("");
    $(".txtmonphu").val("");
    $(".txtgiasale").val("");
    $(".txtsoluong").val("");
    $(".txtmacuahang").val("");
    $(".txtmaCB").focus();
}
