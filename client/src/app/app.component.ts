import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IFolderCreate } from 'src/Models/IFolderCreate';
import { INode } from 'src/Models/INode';
import { FoldersService } from './folders.service';

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
  private fileData: File;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private foldersService: FoldersService) { }

  ngOnInit(): void {
    this.loadFolders();
  }

  loadFolders() {
    this.foldersService.getFolders().subscribe(data => {
      this.data = data;
    })
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
    if (!this.fileData) {
      return;
    }

    let fileData: string;

    this.fileData.text().then(fileData => {
      console.log(fileData);

      let folderDTO: IFolderCreate = {
        jsonData : fileData,
        path : this.current.path,
        append: false
      }

      this.foldersService.createFolder(folderDTO).subscribe(node => {
          this.current.children = node.children;
      })
    });


  }


}
