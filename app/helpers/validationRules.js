exports.rules = {
    SIGN_UP: {
        username: 'required|string|min:3',
        email: 'required|email',
        password: 'required|string|min:6'
    },
    SIGN_IN: {
        username: 'required|string|min:3',
        password: 'required|string|min:6'
    },
    CREATE_NEW_USER: {
        username: 'required|string|min:3',
        email: 'required|email',
        password: 'required|string|min:6',
        isAdmin: 'boolean'
    },
    UPDATE_USER: {
        username: 'string|min:3',
        email: 'email',
        password: 'string|min:6',
        isAdmin: 'boolean'
    },
}