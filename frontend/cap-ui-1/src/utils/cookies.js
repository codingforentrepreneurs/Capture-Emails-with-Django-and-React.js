export const getCookies = (name) => {
    // vanilla javascript
    // docs have jquery
    var cookies = {};
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (c) {
            var m = c.trim().match(/(\w+)=(.*)/);
            if(m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }
    if (name) {
        return cookies[name]
    }
    return cookies;
}