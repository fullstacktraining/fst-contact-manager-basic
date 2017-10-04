import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent {

  data = {};
  constructor(
    public contactService: ContactService,
    public snackBar: MdSnackBar,
    public dialogRef: MdDialogRef<ContactListComponent>) { }

  save(data) {
    this.contactService.add(data).subscribe(response => {
      if (response.ok) {
        this.notify(`${data.name} added to your contacts.`);
        this.close();
      }
    });
  }

  notify(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 4000 });
  }

  close(): void {
    this.dialogRef.close();
  }

}
