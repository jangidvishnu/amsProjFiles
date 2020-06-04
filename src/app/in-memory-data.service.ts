import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee'
import { Mobile } from './assetClasses/mobile';
import { Laptop } from './assetClasses/laptop';
import { Books } from './assetClasses/books';
import { DesktopPC } from './assetClasses/desktop-pc';
import { RequestAsset } from './request-asset';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const employees = [
      {
        id: 1, name: 'employee1', pass: "pass1", assignedAssets: [{
          assetCategory: "Mobile", status: "Assigned", assetName: "Samsung A3", assetUniqueId: "mb2",
          id: 1, issueDate: "2020-06-03T12:59:14.795Z",
          issuedEmployeeId: 1,
          issuedEmployeeName: "employee1",
          submissionDate: "2020-06-18T00:00:00.000Z"
        }]
      },
      { id: 2, name: 'employee2', pass: 'pass2', assignedAssets: [] },
      { id: 3, name: 'employee3', pass: 'pass3', assignedAssets: [] },
      { id: 4, name: 'employee4', pass: 'pass4', assignedAssets: [] },
      { id: 5, name: 'employee5', pass: 'pass5', assignedAssets: [] },
      { id: 6, name: 'employee6', pass: 'pass6', assignedAssets: [] },
      { id: 7, name: 'employee7', pass: 'pass7', assignedAssets: [] },
      { id: 8, name: 'employee8', pass: 'pass8', assignedAssets: [] },
      { id: 9, name: 'employee9', pass: 'pass9', assignedAssets: [] },
      { id: 10, name: 'employee10', pass: 'pass10', assignedAssets: [] },
      { id: 11, name: 'employee11', pass: 'pass11', assignedAssets: [] }
    ];
    const admin = [
      { name: "admin", pass: "adminPass" }
    ];
    const assets = [
      {
        assetCategory: "Mobile", status: "Assigned", assetName: "Samsung A3", assetUniqueId: "mb2",
        id: 1, issueDate: "2020-06-03T12:59:14.795Z",
        issuedEmployeeId: 1,
        issuedEmployeeName: "employee1",
        submissionDate: "2020-06-18T00:00:00.000Z"
      },
      { assetCategory: "Mobile", status: "Available", assetName: "Samsung A1", assetUniqueId: "mb1", id: 2 },
      { assetCategory: "Book", status: "Available", assetName: "Speaking JS", assetUniqueId: "bk1", id: 3 },
      { assetCategory: "Book", status: "Available", assetName: "Python For Everybody", assetUniqueId: "bk2", id: 4 },
      { assetCategory: "Laptop", status: "Available", assetName: "HP Pavillion", assetUniqueId: "lt1", id: 5 },
      { assetCategory: "DesktopPC", status: "Available", assetName: "Dell Insp.", assetUniqueId: "dtp1", id: 6 },
    ];
    const requests = [
      {
        id: 1,
        requestEmployeeId: 1,
        requestEmployeeName: "employee1",
        requestStatus: "Pending",
        requestedAssetId: 2,
        requestedAssetName: "Samsung A1",
        submissionDate: "2020-06-19"
      }
    ];
    return { employees, admin, assets, requests };
  }

  genId<T extends RequestAsset | Employee | Mobile | DesktopPC | Books | Laptop | any>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }
}
