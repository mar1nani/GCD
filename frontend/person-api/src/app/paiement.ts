
export class Paiement {
    constructor(
        public date_paiement: Date,
        public paid: number,
        public consultationId: number,
        public id: number = 0 // provide a default value of 0 for the id field
      ) {}
}
