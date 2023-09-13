import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/services/skill.service';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit{
  skillForm: FormGroup = new FormGroup({});
  skills: Skill[] = [];
  skillId: string = '';
  map = new Map();
  isShowPopupForm: boolean = false;
  isConfirmDelete: boolean = false;
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;
  paging: any = {
    pageNumber: 1,
    pageSize: 5
  }

  constructor(
    private fb: FormBuilder,
    private skillService: SkillService,
    private messageService: MessageService,
    private translateService: TranslateService
  ){
    this.skillForm = this.fb.group({
      skillName: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  onLoadData(ev?: any) {
    if (ev) {
      this.paging.pageNumber = ev.first/ev.rows + 1;  
    }  

    return this.skillService.getPageSkills(this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.skills = res.data.content;
          this.totalElements = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        }
      }
    )
  }

  onOpenPopup(id: string, skill: string) {
    this.skillId = id;
    this.map.set(id, skill);
    this.getSkill(id);
    this.isShowPopupForm = true;
  }

  onSubmit() {
    if (this.skillId) {
      return this.updateSkill();
    }

    return this.addSkill();
  }

  onDelete() {
    return this.skillService.deleteSkill(this.skillId).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.delete_skill_successfully');
          this.onLoadData();
          this.isShowPopupForm = false;
          this.isConfirmDelete = false;
        } else {
          AppUtil.getMessageFailed(this.messageService, this.translateService, 
            'message.delete_skill_failed');
        }
      }
    )
  }

  getSkill(id: string) {
    if (!id) return;

    return this.skillService.getSkill(id).subscribe(
      res => {
        if (res.status === 200) {
          this.skillForm.patchValue({
            skillName: res.data.skillName
          })       
        }
      }
    )
  }

  addSkill() {
    return this.skillService.addSkill(AppUtil.toSnakeCaseKey(this.skillForm.value)).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.add_skill_successfully');
          this.onLoadData();
          this.isShowPopupForm = false;
          this.skillForm.reset();
        } else {
          AppUtil.getMessageFailed(this.messageService, this.translateService,
            'message.add_skill_failed');
        }
      }
    )
  }

  updateSkill() {
    return this.skillService.updateSkill(this.skillId, AppUtil.toSnakeCaseKey(this.skillForm.value)).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.edit_skill_successfully');
          this.onLoadData();
          this.isShowPopupForm = false;
          this.skillForm.reset();
        } else {
          AppUtil.getMessageFailed(this.messageService, this.translateService,
            'message.edit_skill_failed');
        }
      }
    )
  }
}
