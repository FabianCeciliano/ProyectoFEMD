export interface IProxy {
    verifyAcces(user:String, password:String) : Promise<String>;
}