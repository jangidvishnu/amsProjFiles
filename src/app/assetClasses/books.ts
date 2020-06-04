import { AssetInterface } from '../asset-interface';

export class Books implements AssetInterface {
    
    id:number;
    status:string="Available";
    issuedEmployeeId:number;
    assetCategory = "Book";
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
