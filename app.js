//Element selectors

const wrapper = document.querySelector(".wrapper");
const input = document.querySelector("#length");
const genBtn = document.querySelector("#generate");
const radioBtns = document.querySelectorAll(".radioBtn");
const radioBtnInner = document.querySelectorAll(
  ".radio-btn label .custom-radio div"
);
const checkbox = document.querySelector("#checkbox");
const checkboxDiv = document.querySelector(".uppercase-toggle");
const popUp = document.querySelector(".pop-up-container");
const displayField = document.querySelector("#randomPass");
const closeTxt = document.querySelector(".close-txt");
const closeIcon = document.querySelector(".close-icon");
const copyPass = document.querySelectorAll(".copy");
const changeOpt = document.querySelector(".opt-change");
const reGen = document.querySelector(".re-btn");
const copyMsg = document.querySelectorAll(".copied-msg");
const saveBtn = document.querySelector(".save");
const resetBtn = document.querySelector(".reset-btn");
const resetAll = document.querySelector(".reset-all");
const genStrongPass = document.querySelector("#generate-strong");
const validityDisplayDiv = document.querySelector(".pass-length-valid");
const symbolToggle = document.querySelector("#switch");
const savedPasswordsList = document.querySelector(".saved-passwords-list");
const savedPasswordsListSubContainer = document.querySelector(
  ".saved-passwords-list .saved-password"
);
const serialsUl = document.querySelector("#serials ul");
const datesUl = document.querySelector("#dates ul");
const optionsUl = document.querySelector("#options ul");
let passOpts, viewOpt, delOpt, noItemsMsg;
const savedPasswordViewBox = document.querySelector(".saved-password-view");
const savedPasswordDisplayField = document.querySelector("#randomPassDisplay");
const viewPassCloseTxt = document.querySelector(".view-pass-close-txt");
const viewPassCloseIcon = document.querySelector(".view-pass-close-icon");
const regenSave = document.querySelector(".re-btn-view");
const alertBoxElem = document.querySelector(".alert-box");
const alertBoxMsg = document.querySelector(".alert-box p");
const okBtn = document.querySelector(".ok-btn");

//Function definitions

function alertBox(msg, type = "normal") {
  wrapper.style.position = "absolute";
  alertBoxElem.classList.add("alert-box-toggle");
  // alertBoxElem.style.top = target.offsetTop;
  alertBoxMsg.textContent = msg;
  if (type === "error") {
    alertBoxElem.style.color = "red";
  } else {
    alertBoxElem.style.color = "green";
  }
}

function isNumeric(value) {
  return /^-{0,1}\d+$/.test(value);
}

function generatePassword(value = 20, radioBtnCheckedIndex = 0) {
  let str = "",
    randomString = "";
  const typeOfPass = ["Alphanumeric", "Numeric", "Letters"];
  if (typeOfPass[radioBtnCheckedIndex] === "Alphanumeric") {
    str = "abcdefghijklmnopqrstuvwxyz" + "0123456789";
  } else if (typeOfPass[radioBtnCheckedIndex] === "Numeric") {
    str = "0123456789";
  } else {
    str = "abcdefghijklmnopqrstuvwxyz";
  }
  if (checkbox.checked && !radioBtns[1].checked) {
    str = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${str}`;
  }
  if (symbolToggle.checked) {
    str = `${str}@#$!*/|$!%&?`;
  }
  let length = str.length;
  for (let i = 0; i < value; i++) {
    randomString =
      randomString + str.charAt(parseInt(Math.random() * length, 10));
  }
  return randomString;
}

function displayPassword(password) {
  displayField.value = password;
  popUp.classList.add("show-up");
  wrapper.style.position = "absolute";
}

function closePopUp() {
  popUp.classList.remove("show-up");
  wrapper.style.position = "static";
}

const LOCAL_STORAGE_PASSWORDS_KEY = "passwords.list";
let list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PASSWORDS_KEY)) || [];

function savePassword() {
  list.push({ dateCreated: renderDate(), password: displayField.value });
  localStorage.setItem(LOCAL_STORAGE_PASSWORDS_KEY, JSON.stringify(list));
  alertBox("Password saved", "normal");
  renderPasswords();
}

function renderDate() {
  const date = new Date();
  let hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    year = date.getFullYear(),
    todayDate = date.getDate(),
    monthIndex = date.getMonth(),
    amPm;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month = months[monthIndex];
  amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || hours;
  if (hours === 0) {
    hours = 12;
  }
  seconds = seconds <= 9 ? `0${seconds}` : `${seconds}`;
  minutes = minutes <= 9 ? `0${minutes}` : `${minutes}`;
  hours = hours <= 9 ? `0${hours}` : `${hours}`;
  return `${month} ${todayDate}, ${year} ${hours}:${minutes}:${seconds}${amPm}`;
}

function clearElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderPasswords(condition) {
  if (noItemsMsg) {
    try {
      savedPasswordsListSubContainer.removeChild(noItemsMsg);
    } catch (e) {}
  }
  clearElements(serialsUl);
  clearElements(datesUl);
  clearElements(optionsUl);
  if (list.length !== 0) {
    savedPasswordsList.style.display = "flex";

    //append serial no. title
    const headSno = document.createElement("li");
    headSno.classList.add("head");
    headSno.textContent = "S.No.";
    serialsUl.appendChild(headSno);

    //append date of its creation title
    const headDate = document.createElement("li");
    headDate.classList.add("head");
    headDate.textContent = "Date created";
    datesUl.appendChild(headDate);

    //append password title
    const headOpt = document.createElement("li");
    headOpt.classList.add("head");
    headOpt.textContent = "Options";
    optionsUl.appendChild(headOpt);

    for (let index = 0; index < list.length; index++) {
      //append serial no.
      const sno = document.createElement("li");
      sno.textContent = `${index + 1}.`;
      serialsUl.appendChild(sno);

      //append date of its creation
      const date = document.createElement("li");
      date.textContent = `${list[index].dateCreated}`;
      datesUl.appendChild(date);

      //append password
      const opt = document.createElement("li");
      opt.classList.add("opt-pass");
      opt.innerHTML = `<div class="view-opt">
      View<svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="eye"
        class="view"
        role="img"
        viewBox="0 0 576 512"
      >
        <path
          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
        ></path>
      </svg>
    </div>
    <div class="del-opt">
      Delete<svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="trash-alt"
        role="img"
        class="delete"
        viewBox="0 0 448 512"
      >
        <path
          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
        ></path>
      </svg>
    </div>`;
      optionsUl.appendChild(opt);
      passOpts = document.querySelectorAll(".opt-pass");
      (viewOpt = document.querySelectorAll(`.view-opt`)),
        (delOpt = document.querySelectorAll(`.del-opt`));
      viewDeleteFunctionality(viewOpt, delOpt);
    }
  } else if (list.length === 0 && condition === false) {
    savedPasswordsList.style.display = "none";
  } else if (list.length === 0 && condition === true) {
    noItemsMsg = document.createElement("h3");
    noItemsMsg.classList.add("no-items-to-show");
    noItemsMsg.textContent = "No saved passwords to show !";
    savedPasswordsListSubContainer.appendChild(noItemsMsg);
  }
}

renderPasswords(false);

function detectValid(cond, value) {
  if (value === "") {
    return "Input field cannot be empty";
  } else if (value.includes(".")) {
    return "Length of password cannot have a decimal point";
  } else if (value.includes("-")) {
    return "Length of password cannot be negative";
  } else if (parseInt(value) === 0) {
    return "Length of password cannot be zero";
  } else if (value > 50) {
    return "Please enter a valid number between 1 and 50";
  } else if (cond && !radioChecked) {
    return "Please choose type of password you want";
  } else if (cond && isNumeric(value)) {
    displayPassword(generatePassword(value, radioBtnCheckedIndex));
  } else if (!cond) {
    if (!/\D/.test(value) != true) {
      return "Please enter a valid number between 1 and 50";
    } else {
      return "";
    }
  } else {
    return "Please enter a valid number between 1 and 50";
  }
}

function detectStength(value) {
  if (value <= 5) {
    return "Password is too weak";
  } else if (value <= 9) {
    return "Password is weak";
  } else if (value <= 12) {
    return "Password is sufficient strong";
  } else if (value <= 15) {
    return "Password is strong";
  } else {
    return "Password is very strong";
  }
}

function viewDeleteFunctionality(viewOpt, delOpt) {
  viewOpt.forEach((view, viewIdx) => {
    view.addEventListener("click", viewPassword);
    view.idx = viewIdx;
  });
  delOpt.forEach((del, delIdx) => {
    del.addEventListener("click", deletePassword);
    del.idx = delIdx;
  });
}

function displaySavedPassword(password) {
  savedPasswordViewBox.classList.add("saved-password-view-toggled");
  savedPasswordDisplayField.value = password;
  wrapper.style.position = "absolute";
}

function viewPassword(e) {
  for (let j = 0; j < list.length; j++) {
    if (e.currentTarget.idx == j) {
      displaySavedPassword(list[j].password);
    }
  }
}

function deletePassword(e) {
  list = list.filter(
    (obj) => obj.password != list[e.currentTarget.idx].password
  );
  localStorage.setItem(LOCAL_STORAGE_PASSWORDS_KEY, JSON.stringify(list));
  renderPasswords(true);
}

function closeViewPassPopUp() {
  savedPasswordViewBox.classList.remove("saved-password-view-toggled");
  wrapper.style.position = "static";
}

function hasUpperCaseLetters(text) {
  for (let i = 65; i <= 90; i++) {
    if (text.includes(String.fromCharCode(i))) {
      return true;
    }
  }
}

function hasLowerCaseLetters(text) {
  for (let i = 97; i <= 122; i++) {
    if (text.includes(String.fromCharCode(i))) {
      return true;
    }
  }
}

function hasNumbers(text) {
  for (let i = 48; i <= 57; i++) {
    if (text.includes(String.fromCharCode(i))) {
      return true;
    }
  }
}

function hasSymbols(text) {
  matchString = "@#$!*/|$!%&?";
  for (let i = 0; i < matchString.length; i++) {
    if (text.includes(matchString.charAt(i))) {
      return true;
    }
  }
}

//Event listeners

input.addEventListener("focus", () => {
  input.addEventListener("input", (e) => {
    if (
      detectValid(false, input.value.trim()) ||
      detectValid(false, input.value.trim()) === ""
    ) {
      validityDisplayDiv.classList.add("displayValidity");
      validityDisplayDiv.textContent = detectValid(false, input.value.trim());
      validityDisplayDiv.style.color = "red";
    }
    if (
      !detectValid(false, input.value.trim()) &&
      detectStength(input.value.trim())
    ) {
      validityDisplayDiv.classList.add("displayValidity");
      validityDisplayDiv.textContent = detectStength(input.value.trim());
      validityDisplayDiv.style.color = "green";
    }
  });
});

radioBtns.forEach((radioBtn, index) => {
  radioBtn.addEventListener("click", () => {
    if (index === 1) {
      checkboxDiv.classList.add("numeric-toggled");
    } else {
      checkboxDiv.classList.remove("numeric-toggled");
    }
  });
});

let value,
  radioChecked = false,
  radioBtnCheckedIndex;
genBtn.addEventListener("click", () => {
  value = input.value.trim();
  radioBtns.forEach((radioBtn, index) => {
    if (radioBtn.checked) {
      radioChecked = "true";
      radioBtnCheckedIndex = index;
      return;
    }
  });
  if (detectValid(true, value)) alertBox(detectValid(true, value), "error");
});
genStrongPass.addEventListener("click", () => {
  displayPassword(generatePassword());
});

closeTxt.addEventListener("click", closePopUp);
closeIcon.addEventListener("click", closePopUp);
changeOpt.addEventListener("click", closePopUp);

reGen.addEventListener("click", () => {
  displayField.value = generatePassword(value, radioBtnCheckedIndex);
});

copyPass.forEach((cpPass, index) => {
  cpPass.addEventListener("click", () => {
    const elem = document.createElement("textarea");
    if (index === 0) elem.value = displayField.value;
    else elem.value = savedPasswordDisplayField.value;
    elem.setAttribute("readonly", "");
    elem.style.position = "absolute";
    elem.style.left = "-9999px";
    document.body.appendChild(elem);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    copyMsg[index].classList.add("copy-msg-visible");
    setTimeout(() => {
      copyMsg[index].classList.remove("copy-msg-visible");
    }, 2000);
  });
});

saveBtn.addEventListener("click", savePassword);

resetBtn.addEventListener("click", () => {
  input.value = "";
  validityDisplayDiv.classList.remove("displayValidity");
  validityDisplayDiv.textContent = "";
  input.select();
});
resetAll.addEventListener("click", () => {
  input.value = "";
  validityDisplayDiv.classList.remove("displayValidity");
  validityDisplayDiv.textContent = "";
  radioBtns.forEach((radioBtn, index) => {
    if (radioBtn.checked) {
      radioBtn.checked = false;
    }
  });
  checkbox.checked = true;
  if (checkboxDiv.classList.contains("numeric-toggled")) {
    checkboxDiv.classList.remove("numeric-toggled");
  }
});

viewPassCloseTxt.addEventListener("click", closeViewPassPopUp);
viewPassCloseIcon.addEventListener("click", closeViewPassPopUp);

regenSave.addEventListener("click", () => {
  let str = "",
    randomString = "";
  if (hasLowerCaseLetters(savedPasswordDisplayField.value)) {
    str += "abcdefghijklmnopqrstuvwxyz";
  }
  if (hasNumbers(savedPasswordDisplayField.value)) {
    str += "0123456789";
  }
  if (hasUpperCaseLetters(savedPasswordDisplayField.value)) {
    str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (hasSymbols(savedPasswordDisplayField.value)) {
    str += "@#$!*/|$!%&?";
  }
  let length = str.length;
  for (let i = 0; i < savedPasswordDisplayField.value.length; i++) {
    randomString =
      randomString + str.charAt(parseInt(Math.random() * length, 10));
  }
  list = list.filter((obj) => obj.password != savedPasswordDisplayField.value);
  savedPasswordDisplayField.value = randomString;
  list.push({
    dateCreated: renderDate(),
    password: savedPasswordDisplayField.value,
  });
  localStorage.setItem(LOCAL_STORAGE_PASSWORDS_KEY, JSON.stringify(list));
  alertBox("Password saved", "normal");
  renderPasswords();
});

okBtn.addEventListener("click", () => {
  alertBoxElem.classList.remove("alert-box-toggle");
  if (
    savedPasswordViewBox.classList.contains("saved-password-view-toggled") ||
    popUp.classList.contains("show-up")
  ) {
  } else {
    wrapper.style.position = "static";
  }
});
