export function getThisRoute() {
    return window.location.hash.substr(1);
}

export function isOnRoute(route) {
    return getThisRoute() === route;
}
