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
        isActive: false
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
    this.refreshNodes();
    this.selectedClusterName = clusterName;
  }

  refreshNodes() {
    this.nodes = null;
    setTimeout(() => {
      this.nodes = [];
      for (let i = 0; i < Math.round(Math.random() * 50); i++) {
        this.nodes.push({
          ipAddress: "RedisServer1",
          port: 700 + i,
          clusterName: "Staging",
          isActive: Math.random() < 0.5
        });
      }
    }, 3000);
  }
}
