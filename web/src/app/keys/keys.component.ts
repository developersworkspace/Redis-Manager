import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Imports for HTTP
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

// Imports models
import { ClusterDetails } from './../models/cluster-details';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {

  clusterName: string = null;
  clusterDetails: ClusterDetails = null;
  pattern: string = null;
  keys: string[] = null;

  constructor(private http: Http, private route: ActivatedRoute, private overlay: Overlay, private vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clusterName = params['clusterName'];
      this.refreshClusterDetails();
      this.refreshKeys();
    });
  }

  onClick_Search() {
    this.refreshKeys();
  }

  refreshClusterDetails() {

    if (this.clusterName == null) {
      return;
    }

    this.http.get(environment.apiUrl + '/cluster/details?name=' + this.clusterName)
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clusterDetails = result;
      }, (err: Error) => {
       
      });
  }

  refreshKeys() {

    this.keys = null;
    if (this.pattern == null) {
      this.keys = [];
      return;
    }

    this.http.get(`${environment.apiUrl}/cluster/listKeys?name=${this.clusterName}&pattern=${this.pattern}`)
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.keys = result;
      }, (err: Error) => {
        
      });
  }

  onClick_Key(key: string) {

    this.http.get(`${environment.apiUrl}/node/getkey?name=${this.clusterName}&key=${key}`)
      .map((res: Response) => res.text())
      .subscribe((result: any) => {
        this.modal.alert()
          .size('lg')
          .showClose(true)
          .title(`JSON for '${key}'`)
          .body(`
                <code>
                  ${result}
                </code>
            `)
          .open();

      }, (err: Error) => {
        
      });


  }

}
