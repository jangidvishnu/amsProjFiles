import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-req-history',
  templateUrl: './req-history.component.html',
  styleUrls: ['./req-history.component.css']
})
export class ReqHistoryComponent implements OnInit {

  private id:number;

  constructor(private route:ActivatedRoute) { 
    this.id = +this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
