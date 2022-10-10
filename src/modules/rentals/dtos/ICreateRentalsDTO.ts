export interface ICreateRentalsDTO {
  id?: string;
  end_date?: Date;
<<<<<<< HEAD
  total?: number;
=======
  total?: number
>>>>>>> c8c5012 (fix(tests): Fixed some tests using another repo)
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}
