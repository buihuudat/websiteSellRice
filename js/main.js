function swapMain(main) {
    $(".formcuahang").addClass("is-hidden");
    $(".formcombo").addClass("is-hidden");
    $(".formloaimon").addClass("is-hidden");
    $(".formmonan").addClass("is-hidden");
    $(".formnhanvien").addClass("is-hidden");
    $(".formphieuGH").addClass("is-hidden");
    $(".formphieuHen").addClass("is-hidden");
    $(".formKH").addClass("is-hidden");
    $(".formHoaD").addClass("is-hidden");
    $(".formDDH").addClass("is-hidden");
    $("." + main).removeClass("is-hidden");
}
var record = 7;
$(document).ready(function () {
    buildUserDropdown();
    swapMain("formcuahang"); //trang chủ mặc định web
    $(".btn_log_out").click(function () {
        logout();
    });
    $(".btn_change_matkhau").click(function () {
        $('.showmodal').modal('show');
    });
    $(".btn_change_pass").click(function () {
        //var txtpassold=$('.txtpassold').val();
        var txtpassnew = $('.txtpassnew').val();
        var txtpassnewagain = $('.txtpassnewagain').val();
        if (txtpassnew == "" || txtpassnewagain == "") {
            alert_info("Mật khẩu không được trống");
        } else if (txtpassnew != txtpassnewagain) {
            alert_info("Mật khẩu cũ và mới không khớp");
        } else {
            var dataSend = {
                event: "updatepass",
                pass: txtpassnew,

                username: localStorage.getItem("usernamebookstore")
            }
            console.log(dataSend);
            $(".progesschangepass").html("<img src='images/loading.gif' width='5px' height='5px'/>");

            queryData("php/api.php", dataSend, function (res) {
                console.log(res);
                if (res["updatepass"] == 1) {

                    alert_info("Thay đổi mật khẩu thành công");
                    $('.showmodalchangematkhau').modal('hide');
                } else {
                    alert_info("Thay đổi mật khẩu thất bại");
                }

                $(".progesschangepass").html("");
            })
        }
    });
    $(".mncuahang").on("click", function () {
        swapMain("formcuahang");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemCH").prop("disabled", false);
        $(".btnluuCH").prop("disabled", true);
        $(".btnsuaCH").prop("disabled", true);
        showDataCuaHang();
    });
    $(".mncombo").on("click", function () {
        swapMain("formcombo");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemCB").prop("disabled", false);
        $(".btnluuCB").prop("disabled", true);
        $(".btnsuaCB").prop("disabled", true);
        showDataComBo();
    });
    $(".mnloai").on("click", function () {
        swapMain("formloaimon");
        //show nút thêm ,mờ nút lưu và sửa
        showCBTenLoai();
        $(".btnthemLM").prop("disabled", false);
        $(".btnluuLM").prop("disabled", true);
        $(".btnsuaLM").prop("disabled", true);
        showDataLoaiMon(0, record);
    });
    $(".mnmonan").on("click", function () {
        swapMain("formmonan");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemMA").prop("disabled", false);
        $(".btnluuMA").prop("disabled", true);
        $(".btnsuaMA").prop("disabled", true);
        showDataMonAn();
    });
    $(".mnNV").on("click", function () {
        swapMain("formnhanvien");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemNV").prop("disabled", false);
        $(".btnluuNV").prop("disabled", true);
        $(".btnsuaNV").prop("disabled", true);
        showDataNhanVien();
    });
    $(".mnphieugiaohang").on("click", function () {
        swapMain("formphieuGH");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemPGH").prop("disabled", false);
        $(".btnluuPGH").prop("disabled", true);
        $(".btnsuaPGH").prop("disabled", true);
        showDataPhieuGH();
    });
    $(".mnPhieuHen").on("click", function () {
        swapMain("formphieuHen");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemPH").prop("disabled", false);
        $(".btnluuPH").prop("disabled", true);
        $(".btnsuaPH").prop("disabled", true);
        showDataPhieuHen();
    });
    $(".mnKH").on("click", function () {
        swapMain("formKH");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemKH").prop("disabled", false);
        $(".btnluuKH").prop("disabled", true);
        $(".btnsuaKH").prop("disabled", true);
        showDataKhachHang();
    });
    $(".mnHĐ").on("click", function () {
        swapMain("formHoaD");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemHD").prop("disabled", false);
        $(".btnluuHD").prop("disabled", true);
        $(".btnsuaHD").prop("disabled", true);
        showDataHD();
    });
    $(".mnDDH").on("click", function () {
        swapMain("formDDH");
        //show nút thêm ,mờ nút lưu và sửa
        $(".btnthemDDH").prop("disabled", false);
        $(".btnluuDDH").prop("disabled", true);
        $(".btnsuaDDH").prop("disabled", true);
        showDataDDH();
    });
    $('#menuToggle').click(function () {
        $('body').toggleClass('open');
    })
});
//hàm get data
function queryData(url, dataSend, callback) {

    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'json',
        success: callback
    });
}
//Sử dụng thư viện bootbox
function alert_error(mes) {
    bootbox.alert({
        size: "small",
        title: "<span style='color: red'>Thất bại</span>",
        message: mes,
        callback: function () {
            /* your callback code */ }
    });
}

function alert_success(mes, callback) {
    bootbox.alert({
        size: "small",
        title: "<span style='color: green'>Thành Công</span>",
        message: mes,
        callback: callback
    });
}

function alert_info(mes) {
    bootbox.alert({
        size: "small",
        title: "<span style='color: blue'>Thông Tin</span>",
        message: mes,
        callback: function () {
            /* your callback code */ }
    });
}

function printSTT(record, pageCurr) {
    if ((pageCurr + 1) == 1) {
        return 1;
    } else {
        return record * (pageCurr + 1) - (record - 1);
    }
}

function buildSlidePage(obj, codan, pageActive, totalPage) {
    var html = "";
    pageActive = parseInt(pageActive);
    for (i = 1; i <= codan; i++) {
        if (pageActive - i < 0) break;
        html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">' + (pageActive - i + 1) + '</button>' + html;
    }
    if (pageActive > codan) {
        html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">...</button>' + html;
    }
    html += '<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="' + pageActive + '">' + (pageActive + 1) + '</button>';
    for (i = 1; i <= codan; i++) {
        if (pageActive + i >= totalPage) break;
        html = html + '<button  type="button" class="btn btn-outline btn-default" value="' + (pageActive + i) + '">' + (pageActive + i + 1) + '</button>';
    }
    if (totalPage - pageActive > codan + 1) {
        html = html + '<button type="button" value="' + (pageActive + i) + '" class="btn btn-outline btn-default">...</button>';
    }
    obj.html(html);
}

function buildUserDropdown() {

    myUser = JSON.parse(localStorage.getItem("userbookstore"));

    var avartar = localStorage.getItem("avartarbookstore");

    if (myUser == undefined || myUser == null || myUser == "") {

        location.href = "page-login.html";
    } else {

        $(".addusername").html("<div style='text-align=center;'>" + myUser.items[0].fullname + '<br><a href="#" class="btn_change_matkhau">[Đổi mật khẩu]</a>&nbsp;<a href="#" class="btn_log_out">[Logout]</a></div>');

        if (avartar == "" || avartar == undefined || avartar == "null") {
            $(".addvartar").attr("src", "images/avt.jpg");
        } else {
            $(".addvartar").attr("src", "images/" + avartar);
        }


    }
}

function logout() {
    localStorage.removeItem("rememberbookstore");
    localStorage.removeItem("usernamebookstore");
    localStorage.removeItem("passwordbookstore");
    localStorage.removeItem("userbookstore");
    location.href = "page-login.html";

}

function permission() {
    var datasend = {
        event: "login",
        username: localStorage.getItem("usernamebookstore"),
        password: localStorage.getItem("passwordbookstore"),
    };
    queryData("php/api.php", datasend, function (data) {
        var arr = data.items;
        for (var item in arr) {
            var d = arr[item];
            $('.name-danhmuc').text(d.fullname);

            if (d.permission == 1) {
                // an del vs sua button
                $('.btndel').css('display', 'none');
                $('.btnedit').css('display', 'none');
                // an dstk
                //$('.select-danhMuc').last().css('display', 'none');
                $('.title-chucVu').text('Nhân viên');
            } else if (d.permission == 2) {
                $('.btns').css('display', 'none');
                // an dstk
                //$('.select-danhMuc').last().css('display', 'none');
                // $('.nvdm').css('display', 'none');
                // $('.ipnv').css('display', 'none');
                $('.title-chucVu').text('Người dùng');
            }
        }
    })
}
permission()
buildUserDropdown()