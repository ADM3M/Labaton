import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IFolderCreate } from 'src/app/models/folderCreate';
import { INode } from 'src/app/models/node';
import { FoldersService } from './folders.service';
import { MainModalComponent } from './modals/main-modal/main-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('fileUpload') fileInput: HTMLInputElement;

  public data: INode;
  public fileData: File;
  private modal?: BsModalRef;

  constructor(public foldersService: FoldersService, private modalService: BsModalService) { }

  private openModal(targetNodeName: string): Subject<string> {
    this.modal = this.modalService.show(MainModalComponent);
    this.modal.content.targetNode = targetNodeName;
    this.modal.content.title = "info";
    return this.modal.content.result;
  }

  public ngOnInit(): void {
    this.loadFolders();
  }

  private loadFolders() {
    this.foldersService.getFolders().subscribe(data => {
      this.data = data;
      this.foldersService.current = data;
    });
  }

  private createFolders(data: string, path: string, append: boolean, isCanceled: boolean) {
    if (isCanceled) {
      return;
    }

    const folderDTO: IFolderCreate = {
      jsonData: data,
      path: path,
      append: append
    };

    this.foldersService.createFolder(folderDTO).subscribe(node => {
      this.foldersService.current.children = node.children;
    });
  }

  public onFileSelect(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileData = file;
    }
  }

  public onUpload() {
    this.fileData.text().then(fileData => {
      const current = this.foldersService.current;

      if (current.children.length > 0) {
        this.openModal(current.name).subscribe(data => {
          const cancel = data === "cancel";
          this.createFolders(fileData, current.path, data === "append", cancel);
        });
      }
      else {
        this.createFolders(fileData, current.path, false, false);
      }
    });
  }

  public resetClicks() {
    this.foldersService.setCurrentNode(this.data);
  }
}