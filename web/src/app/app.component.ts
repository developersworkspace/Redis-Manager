import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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

  newNodeClusterName: string;
  newNodeIpAddress: string;
  newNodePort: number;

  clearClusterPattern: string;

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.refreshClusters();
  }

  onClick_SelectClusterName(clusterName) {
    this.selectedClusterName = clusterName;
    this.refreshNodes();
    this.refreshClusterDetails();
  }

  onClick_CreateNewNode() {
    this.http.post(environment.apiUrl + '/node/create', {
      clusterName: this.newNodeClusterName,
      ipAddress: this.newNodeIpAddress,
      port: this.newNodePort
    })
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.newNodeClusterName = null;
        this.newNodeIpAddress = null;
        this.newNodePort = null;
        this.refreshClusters();
        this.onClick_SelectClusterName(this.selectedClusterName);
      }, (err: any) => {
        console.log(err);
      });
  }

  onClick_ClearCluster() {
    this.http.post(environment.apiUrl + '/cluster/clear', {
      clusterName: this.selectedClusterName,
      pattern: this.clearClusterPattern
    })
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clearClusterPattern = null;
      }, (err: any) => {
        console.log(err);
      });
  }

  refreshNodes() {

    if (this.nodes == null) {
      return;
    }

    this.nodes = null;

    this.http.get(environment.apiUrl + '/node/list?clusterName=' + this.selectedClusterName)
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.nodes = result;
        this.updateNodeStatuses();
      }, (err: any) => {
        console.log(err);
      });
  }

  refreshClusterDetails() {

    if (this.selectedClusterName == null) {
      return;
    }


    this.http.get(environment.apiUrl + '/cluster/details?clusterName=' + this.selectedClusterName)
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clusterDetails = result;
      }, (err: any) => {
        console.log(err);
      });
  }

  refreshClusters() {
    this.http.get(environment.apiUrl + '/cluster/list')
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clusters = result;
      }, (err: any) => {
        console.log(err);
      });
  }

  updateNodeStatuses() {

    if (this.nodes == null) {
      return;
    }

    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];

      this.http.get(environment.apiUrl + '/node/status?ipAddress=' + node.ipAddress + '&port=' + node.port)
        .map((res: Response) => res.json())
        .subscribe((result: any) => {
          node.isActive = result;
        }, (err: any) => {
          console.log(err);
        });
    }
  }
}
