import { AssetInterface } from '../asset-interface';

export class DesktopPC implements AssetInterface {

    issuedEmployeeId: number;
    id: number;
    status: string = "Available";
    assetCategory = "DesktopPC";
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
