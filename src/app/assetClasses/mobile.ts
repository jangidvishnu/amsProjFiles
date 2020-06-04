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

    constructor(assetName: string, assetUniqueId: string) {
        this.assetName = assetName;
        this.assetUniqueId = assetUniqueId;
    }
}
