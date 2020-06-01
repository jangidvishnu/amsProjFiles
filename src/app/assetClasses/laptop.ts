import { AssetInterface } from '../asset-interface';

export class Laptop implements AssetInterface {
    
    id:number;
    private assetCategory = "Laptop";
    private assetName: string;
    private assetUniqueId: string;
    private issueDate: Date;
    private submissionDate: Date;
    private issuedEmployeeName: string;

    constructor(assetName: string, assetUniqueId: string) {
        this.assetName = assetName;
        this.assetUniqueId = assetUniqueId;
    }

    getAssetName(): string {
        return this.assetName;
    };
    getAssetCategory(): string {
        return this.assetCategory;
    }
    getAssetUniqueId(): string {
        return this.assetUniqueId;
    }
    getIssuedEmployeeName(): string {
        return this.issuedEmployeeName;
    }
    getIssuedDate(): Date {
        return this.issueDate;
    }
    getSubmissionDate(): Date {
        return this.submissionDate;
    }
}
