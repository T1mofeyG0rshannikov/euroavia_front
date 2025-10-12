export function minutesToHoursMinutes(minutes) {
  const hours = Math.floor(minutes / 60);  // Целочисленное деление для получения часов
  const remainingMinutes = minutes % 60;  // Остаток от деления для получения минут

  return `${hours}ч ${remainingMinutes}м`;
}

export function extractHoursMinutes(isoString) {  
	const date = new Date(isoString);
	const hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}`;
}

export function formatDate(isoString) {
    /**
     * Преобразует строку в формате ISO 8601 в формат "ДД мес ГГГГ, ДДН".
     */
    try {
        const date = new Date(isoString);
        const day = date.getUTCDate(); // День месяца в UTC
        const year = date.getUTCFullYear(); // Год в UTC
        const weekday = date.toLocaleDateString('ru-RU', { weekday: 'short', timeZone: 'UTC' }); // Сокращенное название дня недели на русском
        const month = date.toLocaleDateString('ru-RU', { month: 'short', timeZone: 'UTC' }); // Сокращенное название месяца на русском
        return `${day} ${month.replace(".", "")}, ${year}, ${weekday}`;
    } catch (error) {
        console.error("Ошибка при форматировании даты:", error);
        return null;
    }
}

export function getTransfersString(transfers){
	if (transfers == 0){
		return "Без пересадок";
	}
	else if (transfers == 1){
		return "1 пересадка";
	} else {
		return `${transfers} пересадки`;
	}
}

export function getSeatClass(seatClass){
    if (seatClass == "economy"){
        return "Эконом"
    } else{
        return "Бизнес"
    }
}