var CORRECT_USER = 'thanh';
var CORRECT_PASS = '123';

var inputUsername = document.getElementById('username');
var inputPassword = document.getElementById('password');

var formLogin = document.getElementById('login');
if(formLogin.attachEvent){
    formLogin.attachEvent('submit', onFormSubmit);
}else{
    formLogin.addEventListener('submit', onFormsubSubmit);
}

function onFormsubSubmit(e){
        var username = inputUsername.value;
        var password = inputPassword.value;

        if(username == CORRECT_USER && password == CORRECT_PASS){
            alert('Dang nhap thanh cong!');
        }else{
            alert('That bai trong qua trinh dang nhap');
        }
}

var formRegister = document.getElementById('register');
if(formRegister.attachEvent){
    formRegister.attachEvent('submit', onFormSubmit);
}else{
    formRegister.addEventListener('submit', checkRegister);
}

