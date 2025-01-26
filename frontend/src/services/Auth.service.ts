
type LoginData = {
    email: string,
    password: string
}

class AuthService {
    static async login(data: LoginData) { }
    static async logout() {}
}

export default AuthService;