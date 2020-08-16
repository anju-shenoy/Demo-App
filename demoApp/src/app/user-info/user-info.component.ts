import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public userInfo = JSON.parse(localStorage.getItem('regData'))[0];
  id = 0;
  imgURL;
  age = '';
  phone = '';
  public hobbies = '';
  public newsLetter = '';
  constructor(private route: ActivatedRoute, public _router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
        this.userInfo = JSON.parse(localStorage.getItem('regData'))[params.id];
        this.imgURL = JSON.parse(localStorage.getItem('currentPhoto'));
        if (this.userInfo.hobbies.length > 0) {
          this.hobbies = 'I like to ';
        }
        for (let i = 0; i < this.userInfo.hobbies.length; i++) {
          this.hobbies += this.userInfo.hobbies[i];

          if (i < this.userInfo.hobbies.length - 1) {
            this.hobbies += ', ';
          } else {
            this.hobbies += '. ';
          }
        }
        if (this.userInfo.age === 1) {
          this.age = 'and I am above 20 years.';
        } else if (this.userInfo.age === 2) {
          this.age = 'and I am above 30 years.';
        } else if (this.userInfo.age === 3) {
          this.age = 'and I am above 40 years.';
        } else if (this.userInfo.age === 4) {
          this.age = 'and I am above 50 years.';
        }

        if (this.userInfo.newsLetter === true) {
          this.newsLetter = 'And please send me the news letters. ';
        }

        if (this.userInfo.phoneNumber) {
          this.phone = 'Please reachout to me at ' + this.userInfo.phoneNumber;
        }
      }
    });
  }

  onSubmit = () => {
    if (confirm('Do you confirm to submit')) {
      this._router.navigateByUrl('');
    }
  };
}
