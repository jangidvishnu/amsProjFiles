import { Component, OnInit } from '@angular/core';
import { RequestAssetService } from 'src/app/request-asset.service';
import { RequestAsset } from 'src/app/request-asset';
import { AssetService } from 'src/app/asset.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: RequestAsset[];

  constructor(private requestAssetService: RequestAssetService,
    private assetService: AssetService) { }

  ngOnInit(): void {
    this.requestAssetService.getRequests().subscribe(
      req => this.requests = req
    );
  }
}
