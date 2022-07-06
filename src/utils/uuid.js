/**
 * Создаём уникальный id, с учётом повторяемости. Это лучше, чем случайный uuid,
 * так как эффективнее при перезагрузке.
 * Каждый повторный элемент будет иметь уникальный uuid по типу {id}{repeat-count}
 * @param {Array} arr - массив данных
 * @param {Object} item - текущий элемент
 * @param {String} id - ключ массива
 */
const addUUID = (arr, item, id) => {
    const counter = {};
    let count = 0;
    arr.forEach((current) => {
        if (item[id] === current[id]) {
            const [currentId, currentCount] = current.uuid.split('_');
            if (Number(currentCount) > count) {
                count = Number(currentCount);
            }
        }
    });
    item.uuid = `${item[id]}_${count+1}`;

    return item;
}
export default addUUID;
