import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INode } from 'src/Models/INode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'client';
  data: INode;
  current: INode;
  private fileData: File;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get<INode>('../assets/a.txt').subscribe(data => {
    //   this.data = data;
    // });
    this.loadFolders();
  }

  loadFolders() {
    this.http.get<INode>(this.baseUrl + "folders").subscribe(data => {
      this.data = data;
    })
  }

  OnElementClick(data: INode) {

    if (this.current) {
      this.current.isActive = false;
    }

    this.current = data;
    console.log(data);
    data.isActive = true;
  }

  onFileSelect(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileData = file;
    }
  }

  onUpload() {
    if (this.fileData) {
      let data: string;

      this.fileData.text().then(d => {
        data = d;
      })
    }
  }


}
