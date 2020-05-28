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
      { id: 2, name: 'employee2', pass: 'pass2', assignedAssets: [] },
      { id: 3, name: 'employee3', pass: 'pass3', assignedAssets: [] },
      { id: 4, name: 'employee4', pass: 'pass4', assignedAssets: [] },
      { id: 5, name: 'employee5', pass: 'pass5', assignedAssets: [] },
      { id: 6, name: 'employee6', pass: 'pass6', assignedAssets: [] },
      { id: 7, name: 'employee7', pass: 'pass7', assignedAssets: [] },
      { id: 8, name: 'employee8', pass: 'pass8', assignedAssets: [] },
      { id: 9, name: 'employee9', pass: 'pass9', assignedAssets: [] },
      { id: 10, name: 'employee10', pass: 'pass10', assignedAssets: [] },
      { id: 11, name: 'employee11', pass: 'pass11', assignedAssets: [] }
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
