const API_KEY = "75ec3d651435d3da3cede797f88430df";
const API = "https://api.exchangerate.host/convert?access_key=";

const data = {};

export const AJAX = async function (currencyFirst, currencySecond, amount) {
  try {
    const dataFetch = await fetch(
      `${API}${API_KEY}&from=${currencyFirst}&to=${currencySecond}&amount=${amount}`
    );
    console.log(dataFetch);
    const data = await dataFetch.json();
    console.log(data);
    console.log(data);
    if (!data.success)
      throw new Error(`Error ! - ${data.error.type}, ${data.error.info}`);

    return data;
  } catch (err) {
    throw err;
  }
};
