import { AssetInterface } from '../asset-interface';

export class Laptop implements AssetInterface {
    
    id:number;
    issuedEmployeeId:number;
    assetCategory = "Laptop";
    status:string="Available";
    assetName: string;
    assetUniqueId: string;
    issueDate: Date;
    submissionDate: Date;
    issuedEmployeeName: string;

    constructor(assetName: string, assetUniqueId: string) {
        this.assetName = assetName;
        this.assetUniqueId = assetUniqueId;
    }
}
