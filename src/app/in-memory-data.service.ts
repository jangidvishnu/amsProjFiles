import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const employees = [
      { id: 1, name: 'employee1', pass: "pass1", assignedAssets: [] },
      { id: 2, name: 'employee2', pass: 'pass2', assignedAssets: [] }
    ];
    const admin = [
      { name: "admin", pass: "adminPass" }
    ]
    return { employees, admin };
  }

  genId(employee: Employee[]): number {
    return employee.length > 0 ? Math.max(...employee.map(employee => employee.id)) + 1 : 1;
  }
}
