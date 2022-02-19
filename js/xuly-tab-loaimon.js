var flagloai=0; 
$(document).ready(function(){
    //nhấn nút thêm
    $(".btnthemLM").on("click", function(){
        //mờ nút thêm
        $(".btnthemLM").prop("disabled",true);
        $(".btnluuLM").prop("disabled",false);
        $(".btnsuaLM").prop("disabled",true); 
        //dữ liệu trên ô bị xóa
        resetViewLM();
        flagloai=1; //đang nhấn nút thêm 
        $(".txtmaLM").prop("disabled",false);
    });
    $(".btnsuaLM").on("click", function(){
        //mờ nút thêm
        $(".btnthemLM").prop("disabled",true);
        $(".btnluuLM").prop("disabled",false);
        $(".btnsuaLM").prop("disabled",true);
        flagloai=2; //đang nhấn nút cập nhật dữ liệu 
        $(".txtmaLM").prop("disabled",true);
    });
    $(".btnlamlaiLM").on("click", function(){
        //mờ nút thêm    
        resetViewLM();   
        $(".btnthemLM").prop("disabled",false);
        $(".btnluuLM").prop("disabled",true);
        $(".btnsuaLM").prop("disabled",true);
        flagloai=0; 
    });
    $(".btnluuLM").on("click", function(){
        if(flagloai==1){
            console.log("them");
            //lấy dữ liệu  từ web
            var maloaimonan=$(".txtmaLM").val();
            var tenloai=$(".txttenLM").val();
            var macuahang=$(".txtCHLM").val();
            if(macuahang==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtCHLM").focus();
            }else if(maloaimonan==""){
                alert_info("Tên cửa hàng không được phép trống");
                $(".txtmaLM").focus();
            }else if(tenloai==""){
                alert_info("địa chỉ cửa hàng không được phép trống");
                $(".txtCHLM").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    macuahang:macuahang,
                    tenloai:tenloai,
                    maloaimonan:maloaimonan,
                    event:"insertLM",
                }
                //gọi hàm querry                
                queryData("php/api-loai.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã với bảng khác");  
                                        
                    }else if(res.success==1){                       
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   
                        resetViewLM();
                        
                        $(".btnthemLM").prop("disabled",false);
                        $(".btnluuLM").prop("disabled",true);
                        $(".btnsuaLM").prop("disabled",true);
                        showDataLoaiMon();
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else if(flagloai==2){
            console.log("update");
            var maloaimonan=$(".txtmaLM").val();
            var tenloai=$(".txttenLM").val();
            var macuahang=$(".txtCHLM").val();
            if(maloaimonan==""){
                alert_info("mã cửa hàng không được phép trống");
                $(".txtmaLM").focus();
            }else if(tenloai==""){
                alert_info("Tên cửa hàng không được phép trống");
                $(".txttenLM").focus();
            }else if(macuahang==""){
                alert_info("địa chỉ cửa hàng không được phép trống");
                $(".txtCHLM").focus();
            }else
            {
                //tạo 1 bộ data của client gửi lên 
                var dataclient={ 
                    macuahang:macuahang,
                    tenloai:tenloai,
                    maloaimonan:maloaimonan,
                    event:"updateLM",
                }
                //gọi hàm querry                
                queryData("php/api-loai.php",dataclient,function(res){
                    console.log(""+res.success);
                    if(res.success==2){
                        alert_error("Dữ liệu đã bị trùng mã .");  
                                        
                    }else if(res.success==1){
                        showDataLoaiMon();
                        alert_success("Insert Thành Công");                 
                        flagTL=0;   

                        $(".btnthemLM").prop("disabled",false);
                        $(".btnluuLM").prop("disabled",true);
                        $(".btnsuaLM").prop("disabled",true);
                        
                    }else{
                        alert_error("Lỗi Insert Thành Công"); 
                    }
            });  
            }
        }else{
            console.log("chưa nhấn nút nào cả");
        }       
    });
    $(".btnxoaLM").click(function(){
        var maloaimonan=$(".txtmaLM").val();
        var tenloai=$(".txttenLM").val();
        var macuahang=$(".txtCHLM").val();
	 bootbox.confirm("Bạn có chắc xóa [ "+tenloai+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteLM",
             maloaimonan:maloaimonan,               
            };
       		
            queryData("php/api-loai.php", dataSend, function (data) {
              if(data.success==1){
				showDataLoaiMon();
                resetViewLM();
			  }else if(data.success==2){
				  alert_info("Loại món này đã được sử dụng trong bảng khác");
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
    $(".addListLoaiMon").on('click','.click_view_LoaiMon', function(){
        var MaLoaiMonAn=  $(this).parent().attr("data-maloaimonan");
        var TenLoai=  $(this).parent().attr("data-tenloai");
        var MaCuaHang=  $(this).parent().attr("data-macuahang");
        $(".txtmaLM").val(MaLoaiMonAn);
        $(".txttenLM").val(TenLoai);
        $(".txtCHLM").val(MaCuaHang);
        $(".btnthemLM").prop("disabled",false);
        $(".btnluuLM").prop("disabled",true);
        $(".btnsuaLM").prop("disabled",false);
       
})
$(".NumberpageLoaimon").on('click','button',function(){
    console.log($(this).val());
    showDataLoaiMon($(this).val(),record);
});
});
//Viết 1 hàm lấy dự liệu từ server
function showDataLoaiMon(page,record){
    var dataSend={
        page:page,  
        record:record,
        search:"",
        event:"getLoaiMonan"
    }
     $('.addListLoaiMon').html('<tr><td colspan=6><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
    queryData("php/api-loai.php", dataSend, function (res) {
        //var ar=data.items;//lấy ra mảng 
        if(res.items.length==0){
            $('.addListLoaiMon').html("<tr><td colspan=6>Không tìm thấy dữ liệu</td></tr>");
            $('.NumberpageLoaimon').html("");
        }else{
            
        var stt=printSTT(record,res.page);
         var htmls='';
         var ar=res.items;
        for(var item in ar){
            var d=ar[item];
            htmls=htmls+  '<tr data-MaLoaiMonAn='+d.maloaimonan+' data-MaCuaHang="'+d.macuahang+'" data-TenLoai="'+d.tenloai+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.maloaimonan+'</td>'+
                            '<td>'+d.macuahang+'</td>'+
                            '<td>'+d.tenloai+'</td>'+
                            '<td class="click_view_LoaiMon"><span class="badge bg-primary">Xem</span></td>'+
                          '</tr>';
          stt++;
        }
        $(".addListLoaiMon").html(htmls);
        buildSlidePage($('.NumberpageLoaimon'),6,res.page,res.totalpage);
    }
    });
}
function resetViewLM(){
    $(".txtmaLM").val("");
    $(".txttenLM").val("0");
    $(".txtCHLM").val("");
    $(".txtmaLM").focus();
}
//Viết hàm để lấy dữ liệu từ server đổ vào combox 
function showCBTenLoai(){
	var dataSend={
		event:"getALLLM"
	}
	queryData("php/api-loai.php", dataSend, function (res) {
		if(res.items.length==0){
			$('.txttenLM').html("<option value='0'>Chọn 1 loại món ăn</option>");
		}else{
		  var htmls='<option value="0">Chọn 1 loại món ăn</option>';
		  var list=res.items;
		  for(var item in list){
				var d=list[item];
				htmls=htmls+'<option value="'+d.maloaimonan+'">'+d.tenloai+'</option>'
		  }
		 $('.txttenLM').html(htmls);
		}
	});
}
//hàm phân trang
// function showDataLoaiMon(page,record){
//     //var find=$('.txtfindsach').val();
//        var dataSend={
//        page:page,  
//        record:record,
//        search:"",
//        event:"getLoaiMonan"
//    }
//    console.log(dataSend);
//   
//    queryData("php/api-loai.php", dataSend, function (res) {
//        console.log(res);
//        if(res.items.length==0){
//            $('.addListLoaiMon').html("<tr><td colspan=6>Không tìm thấy dữ liệu</td></tr>");
//            $('.NumberpageLoaimon').html("");
//        }else{
           
//         var stt=printSTT(record,res.page);
//          var htmls='';
//          var list=res.items;
//          for(var item in list){
//                var d=list[item];
//                htmls=htmls+' <tr'+
//                                '<td>'+stt+'</td>'+
//                                 '<td>'+d.maloaimonan+'</td>'+
//                                  '<td>'+d.macuahang+'</td>'+
//                                   '<td>'+d.tenloai+'</td>'+
//                                    '<td>'+d.tenmonan+'</td>'+
//                               ' <td><span class="badge bg-danger">Xem</span></td>'+
//                              '</tr>';             
//                              stt++;
//          }
//         $('.addListLoaiMon').html(htmls);
//         buildSlidePage($('.NumberpageLoaimon'),6,res.page,res.totalpage);
        
//        }
//    });
// }
