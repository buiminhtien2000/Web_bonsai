var adminApp = angular.module("adminApp", ["ngRoute"]);
const path = "http://localhost:8080/Web_bonsai";//link server
var urlUploadFile = "http://127.0.0.1:5500/update/";

/*---------------------routing---------------------*/
adminApp.controller("managerProduct", function ($scope, $http,
	$routeParams) {
		
	$scope.products = [];
	$scope.product = [];
	$scope.form = {
		id: -1,
		productName: "",
		price: 0,
		category: "",
		note: "",
		description: "",
		quantity: 0,
		pictureProduct: "",
	};
	$scope.fileUpload = {
		fileName: "",
		base64: "",
		root: ""
	}
	/*---------API_ADDPRODUCT------------*/
	$scope.addProduct = function () {
		console.log($scope.form.price)
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		$scope.uploadFileAPI();
		$http({
			method: "POST",
			url: path + "/api/manager_product.json",
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
		
	}
	/*----------------apiUploadFile-----------------*/
	$scope.uploadFileAPI = function () {
		/*-------------------convertBase64----------------*/
		//lấy giá trị của file
		var selectedFile = document.getElementById("inputFile").files;
		//kiểm tra file có giá trị không
		if (selectedFile.length > 0) {
			//lấy phần tử của file
			var fileToLoad = selectedFile[0];
			$scope.form.pictureProduct = fileToLoad.name;
			$scope.fileUpload.fileName = fileToLoad.name;
			// khởi tạo fileReader để đọc giá trị file
			var fileReader = new FileReader();
			//set giá trị pictureProduct trong mảng form
			$scope.form.pictureProduct = fileToLoad.name;
			$scope.fileUpload.root = urlUploadFile;
			fileReader.addEventListener("load", function (e) {
				//convert giá trị file sang base64
				var basefile = e.target.result;
				$scope.fileUpload.base64 = basefile.split(",")[1];
				$scope.fileUpload.fileName = fileToLoad.name;
			}, false);
			// Convert data sang base64
			if (fileToLoad) {
				fileReader.readAsDataURL(fileToLoad);
			}
		}
		$http({
			method: "POST",
			//url gọi api
			url: path + "/api/uploadFile.json",
			data: angular.toJson($scope.fileUpload),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}
	
	/*-----------------API_UPDATEPRODUCT---------------------*/
	$scope.UpdateProduct = function () {
		console.log($scope.products[0].pictureProduct);
		$scope.form.productName = document.getElementById('productName').value;
		$scope.form.price = Number(document.getElementById('price').value);
		$scope.form.category = document.getElementById('category').value;
		$scope.form.note = document.getElementById('note').value;
		$scope.form.quantity = Number(document.getElementById('quantity').value);
		$scope.form.description = document.getElementById('description').value;
		var fileUpload = document.getElementById('inputFile').files;
		if(fileUpload.length == 0){
			$scope.form.pictureProduct = document.getElementById('pictureProduct').value;
		}else{
			$scope.uploadFileAPI();
		}
		$http({
			method: "PUT",
			url: path + "/api/manager_product.json?id="+$routeParams.id,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}

	/*-----------------API_DeleteProduct---------------------*/
	$scope.deleteProduct = function(id) {
		console.log(id)
		$http({
			method: "DELETE",
			url: path + "/api/manager_product.json?id="+id
		}).then(_success, _error);
	}

	/*-----------------API_Select---------------------*/
	
	$scope.findByName = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByName.json?name='+name
		}).then(function successCallback(response) {
			$scope.product = response.data;
			console.log($scope.products)
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.findByCategory = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByCategory.json?category='
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.findByID = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductId.json?id='+$routeParams.id
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	_refreshPageData();
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllProduct.json'
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	/*------------END-----------*/


	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.productName = "";
		$scope.form.price = 0;
		$scope.form.category = "";
		$scope.form.note = "";
		$scope.form.description = "";
		$scope.form.quantity = 0;
		document.getElementById("inputFile").value = "";
	};
});

/*--------------managerUser--------------*/
adminApp.controller("managerUser", function ($scope, $http) {
	$scope.users = [];
	$scope.form = {
		id: -1,
		name: "",
		account: "",
		password: "",
		birthDay: "",
		phoneOrEmail: "",
		adress: "",
		picture: "",
		position: 0,
	};
	$scope.mesenger ="";
	$scope.displayMessenger = "false";
	_refreshPageData();
	$scope.loginUser=[];
	$scope.loginUser= angular.fromJson(localStorage.getItem('sessionUser'));
	console.log($scope.loginUser.name)
	$scope.logout = function(){
		window.open(location.origin+"/index.html#!", "_self");
		localStorage.removeItem("sessionUser");
	}
	$scope.addUser = function () {
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		var birthday = document.getElementById("birthday").valueAsDate;
		$scope.form.birthDay = birthday.toISOString();
		$http({
			method: "POST",
			url: path + "/api/manager_user.json",
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}
	$scope.updateUser = function () {
		//lấy giá trị từ các trường gán cho mảng form
		var idUser = document.getElementById('idUser').value;
		$scope.form.name = document.getElementById('name').value;
		$scope.form.password = document.getElementById('password').value;
		$scope.form.birthDay = document.getElementById('birthday').value;
		$scope.form.phoneOrEmail = document.getElementById('phoneOrEmail').value;
		var fileUpload = document.getElementById('inputFile').files;
		if(fileUpload.length == 0){
			$scope.form.pictureProduct = document.getElementById('pictureProduct').value;
		}else{
			$scope.uploadFileAPI();
		}
		$http({
			method: "PUT",
			url: path + "/api/manager_user.json?id="+idUser,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success(){
			$scope.mesenger = "Cập Nhật Thành Công!";
			$scope.displayMessenger="true";
		}, function error(){
			$scope.mesenger = "Cập Nhật Thất Bại";
			$scope.displayMessenger="false";
		});
	}
	$scope.uploadFileAPI = function () {
		/*-------------------convertBase64----------------*/
		//lấy giá trị của file
		var selectedFile = document.getElementById("inputFile").files;
		//kiểm tra file có giá trị không
		if (selectedFile.length > 0) {
			//lấy phần tử của file
			var fileToLoad = selectedFile[0];
			$scope.form.pictureProduct = fileToLoad.name;
			$scope.fileUpload.fileName = fileToLoad.name;
			// khởi tạo fileReader để đọc giá trị file
			var fileReader = new FileReader();
			//set giá trị pictureProduct trong mảng form
			$scope.form.pictureProduct = fileToLoad.name;
			$scope.fileUpload.root = urlUploadFile;
			fileReader.addEventListener("load", function (e) {
				//convert giá trị file sang base64
				var basefile = e.target.result;
				$scope.fileUpload.base64 = basefile.split(",")[1];
				$scope.fileUpload.fileName = fileToLoad.name;
			}, false);
			// Convert data sang base64
			if (fileToLoad) {
				fileReader.readAsDataURL(fileToLoad);
			}
		}
		$http({
			method: "POST",
			//url gọi api
			url: path + "/api/uploadFile.json",
			data: angular.toJson($scope.fileUpload),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}
	$scope.deleteUser = function () {
		$http({
			method: "DELETE",
			url: path + "/api/manager_user.json?id=" + $scope.form.id,
		}).then(_success, _error);
	}
	function findByName() {
		var textSearxh = document.getElementById('textSearch').value;
		$http({
			method: 'GET',
			url: path + '/api/selectUserByName.json?name=' + textSearch
		}).then(function successCallback(response) {
			$scope.users = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function findById() {
		$http({
			method: 'GET',
			url: path + '/api/selectUserByID.json'
		}).then(function successCallback(response) {
			$scope.users = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllUser.json'
		}).then(function successCallback(response) {
			$scope.users = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.price = 0;
		$scope.form.category = "";
		$scope.form.note = "";
		$scope.form.description = "";
		$scope.form.quantity = 0;
		document.getElementById("inputFile").value = "";
	};
});

/*--------------managerBill---------*/
adminApp.controller("managerBill", function ($scope, $http) {
	$scope.Bill = [];
	$scope.form = {
		id: -1,
		idUser: 0,
		idProduct: 0,
		status: "",
		quantity: 0,
		totalMoney: "",
	};

	_refreshPageData();

	$scope.submitUser = function () {
		var method = "";
		var url = "";
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		if ($scope.form.id == -1) {
			method = "POST";
			url = path + "/api/manager_bill.json";
		} else {
			method = "PUT";
			url = path + "/api/manager_bill.json";
		}
		$http({
			method: method,
			url: url,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}
	$scope.deleteBill = function () {
		$http({
			method: "DELETE",
			url: path + "/api/manager_bill.json" + $scope.form.id,
		}).then(_success, _error);
	}
	function findById() {
		$http({
			method: 'GET',
			url: path + '/api/selectBillById.json?idUser='
		}).then(function successCallback(response) {
			$scope.Bill = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllUser.json'
		}).then(function successCallback(response) {
			$scope.Bill = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.name = "";
		$scope.form.account = "";
		$scope.form.password = "";
		$scope.form.birthDay = "";
		$scope.form.phoneOrEmail = "";
		$scope.form.adress = "";
		$scope.form.picture = "";
		$scope.form.position = "";
	};
});

/*--------------managerDiscount---------*/
adminApp.controller("managerDiscount", function ($scope, $http) {
	$scope.discounts = [];
	$scope.form = {
		id: "",
		percentDiscount: "",
		Date: ""
	};

	_refreshPageData();

	$scope.submitDiscount = function () {
		var method = "";
		var url = "";
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		if ($scope.form.id == "") {
			method = "POST";
			url = path + "/api/manager_discount.json";
		} else {
			method = "PUT";
			url = path + "/api/manager_discount.json";
		}
		$http({
			method: method,
			url: url,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}
	$scope.deleteDiscount = function () {
		$http({
			method: "DELETE",
			url: path + "/api/manager_discount.json"
		}).then(_success, _error);
	}
	function findById() {
		$http({
			method: 'GET',
			url: path + '/api/selectDiscountById.json?idUser='
		}).then(function successCallback(response) {
			$scope.discounts = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllDiscount.json'
		}).then(function successCallback(response) {
			$scope.discounts = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.percentDiscount = "";
		$scope.form.Date = "";
	};
});

/*--------------managerComment---------*/
adminApp.controller("managerComment", function ($scope, $http) {
	$scope.Comment = [];
	$scope.form = {
		id: -1,
		userName: "",
		phoneOrEmail: 0,
		content: ""
	};

	_refreshPageData();

	$scope.submitComment = function () {
		var method = "";
		var url = "";
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		if ($scope.form.id == -1) {
			method = "POST";
			url = path + "/api/manager_comment.json";
		} else {
			method = "PUT";
			url = path + "/api/manager_comment.json";
		}
		$http({
			method: method,
			url: url,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}
	$scope.deleteComment = function () {
		$http({
			method: "DELETE",
			url: path + "/api/manager_comment.json" + $scope.form.id,
		}).then(_success, _error);
	}
	function findById() {
		$http({
			method: 'GET',
			url: path + '/api/selectCommentByName.json?userName='
		}).then(function successCallback(response) {
			$scope.discounts = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllComment.json'
		}).then(function successCallback(response) {
			$scope.discounts = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.userName = "";
		$scope.form.phoneOrEmail = "";
		$scope.form.content = "";
	};
});
adminApp.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "../admin/listProduct.html"
		})
		.when("/addProduct", {
			templateUrl: "../admin/addProduct.html"
		})
		.when("/updateProduct/:id", {
			templateUrl: "../admin/updateProduct.html"
		})
		.when("/listProduct", {
			templateUrl: "../admin/listProduct.html"
		})
		.when("/managerComment", {
			templateUrl: "../admin/managerComment.html"
		})
		.when("/managerBill", {
			templateUrl: "../admin/managerBill.html"
		})
		.when("/updateAccount", {
			templateUrl: "../admin/updateAccount.html"
		})
		.when("/managerAccount", {
			templateUrl: "../admin/managerAccount.html"
		})
});
