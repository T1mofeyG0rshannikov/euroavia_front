import { useEffect } from "react"
import styles from './ComplexRoutes.module.scss'

export const Suggestions = ({ airports, onSelect }) => {
  useEffect(() => {
    console.log(airports)
  }, [airports])

  const handleSelect = (airport) => {
    if (onSelect) onSelect(airport)
  }

  return (
    <>
      {airports.length > 0 && (
        <ul className={styles.suggestionsList}>
          {airports.map((a) => (
            <li
              key={a.iata}
              onClick={() => handleSelect(a)}
              className={styles.suggestionItem}
            >
              <span className={styles.iataCode}>{a.iata}</span>
              {' — '}
              {a.city.name}({a.name_russian ? a.name_russian : a.name}), {a.country.name}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}