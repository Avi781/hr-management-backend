export interface EmployeePayload {
  name: string;
  age: number;
  designation: string;
  hiring_date: string; 
  date_of_birth: string;
  salary: number;
}

export interface ListOptions {
  page: number;
  limit: number;
  search?: string;
}