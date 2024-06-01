import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Server } from '../../models/server.model';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit, OnDestroy {
  server: Server;
  id;
  paramSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    // this.paramSubscription = this.route.params.subscribe((params) => {
    //   this.id = params['id'];
    //   this.server = this.serversService.getServer(+this.id);
    // });

    // reading data from route data and resolve it before component is initialized when navigating to a route

    this.paramSubscription = this.route.data.subscribe((data: Data) => {
      this.server = data.server;
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
