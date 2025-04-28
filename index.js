const API_KEY = "8ED3QQQ99AAKKDFKDGP2GXDV6";
const form = document.querySelector("form");
const locatiionName = document.querySelector(".location");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const input = document.querySelector("input");

const triggerDOM = ({ location, feelsLike, description }) => {
  locatiionName.textContent = location;
  temp.textContent = feelsLike;
  desc.textContent = description;
};

const triggerDOMError = () => {
  locatiionName.textContent = "";
  temp.textContent = "";
  desc.textContent = "Location not found :/";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${event.target["0"].value}?key=${API_KEY}`
    );
    const deserialized = await response.json();
    const DOMContent = {
      location: deserialized.resolvedAddress,
      feelsLike: deserialized.currentConditions.feelslike + " ℉",
      description: deserialized.description,
    };
    triggerDOM(DOMContent);
  } catch (error) {
    triggerDOMError();
  } finally {
    input.value = "";
  }
});
