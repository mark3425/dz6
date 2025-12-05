import { useState } from 'react'
import './App.css'
import { Radio, InputNumber, Select, Checkbox } from 'antd'

const { Option } = Select;

function App() {
  const [Usl, SetUsl] = useState(null);
  const [Kol, SetKol] = useState(null);
  const [Dos, SetDos] = useState(null);
  const [DopUslugi, SetDopUslugi] = useState([]);

  const Usluga = (e) => {
    SetUsl(e.target.value);
  }

  const Kolvo = (value) => {
    SetKol(value);
  }

  const Dost = (value) => {
    SetDos(value);
  }

  const handleDopUslugi = (checkedValues) => {
    SetDopUslugi(checkedValues);
  }

  const calculateTotal = () => {
    let total = 0;
    
    if (Usl && Kol) {
      total += Usl * Kol; 
    }
    
    if (Dos && Usl==150) {
      total += Dos;
    }

    

    if (DopUslugi.length > 0 && Usl==200) {
      total += DopUslugi.reduce((sum, current) => sum + current, 0);
    }
    
    return total;
  }

  const Res = calculateTotal();

  return (
    <>
      <h1>Калькулятор стоимости печати фото:</h1>
      <div style={{display: "flex", flexDirection: "row", gap: "25px", justifyContent: "space-around"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h2>Выберите размер фото: </h2>
          <Radio.Group onChange={Usluga}>
            <Radio.Button value={50}>10x15</Radio.Button>
            <Radio.Button value={150}>15x20</Radio.Button>
            <Radio.Button value={200}>20x30</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h2>Количество фото: </h2>
          <InputNumber 
            onChange={Kolvo} 
            min={1} 
            style={{ maxWidth: "60px", width: "100%", height: "30px" }} 
          /> 
        </div>
      </div>

      <div style={{display: "flex", flexDirection: "row", gap: "25px", justifyContent: "space-around"}}>
        <div style={{display: Usl==150?"flex":"none", flexDirection: "column", gap: "10px", padding: "20px 0 20px 0", alignItems: "center"}}>
          <h2>Срок доставки: </h2>
          <Select onChange={Dost} style={{width: "400px"}}>
            <Option value={100}>Стандартная (3-5 дней) — 100 руб.</Option>
            <Option value={150}>Срочная (24 часа) — 150 руб.</Option>
            <Option value={200}>Экспресс (1 час) — 200 руб.</Option>
          </Select>
        </div>
        <div style={{display: Usl>150?"flex":"none", flexDirection: "column", gap: "10px", padding: "20px 0 20px 0"}}>
          <h2>Доп. услуги: </h2>
          <Checkbox.Group 
            onChange={handleDopUslugi}
            style={{margin: "10px 0 0 0", justifyContent: "center"}}
          >
            <Checkbox value={50}>Матовая ламинация</Checkbox>
            <Checkbox value={100}>Реставрация фото</Checkbox>
          </Checkbox.Group>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
        <h1>К оплате: {Res} руб.</h1>
      </div>
    </>
  )
}

export default App