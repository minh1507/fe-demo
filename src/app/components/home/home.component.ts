import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

interface FoodNode {
  name: string;
  children?: FoodNode[];
  url?: string;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Quản trị hệ thống',
    children: [
      { name: 'Tài khoản', url: 'user' },
      { name: 'Nhóm quyền', url: 'permit' },
    ],
    url: 'user',
  },
  {
    name: 'Kế hoạch',
    children: [
      {
        name: 'Danh mục kế hoạch',
        children: [{ name: 'Hạng mục chính' }, { name: 'Hạng mục' }],
      },
      {
        name: 'Gói thầu',
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  screenHeight: any = 0;
  screenWidth: any = 0;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url as string,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  isSide: boolean = true;
  constructor(private router: Router) {
    this.onResize();
    this.dataSource.data = TREE_DATA;
  }

  change(url: string) {
    if (url != 'user') {
      this.router.navigate(['home/' + url]);
    } else {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {}

  sidebar() {
    this.isSide = !this.isSide;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
