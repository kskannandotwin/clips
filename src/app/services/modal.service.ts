import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private visible = false;

  constructor() { }

  isOpenModal() {
    return this.visible;
  }

  toggleModal() {
    this.visible = !this.visible;
  }
}
