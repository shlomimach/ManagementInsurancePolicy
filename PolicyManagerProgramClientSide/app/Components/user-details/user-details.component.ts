import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../Models/User';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Policy } from '../../Models/Policy';
import { PolicyServiceService } from '../../Services/policy-service.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,DatePipe ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent  {
  user: User = new User(); 
  isIdEditable : boolean = true;
  policies: Policy[] = [];
  policy : Policy = new Policy();
  showModal: boolean = false;

  constructor(private userService : UserService,private policyService : PolicyServiceService, private route : ActivatedRoute, private router: Router)
  {

  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.userService.getUser(userId).subscribe((user) => {
          this.user = user;
          if(this.user.id >0)//Edit Window & Show Policies Window
          {
            this.policyService.getPoliciesByUserId(this.user.id).subscribe(policies => {
              this.policies = policies;

              const currentPath = this.router.url;
              if (currentPath.includes('/add-policy/' + this.user.id)) {
                this.showModal = true;
              } 
              else {
                this.isIdEditable = false;
                this.showModal = false;
              }
            });
          } 
        });
      }
    });
  }
  addNewPolicy(): void {
    this.policy.userId = this.user.id;
    this.policyService.addPolicy(this.policy).subscribe({
      next: (response) => {
        console.log('policy added successfully', response);
      },
      error: (error) => {
        console.error('Error adding policy', error);
      }
    });

  }
  saveChanges(policy : Policy): void {
    // בדיקה אם מדובר בעדכון פוליסה או בפעולה אחרת
      this.policyService.updatePolicy(policy).subscribe({
        next: (response) => {
          console.log('הפוליסה עודכנה בהצלחה', response);
        },
        error: (error) => {
          console.error('שגיאה בעדכון הפוליסה', error);
        }
      });

  }
  
  


  deletePolicy(policyId: number) {
    // הצגת אישור למחיקה, ניתן להשתמש ב-SweetAlert2 או ב-confirm פשוט
    const confirmDelete = confirm('האם אתה בטוח שברצונך למחוק פוליסה זו?');
    if (confirmDelete) {
      // קריאה לשירות שמחיקת הפוליסה מהשרת
      this.policyService.deletePolicy(policyId).subscribe(
        (response) => {
          console.log('Policy deleted successfully', response);
          // הסרת הפוליסה מהמערך בצד לקוח
          this.policies = this.policies.filter(policy => policy.id !== policyId);
          // רענון FormArray לאחר מחיקת פוליסה
        },
        (error) => {
          console.error('Error deleting policy', error);
        }
      );
    }
  }
  
  submitForm(form: NgForm): void {
    if (!this.isIdEditable) //בדיקה לעריכת משתמש קיים ללא תעודת זהות{
    {
      // אם יש ID, עדכון משתמש קיים
      this.userService.updateUser(this.user.id,this.user).subscribe({
        next: (response) => {
          console.log('User updated successfully', response);
          // ניווט חזרה לרשימת המשתמשים או הודעה למשתמש
        },
        error: (error) => {
          console.error('Error updating user', error);
        }
      });
    } else {
      // יצירת משתמש חדש
      this.userService.addUser(this.user).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          // ניווט חזרה לרשימת המשתמשים או הודעה למשתמש
        },
        error: (error) => {
          console.error('Error adding user', error);
        }
      });
    }
  }
}

