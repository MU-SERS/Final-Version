import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Subscription } from 'rxjs';
import { IsReadService } from '../is-read.service';
import { query } from '@angular/fire/firestore';

class Report {
  title: string = '';
  body: string = '';
  date: number = 0;
  id: string = '';
  reports: [] = [];
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportList: Report[] = [];

  activeTip?: Report;

  inputValue: string = '';

  queryValue: string = '';

  reportSubscription?: Subscription = void 0;

  constructor(
    private afs: AngularFirestore,
    public irs: IsReadService,
  ) { 

    this.loadReports();

    // this.afs.collection('reports').snapshotChanges().subscribe(data => {
    //   data.forEach(s => {
    //     const reportData = <Report>(s.payload.doc.data());
    //     reportData.id = s.payload.doc.id;
    //     this.reportList.push(reportData);
    //   });
    // });

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    sendQuery() {
      this.loadReports();
    }
  
    loadReports() {
      this.reportList = [];
      if (this.reportSubscription) {
        this.reportSubscription.unsubscribe();
      }
  
      this.reportSubscription = this.afs.collection('reports', ref => ref
        .where('date', '<=', this.queryValue + '\uf8ff')
        .where('date', '>=', this.queryValue)
        .orderBy('date')
      ).snapshotChanges().subscribe(data => {
        data.forEach(s => {
          const reportData = <Report>(s.payload.doc.data());
          reportData.id = s.payload.doc.id;
          reportData.reports = [];
          this.reportList.push(reportData);
        });
      });
    };
  

  // // constructor() { 
  //   var tip = new Tip();
  //   tip.date = '10-19-21';
  //   var report = new Report();
  //   report.title = 'What i saw in class';
  //   report.body = 'My friend is bleeding really badly';
  //   tip.report = report;
  //   this.tipList.push(tip);

  //   var tip2 = new Tip();
  //   var report2 = new Report();
  //   tip2.date = '10-20-21';
  //   report2.title = 'What i saw at the dorm';
  //   report2.body = 'My friend is dead';
  //   tip2.report = report2;
  //   this.tipList.push(tip2);


  // ngOnInit(): void {
  // }

  openTip(index: number): void {
    this.activeTip = this.reportList[index];
    this.irs.readReports.push(this.activeTip.id);
  }

//download button blob object
  downloadRepo(report: Report): void {
    let text = `title:  \n${report.title}\n\nbody: \n${report.body}`;
    let data = new Blob([text], {type: 'text/plain'});

    const anchor: any = document.createElement('a');
            anchor.style.display = 'none';
            const url = window.URL.createObjectURL(data);
            anchor.href = url;
            anchor.download = 'Report';
            document.body.appendChild(anchor); 
            anchor.target = '_blank';
            anchor.click();
    document.body.removeChild(anchor);
                window.URL.revokeObjectURL(url);
  }

}
// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }

