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
    buyDate: Date;

    constructor(assetName: string, assetUniqueId: string, buyDate: Date) {
        this.assetName = assetName;
        this.assetUniqueId = assetUniqueId;
        this.buyDate = buyDate;
    }

}
