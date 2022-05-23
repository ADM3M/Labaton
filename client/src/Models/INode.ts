export interface INode {
    name: string;
    path: string;
    children: INode[];
    isActive: boolean;
}
