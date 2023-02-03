export class Person {
    id: number;
    name: string;
    dob: string;
    address: string;
    gender:string;
    phoneNumber: string;
    ville: string;
    healthState:string;
    
    isChecked: boolean = false;
    editMode: boolean = false;

  
    constructor(id = 0, name = '', dob = '', address = '', gender = '', phoneNumber = '', ville = '', healthState = '') {
      this.id = id;
      this.name = name;
      this.dob = dob;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.gender = gender;
      this.ville = ville;
      this.healthState = healthState;
    }
  }
  