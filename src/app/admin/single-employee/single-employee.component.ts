import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { LoginService } from 'src/app/login.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AssetService } from 'src/app/asset.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit {

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
    private loginService: LoginService, private router: Router, private assetService: AssetService) {
    if (this.loginService.ifLoggedIn('admin')) {
      // nothing to do
    }
    else {
      alert('You are not logged In! Log In first');
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

  addSelectedAssets(asset: any) {

    if (this.selectedAssets == undefined) {
      this.selectedAssets = [asset];
    }
    else if (this.selectedAssets.some(ass => ass.id == asset.id)) {
      alert('already added');
    }
    else {
      console.log(this.selectedAssets);
      this.selectedAssets.push(asset);
    }
  }

  assignAsset() {
    let subdate = this.assignAssetForm.get('submissionDateInput').value;
    for (let asset of this.selectedAssets){
      // console.log(this.selectedAssets);
      // console.log(asset);
      this.employee.assignedAssets.push(asset);
    }
    this.assetList=this.employee.assignedAssets;
    // console.log(this.employee);
    this.employeeService.assignAsset(this.employee).
    subscribe();
  }

  clearAsset() {
    this.selectedAssets = undefined;
  }
}
