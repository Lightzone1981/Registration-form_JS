const checkInputDate = (inputDate) => {
	const inputDateArr = inputDate.split("-");
	const currentDateArr = new Date().toLocaleDateString().split(".");

	if (+inputDateArr[0] < +currentDateArr[2]) {
		return true;
	} else if (
		+inputDateArr[0] === +currentDateArr[2] &&
		+inputDateArr[1] < +currentDateArr[1]
	) {
		return true;
	} else if (
		+inputDateArr[0] === +currentDateArr[2] &&
		+inputDateArr[1] === +currentDateArr[1] &&
		+inputDateArr[2] <= +currentDateArr[0]
	) {
		return true;
	}
	return false;
};

const showError = (node, nodeError, error) => {
	node.setAttribute("invalid", "");
	node.removeAttribute("filled");
	nodeError.innerHTML = error;
};

const hideError = (node, nodeError) => {
	node.removeAttribute("invalid");
	nodeError.innerHTML = "";
	if (node.value.length) {
		node.setAttribute("filled", "");
	}
};

export const handlerInputName = () => {
	const node = document.getElementById("name-input");
	const nodeError = document.getElementById("name-input-error");

	if (node.value.length === 1) {
		showError(node, nodeError, "Name must contain at least two letters");
		return;
	} else hideError(node, nodeError);

	if (node.value.length > 25) {
		showError(node, nodeError, "Name must not exceed 25 characters");
		return;
	} else hideError(node, nodeError);
};

export const handlerInputSurname = () => {
	const node = document.getElementById("surname-input");
	const nodeError = document.getElementById("surname-input-error");

	if (node.value.length === 1) {
		showError(node, nodeError, "Surname must contain at least two letters");
		return;
	} else hideError(node, nodeError);

	if (node.value.length > 25) {
		showError(node, nodeError, "Surname must not exceed 25 characters");
		return;
	} else hideError(node, nodeError);
};

export const handlerInputBirthday = () => {
	const node = document.getElementById("birthday-input");
	const nodeError = document.getElementById("birthday-input-error");
	const inputDate = node.value;

	if (!checkInputDate(inputDate)) {
		showError(node, nodeError, "Incorrect date of birth");
	} else hideError(node, nodeError);
};

export const handlerInputEmail = () => {
	const node = document.getElementById("email-input");
	const nodeError = document.getElementById("email-input-error");

	if (
		(node.value && node.value.indexOf("@") === -1) ||
		node.value.indexOf("@") !== node.value.lastIndexOf("@")
	) {
		showError(node, nodeError, "Incorrect email");
	} else hideError(node, nodeError);
};

export const handlerInputPassword = () => {
	const node = document.getElementById("password-input");
	const confirmationNode = document.getElementById("password-confirm-input");
	const nodeError = document.getElementById("password-input-error");

	if (node.value && node.value.length < 8) {
		showError(node, nodeError, "Enter at least 8 characters");
		confirmationNode.setAttribute("disabled", "");
		return;
	} else {
		hideError(node, nodeError);
		if (node.value.length) confirmationNode.removeAttribute("disabled", "");
	}

	const regexp = /[0-9]/i;
	if (
		node.value &&
		!node.value
			.split("")
			.filter((el) => el.toUpperCase() === el && !regexp.test(el)).length
	) {
		showError(node, nodeError, "Enter at least one uppercase character");
		confirmationNode.setAttribute("disabled", "");
		return;
	} else {
		hideError(node, nodeError);
		if (node.value.length) confirmationNode.removeAttribute("disabled", "");
	}

	if (node.value && !regexp.test(node.value)) {
		showError(node, nodeError, "Enter at least one digital");
		confirmationNode.setAttribute("disabled", "");
		return;
	} else {
		hideError(node, nodeError);
		if (node.value.length) confirmationNode.removeAttribute("disabled", "");
	}

	const regexp2 = /[!@#$%]/i;
	if (node.value && !regexp2.test(node.value)) {
		showError(node, nodeError, "Enter at least one of characters: !@#$%");
		confirmationNode.setAttribute("disabled", "");
		return;
	} else {
		hideError(node, nodeError);
		if (node.value.length) confirmationNode.removeAttribute("disabled", "");
	}
};

const showMessage = (message) => {
	const root = document.getElementById("root");
	const messageContainer = document.createElement("div");
	messageContainer.className = "message";

	const messageText = document.createElement("p");
	messageText.className = "message__text";
	messageText.innerHTML = message;

	const messageButton = document.createElement("button");
	messageButton.className = "message__button";
	messageButton.innerHTML = "OK";

	messageContainer.append(messageText, messageButton);
	root.append(messageContainer);

	messageButton.addEventListener("click", () => {
		messageContainer.remove();
	});
};

export const handlerInputPasswordConfirm = () => {
	const node = document.getElementById("password-confirm-input");
	const passwordNode = document.getElementById("password-input");
	const nodeError = document.getElementById("password-confirm-input-error");

	if (node.value.length && passwordNode.value !== node.value) {
		showError(node, nodeError, "Failed password confirmation");
		return;
	} else {
		hideError(node, nodeError);
	}
};

const postData = async (URL, data) => {
	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		console.log(JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};

export const handlerSubmit = (e, inputNodes) => {
	e.preventDefault();
	if (
		inputNodes["name-input"].hasAttribute("filled") &&
		inputNodes["surname-input"].hasAttribute("filled") &&
		inputNodes["birthday-input"].hasAttribute("filled") &&
		inputNodes["email-input"].hasAttribute("filled") &&
		inputNodes["password-input"].hasAttribute("filled") &&
		inputNodes["password-confirm-input"].hasAttribute("filled")
	) {
		const URL = "https://jsonplaceholder.typicode.com/posts";
		const data = {
			name: inputNodes["name-input"].value,
			surname: inputNodes["surname-input"].value,
			birthday: inputNodes["birthday-input"].value,
			email: inputNodes["email-input"].value,
			password: inputNodes["password-input"].value,
		};
		postData(URL, data);
		showMessage(`${data.name}, thank you for registration!`);
	} else showMessage("Enter all data correctly, please");
};
