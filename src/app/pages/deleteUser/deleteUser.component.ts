import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {BootstrapAlertType} from '../../shared/growl/bootstrap-alert-type.enum';
import {BootstrapGrowlService} from '../../shared/growl/bootstrap-growl.service';
import {ModalService} from '../../shared/modal/modal.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {filter, map, scan} from 'rxjs/operators';

@Component({
  selector: 'app-delete-user',
  templateUrl: './deleteUser.component.html',
  styleUrls: ['./deleteUser.component.scss']
})
export class DeleteUserComponent implements OnInit  {
  @Input()
  users: User[];
  @Input()
  selectedUser: User;
  @Input()
  action = new BehaviorSubject<string>('');

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private bootstrapGrowlService: BootstrapGrowlService,
              private modalService: ModalService
              ) { }

  deleteForm: FormGroup;

  ngOnInit() {
    console.log(this.selectedUser)
    // this.selectedUser.subscribe(next => {
      this.deleteForm = this.formBuilder.group({
        id: [this.selectedUser['id']],
        name: [this.selectedUser['first_name'], Validators.required],
        last_name: [this.selectedUser['last_name']],
        avatar: [this.selectedUser['avatar']],
        job: [this.selectedUser['job'], Validators.required]
      });
    // });
  }
  closeModal(): void {
    this.action.next('');
    this.modalService.hideModal();
  }

  onSubmit() {
    const id = this.selectedUser['id'];
    // this.selectedUser.pipe(map(el =>   el['id'] )).subscribe(el => {id = el});
    this.userService.deleteUser(id)
      .subscribe(data => {
        this.closeModal();
        this.modalService.hideModal();
        const index = this.users.findIndex(e => { return e.id === id; }) ;
        this.users.splice(index, 1);
        this.closeModal();
        this.bootstrapGrowlService.addAlert('Successfully deleted user', BootstrapAlertType.SUCCESS, 3000, true);
      });
  }


}
