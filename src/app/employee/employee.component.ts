import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Mobile } from '../assetClasses/mobile';
import { Books } from '../assetClasses/books';
import { Laptop } from '../assetClasses/laptop';
import { DesktopPC } from '../assetClasses/desktop-pc';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { AssetService } from '../asset.service';
import { RequestAssetService } from '../request-asset.service';
import { RequestAsset } from '../request-asset';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private id: number;
  public employee: Employee;
  assetList = [];
  selectedAsset: Mobile | Books | DesktopPC | Laptop;
  searchedAssets$: Observable<any>;
  private searchTerms = new Subject<string>();

  requestAssetForm = new FormGroup({
    submissionDateInput: new FormControl("", [Validators.required])
  }
  )

  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private employeeService: EmployeeService, private router: Router,
    private assetService: AssetService, private requestAssetService: RequestAssetService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.loginService.ifLoggedIn('employeeid' + this.id)) {
      //nothing to do
    }
    else {
      alert("You are not Logged In ! Log in First");
      this.router.navigate(['']);
    }

  }

  ngOnInit(): void {
    this.getEmployee();
    this.searchedAssets$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.assetService.searchAssetByCategory(term)),
    );
  }

  getEmployee() {
    this.employeeService.getEmployeeById(this.id)
      .subscribe(emp => {
        this.employee = emp;
        this.assetList = emp.assignedAssets;
      });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  clearAsset() {
    this.selectedAsset= undefined;
  }

  addSelectedAssets(asset: Mobile | Books | Laptop | DesktopPC) {

    if (this.selectedAsset == undefined) {
      this.selectedAsset = asset;
    }
    else if (this.selectedAsset) {
      alert('You can request for only one Asset at a time');
    }
  }

  requestAsset() {
    let submissionDate: Date = this.requestAssetForm.get('submissionDateInput').value;
    this.requestAssetService.makeRequest({
      requestEmployeeName: this.employee.name,requestedAssetName:this.selectedAsset.assetName,
      requestEmployeeId: this.id, submissionDate: submissionDate, requestedAssetId: this.selectedAsset.id,
      requestStatus: 'Pending'
    }  as RequestAsset ).subscribe(
    );
    this.selectedAsset=undefined;
    this.requestAssetForm.setValue({submissionDateInput:''});
    this.search('');
  }
}
