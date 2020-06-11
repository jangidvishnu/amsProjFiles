import { AssetInterface } from '../asset-interface';

export class Books implements AssetInterface {

    id: number;
    status: string = "Available";
    issuedEmployeeId: number;
    assetCategory = "Book";
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
