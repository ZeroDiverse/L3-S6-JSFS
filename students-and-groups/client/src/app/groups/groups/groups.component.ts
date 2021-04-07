import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {

  groupNumbers: number[];
  groupNumber: number;

  constructor() {
  }

  ngOnInit(): void {
    this.groupNumbers = [0, 1, 2, 3, 4, 5, 6];
    this.groupNumber = 0;
  }

  setGroupNumber(groupNumber) {
    this.groupNumber = groupNumber;
  }

}
