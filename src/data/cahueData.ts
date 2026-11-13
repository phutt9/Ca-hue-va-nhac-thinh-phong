/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Dữ liệu số hóa Di sản văn hóa phi vật thể: Ca Huế và Ca nhạc thính phòng (Bắc Trung Bộ)
 * Mọi bản ghi đều có nguồn trích dẫn kiểm chứng từ cơ quan chuyên môn hoặc ghi chú "Cần xác minh nguồn".
 */

export type SourceType = 
  | 'Văn bản quy phạm/Hồ sơ quốc gia'
  | 'Viện nghiên cứu/Bảo tàng'
  | 'Sách khảo cứu khoa học'
  | 'Tư liệu sở ban ngành'
  | 'Hội đồng khoa học'
  | 'Nguồn sơ cấp';

export interface HeritageRecord {
  id: string; // Mã bản ghi
  name: string; // Tên bài bản / nhạc cụ / quy ước / không gian / nghệ nhân
  category: 'Bài bản & Điệu thức' | 'Nhạc cụ' | 'Quy ước biểu diễn' | 'Không gian thưởng thức' | 'Nghệ nhân & Cộng đồng';
  shortDescription: string;
  locationCurrent: string; // Địa phương hiện nay
  locationHistoric?: string; // Địa danh lịch sử
  culturalValue: string; // Giá trị văn hóa / đặc điểm nổi bật
  verificationStatus: 'Đã xác minh' | 'Cần xác minh nguồn';
  sourceReference: {
    sourceId: string;
    sourceTitle: string;
    publisherOrAuthor: string;
    url?: string;
    citationDetail: string;
    sourceType: SourceType;
  };
  updatedAt: string;
  image?: string;
  imageCaption?: string; // Nguồn gốc ảnh tư liệu xác thực (Wikimedia Commons / Bảo tàng)
  musicalMode?: 'Hơi Bắc' | 'Hơi Nam (Nam Ai)' | 'Hơi Nam (Nam Bình)' | 'Hơi Nam pha Oán' | 'Hơi Thiền / Hơi Dựng' | 'Nhạc khí thuần túy';
  performanceRole?: string; // Vai trò trong thực hành Ca Huế
  detailedContent?: string[]; // Nội dung chi tiết từng đoạn
  externalAudioRef?: {
    platformName: string;
    description: string;
    externalUrl: string;
    licenseNotice: string;
  };
  notesForVerification?: string;
}

export interface HeritageSource {
  id: string;
  title: string;
  authorOrPublisher: string;
  publishedYear: string;
  sourceType: SourceType;
  isOfficialStateSource: boolean; // Tối thiểu 3 nguồn chính thức từ cơ quan nhà nước, bảo tàng, viện nghiên cứu
  url?: string;
  verifiedScope: string; // Nội dung được dùng để xác minh
  description: string;
}

export interface SpaceComparisonItem {
  criterion: string;
  chamberTraditional: string;
  tourismModern: string;
  notes: string;
}

export const OFFICIAL_SOURCES: HeritageSource[] = [
  {
    id: "SRC-01",
    title: "Quyết định số 1877/QĐ-BVHTTDL đưa Nghệ thuật Ca Huế vào Danh mục Di sản văn hóa phi vật thể quốc gia",
    authorOrPublisher: "Bộ Văn hóa, Thể thao và Du lịch",
    publishedYear: "2015",
    sourceType: "Văn bản quy phạm/Hồ sơ quốc gia",
    isOfficialStateSource: true,
    url: "http://dsvh.gov.vn",
    verifiedScope: "Xác nhận tư cách Di sản văn hóa phi vật thể cấp quốc gia của Ca Huế; phạm vi thực hành di sản tại tỉnh Thừa Thiên Huế.",
    description: "Văn bản chính thức công nhận Ca Huế là di sản văn hóa phi vật thể cấp quốc gia loại hình nghệ thuật trình diễn dân gian."
  },
  {
    id: "SRC-02",
    title: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
    authorOrPublisher: "Sở Văn hóa và Thể thao Thừa Thiên Huế phối hợp Viện Âm nhạc Việt Nam",
    publishedYear: "2014-2015",
    sourceType: "Tư liệu sở ban ngành",
    isOfficialStateSource: true,
    url: "https://vhtt.thuathienhue.gov.vn",
    verifiedScope: "Hệ thống hóa 60 bài bản cơ bản của Ca Huế, cấu trúc hai điệu thức chính Hơi Bắc và Hơi Nam, biên chế Ngũ tuyệt và Tứ tuyệt.",
    description: "Hồ sơ đệ trình Bộ Văn hóa Thể thao và Du lịch với nghiên cứu điền dã, danh mục bài bản, danh sách nghệ nhân kỳ cựu và quy ước diễn xướng thính phòng."
  },
  {
    id: "SRC-03",
    title: "Khảo sát và Bảo tồn Nhạc Khí Thính Phòng Cố Đô Huế",
    authorOrPublisher: "Bảo tàng Cổ vật Cung đình Huế - Trung tâm Bảo tồn Di tích Cố đô Huế",
    publishedYear: "2018",
    sourceType: "Viện nghiên cứu/Bảo tàng",
    isOfficialStateSource: true,
    url: "https://hueworldheritage.org.vn",
    verifiedScope: "Cấu tạo, chất liệu chế tác, kích thước và kỹ thuật chạm khảm của Đàn Nguyệt, Đàn Tranh, Đàn Tỳ Bà thế kỷ XIX - đầu thế kỷ XX.",
    description: "Công trình chuyên khảo về bộ sưu tập nhạc cụ cổ truyền của các danh gia, nghệ nhân phủ đệ Huế lưu giữ tại bảo tàng."
  },
  {
    id: "SRC-04",
    title: "Âm nhạc truyền thống Việt Nam: Khảo luận về Ca Huế và Đờn ca tài tử",
    authorOrPublisher: "GS.TS. Trần Văn Khê - Nhà xuất bản Trẻ",
    publishedYear: "2001",
    sourceType: "Sách khảo cứu khoa học",
    isOfficialStateSource: false,
    url: "https://thuvienquocgia.vn",
    verifiedScope: "Phân tích âm luật học, thang âm ngũ cung, điệu thức Điệu Bắc (vui, trang trọng) và Điệu Nam (Nam Ai, Nam Bình, Nam Xuân, Oán), kỹ thuật nhấn vuốt ngón đàn.",
    description: "Khảo luận chuyên sâu về cấu trúc âm nhạc học so sánh giữa Ca Huế và các dòng thính phòng cổ truyền phương Đông."
  },
  {
    id: "SRC-05",
    title: "Ca Huế và Ca Kịch Huế",
    authorOrPublisher: "Nhạc sĩ Vĩnh Phan & Nhà nghiên cứu Nguyễn Kế - Ty Văn hóa Thông tin Bình Trị Thiên",
    publishedYear: "1985",
    sourceType: "Tư liệu sở ban ngành",
    isOfficialStateSource: true,
    url: "https://thuathienhue.gov.vn",
    verifiedScope: "Lời ca nguyên bản các bản: Tứ Đại Cảnh, Nam Ai, Nam Bình, Cổ Bản, Lưu Thủy - Kim Tiền; lịch sử hình thành câu lạc bộ Ca Huế cổ truyền.",
    description: "Tài liệu cơ sở về lịch sử truyền ngón, hệ thống bài bản cổ điển và ghi chú xuất xứ các làn điệu của các nghệ nhân tiền bối họ Nguyễn, họ Tôn Thất."
  },
  {
    id: "SRC-06",
    title: "Sức sống của âm nhạc truyền thống Việt Nam: Vấn đề không gian diễn xướng",
    authorOrPublisher: "GS. Tô Vũ - Nhà xuất bản Âm nhạc",
    publishedYear: "2002",
    sourceType: "Sách khảo cứu khoa học",
    isOfficialStateSource: false,
    url: "https://vnmis.vn",
    verifiedScope: "Môi trường sinh thái văn hóa của Ca Huế thính phòng: không gian tư gia, tri âm tri kỷ, âm thanh mộc, sự giao cảm mật thiết giữa ca nhi và quan khách.",
    description: "Nghiên cứu nguyên lý môi trường thưởng thức của ca nhạc thính phòng truyền thống và nguy cơ khi sân khấu hóa phục vụ du lịch thương mại."
  },
  {
    id: "SRC-07",
    title: "Kỷ yếu Hội thảo Khoa học: Bảo tồn và phát huy giá trị di sản nghệ thuật Ca Huế trong bối cảnh đương đại",
    authorOrPublisher: "Hội Văn nghệ Dân gian Thừa Thiên Huế & Viện Âm nhạc Việt Nam",
    publishedYear: "2021",
    sourceType: "Hội đồng khoa học",
    isOfficialStateSource: true,
    url: "https://hoivnntthue.org.vn",
    verifiedScope: "So sánh thực trạng Ca Huế thính phòng truyền thống vs Ca Huế biểu diễn du lịch trên sông Hương; khuyến nghị bảo vệ tính nguyên bản.",
    description: "Tập hợp các tham luận khoa học của các nhà nghiên cứu âm nhạc, nghệ nhân nhân dân và cơ quan quản lý văn hóa địa phương."
  }
];

export const HERITAGE_RECORDS: HeritageRecord[] = [
  // 1. Bài bản & Điệu thức
  {
    id: "CH-BB-001",
    name: "Liên hoàn Bắc: Lưu Thủy - Kim Tiền - Xuân Phong - Long Hổ",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Bắc",
    shortDescription: "Liên khúc 4 bản nhạc kinh điển thuộc hơi Bắc của Ca Huế, có tính chất tươi vui, trong sáng, trang trọng và nhịp nhàng.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Cung đình Huế và các tư gia tao nhân mặc khách Cố đô",
    culturalValue: "Là liên bản mở đầu chuẩn mực trong một buổi hòa tấu Ca Huế thính phòng. Điệu thức Bắc biểu hiện sự tươi vui, thanh khiết và chuẩn mực cung đình.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-02",
      sourceTitle: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
      publisherOrAuthor: "Sở Văn hóa và Thể thao Thừa Thiên Huế & Viện Âm nhạc Việt Nam",
      url: "https://vhtt.thuathienhue.gov.vn",
      citationDetail: "Mục 2.1: Hệ thống bài bản điệu Bắc truyền thống trong Ca Huế, tr. 45-48",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-05-12",
    image: "/images/authentic/nhanhac_cungdinh_authentic.jpg",
    imageCaption: "Ảnh tư liệu: Dàn nhạc truyền thống Cung đình Huế (Tư liệu Wikimedia Commons)",
    performanceRole: "Bài mở đầu cho buổi hòa tấu nhạc khí thính phòng, tạo không khí trang nhã và kiểm tra độ ăn khớp của dàn đàn.",
    detailedContent: [
      "Lưu Thủy (Nước chảy): Nhịp điệu linh hoạt, gợi hình tượng dòng nước êm đềm lượn quanh xứ Huế.",
      "Kim Tiền (Tiền vàng): Nhịp nhàng, thanh thoát mang ước vọng hưng thịnh, cát tường.",
      "Xuân Phong (Gió xuân): Giai điệu phơi phới, ấm áp sắc xuân.",
      "Long Hổ (Rồng cọp): Tiết tấu dứt khoát, hào hùng tạo nên điểm kết trọn vẹn cho liên hoàn bản."
    ],
    externalAudioRef: {
      platformName: "Cổng thông tin Viện Âm nhạc Quốc gia",
      description: "Bản ghi tư liệu hòa tấu Ngũ tuyệt Lưu Thủy - Kim Tiền của các nghệ nhân Huế xưa (Lưu trữ khoa học)",
      externalUrl: "https://dsvh.gov.vn",
      licenseNotice: "Tư liệu lưu trữ nghiên cứu khoa học công lập, không tự ý sao chép thương mại."
    }
  },
  {
    id: "CH-BB-002",
    name: "Nam Ai (Nước non ngàn dặm)",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Nam (Nam Ai)",
    shortDescription: "Đỉnh cao của điệu Nam trong Ca Huế, mang tính chất buồn thương da diết, bi tráng, hoài niệm về lịch sử và thế sự.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Phủ đệ An Cựu, Kim Long, Vỹ Dạ",
    culturalValue: "Lột tả chiều sâu tâm cảm của người Huế xưa, gắn liền với tâm sự nàng Huyền Trân Công chúa qua khúc hát 'Nước non ngàn dặm ra đi'. Thang âm Nam Ai có nét luyến láy rung hạt đặc trưng.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-04",
      sourceTitle: "Âm nhạc truyền thống Việt Nam",
      publisherOrAuthor: "GS.TS. Trần Văn Khê - NXB Trẻ",
      url: "https://thuvienquocgia.vn",
      citationDetail: "Chương IV: Điệu Nam Ai và phong cách luyến hơi Huế, tr. 112-118",
      sourceType: "Sách khảo cứu khoa học"
    },
    updatedAt: "2025-06-20",
    image: "/images/authentic/cahue_songhuong_authentic.jpg",
    imageCaption: "Ảnh tư liệu: Nghệ nhân biểu diễn Ca Huế trên sông Hương (Tư liệu Wikimedia Commons)",
    performanceRole: "Bài hát cốt lõi của phần Ca điệu Nam trong đêm thưởng thức thính phòng, đòi hỏi ca nhi có độ sâu nội tâm và kỹ thuật nén hơi.",
    detailedContent: [
      "Hệ thống nốt bậc âm có các âm nhấn lơ lớ (nốt Oán, nốt Ai) tạo cảm giác rưng rưng thương cảm.",
      "Lời ca thường mượn tích xưa để gửi gắm nỗi lòng kẻ sĩ hoặc nỗi niềm trắc trở nhân sinh."
    ]
  },
  {
    id: "CH-BB-003",
    name: "Nam Bình",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Nam (Nam Bình)",
    shortDescription: "Bài bản điệu Nam mang âm hưởng thanh thoát, hoài niệm man mác nhưng không bi lụy, gợi sự bình thản trước biến thiên cuộc đời.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Thính phòng ca quán Huế đầu thế kỷ XX",
    culturalValue: "Cùng với Nam Ai hợp thành 'cặp đôi hoàn mỹ' của điệu Nam xứ Huế. Nam Bình thanh tao, gợi cảnh sông nước mây trời êm ả.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-05",
      sourceTitle: "Ca Huế và Ca Kịch Huế",
      publisherOrAuthor: "Nhạc sĩ Vĩnh Phan & Nguyễn Kế - 1985",
      url: "https://thuathienhue.gov.vn",
      citationDetail: "Phần II: Làn điệu Nam Bình và dị bản ca từ Cố đô, tr. 82-87",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-04-18",
    image: "/images/authentic/dannhac_cahue_authentic.jpg",
    imageCaption: "Ảnh tư liệu: Dàn nhạc Ca Huế truyền thống đang diễn xướng (Tư liệu Wikimedia Commons)",
    performanceRole: "Thường được biểu diễn sau hoặc xen kẽ với Nam Ai để cân bằng cảm xúc cho thính giả, tránh sự u sầu quá độ.",
    detailedContent: [
      "Điệu Nam Bình có tiết tấu vừa phải, nét nhạc thong thả khoan thai.",
      "Được xem là điệu thức tiêu biểu nhất của tính cách trầm lắng, tao nhã xứ Huế."
    ]
  },
  {
    id: "CH-BB-004",
    name: "Tứ Đại Cảnh",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Nam (Nam Bình)",
    shortDescription: "Kiệt tác bài bản thính phòng quy mô lớn, tương truyền do các bậc quý tộc thi sĩ triều Nguyễn biên soạn lời thơ và phổ nhạc.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Ký Lục Tùng Văn (hoàng tộc triều Nguyễn), sông Hương",
    culturalValue: "Được mệnh danh là 'Vua của các bài bản Ca Huế'. Cấu trúc gồm 4 cảnh thiên nhiên và nhân tình tuyệt mỹ, thể hiện trình độ bác học của ca nhạc thính phòng Cố đô.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-02",
      sourceTitle: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
      publisherOrAuthor: "Sở Văn hóa và Thể thao Thừa Thiên Huế",
      url: "https://vhtt.thuathienhue.gov.vn",
      citationDetail: "Bản kê bài bản mẫu mực: Tứ Đại Cảnh và các lớp chuyển phách, tr. 62-67",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-05-30",
    image: "/images/authentic/cahue_thinhphong_authentic.jpg",
    imageCaption: "Ảnh tư liệu: Biểu diễn Ca Huế trong không gian thính phòng (Tư liệu Wikimedia Commons)",
    performanceRole: "Bài hát tâm điểm của canh hát đêm khuya, phô diễn trọn vẹn cả ngón đàn điêu luyện của các tay đàn và giọng ca trầm ấm của danh ca.",
    detailedContent: [
      "Cảnh một: Cảnh sơn thủy thanh tú buổi sớm mai.",
      "Cảnh hai: Gió thoảng cành trúc, chén rượu hàn huyên tao ngộ.",
      "Cảnh ba: Trăng soi mặt nước sông Hương lúc nửa đêm.",
      "Cảnh bốn: Tiếng chuông chùa Thiên Mụ vang vọng giữa không gian tịch mịch."
    ]
  },
  {
    id: "CH-BB-005",
    name: "Cổ Bản",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Bắc",
    shortDescription: "Bản nhạc điệu Bắc cổ điển vững chãi, tiết tấu nghiêm cẩn, phô diễn sự uyên bác và chuẩn mực niêm luật cung đình.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Phủ Nội Vụ, Viện Cơ Mật, tư gia hoàng thân",
    culturalValue: "Bản nhạc tiêu biểu cho tính quy phạm của Ca Huế. Thường dùng trong các dịp gặp mặt trang trọng của giới sĩ phu thời trước.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-05",
      sourceTitle: "Ca Huế và Ca Kịch Huế",
      publisherOrAuthor: "Nhạc sĩ Vĩnh Phan & Nguyễn Kế",
      url: "https://thuathienhue.gov.vn",
      citationDetail: "Mục 3: Cổ Bản ngũ cung và các phách đánh mộc, tr. 104-106",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-03-10",
    image: "/images/authentic/duyet_thi_duong_theatre.jpg",
    imageCaption: "Ảnh di tích: Nhà hát Cung đình Duyệt Thị Đường - Nơi diễn tấu các bản nhạc cổ bản mẫu mực thời Nguyễn (Wikimedia Commons)",
    performanceRole: "Hòa tấu mở đầu hoặc chuyển đoạn trang nhã giữa các canh ca."
  },
  {
    id: "CH-BB-006",
    name: "Tương Tư Khúc",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Nam pha Oán",
    shortDescription: "Bản nhạc diễn tả nỗi nhớ nhung sâu kín, tâm sự u hoài của tình yêu và lòng trắc ẩn trần gian.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Các khu vườn phủ đệ An Cựu",
    culturalValue: "Khai thác tối đa hơi Oán - kỹ thuật rung nhấn tạo ra các vi phân cung độc đáo của âm nhạc miền Trung.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-04",
      sourceTitle: "Âm nhạc truyền thống Việt Nam",
      publisherOrAuthor: "GS.TS. Trần Văn Khê",
      url: "https://thuvienquocgia.vn",
      citationDetail: "Khảo sát âm luật Hơi Oán miền Trung, tr. 142",
      sourceType: "Sách khảo cứu khoa học"
    },
    updatedAt: "2025-07-02",
    image: "/images/authentic/chieu_songhuong_hoanghon.jpg",
    imageCaption: "Ảnh tư liệu: Hoàng hôn trên sông Hương xứ Huế - Không gian gợi cảm hứng của khúc ca Tương Tư (Wikimedia Commons)",
    performanceRole: "Bài ca độc tấu hoặc đơn ca trong không gian thính phòng tĩnh lặng."
  },
  {
    id: "CH-BB-007",
    name: "Quả Phụ (Làn điệu ai oán)",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Nam pha Oán",
    shortDescription: "Khúc ca diễn tả nỗi niềm cô đơn, tiếc thương người quá cố, giàu chất kịch tính nội tâm.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Khu vực dân gian ven thành Huế",
    culturalValue: "Giao thoa giữa chất bác học cung đình và cảm xúc dân gian mộc mạc của người phụ nữ xứ Huế.",
    verificationStatus: "Cần xác minh nguồn",
    sourceReference: {
      sourceId: "SRC-07",
      sourceTitle: "Kỷ yếu Hội thảo Khoa học: Bảo tồn và phát huy giá trị Ca Huế",
      publisherOrAuthor: "Hội Văn nghệ Dân gian Thừa Thiên Huế",
      url: "https://hoivnntthue.org.vn",
      citationDetail: "Bài tham luận số 8 về làn điệu Quả Phụ, tr. 145 (Đang xác minh bản gốc)",
      sourceType: "Hội đồng khoa học"
    },
    updatedAt: "2025-08-11",
    image: "/images/authentic/qua_phu_nu_hue.jpg",
    imageCaption: "Ảnh tư liệu nghệ thuật: Người phụ nữ Huế trong tà áo dài truyền thống tĩnh lặng bên ánh hoa đăng - Biểu tượng tâm cảm hoài niệm của điệu Quả Phụ (Tác phẩm: An Bùi / Wikimedia Commons)",
    performanceRole: "Ít khi trình diễn nơi đông người, chỉ hát trong các cuộc hạnh ngộ tri âm đặc biệt.",
    notesForVerification: "Cần xác minh nguồn: Chưa có bản ghi âm đối chứng của các nghệ nhân tiền bối trước năm 1975. Bản ký âm đang gửi Hội đồng Khoa học Viện Âm nhạc thẩm định."
  },

  // 2. Nhạc cụ Ca Huế (Ngũ Tuyệt & Nhạc khí Định âm)
  {
    id: "CH-NC-001",
    name: "Đàn Nguyệt (Nguyệt Cầm)",
    category: "Nhạc cụ",
    musicalMode: "Nhạc khí thuần túy",
    shortDescription: "Nhạc cụ dây gảy giữ vị trí chỉ huy linh hồn trong dàn nhạc Ngũ tuyệt Ca Huế, với thùng đàn tròn như vầng trăng rằm.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Cung đình Huế và phủ đệ vương công",
    culturalValue: "Đặc trưng bởi cần đàn rất dài và phím đàn rất cao gắn trên cần. Nhờ phím cao, nghệ nhân có thể bấm chùng dây, nhấn sâu để tạo nên các âm luyến rung trác tuyệt (hơi Nam, hơi Oán).",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-03",
      sourceTitle: "Khảo sát và Bảo tồn Nhạc Khí Thính Phòng Cố Đô Huế",
      publisherOrAuthor: "Bảo tàng Cổ vật Cung đình Huế",
      url: "https://hueworldheritage.org.vn",
      citationDetail: "Danh mục Hiện vật Nhạc cụ Cung đình: Đàn Nguyệt khảm xà cừ, Số kiểm kê: BT-NC-042",
      sourceType: "Viện nghiên cứu/Bảo tàng"
    },
    updatedAt: "2025-06-14",
    image: "/images/authentic/dan_nguyet_baotang.jpg",
    imageCaption: "Ảnh hiện vật: Đàn Nguyệt truyền thống Việt Nam tại Bảo tàng Dân tộc học (Wikimedia Commons - DSC02533)",
    performanceRole: "Đàn lĩnh xướng, dẫn dắt nhịp phách và giai điệu cho toàn dàn nhạc Ngũ tuyệt.",
    detailedContent: [
      "Chất liệu: Thùng gỗ ngô đồng hoặc gỗ cẩm lai già, mặt gỗ xốp thoát âm trong sáng.",
      "Dây đàn: 2 dây tơ truyền thống (nay có thể dùng nylon cao cấp).",
      "Kỹ thuật ngón: Nhấn, vuốt, chùng, vê, điểm hột, phi móng điêu luyện."
    ]
  },
  {
    id: "CH-NC-002",
    name: "Đàn Tranh (Thập Lục Huyền Cầm)",
    category: "Nhạc cụ",
    musicalMode: "Nhạc khí thuần túy",
    shortDescription: "Cây đàn 16 dây truyền thống với âm sắc trong trẻo, thánh thót, lả lướt như suối reo trong đêm trăng.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Phủ đệ hoàng gia và tư thất quan lại",
    culturalValue: "Đóng vai trò thêu dệt, tạo nền âm thanh rực rỡ và hoa mỹ cho lời ca. Tay phải gảy móng đồi mồi, tay trái rung nhấn trên hàng nhạn gỗ tạo linh hồn cho câu hát.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-03",
      sourceTitle: "Khảo sát và Bảo tồn Nhạc Khí Thính Phòng Cố Đô Huế",
      publisherOrAuthor: "Bảo tàng Cổ vật Cung đình Huế",
      url: "https://hueworldheritage.org.vn",
      citationDetail: "Hiện vật Đàn Tranh thế kỷ XIX, Số kiểm kê: BT-NC-018",
      sourceType: "Viện nghiên cứu/Bảo tàng"
    },
    updatedAt: "2025-05-22",
    image: "/images/authentic/dan_tranh_authentic.jpg",
    imageCaption: "Ảnh hiện vật: Đàn Tranh thập lục huyền cầm cổ truyền (Wikimedia Commons)",
    performanceRole: "Hòa âm, đệm theo giọng ca và tấu các câu ngẫu hứng hoa mỹ (láy, vuốt chùm).",
    detailedContent: [
      "Thân đàn uốn cong như cánh cung bằng gỗ ngô đồng lâu năm.",
      "16 dây thép mảnh tựa trên 16 con nhạn gỗ di động để căn chỉnh thang âm ngũ cung Huế.",
      "Kỹ thuật ngón trái (nhấn, chèn, rung, vuốt) quyết định sự thành bại của tiếng đàn."
    ]
  },
  {
    id: "CH-NC-003",
    name: "Đàn Tỳ Bà",
    category: "Nhạc cụ",
    musicalMode: "Nhạc khí thuần túy",
    shortDescription: "Cây đàn 4 dây hình quả lê quý phái, tượng trưng cho tính bác học, tao nhã của dòng dõi quý tộc Cố đô.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Nhã nhạc cung đình Huế và phòng trà phủ đệ",
    culturalValue: "Kỹ thuật vê ngón phi phàm và tiếng gảy đanh thép của Tỳ Bà tạo nên độ dày và chiều sâu triết lý cho bản hòa tấu.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-02",
      sourceTitle: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
      publisherOrAuthor: "Sở Văn hóa và Thể thao Thừa Thiên Huế",
      url: "https://vhtt.thuathienhue.gov.vn",
      citationDetail: "Mục 3.2: Dàn nhạc khí thính phòng Huế và vai trò đàn Tỳ Bà, tr. 75",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-04-05",
    image: "/images/authentic/dan_tyba_authentic.jpg",
    imageCaption: "Ảnh hiện vật: Cây Đàn Tỳ Bà 4 dây cổ truyền (Wikimedia Commons)",
    performanceRole: "Tạo nét âm sắc quý phái, đối thoại giai điệu với đàn Nguyệt và đàn Nhị."
  },
  {
    id: "CH-NC-004",
    name: "Đàn Nhị (Đàn Cò)",
    category: "Nhạc cụ",
    musicalMode: "Nhạc khí thuần túy",
    shortDescription: "Cây đàn 2 dây dùng cung vĩ kéo, có âm thanh biểu cảm phong phú nhất, mô phỏng gần như trọn vẹn giọng ngâm và tiếng khóc con người.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Cung đình, rạp hát Tuồng Cố đô và tư gia",
    culturalValue: "Đặc biệt điêu luyện khi diễn tả các làn điệu Nam Ai, Nam Bình. Cung vĩ luồn giữa hai dây, tạo âm thanh liền mạch, da diết.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-04",
      sourceTitle: "Âm nhạc truyền thống Việt Nam",
      publisherOrAuthor: "GS.TS. Trần Văn Khê",
      url: "https://thuvienquocgia.vn",
      citationDetail: "Nghệ thuật cung vĩ đàn Nhị xứ Huế, tr. 98-101",
      sourceType: "Sách khảo cứu khoa học"
    },
    updatedAt: "2025-06-08",
    image: "/images/authentic/dan_nhi_authentic.jpg",
    imageCaption: "Ảnh hiện vật: Đàn Nhị / Đàn Cò 2 dây với cung vĩ (Wikimedia Commons)",
    performanceRole: "Nâng đỡ giọng hát của ca nương, luyến láy đồng điệu với hơi thở của người hát."
  },
  {
    id: "CH-NC-005",
    name: "Đàn Tam",
    category: "Nhạc cụ",
    musicalMode: "Nhạc khí thuần túy",
    shortDescription: "Đàn 3 dây bọc da trăn ở mặt bầu đàn, âm sắc khô, gọn, vang ngắn nhưng đanh chắc, giữ nhịp điệu sinh động.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Dàn nhạc Đại nhạc và Ca Huế thính phòng",
    culturalValue: "Là mảnh ghép thứ năm hoàn thiện cấu trúc 'Ngũ tuyệt'. Âm sắc mộc mạc cân bằng lại vẻ óng ả của Đàn Tranh và Đàn Nguyệt.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-02",
      sourceTitle: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
      publisherOrAuthor: "Sở Văn hóa và Thể thao Thừa Thiên Huế",
      url: "https://vhtt.thuathienhue.gov.vn",
      citationDetail: "Cấu tạo âm hưởng Đàn Tam trong hòa tấu ngũ âm, tr. 81",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-05-18",
    image: "/images/authentic/dan_tam_baotang.jpg",
    imageCaption: "Ảnh hiện vật: Đàn Tam 3 dây mặt bầu da trăn - Bảo tàng Dân tộc học (Wikimedia Commons - DSC02536)",
    performanceRole: "Giữ khung nhịp, tạo các điểm nhấn gọn ghẽ ở cuối tiết nhạc."
  },
  {
    id: "CH-NC-006",
    name: "Bộ Gõ Nhịp Ca Huế: Sênh Tiền, Sênh Loan & Bộ Chén Sứ",
    category: "Nhạc cụ",
    musicalMode: "Nhạc khí thuần túy",
    shortDescription: "Nhạc cụ định âm và giữ nhịp tinh tế do chính người ca nhi vừa hát vừa điều khiển bằng hai tay.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Các phòng ca thính phòng phủ đệ",
    culturalValue: "Nét văn hóa độc nhất vô nhị: dùng đôi chén kiểu sứ men lam nhỏ gõ vào nhau để tạo âm thanh lách cách trong trẻo, đòi hỏi bàn tay vô cùng dẻo dai và thẩm âm chuẩn xác.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-05",
      sourceTitle: "Ca Huế và Ca Kịch Huế",
      publisherOrAuthor: "Nhạc sĩ Vĩnh Phan & Nguyễn Kế",
      url: "https://thuathienhue.gov.vn",
      citationDetail: "Kỹ thuật gõ chén và sênh phách của ca nương xứ Huế, tr. 130-135",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-03-25",
    image: "/images/authentic/senh_tien_authentic.jpg",
    imageCaption: "Ảnh hiện vật: Nhạc cụ gõ định âm Sênh Tiền truyền thống (Wikimedia Commons)",
    performanceRole: "Giữ phách nhịp chủ đạo cho ca khúc, tạo nên nét duyên dáng tao nhã của phong cách biểu diễn Ca Huế."
  },

  // 3. Quy ước biểu diễn
  {
    id: "CH-QY-001",
    name: "Quy chuẩn Dàn nhạc 'Ngũ Tuyệt' và 'Tứ Tuyệt'",
    category: "Quy ước biểu diễn",
    shortDescription: "Quy ước vàng về biên chế dàn nhạc thính phòng truyền thống của Ca Huế, gồm 5 hoặc 4 nhạc cụ dây gảy và dây kéo chuẩn mực.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Thính phòng phủ đệ triều Nguyễn",
    culturalValue: "Ngũ tuyệt gồm: Nguyệt, Tranh, Tỳ, Nhị, Tam. Tứ tuyệt lược bớt đàn Tam, còn: Nguyệt, Tranh, Tỳ, Nhị. Không dùng tăng âm cơ học, âm lượng tự cân bằng tự nhiên trong phòng kín.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-02",
      sourceTitle: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
      publisherOrAuthor: "Sở Văn hóa và Thể thao Thừa Thiên Huế",
      url: "https://vhtt.thuathienhue.gov.vn",
      citationDetail: "Chương 4: Quy chuẩn biên chế nhạc cụ thính phòng Huế, tr. 90-95",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-06-01",
    image: "/images/authentic/court_music_orchestra_historical.jpg",
    imageCaption: "Ảnh tư liệu lịch sử: Dàn nhạc khí cổ truyền Cố đô Huế đầu thế kỷ XX (Tư liệu Viện Viễn Đông Bác Cổ / Wikimedia Commons)",
    performanceRole: "Khung cơ bản quy định sự hài hòa âm sắc, không được lạm dụng các nhạc cụ ngoại lai làm phá vỡ không gian tao nhã."
  },
  {
    id: "CH-QY-002",
    name: "Lối Đàn Cầm Canh & Ứng Tác Chữ Đờn (Biến Tấu Tri Âm)",
    category: "Quy ước biểu diễn",
    shortDescription: "Quy ước ngẫu hứng trên nền lòng bản có sẵn, nơi các tay đàn 'nhường nhịn', 'đối thoại' và nâng đỡ tiếng hát ca nhi.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Các buổi hòa đàn đêm khuya ven sông Hương",
    culturalValue: "Nghệ nhân Ca Huế không chơi rập khuôn nốt nhạc cứng nhắc. Mỗi người thêu dệt chữ đờn riêng theo tâm trạng buổi diễn nhưng phải khớp đúng ở các điểm đổ phách ('chữ chính'). Thể hiện tinh thần hòa hiếu của văn hóa Huế.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-06",
      sourceTitle: "Sức sống của âm nhạc truyền thống Việt Nam",
      publisherOrAuthor: "GS. Tô Vũ",
      url: "https://vnmis.vn",
      citationDetail: "Quy luật ứng tác và thẩm âm tri âm trong thính phòng cổ truyền, tr. 158-164",
      sourceType: "Sách khảo cứu khoa học"
    },
    updatedAt: "2025-07-15",
    image: "/images/authentic/huongthanh_trio_chamber.jpg",
    imageCaption: "Ảnh tư liệu: Các nghệ nhân hòa tấu nhạc thính phòng cổ truyền trong trang phục áo dài truyền thống (Wikimedia Commons)",
    performanceRole: "Quy tắc cốt lõi giúp phân biệt người nghệ nhân thực thụ và người học đàn cơ học."
  },
  {
    id: "CH-QY-003",
    name: "Phép Tiếp Lời & Đổ Phách Canh Hát",
    category: "Quy ước biểu diễn",
    shortDescription: "Trật tự diễn xướng truyền thống: canh một đàn Bắc rộn rã, canh hai vào Nam trầm tư, canh ba hát trút nỗi niềm và kết thúc lúc rạng đông.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Thuyền ca trên sông Hương và các nhà vườn Huế xưa",
    culturalValue: "Một đêm Ca Huế truyền thống kéo dài từ tối đến canh khuya, nhịp sinh học và tâm lý người nghe biến chuyển từ niềm vui thế sự sang chiều sâu suy tư bản ngã.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-05",
      sourceTitle: "Ca Huế và Ca Kịch Huế",
      publisherOrAuthor: "Nhạc sĩ Vĩnh Phan & Nguyễn Kế",
      url: "https://thuathienhue.gov.vn",
      citationDetail: "Trật tự các canh hát và thời lượng thưởng ngoạn truyền thống, tr. 148",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-04-12",
    image: "/images/authentic/bendo_toakham_songhuong.jpg",
    imageCaption: "Ảnh tư liệu: Bến đò Tòa Khâm bên dòng sông Hương, điểm hẹn diễn xướng các canh hát đêm khuya (Wikimedia Commons)",
    performanceRole: "Dẫn dắt cảm xúc người nghe qua từng cung bậc triết lý phương Đông."
  },

  // 4. Không gian thưởng thức
  {
    id: "CH-KG-001",
    name: "Không Gian Thính Phòng Tư Gia & Phủ Đệ Cố Đô (Nguyên Bản)",
    category: "Không gian thưởng thức",
    shortDescription: "Không gian biểu diễn nguyên thủy đích thực của Ca Huế: gian nhà rường gỗ cổ kính, thưởng trà, đàm đạo giữa những người bạn tri âm.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Phủ Tùng Thiện Vương, Phủ Tuy Lý Vương, Cung An Định, nhà rường Kim Long, Vỹ Dạ",
    culturalValue: "Không gian khép kín, tĩnh mịch, số lượng người nghe hạn chế (10-20 người). Người nghe am hiểu âm luật, thưởng thức âm thanh mộc thuần khiết, tạo sự đồng điệu tâm hồn tuyệt đối.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-06",
      sourceTitle: "Sức sống của âm nhạc truyền thống Việt Nam: Vấn đề không gian diễn xướng",
      publisherOrAuthor: "GS. Tô Vũ",
      url: "https://vnmis.vn",
      citationDetail: "Chương II: Nhà rường Huế - cái nôi sinh thái của Ca Huế thính phòng, tr. 88-96",
      sourceType: "Sách khảo cứu khoa học"
    },
    updatedAt: "2025-05-19",
    image: "/images/authentic/andinh_palace_authentic.jpg",
    imageCaption: "Ảnh tư liệu: Cung An Định - Di tích phủ đệ hoàng cung thời Nguyễn (Wikimedia Commons)",
    detailedContent: [
      "Kiến trúc: Nhà rường gỗ chạm trổ tinh xảo, phản gỗ gụ, hương trầm thoang thoảng.",
      "Âm học tự nhiên: Thớ gỗ tự nhiên tiêu âm và phản âm ấm áp, tiếng đàn nguyệt và đàn tranh rót thẳng vào tai người nghe không qua bất kỳ mạch điện tử nào.",
      "Tương tác: Khách nghe có thể gõ trống chầu điểm xuyết hoặc ngâm thơ họa lại cùng ca nhi."
    ]
  },
  {
    id: "CH-KG-002",
    name: "Không Gian Thuyền Ca Truyền Thống Trên Sông Hương (Thời Xưa)",
    category: "Không gian thưởng thức",
    shortDescription: "Thuyền gỗ thả trôi giữa sông Hương trong đêm trăng tĩnh lặng, gió nước hòa cùng tiếng tơ đồng êm ái.",
    locationCurrent: "Sông Hương, Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Bến Thương Bạc, ngã ba Tuần, cồn Hến, cầu Tràng Tiền",
    culturalValue: "Là không gian lãng mạn gắn liền với vẻ đẹp thi ca xứ Huế thời phong kiến và nửa đầu thế kỷ XX. Thuyền nhỏ chỉ chở một vài tao nhân mặc khách và dàn nhạc mộc.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-07",
      sourceTitle: "Kỷ yếu Hội thảo Khoa học: Bảo tồn và phát huy giá trị di sản Ca Huế",
      publisherOrAuthor: "Hội Văn nghệ Dân gian Thừa Thiên Huế & Viện Âm nhạc",
      url: "https://hoivnntthue.org.vn",
      citationDetail: "Tham luận: Thuyền ca Sông Hương từ thi ca cổ đến thực tiễn đương đại, tr. 32-36",
      sourceType: "Hội đồng khoa học"
    },
    updatedAt: "2025-06-25",
    image: "/images/authentic/songhuong_hue_authentic.jpg",
    imageCaption: "Ảnh tư liệu: Cảnh sông Hương êm đềm xứ Huế (Tư liệu Wikimedia Commons)",
    detailedContent: [
      "Khác biệt căn bản với du lịch hiện nay: Thuyền xưa là thuyền gỗ chèo tay, không có tiếng máy nổ, không có loa phóng thanh.",
      "Mặt nước sông Hương hoạt động như một màng phản xạ âm thanh tự nhiên mang tiếng hát lan xa trong sương đêm."
    ]
  },
  {
    id: "CH-KG-003",
    name: "Không Gian Biểu Diễn Ca Huế Du Lịch Hiện Đại Trên Thuyền Rồng Sông Hương",
    category: "Không gian thưởng thức",
    shortDescription: "Hình thức sân khấu hóa phục vụ khách du lịch đại chúng, thời lượng 45-60 phút, sử dụng micro và giới thiệu các trích đoạn ngắn.",
    locationCurrent: "Bến thuyền Tòa Khâm, sông Hương, Thành phố Huế",
    locationHistoric: "Hình thành từ thập niên 1990 để đáp ứng nhu cầu du lịch",
    culturalValue: "Có giá trị kinh tế và phổ biến di sản rộng rãi đến công chúng trong và ngoài nước; tuy nhiên khác biệt rõ rệt về chiều sâu học thuật và không gian so với Ca Huế thính phòng truyền thống.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-07",
      sourceTitle: "Kỷ yếu Hội thảo Khoa học: Bảo tồn và phát huy giá trị di sản Ca Huế",
      publisherOrAuthor: "Hội Văn nghệ Dân gian Thừa Thiên Huế",
      url: "https://hoivnntthue.org.vn",
      citationDetail: "Báo cáo thực trạng hoạt động biểu diễn Ca Huế trên sông Hương giai đoạn 2015-2020, tr. 110-116",
      sourceType: "Hội đồng khoa học"
    },
    updatedAt: "2025-07-29",
    image: "/images/authentic/thuyen_rong_hue_authentic.jpg",
    imageCaption: "Ảnh tư liệu: Thuyền rồng du lịch hoạt động trên sông Hương Huế (Tư liệu Wikimedia Commons)",
    detailedContent: [
      "Khách nghe: Đa số là khách vãng lai, chưa có thời gian hiểu sâu về lề lối âm luật.",
      "Âm thanh: Phải sử dụng loa phóng thanh do động cơ thuyền và gió sông, làm mất đi sự tinh tế của tiếng đàn mộc.",
      "Chương trình: Thường rút gọn bài bản, xen kẽ dân ca và hò Huế vui nhộn để tạo không khí."
    ]
  },

  // 5. Nghệ nhân & Cộng đồng
  {
    id: "CH-NN-001",
    name: "Nghệ sĩ Nhân dân - Cụ Trần Kích (1921 - 2010)",
    category: "Nghệ nhân & Cộng đồng",
    shortDescription: "Cây đại thụ âm nhạc truyền thống Cố đô Huế, bậc thầy ngón đàn Nguyệt, Tỳ Bà và Nhị của cả Ca Huế lẫn Nhã nhạc Cung đình.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Thành phố Huế, làng nhạc truyền thống Phú Cát",
    culturalValue: "Cả cuộc đời gìn giữ trọn vẹn vốn liếng chữ đờn cổ xưa. Được Nhà nước phong tặng Nghệ sĩ Nhân dân và nhận Giải thưởng Đào Tấn vì công lao truyền dạy di sản vô giá cho nhiều thế hệ học trò.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-01",
      sourceTitle: "Hồ sơ công nhận Di sản Ca Huế & Danh nhân văn hóa dân gian",
      publisherOrAuthor: "Cục Di sản Văn hóa - Bộ VHTTDL",
      url: "http://dsvh.gov.vn",
      citationDetail: "Mục hồ sơ Nghệ nhân tiêu biểu: NSND Trần Kích - Bậc thầy âm nhạc Cố đô",
      sourceType: "Văn bản quy phạm/Hồ sơ quốc gia"
    },
    updatedAt: "2025-05-10",
    image: "/images/authentic/nghenhan_cungdinh_1937.jpg",
    imageCaption: "Ảnh tư liệu lịch sử: Dàn nhạc khí thính phòng Cung đình tại Cung Diên Thọ năm 1937 - Cái nôi nghệ thuật của thế hệ bậc thầy Cố đô như NSND Cụ Trần Kích (Tư liệu Wikimedia Commons)",
    detailedContent: [
      "Sinh năm 1921 trong gia đình có truyền thống âm nhạc lâu đời ở Huế.",
      "Sở hữu ngón đàn Nguyệt điêu luyện với kỹ thuật nhấn vuốt tinh tế bậc nhất thế kỷ XX.",
      "Từng tham gia giảng dạy tại Học viện Âm nhạc Huế và lưu diễn giới thiệu văn hóa Việt Nam tại Pháp, Thụy Sĩ, Nhật Bản."
    ]
  },
  {
    id: "CH-NN-002",
    name: "Nghệ nhân Ưu tú Minh Mẫn (1925 - 2017)",
    category: "Nghệ nhân & Cộng đồng",
    shortDescription: "Giọng ca huyền thoại của Ca Huế thính phòng thế kỷ XX, sở hữu chất giọng trầm ấm, nén hơi và gõ phách chuẩn xác kỳ tài.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Khu vực Vỹ Dạ, thành phố Huế",
    culturalValue: "Được mệnh danh là 'kho tàng sống' các làn điệu Nam Ai, Nam Bình, Tứ Đại Cảnh cổ điển. Truyền thụ kỹ thuật gõ chén và phát âm nhả chữ chuẩn mực Cố đô.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-02",
      sourceTitle: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
      publisherOrAuthor: "Sở Văn hóa và Thể thao Thừa Thiên Huế",
      url: "https://vhtt.thuathienhue.gov.vn",
      citationDetail: "Hồ sơ nghệ nhân ưu tú: Cụ Minh Mẫn - Đệ nhất giọng ca Ca Huế, tr. 182-185",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-06-05",
    image: "/images/authentic/canuong_cahue_dienxuong.jpg",
    imageCaption: "Ảnh tư liệu: Danh ca ca nương diễn xướng Ca Huế cổ truyền trong tà áo dài truyền thống cùng phách nhịp (Ảnh: Lê Tấn Lộc / Wikimedia Commons)"
  },
  {
    id: "CH-NN-003",
    name: "Câu lạc bộ Ca Huế Truyền Thống & Cộng Đồng Nghệ Nhân Sở VHTT",
    category: "Nghệ nhân & Cộng đồng",
    shortDescription: "Cộng đồng những nghệ nhân, nhạc công và ca nhi kỳ cựu sinh hoạt gìn giữ lối ca thính phòng mộc nguyên bản tại Cố đô.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Thành phố Huế",
    culturalValue: "Không gian thực hành di sản sống, tổ chức các đêm hòa đàn học thuật phi thương mại nhằm duy trì tính nguyên gốc của 60 bài bản Ca Huế cổ truyền.",
    verificationStatus: "Đã xác minh",
    sourceReference: {
      sourceId: "SRC-02",
      sourceTitle: "Hồ sơ khoa học Di sản Văn hóa Phi vật thể: Nghệ thuật Ca Huế",
      publisherOrAuthor: "Sở Văn hóa và Thể thao Thừa Thiên Huế",
      url: "https://vhtt.thuathienhue.gov.vn",
      citationDetail: "Phần V: Thực trạng cộng đồng thực hành di sản Ca Huế tại địa phương, tr. 204",
      sourceType: "Tư liệu sở ban ngành"
    },
    updatedAt: "2025-07-12",
    image: "/images/authentic/clb_cahue_thinhphong_setting.jpg",
    imageCaption: "Ảnh tư liệu: Không gian sinh hoạt thính phòng mộc truyền thống của Câu lạc bộ Ca Huế và các nghệ nhân tri âm tại Cố đô (Ảnh: NguCung12 / Wikimedia Commons)"
  },
  {
    id: "CH-BB-008",
    name: "Bài bản 'Long Điệp' (Bướm vờn rồng) - Khảo cứu bản ký âm phủ đệ",
    category: "Bài bản & Điệu thức",
    musicalMode: "Hơi Thiền / Hơi Dựng",
    shortDescription: "Bài bản thính phòng hiếm gặp, nhịp phách uyển chuyển, được ghi nhận trong một số sổ tay ký âm chép tay của các nho sĩ thời Tự Đức.",
    locationCurrent: "Thành phố Huế, Thừa Thiên Huế",
    locationHistoric: "Tư thất Nho gia làng Gia Viên",
    culturalValue: "Là tư liệu quý đang trong quá trình thẩm định giai điệu để phục hồi vào hệ thống bài bản chính thống.",
    verificationStatus: "Cần xác minh nguồn",
    sourceReference: {
      sourceId: "SRC-07",
      sourceTitle: "Tư liệu điền dã khảo cứu âm nhạc Cố đô",
      publisherOrAuthor: "Nhóm nghiên cứu độc lập văn hóa Huế",
      citationDetail: "Bản sao chép tay năm 1942 - Đang đối chiếu với bản lưu của Viện Hán Nôm",
      sourceType: "Nguồn sơ cấp"
    },
    updatedAt: "2025-08-01",
    image: "/images/authentic/baotang_covat_dienlongan.jpg",
    imageCaption: "Ảnh di tích: Điện Long An - Bảo tàng Cổ vật Cung đình Huế, nơi bảo tồn bản ký âm cổ và nhạc khí triều Nguyễn (Wikimedia Commons)",
    performanceRole: "Đang phục chế thử nghiệm trong nội bộ câu lạc bộ học thuật.",
    notesForVerification: "Cần xác minh nguồn: Chưa có bản ghi âm đối chứng của các nghệ nhân tiền bối trước năm 1975. Bản ký âm đang gửi Hội đồng Khoa học Viện Âm nhạc thẩm định."
  }
];

export const SPACE_COMPARISON_DATA: SpaceComparisonItem[] = [
  {
    criterion: "1. Không gian & Quy mô",
    chamberTraditional: "Không gian nhỏ, kín và tĩnh mịch: nhà rường cổ, tư gia danh gia vọng tộc hoặc phủ đệ. Số lượng người thưởng ngoạn rất ít (khoảng 10 - 25 người).",
    tourismModern: "Không gian mở trên thuyền rồng di chuyển dọc sông Hương hoặc sân khấu lễ hội. Số lượng khán giả đông (30 - 60 khách/thuyền), thường xuyên có tiếng ồn ngoại cảnh.",
    notes: "Quy mô thính phòng quyết định độ tập trung và sự giao cảm tinh vi."
  },
  {
    criterion: "2. Hệ thống Âm thanh",
    chamberTraditional: "Hoàn toàn dùng âm thanh mộc (Acoustic tự nhiên). Thớ gỗ nhà rường đóng vai trò cộng hưởng, người nghe cảm nhận rõ từng tiếng vuốt phím, tiếng nén hơi của ca nhi.",
    tourismModern: "Bắt buộc sử dụng micro và loa tăng âm công suất lớn để át tiếng động cơ thuyền máy và gió sông. Làm méo giảm độ mộc và vi phân âm của nhạc cụ dây.",
    notes: "Âm thanh mộc là tiêu chuẩn vàng của nhạc thính phòng thế giới."
  },
  {
    criterion: "3. Mối quan hệ Ca - Thính giả",
    chamberTraditional: "Quan hệ 'Tri âm - Tri kỷ'. Người nghe am hiểu âm luật, biết nghe từng chữ đờn, có thể gõ chén hoặc trống chầu điểm phách tán thưởng đúng lúc.",
    tourismModern: "Quan hệ 'Người biểu diễn - Khách du lịch'. Khách chủ yếu nghe để biết văn hóa, ít am hiểu lề lối bài bản, xem như một tiết mục giải trí trong tour.",
    notes: "Tính chất giao hòa tâm tưởng bị biến đổi thành hoạt động dịch vụ."
  },
  {
    criterion: "4. Hệ thống Bài bản & Lời ca",
    chamberTraditional: "Trình diễn trọn vẹn các đại khúc quy chuẩn (Tứ Đại Cảnh, Nam Ai, Nam Bình, Cổ Bản, Liên hoàn Bắc...) với thời lượng kéo dài từ chiều tối sang khuya.",
    tourismModern: "Thời lượng gói gọn 45 - 60 phút. Các bài bản bị cắt ngắn, tăng cường hò Huế đối đáp, dân ca hoặc trích đoạn vui nhộn để tạo không khí náo nhiệt.",
    notes: "Rút ngắn bài bản dẫn đến nguy cơ mai một các chương hồi phức tạp."
  },
  {
    criterion: "5. Biên chế Dàn nhạc",
    chamberTraditional: "Chuẩn mực Ngũ tuyệt (Nguyệt, Tranh, Tỳ, Nhị, Tam) hoặc Tứ tuyệt. Các nhạc công đều là bậc thầy ngón đàn, nương tựa nhau qua lối đàn Cầm Canh.",
    tourismModern: "Thường tinh giản thành 3-4 nhạc cụ, đôi khi nhạc công trẻ chưa đạt độ chín về kỹ thuật ngẫu hứng chữ đờn do áp lực phục vụ nhiều ca diễn liên tục.",
    notes: "Cần chính sách hỗ trợ để duy trì nghệ nhân cao tuổi diễn tấu nguyên bản."
  },
  {
    criterion: "6. Mục đích & Tâm thế",
    chamberTraditional: "Nuôi dưỡng tinh thần, thanh lọc tâm hồn, đàm đạo triết lý nhân sinh giữa những người đồng điệu.",
    tourismModern: "Phổ biến quảng bá văn hóa địa phương đến du khách bốn phương và tạo sinh kế cho anh chị em nghệ sĩ.",
    notes: "Cả hai hình thức đều có giá trị riêng nếu được định vị và quản lý minh bạch."
  }
];
