-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 08, 2021 lúc 05:46 CH
-- Phiên bản máy phục vụ: 5.7.14
-- Phiên bản PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlwebcomhop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `combo`
--

CREATE TABLE `combo` (
  `MaComBo` char(10) NOT NULL,
  `MaCuaHang` char(10) DEFAULT NULL,
  `GiaKhuyenMai` int(11) DEFAULT NULL,
  `MonPhuAnKem` char(200) DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `combo`
--

INSERT INTO `combo` (`MaComBo`, `MaCuaHang`, `GiaKhuyenMai`, `MonPhuAnKem`, `SoLuong`) VALUES
('COMBOSUON', 'CTKD1', 55000, 'Sườn nướng,Canh rong biển,Khăn lạnh,coca', 1),
('CBMOTNGUOI', 'CTKD1', 67000, 'Sườn(ba rọi),trứng(bì,chả),Canh rong biển,Khăn lạnh,coca(suprite,sâm bí đao)', 1),
('CBHAINGUOI', 'CTKD1', 154000, 'Sườn(ba rọi),trứng(bì,chả),Canh rong biển,Khăn lạnh,coca(sâm,sprite)', 2),
('COMBOSUON2', 'CTHP2', 55000, 'Sườn nướng,Canh rong biển,Khăn lạnh,coca', 1),
('CBMOTNGUO2', 'CTHP2', 67000, 'Sườn(ba rọi),trứng(bì,chả),Canh rong biển,Khăn lạnh,coca(suprite,sâm bí đao)', 1),
('CBHAINGUO2', 'CTHP2', 154000, 'Sườn(ba rọi),trứng(bì,chả),Canh rong biển,Khăn lạnh,coca(sâm,sprite)', 2),
('COMBOSUON3', 'CTPH3', 55000, 'Sườn nướng,Canh rong biển,Khăn lạnh,coca', 1),
('CBMOTNGUO3', 'CTPH3', 67000, 'Sườn(ba rọi),trứng(bì,chả),Canh rong biển,Khăn lạnh,coca(suprite,sâm bí đao)', 1),
('CBHAINGUO3', 'CTPH3', 154000, 'Sườn(ba rọi),trứng(bì,chả),Canh rong biển,Khăn lạnh,coca(sâm,sprite)', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cuahang`
--

CREATE TABLE `cuahang` (
  `MaCuaHang` varchar(10) NOT NULL,
  `TenCuaHang` varchar(100) DEFAULT NULL,
  `DiaChiCuaHang` varchar(200) DEFAULT NULL,
  `sdt` varchar(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `cuahang`
--

INSERT INTO `cuahang` (`MaCuaHang`, `TenCuaHang`, `DiaChiCuaHang`, `sdt`) VALUES
('CTKD1', 'Cơm Tấm kì duyên chi nhánh 1', '50/100 Tô ngọc vân ,tp Thủ Đức', '0255477688'),
('CTHP2', 'Cơm Tấm Hạnh Phúc chi nhánh 2', '33/25 Kha Vạn Cân ,tp Thủ Đức', '0155677988'),
('CTPH3', 'Cơm Tấm Phúc Hữu chi nhánh 3', '66/10 Nguyễn hữu cảnh ,tp Thủ Đức', '0355177888');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dondathang`
--

CREATE TABLE `dondathang` (
  `MaDatHang` varchar(10) NOT NULL,
  `NgayDatHang` date DEFAULT NULL,
  `MaCuaHang` varchar(10) DEFAULT NULL,
  `MaKH` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `dondathang`
--

INSERT INTO `dondathang` (`MaDatHang`, `NgayDatHang`, `MaCuaHang`, `MaKH`) VALUES
('MDH15', '2021-02-01', 'CTKD1', '0004'),
('MDH16', '2021-02-02', 'CTHP2', '0005'),
('MDH17', '2021-02-03', 'CTPH3', '0006'),
('MDH18', '2021-02-10', 'CTHP2', '0007'),
('MDH19', '2021-02-15', 'CTKD1', '0008'),
('a', '2021-02-01', 'aa', 'aa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `MaHoaDon` varchar(10) NOT NULL,
  `TenMonAn` varchar(100) DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `ThanhToan` int(11) DEFAULT NULL,
  `NgayLapHoaDon` date DEFAULT NULL,
  `MaKH` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MaHoaDon`, `TenMonAn`, `SoLuong`, `ThanhToan`, `NgayLapHoaDon`, `MaKH`) VALUES
('0258', 'Sườn nướng mật ong,ba rọi nướng, canh rong biển', 1, 80000, '2021-02-01', '0001'),
('0259', 'Sườn nướng mật ong,bì,chả, canh rong biển,sprite,khăn', 3, 276000, '2021-02-02', '0002'),
('0260', 'Sườn nướng mật ong,ba rọi nướng', 1, 60000, '2021-02-03', '0003'),
('0261', 'Sườn nướng mật ong,Trứng Chiên,Chả,Sâm bí đao, canh rong biển,Khăn Lạnh', 2, 174000, '2021-02-10', '0004'),
('0262', 'Sườn nướng mật ong,Bì,coca', 1, 60000, '2021-02-15', '0005'),
('a', 'a', 1, 1, '2021-02-05', 'a');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kh`
--

CREATE TABLE `kh` (
  `MaKH` varchar(10) NOT NULL,
  `DiaChiKH` varchar(200) DEFAULT NULL,
  `TenKH` varchar(100) DEFAULT NULL,
  `sdtKH` varchar(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `kh`
--

INSERT INTO `kh` (`MaKH`, `DiaChiKH`, `TenKH`, `sdtKH`) VALUES
('0004', '80/9 Đình phong phú Q9', 'Bùi Thị bé Tiên', '04123567889'),
('0003', '151/33 Tam Bình TP.Thủ Đức', 'Nguyễn Hữu Mỹ', '0321456987'),
('0002', '02/7 Đặng Thùy Trâm Q.BThạnh', 'Nguyễn Thị Diệu', '0213654987'),
('0001', '38/7 Đình phong phú Q9', 'Nguyễn Xuân Hương', '0123456789'),
('0005', '49/13 Tam Phú TP.Thủ Đức', 'Trần Quang Huy', '0532164987');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaimonan`
--

CREATE TABLE `loaimonan` (
  `MaLoaiMonAn` varchar(10) NOT NULL,
  `MaCuaHang` varchar(10) DEFAULT NULL,
  `TenLoai` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `loaimonan`
--

INSERT INTO `loaimonan` (`MaLoaiMonAn`, `MaCuaHang`, `TenLoai`) VALUES
('MONCHINH1', 'CTKD1', 'món chính (nướng)'),
('MONCHINH2', 'CTHP2', 'món chính (nướng)'),
('MONCHINH3', 'CTPH3', 'món chính (nướng)'),
('MONCANH1', 'CTKD1', 'món phụ(canh)'),
('MONCANH2', 'CTHP2', 'món phụ(canh)'),
('MONCANH3', 'CTPH3', 'món phụ(canh)'),
('MONANKEM1', 'CTKD1', 'món phụ ăn kèm'),
('MONANKEM2', 'CTHP2', 'món phụ ăn kèm'),
('MONANKEM3', 'CTPH3', 'món phụ ăn kèm'),
('GIAIKHAT1', 'CTKD1', 'giải khát'),
('GIAIKHAT2', 'CTHP2', 'giải khát'),
('GIAIKHAT3', 'CTPH3', 'giải khát'),
('VESINH1', 'CTKD1', 'vệ sinh sau khi ăn'),
('VESINH2', 'CTHP2', 'vệ sinh sau khi ăn'),
('VESINH3', 'CTPH3', 'vệ sinh sau khi ăn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `monan`
--

CREATE TABLE `monan` (
  `MaMonAn` varchar(100) NOT NULL,
  `MaLoaiMonAn` varchar(10) DEFAULT NULL,
  `TenMonAn` varchar(100) DEFAULT NULL,
  `ThongTinMonAn` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `monan`
--

INSERT INTO `monan` (`MaMonAn`, `MaLoaiMonAn`, `TenMonAn`, `ThongTinMonAn`) VALUES
('1000', 'MONCHINH', 'Sường Nướng Mật ong mềm', '30000/1phan'),
('2000', 'MONCHINH2', 'Sường Nướng Mật ong mềm', '30000/1phan'),
('3000', 'MONCHINH3', 'Sường Nướng Mật ong mềm', '30000/1phan'),
('1001', 'MONCHINH1', 'Ba rọi nướng mật ong', '30000/1phan'),
('2001', 'MONCHINH2', 'Ba rọi nướng mật ong', '30000/1phan'),
('3001', 'MONCHINH3', 'Ba rọi nướng mật ong', '30000/1phan'),
('1002', 'MONCANH1', 'Canh rong biển', '15000/1phan'),
('2002', 'MONCANH2', 'Canh rong biển', '15000/1phan'),
('3002', 'MONCANH3', 'Canh rong biển', '15000/1phan'),
('1003', 'MONANKEM1', 'Trứng chiên', '10000/1phan'),
('2003', 'MONANKEM2', 'Trứng chiên', '10000/1phan'),
('3003', 'MONANKEM3', 'Trứng chiên', '10000/1phan'),
('1004', 'MONANKEM1', 'Chả', '15000/1phan'),
('2004', 'MONANKEM2', 'Chả', '15000/1phan'),
('3004', 'MONANKEM3', 'Chả', '15000/1phan'),
('1005', 'MONANKEM1', 'Bì', '15000/1phan'),
('2005', 'MONANKEM2', 'Bì', '15000/1phan'),
('3005', 'MONANKEM3', 'Bì', '15000/1phan'),
('1006', 'GIAIKHAT1', 'coca', '15000/1phan'),
('2006', 'GIAIKHAT2', 'coca', '15000/1phan'),
('3006', 'GIAIKHAT3', 'coca', '15000/1phan'),
('1007', 'GIAIKHAT1', 'Sprite', '15000/1phan'),
('2007', 'GIAIKHAT2', 'Sprite', '15000/1phan'),
('3007', 'GIAIKHAT3', 'Sprite', '15000/1phan'),
('1008', 'GIAIKHAT1', 'Sâm bí đao', '10000/1phan'),
('2008', 'GIAIKHAT2', 'Sâm bí đao', '10000/1phan'),
('3008', 'GIAIKHAT3', 'Sâm bí đao', '10000/1phan'),
('1009', 'VESINH1', 'Khăn lạnh', '2000/1cai'),
('2009', 'VESINH2', 'Khăn lạnh', '2000/1cai'),
('3009', 'VESINH3', 'Khăn lạnh', '2000/1cai');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nv_gh`
--

CREATE TABLE `nv_gh` (
  `MaPhieuGiaoHang` varchar(10) NOT NULL,
  `MaPhieuHen` varchar(10) NOT NULL,
  `TenNV` varchar(100) DEFAULT NULL,
  `sdt` varchar(11) DEFAULT NULL,
  `luongphieucon` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `nv_gh`
--

INSERT INTO `nv_gh` (`MaPhieuGiaoHang`, `MaPhieuHen`, `TenNV`, `sdt`, `luongphieucon`) VALUES
('MPGH1', 'MPH5', 'Lê hoài Long', '0155498762', 2),
('MPGH2', 'MPH6', 'Lê hoài Long', '0155498762', 2),
('MPGH3', 'MPH7', 'Lê hoài Long', '0155498762', 2),
('MPGH4', 'MPH8', 'Trương Băng Băng ', '0155498762', 0),
('MPGH5', 'MPH9', 'Trương Băng Băng', '0156558651', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieugiaohang`
--

CREATE TABLE `phieugiaohang` (
  `MaPhieuGiaoHang` varchar(10) NOT NULL,
  `MaDatHang` varchar(10) DEFAULT NULL,
  `NgayGiaoHang` date DEFAULT NULL,
  `TG` time DEFAULT NULL,
  `DiaChiKH` varchar(200) DEFAULT NULL,
  `SoPhieu` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `phieugiaohang`
--

INSERT INTO `phieugiaohang` (`MaPhieuGiaoHang`, `MaDatHang`, `NgayGiaoHang`, `TG`, `DiaChiKH`, `SoPhieu`) VALUES
('MPGH1', 'MDH15', '2021-02-02', '10:30:05', '38/7 Đình phong phú Q9', 1),
('MPGH2', 'MDH16', '2021-02-02', '14:30:15', '02/7 Đặng Thùy Trâm Q.BThạnh', 1),
('MPGH3', 'MDH17', '2021-02-02', '11:45:05', '151/33 Tam Bình TP.Thủ Đức', 1),
('MPGH4', 'MDH18', '2021-02-02', '15:59:30', '80/9 Đình phong phú Q9', 2),
('MPGH5', 'MDH19', '2021-02-02', '07:30:40', '49/13 Tam Phú TP.Thủ Đức', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieuhen`
--

CREATE TABLE `phieuhen` (
  `MaPhieuHen` varchar(10) NOT NULL,
  `NgaylapPhieu` date DEFAULT NULL,
  `NgayGiaoCom` date DEFAULT NULL,
  `MaKH` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `phieuhen`
--

INSERT INTO `phieuhen` (`MaPhieuHen`, `NgaylapPhieu`, `NgayGiaoCom`, `MaKH`) VALUES
('MPH5', '2021-02-01', '2021-02-02', '0001'),
('MPH6', '2021-02-02', '2021-02-03', '0002'),
('MPH7', '2021-02-03', '2021-02-04', '0003'),
('MPH8', '2021-02-10', '2021-02-12', '0004'),
('MPH9', '2021-02-15', '2021-02-16', '0005');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `permission` int(11) NOT NULL DEFAULT '0',
  `avartar` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`username`, `password`, `fullname`, `permission`, `avartar`) VALUES
('quyvan@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', 'NGUYỄN QUÝ VĂN', 0, 'avt.jpg'),
('n@1', 'a0f1490a20d0211c997b44bc357e1972deab8ae3', 'NGUYỄN TRƯƠNG HOÀNG N', 1, '4.jpg'),
('z@2', '3c363836cf4e16666669a25da280a1865c2d2874', 'NGUYỄN THỊ B', 2, '1.jpg');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `combo`
--
ALTER TABLE `combo`
  ADD PRIMARY KEY (`MaComBo`),
  ADD KEY `MaCuaHang` (`MaCuaHang`);

--
-- Chỉ mục cho bảng `cuahang`
--
ALTER TABLE `cuahang`
  ADD PRIMARY KEY (`MaCuaHang`);

--
-- Chỉ mục cho bảng `dondathang`
--
ALTER TABLE `dondathang`
  ADD PRIMARY KEY (`MaDatHang`),
  ADD KEY `MaCuaHang` (`MaCuaHang`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MaHoaDon`),
  ADD KEY `MaKH` (`MaKH`);

--
-- Chỉ mục cho bảng `kh`
--
ALTER TABLE `kh`
  ADD PRIMARY KEY (`MaKH`);

--
-- Chỉ mục cho bảng `loaimonan`
--
ALTER TABLE `loaimonan`
  ADD PRIMARY KEY (`MaLoaiMonAn`),
  ADD KEY `MaCuaHang` (`MaCuaHang`);

--
-- Chỉ mục cho bảng `monan`
--
ALTER TABLE `monan`
  ADD PRIMARY KEY (`MaMonAn`),
  ADD KEY `MaLoaiMonAn` (`MaLoaiMonAn`);

--
-- Chỉ mục cho bảng `nv_gh`
--
ALTER TABLE `nv_gh`
  ADD KEY `MaPhieuGiaoHang` (`MaPhieuGiaoHang`),
  ADD KEY `MaPhieuHen` (`MaPhieuHen`);

--
-- Chỉ mục cho bảng `phieugiaohang`
--
ALTER TABLE `phieugiaohang`
  ADD PRIMARY KEY (`MaPhieuGiaoHang`),
  ADD KEY `MaDatHang` (`MaDatHang`);

--
-- Chỉ mục cho bảng `phieuhen`
--
ALTER TABLE `phieuhen`
  ADD PRIMARY KEY (`MaPhieuHen`),
  ADD KEY `MaKH` (`MaKH`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
