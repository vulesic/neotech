export interface PaginationIC {
  count: number; 
  limit: number; 
  handleClick: (page: number) => void;
}

export interface EmployeeIC {
  _id: string;
  deletedAt: string | null;
  isDeleted: boolean;
  dateOfBirth: string;
  dateOfEmployment: string;
  homeAddress: {
    addressLine1: string;
    addressLine2: string;
    ZIPCode: string;
    city: string;
    _id: string;
  };
  phoneNumber: string;
  email: string;
  name: string;
  __v: number;
}

export interface EmployeesIC {
  employees: Array<EmployeeIC>
}

export interface FetchEmployeesIC {
  employees: Array<EmployeeIC>;
  count: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface InitialStateIC {
  employees: Array<EmployeeIC>;
  count: number;
  deletedEmployees: Array<EmployeeIC>;
  deletedCount: number;
}

export interface RootState {
  employees: Array<EmployeeIC>;
  count: number;
}

export interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  homeAddress: {
    city: string;
    ZIPCode: string;
    addressLine1: string;
    addressLine2: string;
  };
  dateOfEmployment: string;
  dateOfBirth: string;
}