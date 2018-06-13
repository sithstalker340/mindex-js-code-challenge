import {Component, Input,OnInit} from '@angular/core';

import {Employee} from '../employee';
import { EmployeeService } from '../employee.service';
import { Observable, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  @Input() employee: Employee;
  compensation: number;
  totalEmployeeReports: number;
  
  constructor(private employeeService: EmployeeService) {
	  this.totalEmployeeReports = 0;
  }
  ngOnInit(){
	this.setTotalReports(this.employee);
  }
  setTotalReports(employee: Employee){
	if(this.employee && employee.directReports){
		this.totalEmployeeReports += employee.directReports.length;
		from(employee.directReports).pipe(
			flatMap(id => <Observable<Employee>> 
			this.employeeService.get(id))
		).subscribe(
			nextEmployee => this.setTotalReports(nextEmployee)
		);
	}
  }
}
