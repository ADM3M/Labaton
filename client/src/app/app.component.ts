import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<INode>('../assets/a.txt').subscribe(data => {
      this.data = data;
      console.log(data);
    })
  }

  loadFolders() {

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
    let data: string;

    this.fileData.text().then(d => {
      data = d;
    })

    
  }


}
