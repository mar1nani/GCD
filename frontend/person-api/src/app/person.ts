export class Person {
  id: number;
  name: string;
  address: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  ville: string;
  healthState: string;

  isChecked: boolean = false;
  editMode: boolean = false;

  constructor(id = 0, name = '', address = '', dob = '', gender = '',phoneNumber = '', ville = '', healthState ='') {
    this.id = id;
    this.name = name;
    this.address = address;
    this.dob = dob;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.ville = ville;
    this.healthState = healthState;
  }
}
