
function show_menu(){
	var menu = document.getElementById('hiddenMenus');
	console.log(menu);
	menu.style.display = "block";
	fullScreen.classList.remove('col-xl-12');
	fullScreen.classList.add('col-xl-10');
}
function show_hidden(){
	var menu = document.getElementById('hiddenMenus');
	var fullScreen = document.getElementById('fullScreen');
	menu.style.display = "none";
	fullScreen.classList.remove('col-xl-10');
	fullScreen.classList.add('col-xl-12');
}