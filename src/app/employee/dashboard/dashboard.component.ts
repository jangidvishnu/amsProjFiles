import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Employee } from 'src/app/employee';
import { Books } from 'src/app/assetClasses/books';
import { Mobile } from 'src/app/assetClasses/mobile';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { Laptop } from 'src/app/assetClasses/laptop';
import { EmployeeService } from 'src/app/employee.service';
import { AssetService } from 'src/app/asset.service';
import { RequestAssetService } from 'src/app/request-asset.service';
import { RequestAsset } from 'src/app/request-asset';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
    private employeeService: EmployeeService, private router: Router,
    private assetService: AssetService, private requestAssetService: RequestAssetService) {
    this.id = +this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.getEmployee();
    this.searchedAssets$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.assetService.searchAvailableAsset(term)),
    );
  }

  getEmployee() {
    this.employeeService.getEmployeeById(this.id)
      .subscribe(emp => {
        this.employee = emp;
        for(let asset of emp.assignedAssets){
          let today = new Date();
          let sbmtDate :Date = new Date(asset.submissionDate);
          let Difference_In_Days = (sbmtDate.getTime()-today.getTime()) / (1000 * 3600 * 24);
          if(Difference_In_Days<=2 && Difference_In_Days>=1){
            this.toastr.info("1 Day left to submit "+asset.assetName,"Reminder",{closeButton:true});
          }
          else if(Difference_In_Days<=1 && Difference_In_Days>=0)
          {
            this.toastr.info("few hours left to submit "+asset.assetName,"Reminder",{closeButton:true});
          }
          else if(Difference_In_Days<0){
            this.toastr.error("Overdue Submission of "+asset.assetName,"Reminder",{closeButton:true});
          }
        }
        emp.assignedAssets.reverse();
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
      this.toastr.error("You can request for one asset at a time", "", { closeButton: true });
    }
  }

  requestAsset() {
    let requestDate: Date = new Date();
    let submissionDate: Date = new Date(this.requestAssetForm.get('submissionDateInput').value);
    submissionDate.setMinutes(submissionDate.getMinutes()+390);
    this.requestAssetService.makeRequest({
      requestEmployeeName: this.employee.name, requestedAssetName: this.selectedAsset.assetName,
      requestEmployeeId: this.id, submissionDate: submissionDate, requestedAssetId: this.selectedAsset.id,
      requestStatus: 'Pending', requestDate: requestDate
    } as RequestAsset).subscribe(
    );
    this.toastr.success("Sent Request Successfully", "", { closeButton: true });
    this.selectedAsset = undefined;
    this.requestAssetForm.setValue({ submissionDateInput: '' });
    this.search('');
  }

  trackById(index: number, asset: Mobile | Books | Laptop | DesktopPC):number {
    return asset?.id;
  }

  getTodayDate(): string {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
}
