import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'microsoft-login';
  apiResponse!: string;

  constructor(private msalService: MsalService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if(res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
  }

  isLoggedIn() : boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logout();
  }

  getName(): string | undefined{
    if (this.msalService.instance.getActiveAccount() == null) {
      return 'unknown'
    }
    return this.msalService.instance.getActiveAccount()?.name
  }

  callProfile (){
    this.httpClient.get("https://graph.microsoft-ppe.com/v1.0/me").subscribe( resp => {
      this.apiResponse = JSON.stringify(resp);
    })
  }
}
