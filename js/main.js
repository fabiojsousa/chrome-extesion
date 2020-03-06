document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".country-item").forEach(function(e) {
    e.addEventListener("click", function() {
      setCountry(event);
    });
  });

  document.querySelector("#domain").addEventListener("change", function() {
    clearInputMonitor();
  });
  document.querySelector("#domain").addEventListener("click", function() {
    changeDomain(event);
  });

  document.querySelector("#url-button").addEventListener("click", function() {
    openSearchUrl();
  });

  const domainElement = document.querySelector("#domain");
  const urlElement = document.querySelector("#url");

  const baseUrl = `https://www.google.com/shopping/ratings/account/metrics?q=`;

  const countryLocalStorage = localStorage.getItem("countryValue");

  let inputChanges, domain, url, targetUrl;
  let country = countryLocalStorage ? countryLocalStorage : "None";

  chrome.tabs.query(
    {
      currentWindow: true,
      active: true
    },
    function(foundTabs) {
      if (foundTabs.length > 0) {
        url = foundTabs[0].url;
        setCountryCss();
        main();
      } else {
        // there's no window or no selected tab
      }
    }
  );

  function main() {
    const regex = /\w*\.(com|net|info|org)/gim;

    domain = url.match(regex);

    domainElement.value = domain;

    targetUrl = `${baseUrl}${domain}`;

    targetUrl = country !== "None" ? targetUrl + `&c=${country}&v=4` : targetUrl;

    urlElement.innerText = targetUrl;
  }

  function openSearchUrl() {
    window.open(targetUrl, "_blank");
  }

  function setCountry(e) {
    country = e.target.innerText;
    localStorage.setItem("countryValue", country);

    createUrl();

    setCountryCss();
  }

  function createUrl() {
    targetUrl =
      country !== "None"
        ? baseUrl + domain + `&c=${country}&v=4`
        : baseUrl + domain;

    urlElement.innerText = targetUrl;
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

  function changeDomain(e) {
    inputChanges = setInterval(() => {
      domain = e.target.value;
      createUrl();
    }, 100);
  }

  function clearInputMonitor() {
    clearInterval(inputChanges);
  }
});
