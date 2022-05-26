import { Component, Input, OnInit } from '@angular/core';
import { INode } from 'src/app/models/node';
import { FoldersService } from '../folders.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {

  @Input() data: INode;
  @Input() nesting: number;
  public isChildrenCollapsed = true;

  constructor(private folderService: FoldersService) { }

  public doubleClickHandler(event: any) {
    this.isChildrenCollapsed = !this.isChildrenCollapsed;
    this.clickHandler(event);
  }

  public clickHandler(event: any) {
    event.stopPropagation()
    this.folderService.setCurrentNode(this.data)
  }
}
