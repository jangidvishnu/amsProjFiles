import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { LoginService } from 'src/app/login.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AssetService } from 'src/app/asset.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Mobile } from 'src/app/assetClasses/mobile';
import { Books } from 'src/app/assetClasses/books';
import { Laptop } from 'src/app/assetClasses/laptop';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit {

  private unassignAssetId: number;
  selectedAssets: any;
  searchedAssets$: Observable<any>;
  private searchTerms = new Subject<string>();
  assetList: any;
  private id: number;
  employee: Employee;

  assignAssetForm = new FormGroup({
    submissionDateInput: new FormControl("", [Validators.required])
  }
  )

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,
    private loginService: LoginService, private router: Router,
    private assetService: AssetService, private toastr: ToastrService) {

    if (!this.loginService.ifLoggedIn('admin')) {
      this.toastr.warning("You are not logged in ! Please login and try", "", { closeButton: true });
      this.router.navigate(['']);
    }
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeById(this.id).subscribe(
      (emp) => {
        this.employee = emp;
        this.assetList = emp.assignedAssets;
      }
    );

    this.searchedAssets$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.assetService.searchAssetByCategory(term)),
    );

  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  addSelectedAssets(asset: Mobile | Books | Laptop | DesktopPC) {
    if (this.selectedAssets == undefined) {
      this.selectedAssets = [asset];
    }
    else if (this.selectedAssets.some(ass => ass.id == asset.id)) {
      this.toastr.error("Already added", "", { closeButton: true });
    }
    else {
      this.selectedAssets.push(asset);
    }
  }

  assignAsset() {

    let subdate = this.assignAssetForm.get('submissionDateInput').value;
    let issdate = new Date();
    for (let asset of this.selectedAssets) {
      asset.issueDate = issdate;
      asset.submissionDate = new Date(subdate);
      asset.issuedEmployeeName = this.employee.name;
      asset.issuedEmployeeId = this.employee.id;
      asset.status = "Assigned";
      this.assetService.updateAsset(asset).subscribe();
      this.employee.assignedAssets.push(asset);
    }
    this.assetList = this.employee.assignedAssets;
    this.employeeService.updateEmployee(this.employee).subscribe();
    this.toastr.success("Assigned Assets Successfully", "", { closeButton: true });
    this.assignAssetForm.setValue({ submissionDateInput: '' });
    this.selectedAssets = [];
    this.search("");
  }

  clearAsset() {
    this.selectedAssets = undefined;
  }

  setUnassignAssetId(id: number) {
    this.unassignAssetId = id;
  }

  resetUnassignAssetId() {
    this.unassignAssetId = undefined;
  }

  unassignAsset() {
    if (this.unassignAssetId != undefined) {
      let updatedAssignedAssets = [];
      let assets: any = this.employee.assignedAssets
      for (let asset of assets) {
        if (asset.id == this.unassignAssetId) {
          asset.status = "Available";
          delete asset.issuedEmployeeName;
          delete asset.submissionDate;
          delete asset.issueDate;
          delete asset.issuedEmployeeId;
          this.assetService.updateAsset(asset).subscribe();
        }
        else {
          updatedAssignedAssets.push(asset);
        }
      }
      this.employee.assignedAssets = updatedAssignedAssets;
      this.assetList = updatedAssignedAssets;
      this.employeeService.updateEmployee(this.employee).subscribe();
      this.toastr.success("Asset Un-Assigned", "", { closeButton: true });
    }
  }

  deleteEmployee() {
    this.employeeService.getEmployeeById(this.employee.id).
      subscribe(
        (emp) => {
          let assets: any = emp.assignedAssets;
          for (let asset of assets) {
            asset.status = "Available";
            delete asset.issuedEmployeeName;
            delete asset.submissionDate;
            delete asset.issueDate;
            delete asset.issuedEmployeeId;
            this.assetService.updateAsset(asset).subscribe();
          }
        }
      );
    this.employeeService.deleteEmployee(this.employee.id)
      .subscribe();
    this.toastr.success("Employee deleted", "", { closeButton: true });
    this.router.navigateByUrl('/admin/(adminR:employees-detail)');
  }
}
