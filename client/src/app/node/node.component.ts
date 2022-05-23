import { Component, Input, OnInit } from '@angular/core';
import { INode } from 'src/Models/INode';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() data: INode;
  
  constructor() { }

  ngOnInit(): void {
  }

}
