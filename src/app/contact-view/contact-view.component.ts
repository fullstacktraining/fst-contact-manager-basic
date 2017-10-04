import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})

export class ContactViewDialogComponent {
  public show: Boolean = false;
  constructor(public dialogRef: MdDialogRef<ContactListComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    public contactService: ContactService,
    public snackBar: MdSnackBar,
    public dialog: MdDialog) { }

  delete(id) {
    this.contactService.delete(id).subscribe();
  }

  openConfirmDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete this contact?'
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.delete(id);
        this.notify('Contact Deleted');
        this.dialog.getDialogById('contact-dialog').close();
      }
    });
  }

  showForm(): Boolean {
    return this.show = true;
  }

  save(id, data): void {
    delete data._id;
    this.contactService.save(id, data).subscribe();
  }

  notify(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 4000 });
  }

  close(): void {
    this.dialogRef.close();
  }
}
