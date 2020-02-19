import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {FilesApi, TablesService} from '../tables.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['data_source_id', 'file_name', 'file_size', 'index', 'index_size'];
  data: FilesApi[] = [];
  downloadLink = 'https://www.image2020genebank.eu/data_portal/backend/file/download/';
  resultsLength = 0;
  isLoadingResults = true;
  downloadText = 'Download table';
  urls = [];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private titleService: Title, private tablesService: TablesService) { }

  ngOnInit() {
    this.titleService.setTitle('IMAGE Files');
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
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        console.log(data);
      this.data = data;
      for (const record of data) {
        if (this.urls.indexOf(record['file_url']) === -1) {
          this.urls.push(this.generateLink(record['file_url']));
        }
        if (this.urls.indexOf(record['file_index_url']) === -1) {
          this.urls.push(this.generateLink(record['file_index_url']));
        }
      }
    });
  }

  generateLink(url: string) {
    return `ftp://${url}`;
  }

  downloadData() {
    this.downloadText = 'Preparing data...';
    this.tablesService.export(this.downloadLink).subscribe(data => {
      this.downloadText = 'Download data';
      saveAs(data, 'files.txt');
    });
  }

  downloadFiles() {
    this.urls.forEach(url => FileSaver.saveAs(url));
  }

  disableButton() {
    return this.downloadText === 'Preparing data...';
  }

}
