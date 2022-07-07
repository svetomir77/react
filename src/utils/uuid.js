/**
 * Создаём уникальный id, с учётом повторяемости. Это лучше, чем случайный uuid,
 * так как эффективнее при перезагрузке.
 * Каждый повторный элемент будет иметь уникальный uuid по типу {id}{repeat-count}
 * @param {String} id - ключ массива
 */
const generateUUID = (arr, id) => {
    const counter = {};
    return arr.map((item) => {
        const key = item[id];
        counter[key] = (counter[key] || 0) + 1;
        item.uuid = `${key}${counter[key]}`;
        return item;
    })
}
export default generateUUID;
