import { AssetInterface } from '../asset-interface';

export class Mobile implements AssetInterface {

    id: number;
    issuedEmployeeId: number;
    assetCategory = "Mobile";
    status:string="Available";
    assetName: string;
    assetUniqueId: string;
    issueDate: Date;
    submissionDate: Date;
    issuedEmployeeName: string;
    buyDate : Date;

    constructor(assetName: string, assetUniqueId: string , buyDate :Date) {
        this.assetName = assetName;
        this.assetUniqueId = assetUniqueId;
        this.buyDate=buyDate;
    }
}
