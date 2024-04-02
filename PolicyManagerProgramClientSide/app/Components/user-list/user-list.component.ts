import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { PolicyServiceService } from '../../Services/policy-service.service';
import { User } from '../../Models/User';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Policy } from '../../Models/Policy';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

  export class UserListComponent{
    
    constructor(private userService: UserService,private PolicyServiceService : PolicyServiceService, private router : Router) { }
    users: User[] = [];
    displayedUser: User[] = [];
    currentPage = 1;
    usersPerPage = 10; // כמות התלמידים להצגה בעמוד
    totalPages!: number;
    sortColumn: string = '';
    sortDirection: string = '';
    searchTerm: string = ''; // ,תלמיד לחיפוש
    countUserInPage: number = 0;
    selectedUser: User | undefined;
    policies : Policy[] = [];

    ngOnInit(): void {
      this.loadUsers();
    }
  
    showUserDetails(p_user: any) {
      console.log(this.users)
      this.selectedUser = p_user;
    }
  
    loadUsersByPage(page: number) {
    this.currentPage = page;
      this.userService.getUsersPerPage(this.currentPage, this.usersPerPage).subscribe({
        next: (data) => {
          this.displayedUser = data;
          this.countUserInPage = data.length;
        },
        error: (error) => {
          console.error('Failed to load users:', error);
        }
      });
  
    }
    deleteStudent(id: number) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe({
            next: (response) => { 
              this.loadUsers();
              Swal.fire(
                'Deleted!',
                `The student with ID ${id} has been successfully deleted.`,
                'success'
              );
            },
            error: (error) => {
              console.error('Error deleting student:', error);
              Swal.fire(
                'Error!',
                'Failed to delete the student.',
                'error'
              );
            }
          });
        }
      });
    }
  
  
  
  onNextPage() {
    this.loadUsersByPage(this.currentPage + 1);
    this.searchTerm = "";
  }
  
  onPreviousPage() {
    this.loadUsersByPage(this.currentPage - 1);
    this.searchTerm = "";
  
  }
    loadUsers(): void {
      this.userService.getUsers().subscribe({
        next: (data) => {
          this.users = data;
          if (data && data.length > 0) {
            this.users = data;
            this.totalPages = Math.ceil(this.users.length / this.usersPerPage);
            this.displayedUser = this.users; 
            this.updateSelectedUser(); 
  
  
          }
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
    updateSelectedUser(): void {
      const startIndex = (this.currentPage - 1) * this.usersPerPage;
      const endIndex = startIndex + this.usersPerPage;
      this.displayedUser = this.users.slice(startIndex, endIndex);
      this.searchTerm = "";
      this.countUserInPage = this.displayedUser.length;
  
    }
  
  
    goToPage(page: number): void {
      this.currentPage = page;
      this.updateSelectedUser();
    }
    goToFirstPage(): void {
      this.currentPage = 1;
      this.updateSelectedUser();
    }
  
    goToLastPage(): void {
      this.currentPage = this.totalPages;
      this.updateSelectedUser();
    }
  
  
  
    sortData(column: string): void {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
  
      this.users.sort((a, b) => {
        let valueA = (a as any)[this.sortColumn];
        let valueB = (b as any)[this.sortColumn];
  
        if (this.sortDirection === 'asc') {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      });
  
      this.updateSelectedUser();
    }
  
    filterUsers(): void {
      if (this.searchTerm.length >= 2) {
        this.userService.getFilteredUsers(this.searchTerm).subscribe(data => {
          this.displayedUser = data;
          this.countUserInPage = data.length;
  
        });
      } else {
        // החיפוש קצר מ-2 אותיות? הצג את כל הלקוחות - ייעול המערכת
        this.loadUsersByPage(this.currentPage);
        this.countUserInPage = this.displayedUser.length;
  
      }
    }

    editUserDetails(user :User)
    {
      console.log("editUserDetails: userId = " + user.id)
      this.router.navigate(['/edit-user', user.id]);
3
    }

    purchaseNewPolicy(user : User)
    {
      this.router.navigate(['/add-policy', user.id]);

    }
  }