import { useState } from 'react'
import { dadosClima } from './dadosClima'
import { codigosWmo } from './codigosWmo'

import './App.css'

const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

function descricaoDoCodigo(codigo) {
  const item = codigosWmo.find(c => c.codigo === codigo)
  return item ? item.descricao : 'Sem informação'
}

function iconeDoCodigo(codigo) {
  if (codigo >= 95) return '/tempestade.svg'
  if (codigo >= 71 && codigo <= 77) return '/neve.svg'
  if (codigo >= 51) return '/chuva.svg'
  return '/nublado.svg'
}

function formatarDia(data, indice) {
  if (indice === 0) return 'Hoje'
  if (indice === 1) return 'Amanhã'
  const [ano, mes, dia] = data.split('-').map(Number)
  return DIAS_SEMANA[new Date(ano, mes - 1, dia).getDay()]
}

function formatarData(data) {
  const [, mes, dia] = data.split('-')
  return `${dia}/${mes}`
}

function App() {
  const [busca, setBusca] = useState('Florianópolis')
  const [cidade, setCidade] = useState(dadosClima[0])

  function buscarPorNome(nome) {
    const resultado = dadosClima.find(
      item => item.name.toLowerCase() === nome.toLowerCase()
    )

    setCidade(resultado)
  }

  function buscar() {
    buscarPorNome(busca)
  }

  function escolherCidade(nome) {
    setBusca(nome)
    buscarPorNome(nome)
  }

  return (
    <div className='app'>
      <div className="primeira">
        <img className='logo' src="/solchuvalogo.svg" alt="" />
        <div className='coluna'>
          <h1>Sol Chuva</h1>
          <p>O tempo certo, onde você estiver</p>
        </div>
      </div>

      <div className='primeira'>
        <input
          className='search-bar'
          value={busca}
          onChange={e => setBusca(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && buscar()}
          placeholder="Digite o nome de uma cidade..."
        />

        <button className='buscar' onClick={buscar}>Buscar</button>
      </div>

      <div className='chips'>
        {dadosClima.map(item => (
          <button
            key={item.id}
            className='chip'
            onClick={() => escolherCidade(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {cidade ? (
        <>
          <section className='clima-atual'>
            <div className='clima-topo'>
              <div>
                <h2>{cidade.name}</h2>
                <p className='regiao'>{cidade.admin1} — {cidade.country}</p>
              </div>
              <span className='atualizado'>
                Atualizado às {cidade.current.time.split('T')[1]}
              </span>
            </div>

            <div className='clima-corpo'>
              <div className='clima-principal'>
                <img
                  className='icone-grande'
                  src={iconeDoCodigo(cidade.current.weather_code)}
                  alt=""
                />
                <div>
                  <p className='temperatura'>{cidade.current.temperature_2m}°C</p>
                  <p className='descricao'>
                    {descricaoDoCodigo(cidade.current.weather_code)}
                  </p>
                </div>
              </div>

              <div className='detalhes'>
                <div className='detalhe'>
                  <span className='detalhe-rotulo'>
                    <img src="/termometro.svg" alt="" /> Sensação
                  </span>
                  <strong>{cidade.current.apparent_temperature}°C</strong>
                </div>
                <div className='detalhe'>
                  <span className='detalhe-rotulo'>
                    <img src="/umidade.svg" alt="" /> Umidade
                  </span>
                  <strong>{cidade.current.relative_humidity_2m}%</strong>
                </div>
                <div className='detalhe'>
                  <span className='detalhe-rotulo'>
                    <img src="/vento.svg" alt="" /> Vento
                  </span>
                  <strong>{cidade.current.wind_speed_10m} km/h</strong>
                </div>
                <div className='detalhe'>
                  <span className='detalhe-rotulo'>
                    <img src="/chuva-gota.svg" alt="" /> Precipitação
                  </span>
                  <strong>{cidade.current.precipitation} mm</strong>
                </div>
                <div className='detalhe'>
                  <span className='detalhe-rotulo'>
                    <img src="/uv.svg" alt="" /> Índice UV
                  </span>
                  <strong>{cidade.current.uv_index}</strong>
                </div>
                <div className='detalhe'>
                  <span className='detalhe-rotulo'>
                    <img src="/por-sol.svg" alt="" /> Nascer / Pôr do sol
                  </span>
                  <strong>{cidade.current.sunrise} / {cidade.current.sunset}</strong>
                </div>
              </div>
            </div>
          </section>

          <section className='previsao'>
            <h3>Previsão para os próximos {cidade.daily.length} dias</h3>

            <div className='previsao-grade'>
              {cidade.daily.map((dia, indice) => (
                <div className='dia' key={dia.date}>
                  <strong className='dia-nome'>{formatarDia(dia.date, indice)}</strong>
                  <span className='dia-data'>{formatarData(dia.date)}</span>
                  <img className='dia-icone' src={iconeDoCodigo(dia.weather_code)} alt="" />
                  <span className='dia-descricao'>{descricaoDoCodigo(dia.weather_code)}</span>
                  <span className='dia-temps'>
                    {dia.temperature_2m_max}°
                    <span className='dia-min'>{dia.temperature_2m_min}°</span>
                  </span>
                  <span className='dia-chuva'>
                    <img src="/chuva-gota.svg" alt="" /> {dia.precipitation_probability_max}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <p className='sem-resultado'>Cidade não encontrada. Tente uma das opções acima.</p>
      )}

      <footer className='rodape'>
        Sol Chuva • Dados de clima por{' '}
        <a href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a>
      </footer>
    </div>
  )
}

export default App
