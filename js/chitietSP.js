var app = angular.module("myapp", []);


app.controller('myctrl', function ($scope) {
  $scope.product = {
    image: 'MS021.jpg',
    name: 'Sen đá',
    info: 'Cây sen đá hay còn gọi là Liên đài, hoa đá (Tên tiếng Anh là Succulent) là loài rất dễ sống, phát triển chậm và sống lâu, không đòi hỏi được chăm sóc thường xuyên. Sen đá là giống cây nhỏ, gần như không có thân mà chỉ thấy lá, là giống cây mọng nước và đặc biệt lá thường xếp thành hình như những bông hoa, nhất là hoa sen. Loài cây này ưa mọc trên đá, sỏi, nhưng nơi khô cằn nên mới được gọi là hoa sen đá.  Bên cạnh đó, hoa sen đá rất dễ trồng, nó có thể thích nghi với mọi loại khí hậu, mọi địa hình và sống quanh năm, khi lá rụng có thể nảy chồi từ đó và mọc lên cây mới. Chính vì thế cây sen đá mang ý nghĩa về một tình yêu bền chặt, trọn đời, vĩnh cửu không thay đổi... ',
    note: 'Giá sản phẩm đã bao gồm chậu',
    price: '19000'
  };
  
  $scope.max = "20";

  $scope.tinhtien = function () {
    $scope.tongtien = $scope.product.price * $scope.number;
  };
});