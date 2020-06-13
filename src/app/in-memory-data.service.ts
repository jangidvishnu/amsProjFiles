import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee'
import { Mobile } from './assetClasses/mobile';
import { Laptop } from './assetClasses/laptop';
import { Books } from './assetClasses/books';
import { DesktopPC } from './assetClasses/desktop-pc';
import { RequestAsset } from './request-asset';
import { AssetHistory } from './asset-history';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const employees = [
      {
        id: 1, name: 'employee1', pass: "pass1", emailid: 'employee1@gmail.com', assignedAssets: [{
          assetCategory: "Mobile", status: "Assigned", assetName: "Samsung A3", assetUniqueId: "mb2",
          id: 1, issueDate: "2020-06-03T12:59:14.795Z",
          issuedEmployeeId: 1,
          issuedEmployeeName: "employee1",
          submissionDate: "Thu Jun 13 2020 12:00:00 GMT+0530 (India Standard Time)", buyDate: "2020-01-01"
        }]
      },
      { id: 2, name: 'employee2', emailid: 'employee33@gmail.com', pass: 'pass33', assignedAssets: [] },
      { id: 3, name: 'employee3', emailid: 'employee3@gmail.com', pass: 'pass3', assignedAssets: [] },
      { id: 4, name: 'employee4', emailid: 'employee4@gmail.com', pass: 'pass4', assignedAssets: [] },
      { id: 5, name: 'employee5', emailid: 'employee5@gmail.com', pass: 'pass5', assignedAssets: [] },
      { id: 6, name: 'employee6', emailid: 'employee6@gmail.com', pass: 'pass6', assignedAssets: [] },
      { id: 7, name: 'employee7', emailid: 'employee17@gmail.com', pass: 'pass7', assignedAssets: [] },
      { id: 8, name: 'employee8', emailid: 'employee8@gmail.com', pass: 'pass8', assignedAssets: [] },
      { id: 9, name: 'employee9', emailid: 'employee9@gmail.com', pass: 'pass9', assignedAssets: [] },
      { id: 10, name: 'employee10', emailid: 'employee10@gmail.com', pass: 'pass10', assignedAssets: [] },
      { id: 11, name: 'employee11', emailid: 'employee11@gmail.com', pass: 'pass11', assignedAssets: [] }
    ];
    const admin = [
      { name: "admin", pass: "adminPass", emailid: 'admin123@yahoo.com' }
    ];
    const assets = [
      {
        assetCategory: "Mobile", status: "Assigned", assetName: "Samsung A3", assetUniqueId: "mb2",
        id: 1, issueDate: "2020-06-03T12:59:14.795Z",
        issuedEmployeeId: 1,
        issuedEmployeeName: "employee1",
        submissionDate: "Thu Jun 13 2020 12:00:00 GMT+0530 (India Standard Time)", buyDate: "2020-01-01"
      },
      { assetCategory: "Mobile", status: "Available", assetName: "Samsung A1", assetUniqueId: "mb1", id: 2, buyDate: "2020-01-01" },
      { assetCategory: "Book", status: "Available", assetName: "Speaking JS", assetUniqueId: "bk1", id: 3, buyDate: "2020-01-01" },
      { assetCategory: "Book", status: "Available", assetName: "Python For Everybody", assetUniqueId: "bk2", id: 4, buyDate: "2020-01-01" },
      { assetCategory: "Laptop", status: "Available", assetName: "HP Pavillion", assetUniqueId: "lt1", id: 5, buyDate: "2015-01-01" },
      { assetCategory: "DesktopPC", status: "Available", assetName: "Dell Insp.", assetUniqueId: "dtp1", id: 6, buyDate: "2020-01-01" },
    ];
    const requests = [
      {
        id: 1,
        requestEmployeeId: 1,
        requestEmployeeName: "employee1",
        requestStatus: "Pending",
        requestedAssetId: 2,
        requestedAssetName: "Samsung A1",
        submissionDate: "2020-06-19",
        requestDate:"2020-06-01"
      }
    ];
    const assetHistory = [
      {
        id: 1, assetId: 1, assetName: 'Samsung A3', activity: 'Added', activityDate: 'Thu Jan 02 2020 12:00:00 GMT+0530 (India Standard Time)',
      },
      {
        id: 2, assetId: 2, assetName: 'Samsung A1', activity: 'Added', activityDate: 'Thu Jan 02 2020 12:00:00 GMT+0530 (India Standard Time)',
      },
      {
        id: 3, assetId: 3, assetName: 'Speaking JS', activity: 'Added', activityDate: 'Thu Jan 02 2020 12:00:00 GMT+0530 (India Standard Time)',
      },
      {
        id: 4, assetId: 4, assetName: 'Python For Everybody', activity: 'Added', activityDate: 'Thu Jan 02 2020 12:00:00 GMT+0530 (India Standard Time)',
      },
      {
        id: 5, assetId: 5, assetName: 'HP Pavillion', activity: 'Added', activityDate: 'Thu Jan 02 2020 12:00:00 GMT+0530 (India Standard Time)',
      },
      {
        id: 6, assetId: 6, assetName: 'Dell Insp.', activity: 'Added', activityDate: 'Thu Jan 02 2020 12:00:00 GMT+0530 (India Standard Time)',
      },
      {
        id: 7, assetId: 1, assetName: 'Samsung A3', activity: 'Assign', activityDate: '2020-06-03T12:59:14.795Z', 
        relatedEmployeeId: 1, relatedEmployeeName: 'employee1'
      }
    ]

    return { employees, admin, assets, requests, assetHistory };
  }

  genId<T extends RequestAsset | Employee | Mobile | DesktopPC | Books | Laptop | AssetHistory>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }
}
