import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-successfully-request',
  templateUrl: './successfully-request.component.html',
  styleUrls: ['./successfully-request.component.scss']
})
export class SuccessfullyRequestComponent implements OnInit{
  isSuccess: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (window.location.href.includes('/successfully')) {
      this.isSuccess = true;
    }
  }
}
