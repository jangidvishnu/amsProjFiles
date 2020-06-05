import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { LoginService } from 'src/app/login.service';
import { Employee } from 'src/app/employee';
import { Books } from 'src/app/assetClasses/books';
import { Mobile } from 'src/app/assetClasses/mobile';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { Laptop } from 'src/app/assetClasses/laptop';
import { EmployeeService } from 'src/app/employee.service';
import { AssetService } from 'src/app/asset.service';
import { RequestAssetService } from 'src/app/request-asset.service';
import { RequestAsset } from 'src/app/request-asset';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService, private router: Router,
    private assetService: AssetService, private requestAssetService: RequestAssetService) {
      this.id = +this.route.parent.snapshot.paramMap.get('id');
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
    this.selectedAsset = undefined;
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
      requestEmployeeName: this.employee.name, requestedAssetName: this.selectedAsset.assetName,
      requestEmployeeId: this.id, submissionDate: submissionDate, requestedAssetId: this.selectedAsset.id,
      requestStatus: 'Pending'
    } as RequestAsset).subscribe(
    );
    this.selectedAsset = undefined;
    this.requestAssetForm.setValue({ submissionDateInput: '' });
    this.search('');
  }

}
