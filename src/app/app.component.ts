import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'E-commerce';
  constructor(public spinnerSer: SpinnerService) {}
  isLoading: boolean;
  ngOnInit(): void {
    this.spinnerSer.isLoading.subscribe({
      next: (res: boolean) => {
        this.isLoading = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
