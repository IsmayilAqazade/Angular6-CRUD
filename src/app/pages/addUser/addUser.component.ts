import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {BootstrapAlertType} from '../../shared/growl/bootstrap-alert-type.enum';
import {BootstrapGrowlService} from '../../shared/growl/bootstrap-growl.service';
import {ModalService} from '../../shared/modal/modal.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input()
  users: User[];
  @Input()
  action = new BehaviorSubject<string>('');

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private bootstrapGrowlService: BootstrapGrowlService,
              private modalService: ModalService
              ) {}

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      email: [],
      name: ['', Validators.required],
      last_name: [],
      avatar: [],
      job: ['', Validators.required]
    });

  }

  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe(data => {
        this.modalService.hideModal();
        data['first_name'] = data['name'];
        const userData = new User(data);
        this.users.push(userData);
        this.closeModal();
        this.bootstrapGrowlService.addAlert('Successfully added user', BootstrapAlertType.SUCCESS, 3000, true);
      });
  }

  closeModal(): void {
    this.action.next('');
    this.modalService.hideModal();
  }

}
