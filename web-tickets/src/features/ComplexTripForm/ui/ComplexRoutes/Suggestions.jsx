import { useEffect } from "react"

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
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            zIndex: 10,
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {airports.map((a) => (
            <li
              key={a.iata}
              onClick={() => handleSelect(a)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {a.iata} — {a.city.name}({a.name_russian ? a.name_russian : a.name}), {a.country.name}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}