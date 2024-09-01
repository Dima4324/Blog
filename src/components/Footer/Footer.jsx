import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
  const [weatherWidjet, setWeatherWidjet] = useState({
    city: "",
    temperature: "",
    weather: "",
  });

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=9a7522b2fc5e64b48c552132a50aed2e"
    )
      .then((res) => res.json())
      .then(({ name, main, weather }) => {
        setWeatherWidjet({
          ...weatherWidjet,
          city: name,
          temperature: Math.round(main.temp),
          weather: weather[0].description,
        });
      });
  }, []);

  return (
    <footer className={className}>
      <div>
        <p>Блог веб-разработчика</p>
        <p>weeeb@gmail.com</p>
      </div>
      <div>
        <p>
          {weatherWidjet.city},{" "}
          {new Date().toLocaleDateString("ru", {
            day: "numeric",
            month: "long",
          })}
        </p>
        <p>
          {weatherWidjet.temperature}°C, {weatherWidjet.weather}
        </p>
      </div>
    </footer>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 120px;
  padding: 20px 40px;
  font-weight: bold;
  box-shadow: 0px 2px 15px #000;
  background-color: #fff;

  & p {
	margin: 0;
  }
`;
