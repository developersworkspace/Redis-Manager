import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  clusters: string[] = [];

  selectedClusterName: string = null;
  nodes: any[] = [];
  clusterDetails: any = null;

  ngOnInit() {
    this.clusters = [
      "Staging",
      "Live",
      "Web Dev London",
      "Cape Town"
    ];

    this.nodes = [
      {
        ipAddress: "RedisServer1",
        port: 7001,
        clusterName: "Staging",
        isActive: true
      },
      {
        ipAddress: "RedisServer1",
        port: 7002,
        clusterName: "Staging",
        isActive: true
      }
    ];
  }

  onClick_SelectClusterName(clusterName) {
    this.selectedClusterName = clusterName;
  }
}
