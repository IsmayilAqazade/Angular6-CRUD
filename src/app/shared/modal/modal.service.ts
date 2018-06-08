import {Injectable} from '@angular/core';

@Injectable()
export class ModalService {
  showModal(): void {
    // const elemModal: HTMLElement = document.getElementById('crudModal');
    const elemBackDrop: HTMLElement = document.getElementById('modalBackDrop');
    // elemModal.classList.add('show');
    elemBackDrop.classList.add('modal-backdrop', 'show');
  }
  hideModal(): void {
    // const elemModal: HTMLElement = document.getElementById('crudModal');
    const elemBackDrop: HTMLElement = document.getElementById('modalBackDrop');
    // elemModal.classList.remove('show');
    elemBackDrop.classList.remove('modal-backdrop', 'show');
  }
}
