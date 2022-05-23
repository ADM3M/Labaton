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

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http.get<INode>('../assets/a.txt').subscribe(data => {
      this.data = data;
      console.log(data);
  
    })
  }

  
}
