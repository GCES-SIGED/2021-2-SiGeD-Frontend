import regexList from "./regexList";

export const validateEmail = (email) => {
  return regexList.email.test(email);
};

export const validateName = (name) => {
  return regexList.name.test(name)
};

export const validateCpf = (cpf) => {
  return regexList.cpf.test(cpf);
};

export const validatePhone = (phone) => {
  return regexList.phone.test(phone);
};

export const validatePassword = (pass) => {
  if (pass.length >= 6) {
    return true;
  }
  return false;
};

export const confirmPassword = (pass1, pass2) => {
  if (pass2 === pass1) {
    return true;
  }
  return false;
};

export const validateSignUp = (email, name) => {
  if (validateName(name)
    && validateEmail(email)) {
    return true;
  }
  return false;
};

export const validateFields = (inputName, inputEmail, inputCpf,
  inputPhone, inputSecondaryPhone) => {
  const message = [];

  if (validateName(inputName) === false) {
    message.push('Nome inválido.');
  } if (validateCpf(inputCpf) === false) {
    message.push('CPF inválido. Utilize somente os digitos.');
  } if (validateEmail(inputEmail) === false) {
    message.push('Email inválido.');
  } if (validatePhone(inputPhone) === false) {
    message.push('Telefone inválido. Minimo de 10 digitos');
  } if (validatePhone(inputSecondaryPhone) === false) {
    message.push('Telefone secundario inválido. Minimo de 10 digitos');
  }

  return message;
};

export const validateOpen = (open) => {
  return regexList.toggle.test(open);
};
