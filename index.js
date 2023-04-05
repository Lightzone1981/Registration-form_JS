import { fieldsArr } from "./fields-constant.js";
import {
	handlerInputName,
	handlerInputSurname,
	handlerInputBirthday,
	handlerInputEmail,
	handlerInputPassword,
	handlerInputPasswordConfirm,
	handlerSubmit,
} from "./handlers.js";

const createInputField = (type, id, isRequire, placeholder) => {
	const inputField = document.createElement("div");
	inputField.className = "registration-form__field";

	const input = document.createElement("input");
	input.type = type;
	input.className = "registration-form__input";
	input.id = id;
	input.placeholder = placeholder;

	if (placeholder) {
		const label = document.createElement("label");
		label.className = "registration-form__label";
		label.innerHTML = placeholder;
		inputField.append(label);
	}

	if (id === "password-confirm-input") {
		input.disabled = true;
	}

	inputField.append(input);

	if (isRequire) {
		input.setAttribute("required", true);
		const inputError = document.createElement("p");
		inputError.className = "registration-form__error";
		inputError.id = `${id}-error`;
		inputField.append(inputError);
	}
	return inputField;
};

const root = document.getElementById("root");

const wrapper = document.createElement("div");
wrapper.className = "wrapper";
root.append(wrapper);

const registrationForm = document.createElement("form");
registrationForm.className = "registration-form";
const registrationFormTitle = document.createElement("p");
registrationFormTitle.className = "registration-form__title";
registrationFormTitle.innerHTML = "Registration";
registrationForm.append(registrationFormTitle);

fieldsArr.forEach((el) => {
	registrationForm.append(
		createInputField(el.type, el.id, el.isRequire, el.placeholder)
	);
});

wrapper.append(registrationForm);

export const inputNodes = {};
fieldsArr.forEach((el) => {
	inputNodes[el.id] = document.querySelector(`#${el.id}`);
});

inputNodes["name-input"].oninput = handlerInputName;
inputNodes["surname-input"].oninput = handlerInputSurname;
inputNodes["birthday-input"].oninput = handlerInputBirthday;
inputNodes["email-input"].oninput = handlerInputEmail;
inputNodes["password-input"].oninput = handlerInputPassword;
inputNodes["password-confirm-input"].oninput = handlerInputPasswordConfirm;

inputNodes["submit-input"].value = "Sign in";
inputNodes["submit-input"].onclick = (e) => handlerSubmit(e, inputNodes);
