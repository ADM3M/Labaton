import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.css']
})
export class MainModalComponent {
  title: string;
  targetNode: string;
  result = new Subject<string>();
 
  constructor(public bsModalRef: BsModalRef) {}
  
  onOverride() {
    this.result.next("override");
    this.bsModalRef.hide()
  }

  onAppend() {
    this.result.next("append");
    this.bsModalRef.hide()
  }

  onCancel() {
    this.result.next("cancel");
    this.bsModalRef.hide()
  }
}
