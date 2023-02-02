export class Person {
    id: number;
    name: string;
    age: number;
    address: string;
    isChecked: boolean = false;
    editMode: boolean = false;

  
    constructor(id = 0, name = '', age = 0, address = '') {
      this.id = id;
      this.name = name;
      this.age = age;
      this.address = address;
    }
  }
  