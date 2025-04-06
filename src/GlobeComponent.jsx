import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

export default function GlobeComponent({ onCountrySelect, isDay }) {
  const globeRef = useRef();
  const [countries, setCountries] = useState([]);
  const [hoverD, setHoverD] = useState();
  const EarthTexture = isDay ? "https://unpkg.com/three-globe@2.42.3/example/img/earth-day.jpg" : "https://unpkg.com/three-globe@2.42.3/example/img/earth-night.jpg"


  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  return (
    <div
  style={{
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Globe
    ref={globeRef}
    backgroundColor="rgb(11, 11, 27)"
    globeImageUrl={EarthTexture}
    polygonsData={countries}
    polygonAltitude={({ properties: d }) => (d === hoverD ? 0.06 : 0.01)}
    polygonCapColor={({ properties: d }) =>
      d === hoverD ? 'rgba(255, 187, 0, 0.46)' : 'rgba(200, 200, 255, 0)'
    }
    polygonSideColor={() => 'rgba(79, 93, 114, 0.15)'}
    polygonStrokeColor={() => '#111'}
    onPolygonHover={(polygon) => {
      setHoverD(polygon?.properties);
    }}
    onPolygonClick={(polygon) => {
      const countryCode = polygon.id;
      const countryName = polygon.properties.name;
      onCountrySelect?.({ code: countryCode, name: countryName });
    }}
    labelLat={(d) => d.properties.latitude || 0}
    labelLng={(d) => d.properties.longitude || 0}
    labelText={(d) => d.properties.name}
    labelSize={1.6}
    labelColor={() => 'white'}
    labelDotRadius={0.2}
    labelAltitude={0.06}
  />
</div>

  );
}
