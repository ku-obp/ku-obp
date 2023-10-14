export const validateName = (name: string) => {
  return /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]+$/.test(name);
};
export const validateNickname = (name: string) => {
  return /^[A-Za-z가-힣0-9]{2,16}$/.test(name);
};
export const validatePhone = (phone: string) => {
  return /^[0-9]{11}$/.test(phone);
};
export const validateBirth = (birth: string) => {
  return /^[0-9]{8}$/.test(birth);
};
export const validateEmail = (email: string) => {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
};
export const validateID = (id: string) => {
  return /^[a-z0-9_-]{4,20}$/.test(id);
};
export const validatePW = (pw: string) => {
  return /^[a-zA-Z\d@!#$%^&*]{4,16}$/.test(pw);
};
export const validateConfirm = (pw1: string, pw2: string) => {
  return pw1 === pw2;
};
export const isAdult = (birthDateString: string) => {
  const birthYear = parseInt(birthDateString.substr(0, 4));
  const birthMonth = parseInt(birthDateString.substr(4, 2));
  const birthDay = parseInt(birthDateString.substr(6, 2));

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let age = currentYear - birthYear;

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age -= 1;
  }

  return age >= 19;
};
