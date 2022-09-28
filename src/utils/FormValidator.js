class FormValidator {
  constructor(obj, formElement, name) {
    this._obj = obj;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(`.${name}__${obj.inputSelector}`));
    this._buttonElement = formElement.querySelector(`.${name}__${obj.submitButtonSelector}`);
    this._name = name;
  };

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.error__${inputElement.id}`);
    inputElement.classList.add(`${this._name}__${this._obj.inputErrorClass}`);
    errorElement.classList.add(`${this._name}__${this._obj.errorClass}`);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.error__${inputElement.id}`);
    inputElement.classList.remove(`${this._name}__${this._obj.inputErrorClass}`);
    errorElement.classList.remove(`${this._name}__${this._obj.errorClass}`);
  };
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _setButtonDisabled () {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(`${this._name}__${this._obj.inactiveButtonClass}`);
  };
  
  _removeButtonDisabled () {
    this._buttonElement.removeAttribute("disabled", true);
    this._buttonElement.classList.remove(`${this._name}__${this._obj.inactiveButtonClass}`);
  };
  
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._setButtonDisabled();
    } else {
      this._removeButtonDisabled();
    };
  };
  
  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  
  enableValidation () {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};

const searchForm = {
  formSelector: "form",
  inputSelector: "input",
  submitButtonSelector: "button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "input_error",
  errorClass: "error_active",
};

export const validateForm = (name) => {
  const formOpened = document.querySelector(`.${name}__form`);
  const form = new FormValidator(searchForm, formOpened, name);
  form.enableValidation();
  form._setButtonDisabled();
};
