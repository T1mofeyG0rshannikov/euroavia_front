import React, { useState, useRef } from 'react'
import styles from './AutocompleteInput.module.scss'
import { API_URL } from '../../config/constants'

export const AutocompleteInput = ({ onSelect }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [show, setShow] = useState(false)
  const inputRef = useRef(null)

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([])
      return
    }
    const [countries, cities] = await Promise.all([
      fetch(`${API_URL}/countries/${encodeURIComponent(value)}`).then(r => r.json()).catch(() => []),
      fetch(`${API_URL}/cities/${encodeURIComponent(value)}`).then(r => r.json()).catch(() => [])
    ])
    let result = []
    // Страны
    for (const country of countries) {
      result.push({
        type: 'country',
        label: country.name,
        airports: country.airports || [],
        id: country.id
      })
    }
    // Города
    for (const city of cities) {
      result.push({
        type: 'city',
        label: `${city.name}, ${city.country?.name || ''}`,
        airports: city.airports || [],
        id: city.id
      })
    }
    // Аэропорты
    let airportSuggestions = []
    for (const obj of [...countries, ...cities]) {
      if (Array.isArray(obj.airports)) {
        for (const airport of obj.airports) {
          airportSuggestions.push({
            type: 'airport',
            label: `${airport.iata} — ${airport.city?.name || ''} (${airport.name_russian || airport.name || ''})`,
            iata: airport.iata,
            id: airport.id
          })
        }
      }
    }
    setSuggestions([...result, ...airportSuggestions].slice(0, 10))
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    fetchSuggestions(value)
    setShow(true)
  }

  const handleSelect = (item) => {
    setQuery(item.label)
    setShow(false)
    let airportIds = []
    if (item.type === 'country' || item.type === 'city') {
      airportIds = item.airports.map(a => a.id)
    } else if (item.type === 'airport') {
      airportIds = [item.id]
    }
    if (onSelect) onSelect(airportIds)
  }

  /**
   * Форматирует строку аэропорта для выпадающего списка.
   */
  function formatAirportName(airport) {
    if (!airport) return '';

    const code = airport.iata || '';
    const cityName =
      airport.city?.name_russian ||
      airport.city?.name ||
      airport.city?.name_english ||
      '';
    const airportName =
      airport.name_russian ||
      airport.name ||
      airport.name_english ||
      '';
    const countryName =
      airport.country?.name_russian ||
      airport.country?.name ||
      airport.country?.name_english ||
      '';

    return `${code} — ${cityName} (${airportName}) ${countryName}`.trim();
  }

  return (
    <div className={styles.autocompleteWrapper}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setShow(true)}
        ref={inputRef}
        placeholder="Страна, город или аэропорт..."
        autoComplete="off"
      />
      {show && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((item, idx) => (
            <li
              key={item.id + item.label + idx}
              className={styles.suggestionItem}
              onMouseDown={() => handleSelect(item)}
            >
              <span className={styles.typeLabel}>
                {item.type === 'country' ? 'Страна' : item.type === 'city' ? 'Город' : 'Аэропорт'}
              </span>
              {item.type === 'airport' && (
                <span className={styles.iataCode}>{item.iata}</span>
              )}
              {' '}
              {item.type === 'airport'
                ? item.label.replace(item.iata + ' — ', '')
                : item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}