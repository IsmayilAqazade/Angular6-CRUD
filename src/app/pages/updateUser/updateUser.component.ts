import { Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {BootstrapAlertType} from '../../shared/growl/bootstrap-alert-type.enum';
import {BootstrapGrowlService} from '../../shared/growl/bootstrap-growl.service';
import {ModalService} from '../../shared/modal/modal.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.scss']
})
export class UpdateUserComponent implements OnInit {


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
              ) {}

  updateForm: FormGroup;

  ngOnInit() {
    console.log(this.selectedUser)
    this.updateForm = this.formBuilder.group({
      id: [this.selectedUser['id']],
      name: [this.selectedUser['first_name'], Validators.required],
      last_name: [this.selectedUser['last_name']],
      avatar: [this.selectedUser['avatar']],
      job: [this.selectedUser['job'], Validators.required]
    });
  }

  onSubmit() {
    this.userService.updateUser(this.updateForm.value)
      .subscribe(data => {
        this.modalService.hideModal();
        data['first_name'] = data['name'];
        const userData = new User(data);
        const index = this.users.findIndex(e =>  e.id === this.selectedUser.id ) ;
        this.users[index] = userData;
        this.closeModal();
        this.bootstrapGrowlService.addAlert('Successfully updated user', BootstrapAlertType.SUCCESS, 3000, true);
      });
  }
  closeModal(): void {
    console.log(this.action);
    this.action.next('');
    this.modalService.hideModal();
  }

}
