export default class AuthenticationService{
    //permet de savoir si l'utilisateur est connecte ou non
    static isAuthenticated : boolean=false;

    // methode login..
    static login(username:string, password:string):Promise<boolean>{

        const isAuthenticated= (username ==='moon' && password === 'moon');

            return new Promise(resolve=>{
                setTimeout(()=>{
                    this.isAuthenticated=isAuthenticated;
                    resolve(isAuthenticated);
                    
                },1000);
            })
    }
}