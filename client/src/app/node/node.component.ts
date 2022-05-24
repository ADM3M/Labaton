import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { INode } from 'src/Models/INode';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() data: INode;
  @Input() nesting: number;
  @Output() Current = new EventEmitter<INode>();
  @Input() isChildrenCollapsed = true;

  constructor() { }

  doubleClickHandler() {
    this.isChildrenCollapsed = !this.isChildrenCollapsed;
    this.EmitData(this.data);
  }

  clickHandler() {
    this.EmitData(this.data)
  }

  EmitData(data: INode) {
    this.Current.emit(data);
  }

  ngOnInit(): void {
  }

}
