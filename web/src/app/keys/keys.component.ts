import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Imports for HTTP
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {

  clusterName: string;
  clusterDetails: any = null;
  keys: string[];

  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clusterName = params['clusterName'];
      this.keys = ["asdasd", "asdasd", "asdasd"];
      this.refreshClusterDetails();
    });
  }

  refreshClusterDetails() {

    if (this.clusterName == null) {
      return;
    }

    this.http.get(environment.apiUrl + '/cluster/details?clusterName=' + this.clusterName)
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.clusterDetails = result;
      }, (err: any) => {
        console.log(err);
      });
  }

}
