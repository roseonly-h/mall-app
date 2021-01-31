import Cookie from 'js-cookie'

export function setCookie(info){
    for (const key in info) {
        Cookie.set(key,info[key])
    }
    return true
}

export function getUserCookie(){
    return {
        username: Cookie.get('username'),
        appkey:Cookie.get('appkey'),
        role:Cookie.get('role'),
        email:Cookie.get('email')
    }
}

export function removeUserCookie(){
    Cookie.remove('username')
    Cookie.remove('role')
    Cookie.remove('appkey')
    Cookie.remove('email')
    return true
}