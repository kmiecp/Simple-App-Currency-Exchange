import { AJAX } from "./getData.js";

const amountFirst = document.querySelector(".amount-first");
const amountSecond = document.querySelector(".amount-second");
const currencyFirst = document.querySelector(".currency-first");
const currencySecond = document.querySelector(".currency-second");
const select = [...document.querySelectorAll("select")];
const checkBtn = document.querySelector(".check");
const swapBtn = document.querySelector(".change");
const info = document.querySelector(".info");

const dataFromUser = {
  currency1: currencyFirst.value,
  currency2: currencySecond.value,
  amount1: 0,
  amount2: 0,
  rate: 0,
};

// MAIN FUNCTION
const getData = async function () {
  try {
    if (
      dataFromUser.currency1 < 1 ||
      dataFromUser.currency2 < 1 ||
      dataFromUser.amount1 < 1
    ) {
      return console.log("błedne wartości");
    }
    const data = await AJAX(
      `${dataFromUser.currency1}`,
      `${dataFromUser.currency2}`,
      `${dataFromUser.amount1}`
    );
    dataFromUser.rate = data.info.quote;
    dataFromUser.amount2 = (dataFromUser.rate * dataFromUser.amount1).toFixed(
      2
    );
    showInfo();
  } catch (err) {
    alert(err);
  }
};
//Get data about currency

select.forEach((curr) => {
  curr.addEventListener("change", () => {
    if (curr.classList.contains("currency-first")) {
      dataFromUser.currency1 = curr.value;
    } else {
      dataFromUser.currency2 = curr.value;
    }
  });
});

// THIS SHOWS DATA ABOUT CURRENCY
const showInfo = () => {
  info.textContent = ` 1 ${
    dataFromUser.currency1
  } = ${dataFromUser.rate.toFixed(2)} ${dataFromUser.currency2}`;
  amountSecond.value = dataFromUser.amount2;
};

//SWITCHING VALUE IN INPUTS
const switchData = function (e) {
  dataFromUser.amount1 = amountFirst.value;
  dataFromUser.amount2 = amountSecond.value;
  let temp = dataFromUser.amount1;
  dataFromUser.amount1 = dataFromUser.amount2;
  dataFromUser.amount2 = temp;
  amountFirst.value = dataFromUser.amount1;
  amountSecond.value = dataFromUser.amount2;
};

swapBtn.addEventListener("click", switchData);
checkBtn.addEventListener("click", () => {
  getData();
});

amountFirst.addEventListener("input", () => {
  if (amountFirst.value < 1) return;
  dataFromUser.amount1 = amountFirst.value;
  console.log(dataFromUser.amount1);
});
