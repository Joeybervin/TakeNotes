const timeSinceLastUpdate = (lastUpdate) => {
    const tenMinutes = 10 * 60 * 1000;
    const diff = new Date() - new Date(lastUpdate);
    if (diff < tenMinutes) {
        return `dernière modification il y a ${Math.floor(diff / 1000 / 60)} min`;
    } else {
        const date = new Date(lastUpdate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }
}
module.exports = { timeSinceLastUpdate };