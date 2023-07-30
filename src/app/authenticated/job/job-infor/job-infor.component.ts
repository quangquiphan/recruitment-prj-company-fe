import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-infor',
  templateUrl: './job-infor.component.html',
  styleUrls: ['./job-infor.component.scss']
})
export class JobInforComponent implements OnInit{
  @Input() jobStatus: string = '';
  showUserDetail: boolean = false;
  first: number = 0;
  paging: any = {
    pageNumber: 1,
    pageSize: 1
  }
  userId: string = '';
  users: any [] = [];

  constructor() {}

  ngOnInit(): void {
    this.users = [
      {
        id: 1,
        fullName: "Full name",
        position: "Fullstack developer",
        yearExperience: "4 yr",
        avatar: 'asd',
        skills: [
          {
            id: 1,
            name: "Java",
            level: "Expert"
          },
          {
            id: 2,
            name: "Php",
            level: "Beginner"
          },
          {
            id: 3,
            name: "Wordpress",
            level: "Immediate"
          }
        ],
        languages: [
          {
            id: 1,
            name: "English",
            level: 'Expert'
          }
        ]
      },
      {
        id: 2,
        fullName: "Full name",
        position: "Fullstack developer",
        yearExperience: "4 yr",
        avatar: 'asd',
        skills: [
          {
            id: 1,
            name: "Java",
            level: "Expert"
          },
          {
            id: 2,
            name: "Php",
            level: "Beginner"
          },
          {
            id: 3,
            name: "Wordpress",
            level: "Immediate"
          }
        ],
        languages: [
          {
            id: 1,
            name: "English",
            level: 'Expert'
          }
        ]
      },
      {
        id: 3,
        fullName: "Full name",
        position: "Fullstack developer",
        yearExperience: "4 yr",
        avatar: '',
        skills: [
          {
            id: 1,
            name: "Java",
            level: "Expert"
          },
          {
            id: 2,
            name: "Php",
            level: "Beginner"
          },
          {
            id: 3,
            name: "Wordpress",
            level: "Immediate"
          }
        ],
        languages: [
          {
            id: 1,
            name: "English",
            level: 'Expert'
          }
        ]
      }
    ]
  }

  onPageChange(ev: any) {
    if (ev) {
      this.paging.pageSize = ev.rows
    }

    this.paging.pageNumber = this.first + 1;
  }

  openPoup(id: string) {
    return [this.userId = id, this.showUserDetail = true];
  }
}