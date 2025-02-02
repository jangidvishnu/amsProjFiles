import { Component, OnInit } from '@angular/core';
import { RequestAssetService } from 'src/app/request-asset.service';
import { RequestAsset } from 'src/app/request-asset';
import { AssetService } from 'src/app/asset.service';
import { Employee } from 'src/app/employee';
import { Mobile } from 'src/app/assetClasses/mobile';
import { Books } from 'src/app/assetClasses/books';
import { Laptop } from 'src/app/assetClasses/laptop';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { EmployeeService } from 'src/app/employee.service';
import { AdminComponent } from '../admin/admin.component';
import { ToastrService } from 'ngx-toastr';
import { AssetHistoryService } from 'src/app/asset-history.service';
import { AssetHistory } from 'src/app/asset-history';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: RequestAsset[];
  private activeRequest: RequestAsset;
  private activeRequestEmployee: Employee;
  private activeRequestedAsset: Mobile | Books | Laptop | DesktopPC;


  constructor(private requestAssetService: RequestAssetService, private toastr: ToastrService,
    private assetService: AssetService, private employeeService: EmployeeService,
    private assetHistoryService: AssetHistoryService) { }

  ngOnInit(): void {
    //  Get all requests
    this.getRequestsList();
  }

  private getRequestsList() {
    this.requestAssetService.getRequests().subscribe(
      (req) => {
        req.reverse();
        this.requests = req;
      }
    );
  }

  conAcceptRequest(requestId: number) {

    // getting all required objects for assigning asset

    this.requestAssetService.getRequestById(requestId).subscribe(
      req => {
        this.activeRequest = req;
        this.employeeService.getEmployeeById(req.requestEmployeeId).subscribe(
          emp => this.activeRequestEmployee = emp
        );
        this.assetService.getAssetById(req.requestedAssetId).subscribe(
          asset => this.activeRequestedAsset = asset
        );
      }
    )
  }

  acceptRequest() {
    let subdate: Date = this.activeRequest.submissionDate;
    let issdate = new Date();
    // change the asset parameters and update asset
    if (this.activeRequestedAsset.status != "Available") {
      this.toastr.error("This Asset is Already Assigned to Somebody", "", { closeButton: true });
    }
    else {
      this.activeRequestedAsset.issueDate = issdate;
      this.activeRequestedAsset.submissionDate = new Date(subdate);
      this.activeRequestedAsset.issuedEmployeeName = this.activeRequestEmployee.name;
      this.activeRequestedAsset.issuedEmployeeId = this.activeRequestEmployee.id;
      this.activeRequestedAsset.status = "Assigned";
      this.assetService.updateAsset(this.activeRequestedAsset).subscribe();
      // Add history
      this.assetHistoryService.addAssetHistory({
        assetId: this.activeRequestedAsset.id, assetName: this.activeRequestedAsset.assetName, relatedEmployeeId: this.activeRequestEmployee.id,
        relatedEmployeeName: this.activeRequestEmployee.name,
        activityDate: issdate, activity: 'Assigned(Req.)'
      } as AssetHistory).subscribe();
      // update employee and assigned assets
      this.activeRequestEmployee.assignedAssets.push(this.activeRequestedAsset);
      this.employeeService.updateEmployee(this.activeRequestEmployee).subscribe();
      // update request
      this.activeRequest.requestStatus = "Accepted";
      this.requestAssetService.updateRequest(this.activeRequest).subscribe();
      this.toastr.success("Request Accepted", "", { closeButton: true });
      // get updated Requests again
      this.getRequestsList();
      AdminComponent.setRequestCount(this.requests.length - 1);
    }
    //reset all parameters

    this.activeRequest = undefined;
    this.activeRequestEmployee = undefined;
    this.activeRequestedAsset = undefined;


  }

  resetAcceptPara() {   //reset all active request params
    this.activeRequest = undefined;
    this.activeRequestEmployee = undefined;
    this.activeRequestedAsset = undefined;
  }

  // getting all params to reject req
  conRejectRequest(requestId: number) {
    this.requestAssetService.getRequestById(requestId).subscribe(
      req => this.activeRequest = req
    );
  }

  //reset params
  resetRejectPara() {
    this.activeRequest = undefined;
  }

  rejectRequest() {
    this.activeRequest.requestStatus = "Rejected";
    this.requestAssetService.updateRequest(this.activeRequest).subscribe();
    this.toastr.success("Request rejected", "", { closeButton: true });
    // get updated Requests again
    this.getRequestsList();
    //reset param after rejection
    this.activeRequest = undefined;
    AdminComponent.setRequestCount(this.requests.length - 1);
  }

  trackById(index: number, request: RequestAsset):number {
    return request?.id;
  }
}
