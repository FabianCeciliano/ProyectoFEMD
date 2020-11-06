export class Direction{
    private details: String;
    private district : String;
    private canton :  String;
    private province : String;

    constructor(details: String,district : String,canton :  String,province : String){
        this.details=details;
        this.canton=canton;
        this.district=district;
        this.province=province;
    }

    public getDetails():String {return this.details};
    public getDistrict():String {return this.district};
    public getCanton():String {return this.canton};
    public getProvince():String {return this.canton};
    public setDetails(pData:String):void{this.district=pData};
    public setDistrict(pData:String):void{this.district=pData};
    public setCanton(pData:String):void{this.canton=pData};
    public setProvince(pData:String):void{this.province=pData};


}