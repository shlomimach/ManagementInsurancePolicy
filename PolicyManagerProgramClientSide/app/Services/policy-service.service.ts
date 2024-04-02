import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from '../Models/Policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyServiceService {
  
 
  private apiUrl = 'http://localhost:5144/api/InsurancePolicies'; 

  constructor(private http: HttpClient) { }



getPoliciesByUserId(userId: number): Observable<Policy[]> {
  const url = `${this.apiUrl}/${"?id="+userId}`;
  console.log(userId)
    return this.http.get<Policy[]>(url);
    
}
addPolicy(policy: Policy) {
  return this.http.post<Policy>(this.apiUrl, policy);
}
deletePolicy(policyId: number): Observable<Policy> {
  const url = `${this.apiUrl}/${policyId}`;
  return this.http.delete<Policy>(url);
}

updatePolicy(policy: Policy) {
  const url = `${this.apiUrl}`;
  return this.http.put(url, policy);
}
}
