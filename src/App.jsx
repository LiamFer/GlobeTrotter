import GlobeComponent from './GlobeComponent';
import { FloatButton } from "antd";

export default function App() {
  const handleCountrySelect = ({ code, name }) => {
    console.log('País selecionado:', name, code);
    // Você pode atualizar o estado pra mostrar detalhes do país aqui
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
<FloatButton/>
      <GlobeComponent onCountrySelect={handleCountrySelect} />
    </div>
  );
}
