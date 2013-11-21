
function validatePassword(){
	var element1 = document.getElementById("password1");
	var element2 = document.getElementById("password2");
	if (element1.value !== element2.value)
		element2.setCustomValidity("Passwords do not match");
	else 
		element2.setCustomValidity("");
}

function validateEmail(){
	var element = document.getElementById("email");
	var email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
	if (!element.value.match(email))
		element.setCustomValidity("Incorrect email address");
	else 
		element.setCustomValidity("");
}

function validateUsername(){
	var element = document.getElementById("user");
	//TODO: send to server and check if username exists
	var exists = false;
	if (exists)
		element.setCustomValidity("Username already exists");
	else {
		element.setCustomValidity("");
	}
}

function sendForm(){
	var username = document.getElementById("user").value;
	var password = document.getElementById("password1").value;
	var email = document.getElementById("email").value;
	//TODO: send to the server

	goToMainPage();
}

function validateUser(){
	var username = document.getElementById("user");
	var password = document.getElementById("password");
	var error = document.getElementById("error");
	//TODO check username
	var exists = false;
	if (username.checkValidity() && password.checkValidity()){
		if (!exists && !checkPassword()){
			error.innerHTML = "Invalid username and/or password";
			return false;
		}
		
	}	
}

function checkPassword(){
	var password = document.getElementById("password").value;
	var correct = false;
	//TODO check password
	return correct;
}

function goToMainPage(){
	window.location.href = "main.html";
}