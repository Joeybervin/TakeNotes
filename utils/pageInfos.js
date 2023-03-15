const pageInfos = (page_location, title, description, onDashboard, user) => {
    const infos = {
        title: title, // page title
        description: description, // page description
        dashboard: onDashboard, // I'm on the dashboard page ? boolean
        user : user, // user infos from sessiion
        page_Location : page_location,
    }
    return infos
}

module.exports = { pageInfos }
