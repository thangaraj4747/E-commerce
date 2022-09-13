import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  isLoading: Subject<boolean> = this.spinnerSer.isLoading;
  constructor(public spinnerSer: SpinnerService) {}

  ngOnInit(): void {}
}
