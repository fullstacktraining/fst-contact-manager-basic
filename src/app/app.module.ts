import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';

import { ContactService } from './contact.service';

import { MdTableModule, MdButtonModule, MdDialogModule, MdFormFieldModule, MdInputModule, MdSnackBarModule,
        MdIconModule, MdGridListModule } from '@angular/material';
import { ContactViewDialogComponent } from './contact-view/contact-view.component';

// import { ContactUpdateComponent } from './contact-update/contact-update.component';

import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContactAddComponent } from './contact-add/contact-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactViewDialogComponent,
    ConfirmDialogComponent,
    ContactAddComponent,
    // ContactUpdateComponent
  ],
  entryComponents: [
    ContactViewDialogComponent,
    ConfirmDialogComponent,
    ContactAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdTableModule,
    MdButtonModule,
    MdDialogModule,
    MdFormFieldModule,
    MdInputModule,
    MdGridListModule,
    MdIconModule,
    MdSnackBarModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
