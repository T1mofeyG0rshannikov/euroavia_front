export const useCloseModal = (ref, setClose) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setClose(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}