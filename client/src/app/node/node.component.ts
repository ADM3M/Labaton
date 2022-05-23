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
  @ViewChild('arrow', { read: ElementRef }) arrow: ElementRef;

  public isExpanded: boolean;
  public isChildrenCollapsed = true;

  constructor() { }

  collapsed(): void {
    console.log('collapsed');
    this.isExpanded = false;
    this.arrow.nativeElement.classList.add('fa-angle-down')
    this.arrow.nativeElement.classList.remove('fa-angle-left')
  }

  expanded(): void {
    console.log('expanded');
    this.isExpanded = true;
    this.arrow.nativeElement.classList.remove('fa-angle-left')
    this.arrow.nativeElement.classList.add('fa-angle-down')
  }

  clickHandler() {
    this.isChildrenCollapsed = !this.isChildrenCollapsed;
    this.EmitData(this.data);
  }

  EmitData(data: INode) {
    this.Current.emit(data);
  }

  ngOnInit(): void {
  }

}
