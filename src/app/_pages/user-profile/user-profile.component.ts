import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/_models/user/user-dto';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  user: UserDTO;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.userService.getUserById(userId)
          .subscribe((user) => {
            console.log(user);
            this.user = user;
          });
      }
    });
  }


  public updateActive(userId: number,nonLocked: boolean){
    console.log(userId, nonLocked)
    this.userService.updateEnabledAndNonLocked(userId,nonLocked)
    .subscribe({
      next: (next: string) =>{
        console.log(next)
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }

}
