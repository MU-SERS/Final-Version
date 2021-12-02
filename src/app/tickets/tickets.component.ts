import { Component, HostBinding, OnInit } from '@angular/core';
// import { report } from 'process';
import { Observable, of, Subscription } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { IsReadService } from '../is-read.service';
import { query } from '@angular/fire/firestore';
import {MatIconModule} from '@angular/material/icon';



class Student { 
  id: string = '';
  name: string = '';
  number: string = '';
  messages: Message[] = [];
}


class Message {
  userID: string = '';
  timeStamp: number = 0;
  messageBody: string = '';
  incoming: boolean = true;
  location: string = '';
}

class Query {
  search: string = '';
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  studentList: Student[] = [];

  activeChat?: string = undefined;

  inputValue: string = '';

  queryValue: string = '';

  userSubscription?: Subscription = void 0;

  constructor(
    private afs: AngularFirestore,
    public irs: IsReadService,

  ) { 
    // this.afs.collection('Users')
    this.loadStudents();

    // this.afs.collection('messages').snapshotChanges().subscribe(data => {
    //   this.studentList.forEach(s => s.messages = []);
    //   data.forEach(m => {
    //     const messageData = <Message>(m.payload.doc.data());
    //     this.getStudentById(messageData.userID)?.messages.push(messageData);
    //   });
    //   this.studentList.forEach(s => s.messages.sort((b,a) => b.timeStamp - a.timeStamp));
    // });

    // this.afs.collection('Users', ref => ref.where('name', '<=', this.queryValue + '\uf8ff').orderBy('name').limit(10));

    // this.afs.collection('search').snapshotChanges().subscribe(data => {
    //   data.forEach(s => {
    //     const queryData = <Query>(s.payload.doc.data());
    //     queryData.search = s.payload.doc.name;
    //     queryData.search = [];
    //     this.studentList.push(queryData);
    //   });
    // });

  }

  ngOnInit(): void {

  }

  openChat(id: string): void {
    this.activeChat = id;
    this.irs.readTickets.push(this.activeChat);
  }

  sendChat(): void {
    const today = new Date();


    this.afs.collection('messages').add({
      messageBody: this.inputValue,
      timeStamp: new Date().getTime(),
      userID: <string>this.activeChat,
      incoming: false,
    });

    this.inputValue = '';
  }

  getStudentById(id: string): Student | undefined {
    return this.studentList.find(s => s.id === id);
  }

  encodeURIComponent = window.encodeURIComponent;

  formatDate(value: number): string {
    return new Date(value).toLocaleString();
  }

  sendQuery() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentList = [];
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    this.userSubscription = this.afs.collection('Users', ref => ref
      .where('name', '<=', this.queryValue + '\uf8ff')
      .where('name', '>=', this.queryValue)
      .orderBy('name')
    ).snapshotChanges().subscribe(data => {
      data.forEach(s => {
        const studentData = <Student>(s.payload.doc.data());
        studentData.id = s.payload.doc.id;
        studentData.messages = [];
        this.studentList.push(studentData);
      });
      this.afs.collection('messages').snapshotChanges().subscribe(data => {
        this.studentList.forEach(s => s.messages = []);
        data.forEach(m => {
          const messageData = <Message>(m.payload.doc.data());
          this.getStudentById(messageData.userID)?.messages.push(messageData);
        });
        this.studentList.forEach(s => s.messages.sort((b,a) => b.timeStamp - a.timeStamp));
      });
    });

  }
}

// class dataService {
//     public getReports(): Observable<Report[]> {
//       return of([
//         new report(),
//         new report(),
//         new report()
//       ]);
//        this.httpClient.post('my-server-endpointurl/reports')
//     }
// }