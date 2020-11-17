export class Person{
    private _id: number;
    private _name: String;
    private _email: String;
    private _telephone: number;


    constructor(id:number,name:String,email:String,telephone:number){
        this.id=id;
        this.name=name;
        this.email=email;
        this.telephone=telephone;
    }
    public get email(): String {
        return this._email;
    }
    public set email(value: String) {
        this._email = value;
    }
    public get name(): String {
        return this._name;
    }
    public set name(value: String) {
        this._name = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get telephone(): number {
        return this._telephone;
    }
    public set telephone(value: number) {
        this._telephone = value;
    }

}