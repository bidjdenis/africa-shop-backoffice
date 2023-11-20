import { Injectable } from "@angular/core";

import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    saveToken(tokenUser: string) {
        localStorage.setItem('token', tokenUser);
    }

    saveUserInfos(userInfos: any) {
        localStorage.setItem('userInfos', userInfos);
    }

    removeUserInfos() {
        localStorage.removeItem('userInfos');
    }

    getToken(): string | null {
        return localStorage.getItem('token') as string;
    }


    // getUserInfoByToken(): User {
    //     const helper = new JwtHelperService();
    //     const decodedToken = helper.decodeToken(this.getToken() as string);
    //     console.log("decodedToken", decodedToken)
    //     return decodedToken != null ? decodedToken.user : null;
    //     // return JSON.parse(localStorage.getItem('userInfos') as string);
    // }

    removeToken() {
        localStorage.removeItem('token');
    }

    saveCart(cart: any) {
        localStorage.setItem('cart', cart);
    }

    removeCart() {
        localStorage.removeItem('cart');
    }

}
