import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { INode } from 'src/Models/INode';
import { FoldersService } from '../folders.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() data: INode;
  @Input() nesting: number;
  public isChildrenCollapsed = true;

  constructor(private folderService: FoldersService) { }

  doubleClickHandler() {
    this.isChildrenCollapsed = !this.isChildrenCollapsed;
    this.clickHandler();
  }

  clickHandler() {
    this.folderService.setCurrentNode(this.data)
  }

  ngOnInit(): void {
  }

}
