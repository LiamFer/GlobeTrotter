import GlobeComponent from "./GlobeComponent";
import { FloatButton, Card, Avatar } from "antd";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function App() {
  const [lightMode, setLightmode] = useState(false);
  const [countryInfo, setCountryInfo] = useState({
    name: "Selecione",
    code: "",
  });

  const handleCountrySelect = ({ code, name }) => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => setCountryInfo(data[0]));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          zIndex: 1,
          textShadow: "0 0 10px rgba(0,0,0,0.7)",
        }}
      >
        <Avatar src={countryInfo?.flags?.png} />
        <h1>{countryInfo.name.common}</h1>
      </div>
      <FloatButton
        icon={lightMode ? <FaMoon /> : <FaSun />}
        tooltip="Change Earth Theme"
        onClick={() => setLightmode((prev) => !prev)}
      />
      <GlobeComponent onCountrySelect={handleCountrySelect} isDay={lightMode} />
      <Card
        title={"Country Information"}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: 300,
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)", // um pouco translúcido
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          borderRadius: "8px",
        }}
      >
        <p>Capital: {countryInfo.capital}</p>
        <p>População: {countryInfo.population?.toLocaleString()}</p>
        <p>Região: {countryInfo.region}</p>
      </Card>
    </div>
  );
}
