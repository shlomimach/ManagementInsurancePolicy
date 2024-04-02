import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private apiUrl = 'http://localhost:5144/api/Users'; // התאם את ה-URL לכתובת השרת שלך

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }



  
  // שליפת כל המשתמשים
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
 
  getUsersPerPage(page: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/UsersPerPage?pageNumber=${page}&pageSize=${pageSize}`);
  }
  // שליפת משתמש ספציפי לפי ID
  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }
  getFilteredUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/SearchUsers?p_searchLetters=${searchTerm}`);
  }
  // הוספת משתמש חדש  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  // עדכון משתמש קיים
  updateUser(id: number, user: User): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, user, this.httpOptions);
  }

  // מחיקת משתמש
  deleteUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }
}