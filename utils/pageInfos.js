const pageInfos = (title, description, onDashboard, user) => {
    const infos = {
        title: title,
        description: description,
        dashboard: onDashboard,
        user : null
    }
    return infos
}

module.exports = { pageInfos }
