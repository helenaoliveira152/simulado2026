import { useState } from 'react'
import { dadosClima } from './dadosClima'
import { codigosWmo } from './codigosWmo'

import './App.css'

function App() {
  const [busca, setBusca] = useState('')
  const [cidade, setCidade] = useState(null)

  function buscar() {
    const resultado = dadosClima.find(
      item => item.name.toLowerCase() === busca.toLowerCase()
    )

    setCidade(resultado)
  }

  return (
    <div className='app'>
      <div className="primeira">
      <img className='logo' src="./solchuvalogo.svg" alt="" />
      <div className='coluna'>
      <h1>Sol Chuva</h1>
      <p>tempo certo onde você estiver</p>
      </div>
      </div>

      <div className='primeira'>
      <input
        className='search-bar'
        value={busca}
        onChange={e => setBusca(e.target.value)}
        placeholder="Digite o nome de uma cidade..."
      />

      <button className='buscar' onClick={buscar}>Buscar</button>
      </div>

      {cidade && (
        <div>
          <h2>{cidade.name}</h2>
          <p>{cidade.current.temperature_2m} °C</p>
        </div>
      )}
    </div>
  )
}

export default App
