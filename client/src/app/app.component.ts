import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IFolderCreate } from 'src/Models/IFolderCreate';
import { INode } from 'src/Models/INode';
import { FoldersService } from './folders.service';
import { MainModalComponent } from './Modals/main-modal/main-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'client';
  @ViewChild('fileUpload') fileInput: HTMLInputElement;

  data: INode;
  current: INode;
  public fileData: File;
  modal?: BsModalRef;

  constructor(private http: HttpClient, private foldersService: FoldersService, private modalService: BsModalService) { }

  openModal(targetNodeName: string): Subject<string> {
    this.modal = this.modalService.show(MainModalComponent);
    this.modal.content.targetNode = targetNodeName;
    this.modal.content.title = "info";
    return this.modal.content.result;
  }

  ngOnInit(): void {
    this.loadFolders();
  }

  loadFolders() {
    this.foldersService.getFolders().subscribe(data => {
      this.data = data;
    })
  }

  createFolders(data: string, path: string, append: boolean, isCanceled: boolean) {
    if (isCanceled) {
      return;
    }

    let folderDTO: IFolderCreate = {
      jsonData: data,
      path: path,
      append: append
    };

    this.foldersService.createFolder(folderDTO).subscribe(node => {
      this.current.children = node.children;
    });
  }

  OnElementClick(data: INode) {

    if (this.current) {
      this.current.isActive = false;
    }

    this.current = data;
    data.isActive = true;
  }

  onFileSelect(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileData = file;
    }
  }

  onUpload() {
    if (!this.fileData || !this.current) {
      return;
    }

    this.fileData.text().then(fileData => {
      if (this.current.children.length > 0) {
        this.openModal(this.current.name).subscribe(data => {
          let cancel = data === "cancel";
          this.createFolders(fileData, this.current.path, data === "append", cancel);
        });
      }
      else {
        this.createFolders(fileData, this.current.path, false, false);
      }
    });
  }

  test() {
    console.log("click");
  }


}
