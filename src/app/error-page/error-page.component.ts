import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  errorMessage: string;

  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.errorMessage = data.errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
