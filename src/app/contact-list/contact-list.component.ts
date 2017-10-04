import { Component, Inject, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ContactService } from '../contact.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { ContactViewDialogComponent } from '../contact-view/contact-view.component';
import { ContactAddComponent } from '../contact-add/contact-add.component';

import { MdTable } from '@angular/material';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent {
  displayedColumns = ['name', 'phone', 'email', 'view'];
  dataSource = new ContactDataSource(this.contactService);

  constructor(private contactService: ContactService, public dialog: MdDialog) { }

  openDialog(id): void {
    this.contactService.view(id).subscribe(response => {
      const dialogRef = this.dialog.open(ContactViewDialogComponent, {
        id: 'contact-dialog',
        width: '450px',
        data: response
      });
      dialogRef.afterClosed().subscribe(() => {
        this.dataSource = new ContactDataSource(this.contactService);
      });
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ContactAddComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataSource = new ContactDataSource(this.contactService);
    });
  }
}

export class ContactDataSource extends DataSource<any> {
  constructor(private contactService: ContactService) {
    super();
  }
  connect(): Observable<any> {
    return this.contactService.list();
  }
  disconnect() {}
}
