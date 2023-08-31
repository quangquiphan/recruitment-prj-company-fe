import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { toArray } from 'lodash';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit{
  selectedTab: number = 0;
  companyId: string = '';
  userRole: string = '';
  label: string = 'label.company'
  tabViews: any = [
    {
      index: 0,
      label: "label.company"
    },
    {
      index: 1,
      label: "label.member"
    }
  ]
  constructor(
    private _router: Router,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.companyId = this.authenticateService.authUser?.company.id || '';
    this.userRole = this.authenticateService.authUser?.role || '';    
    this.selectedTabViewUrl();
  }

  selectedTabViewUrl() {
    let arr = toArray(this._router.routerState.snapshot.url.split("/"))
    const map = new Map();
    
    if (arr.length === 3) {
      arr.push();
    }

    map.set('tab', arr[3]);

    if (map.get('tab') === 'member' || !map.get('tab')) {
      this.selectedTab = 0;
    }  else if (map.get('tab') === 'member') {
      this.selectedTab = 1;
    }

    this.activatedTabView(this.selectedTab);
  }

  onChangeTabView(event: any) {
    this.selectedTab = event.index;
    this.activatedTabView(this.selectedTab);
  }

  activatedTabView(selectedTab: number) {
    let tab = '';

    if (selectedTab === 0) {
      this.label = 'label.company';
      tab = "company";  
    } 
    
    if (selectedTab === 1) {
      this.label = 'label.member';
      tab = "member";
    }

    return this._router.navigate([`/setting/${tab}`]).then(r => {});
  }
}
