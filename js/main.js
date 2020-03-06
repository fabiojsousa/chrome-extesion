const domainElement = document.querySelector("#domain");
const countryElement = document.querySelector("#country");
const urlElement = document.querySelector("#url");

const baseUrl = `https://www.google.com/shopping/ratings/account/metrics?q=`;

const countryLocalStorage = localStorage.getItem("countryValue");

let country = countryLocalStorage ? countryLocalStorage : "None";

const url = document.location.href;

const regex = /\w*\.(com|net|info|org)/gim;

const domain = url.match(regex);

domainElement.innerText = domain;

let targetUrl = `${baseUrl}${domain}`;

targetUrl = country !== "" ? targetUrl + `&c=${country}&v=4` : targetUrl;

urlElement.innerText = targetUrl;

function openSearchUrl() {
  window.open(targetUrl, "_blank");
}

function setCountry(e) {
  country = e.target.innerText;
  localStorage.setItem("countryValue", country);

  targetUrl =
    country !== "None"
      ? baseUrl + domain + `&c=${country}&v=4`
      : baseUrl + domain;

  urlElement.innerText = targetUrl;

  setCountryCss();
}

function setCountryCss() {
  const countryItems = document.querySelectorAll(".country-item");

  countryItems.forEach(e => {
    if (country === e.innerText) {
      e.style["background-color"] = "#2F84D7";
      e.style["border"] = "1px solid black";
      e.style["color"] = "#fff";
    } else {
      e.style["backgroundColor"] = "";
      e.style["border"] = "1px solid burlywood";
      e.style["color"] = "";
    }
  });
}

setCountryCss();
