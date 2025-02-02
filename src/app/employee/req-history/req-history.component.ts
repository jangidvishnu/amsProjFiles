import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestAsset } from 'src/app/request-asset';
import { RequestAssetService } from 'src/app/request-asset.service';

@Component({
  selector: 'app-req-history',
  templateUrl: './req-history.component.html',
  styleUrls: ['./req-history.component.css']
})
export class ReqHistoryComponent implements OnInit {

  private id: number;
  requests: RequestAsset[] = [];

  constructor(private route: ActivatedRoute, private requestAssetService: RequestAssetService) {
    this.id = +this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.requestAssetService.getRequestsOfEmp(this.id).subscribe(
      reqs => {
       reqs.reverse();
       this.requests=reqs;
      }
    );
  }
  trackById(index:number,request:RequestAsset):number{
    return request?.id;
  }
}
