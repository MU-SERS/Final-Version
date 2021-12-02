import { Component, OnInit } from '@angular/core';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public popoverOpen = false;

  public popover2Open = false;

  faUserShield = faUserShield;


  constructor() { }

  ngOnInit(): void {

  }

  public showMenu(): void {
    this.popoverOpen = true;
    
  }

  public closeMenu(): void {
    this.popoverOpen = false;

  }

  public helpMenu(): void {
    this.popover2Open = true;
    alert("Under 'Chats' you can search or scroll through recent incoming messages. \n Once you've found the chat you're looking for you can then go into that chat by clicking the button on the ticket. \n You will know what chat your are in based on the color difference from the previous button you clicked. \n You can now respond to a chat by typing in the bottom input and clicking send. \n If a user ever gives you their location (lat/long), you can then use that information in the 'Locate' page located in the middle of the side nav bar. \n If there is not an active emergency happening in the chats you can also go to the 'Reports' menu and browse/search based off the date of anonymous tips and download them.")
    this.popoverOpen = false;
    
  }

}