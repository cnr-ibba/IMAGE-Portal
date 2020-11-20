import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {TablesService} from '../tables.service';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['data_source_id', 'file_name', 'file_size', 'file_checksum', 'file_checksum_method'];
  data = [];
  downloadLink: string;
  resultsLength = 0;
  isLoadingResults = true;
  downloadText = 'Download table';
  urls = [];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private titleService: Title, private tablesService: TablesService) { }

  ngOnInit() {
    this.titleService.setTitle('IMAGE Files');
    this.downloadLink = this.tablesService.hostSetting.getHost() + 'file/download/';
  }

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.tablesService.getFiles(this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.results;
        })
      ).subscribe(
        data => {
          const results = [];
          for (const record of data) {
            for (let i = 0; i < record['file_name'].length; i++) {
              if (this.urls.indexOf(record['file_url'][i]) === -1) {
                this.urls.push(this.generateLink(record['file_url'][i]));
              }
              const tmp = {};
              tmp['data_source_id'] = record['data_source_id'];
              tmp['file_name'] = record['file_name'][i];
              tmp['file_size'] = record['file_size'][i];
              tmp['file_url'] = record['file_url'][i];
              tmp['file_checksum'] = record['file_checksum'][i];
              tmp['file_checksum_method'] = record['file_checksum_method'][i];
              results.push(tmp);
            }
          }

          this.data = results;
          // console.log(this.urls);
        },
        error => {
          this.isLoadingResults = false;
          console.log(error.message);
        }
      );
  }

  generateLink(url: string) {
    return `ftp://${url}`;
  }

  downloadData() {
    this.downloadText = 'Preparing data...';
    this.tablesService.export(this.downloadLink).subscribe(
      data => {
        this.downloadText = 'Download data';
        saveAs(data, 'files.txt');
      },
      error => {
        console.log(error.message);
      }
    );
  }

  downloadFiles() {
    this.urls.forEach(url => FileSaver.saveAs(url));
  }

  disableButton() {
    return this.downloadText === 'Preparing data...';
  }

}
