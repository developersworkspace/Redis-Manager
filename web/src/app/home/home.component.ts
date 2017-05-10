// Imports
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Imports models
import { Node } from './../models/node';
import { Cluster } from './../models/cluster';
import { ClusterDetails } from './../models/cluster-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clusters: Cluster[] = [];

  selectedCluster: Cluster = null;
  clusterDetails: ClusterDetails = null;

  acceptClearClusterPattern: boolean = false;
  clearClusterPattern: string;

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.refreshClusters();
  }

  onClick_SelectClusterName(name) {
    this.selectedCluster = new Cluster(name, null);
    this.refreshCluster();
    this.refreshClusterDetails();
  }


  onClick_ClearCluster() {

    if (this.selectedCluster == null) {
      return;
    }

    this.http.post(environment.apiUrl + '/cluster/clear', {
      name: this.selectedCluster.name,
      pattern: this.clearClusterPattern
    })
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clearClusterPattern = null;
        this.refreshClusterDetails();
      }, (err: Error) => {

      });
  }

  refreshCluster() {

    if (this.selectedCluster == null) {
      return;
    }

    this.http.get(environment.apiUrl + '/cluster/find?name=' + this.selectedCluster.name)
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.selectedCluster = result;
        this.updateNodeStatuses();
      }, (err: Error) => {
        
      });

  }

  refreshClusterDetails() {

    if (this.selectedCluster == null) {
      return;
    }

    this.http.get(environment.apiUrl + '/cluster/details?name=' + this.selectedCluster.name)
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clusterDetails = result;
      }, (err: Error) => {

      });
  }

  refreshClusters() {
    this.http.get(environment.apiUrl + '/cluster/list')
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clusters = result;
      }, (err: Error) => {

      });
  }

  updateNodeStatuses() {

    if (this.selectedCluster.nodes == null) {
      return;
    }

    for (let i = 0; i < this.selectedCluster.nodes.length; i++) {
      let node = this.selectedCluster.nodes[i];

      this.http.get(environment.apiUrl + '/node/status?ipAddress=' + node.ipAddress + '&port=' + node.port)
        .map((res: Response) => res.json())
        .subscribe((result: any) => {
          node.isActive = result;
        }, (err: Error) => {
          
        });
    }
  }
}
