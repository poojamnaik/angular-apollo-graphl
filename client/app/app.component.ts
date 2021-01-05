import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  launches = [];
  releases = [];
  loading = true;
  active = 'launch';
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    console.log('started');
  }


  fetchAlbums() {
    console.log('fetchAlbums');
    this.apollo.watchQuery<any>({
      query: gql`
        {
          getAllNewReleases{
            name
            release_date
          }
        }
      `, context: {
        headers: new HttpHeaders().set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsInJvbGUiOlsiVVNFUiIsIkFETUlOIl19.q2vJPOK2JrWYLQI-aR_CJHDhnlrt0JquVPm71XPrcOs'),
      }
    })
    .valueChanges.subscribe(result => {
      console.log('result', result.data.getAllNewReleases);
      this.active = 'release';
      this.releases = result.data && result.data.getAllNewReleases;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }

  fetchLaunches() {
    console.log('fetchLaunches');
    this.apollo.watchQuery<any>({
      query: gql`
        {
          launches(pageSize:10){
            launches{
              id,
              site
            }
          }
        }
      `, context: {
        headers: new HttpHeaders().set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsInJvbGUiOlsiVVNFUiIsIkFETUlOIl19.q2vJPOK2JrWYLQI-aR_CJHDhnlrt0JquVPm71XPrcOs'),
      }
    })
    .valueChanges.subscribe(result => {
      console.log('result', result.data.launches);
      this.active = 'launch';
      this.launches = result.data && result.data.launches.launches;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }
  fetchDbData() {
    console.log('fetchDbData');
  }
}
