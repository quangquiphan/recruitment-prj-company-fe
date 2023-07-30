import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-authenticate-menu',
  templateUrl: './authenticate-menu.component.html',
  styleUrls: ['./authenticate-menu.component.scss']
})
export class AuthenticateMenuComponent implements OnInit{
  authUser: AuthUser | undefined;
  selectedTab: number = 0;
  href: string = '';
  leftMenu: any[] = [
    {
      index: 0,
      path: '/jobs',
      label: 'label.jobs',
      icon: '../../../assets/images/icons/briefcase.svg'
    },
    {
      index: 1,
      path: '/setting',
      label: 'label.setting',
      icon: '../../../assets/images/icons/setting-2.svg'
    }
  ]

  constructor(
    private _router: Router,
    private authenticatService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.getInfo()

    this._router.events.subscribe((e : any) => {
      if (e?.routerEvent) {
        this.href = e?.routerEvent.url;
        this.selectedTab = e?.routerEvent.id;
        this.getSelectedTab(this.href);        
      }
    })
  }

  getInfo() {
    this.authUser = this.authenticatService.authUser;
  }

  parseIconText(email: string | undefined) {
    return (email || '').charAt(0).toUpperCase();
  }

  getSelectedTab(url: any) {
    if (this.href.includes('jobs')) {
      this.selectedTab = 0;
    } else if (this.href.includes('setting')) {
      this.selectedTab = 1;
    }
  }
}
