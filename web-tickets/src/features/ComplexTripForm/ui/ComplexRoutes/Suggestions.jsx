import { useEffect } from "react"
import styles from './ComplexRoutes.module.scss'

export const Suggestions = ({ airports, query, onSelect }) => {
  const safeQuery = (query || '').trim().toLowerCase();

  // 1. Города, где первая буква совпадает с запросом
  const firstLetterCities = airports.filter(a => {
    const city =
      a.city?.name_russian ||
      a.city?.name ||
      a.city?.name_english ||
      '';
    return (
      safeQuery.length > 0 &&
      city.length > 0 &&
      city[0].toLowerCase() === safeQuery[0]
    );
  });

  // 2. Остальные города, где запрос встречается не на первом месте
  const otherCities = airports.filter(a => {
    const city =
      a.city?.name_russian ||
      a.city?.name ||
      a.city?.name_english ||
      '';
    return (
      safeQuery.length > 0 &&
      city.length > 0 &&
      city.toLowerCase().includes(safeQuery) &&
      city[0].toLowerCase() !== safeQuery[0]
    );
  });

  // 3. По IATA-коду (только если код содержит safeQuery)
  const codeFiltered = airports.filter(a => {
    return (
      a.iata &&
      a.iata.toLowerCase().includes(safeQuery)
    );
  });

  // Объединяем: сначала города с первой буквой, потом остальные, потом по коду
  const seen = new Set();
  const merged = [
    ...firstLetterCities,
    ...otherCities,
    ...codeFiltered
  ].filter(a => {
    if (seen.has(a.iata)) return false;
    seen.add(a.iata);
    return true;
  });
  // Обрезаем до 10
  const suggestions = merged.slice(0, 10);

  const handleSelect = (airport) => {
    if (onSelect) onSelect(airport);
  };

  function formatAirportName(airport) {
    if (!airport) return '';
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
    return `${cityName} (${airportName}) ${countryName}`.trim();
  }

  return (
    <>
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((a) => (
            <li
              key={a.iata}
              onClick={() => handleSelect(a)}
              className={styles.suggestionItem}
            >
              <span className={styles.code}>{a.iata}</span>
              <span style={{ fontWeight: 400 }}>–</span>
              {formatAirportName({ ...a, iata: '' }).replace(/^–\s*/, '')}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}