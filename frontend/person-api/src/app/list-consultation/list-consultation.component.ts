import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConsultationService } from '../consultation.service';
import { Consultation } from '../consultation';
import { PersonService } from '../person.service';
import { PageEvent } from '@angular/material/paginator';
declare var $: any;

@Component({
  selector: 'app-list-consultation',
  templateUrl: './list-consultation.component.html',
  styleUrls: ['./list-consultation.component.css']
})
export class ListConsultationComponent implements OnInit, AfterViewInit{
  consultations: Consultation[] = [];
  dateSearch: string;
  filteredConsultations: any[];

  pageEvent: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  constructor(private consultationService: ConsultationService, private personService: PersonService) {
    this.dateSearch = '';
    this.filteredConsultations = [];
   }
   
  ngAfterViewInit() {}

  ngOnInit() {
    this.consultationService.findAll().subscribe(consultations => {
      this.consultations = consultations;
      this.consultations.forEach(consultation => {
        const date = new Date(consultation.date_consultation);
        consultation.date_consultation = date.toLocaleDateString("fr", { weekday: "long" }).substr(0,1).toUpperCase() + date.toLocaleDateString("fr", { weekday: "long" }).substr(1) + ', ' + date.toLocaleDateString("fr", { month: "long", day: "numeric", year: "numeric" });
      });
      this.filteredConsultations = this.consultations;
    });

    $.datepicker.regional['fr'] = {
      closeText: 'Fermer',
      prevText: '&#x3c;Préc',
      nextText: 'Suiv&#x3e;',
      currentText: 'Aujourd\'hui',
      monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
      'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
      monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
      'Jul','Aou','Sep','Oct','Nov','Dec'],
      dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
      dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
      dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
      weekHeader: 'Sm',
      dateFormat: 'dd-mm-yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',
      maxDate: 0,
      numberOfMonths: 2,
      showButtonPanel: true
      };
    $.datepicker.setDefaults($.datepicker.regional['fr']);
    
    $("#date-search").datepicker({
      dateFormat : "mm-dd-yy",
      language: "fr",
      onClose: (dateText: string) => {
        this.dateSearch = dateText;
        this.filterConsultations();
      }
    });
    
  }

  filterConsultations() {
    if (this.dateSearch) {
      const selectedDate = new Date(Date.parse(this.dateSearch));
      const formattedSelectedDate = selectedDate.toLocaleDateString("fr", { weekday: "long" }).substr(0,1).toUpperCase() + selectedDate.toLocaleDateString("fr", { weekday: "long" }).substr(1) + ', ' + selectedDate.toLocaleDateString("fr", { month: "long", day: "numeric", year: "numeric" });
      this.filteredConsultations = this.consultations.filter(consultation => {
        return consultation.date_consultation.toLowerCase().includes(formattedSelectedDate.toLowerCase());
      });
    } else {
      this.filteredConsultations = this.consultations;
    }
   
  }

  deleteConsultationById(id: number) {
    this.consultationService.deletebyId(id).subscribe(() => {
      console.log(`Consultation with id ${id} has been deleted successfully.`);
      this.ngOnInit();
    });
  }
  
  toggleDetails(consultation: Consultation) {
    if (!consultation.showDetails) {
      this.personService.findById(consultation.personId).subscribe(person => {
        consultation.person = person;
        consultation.personId = person.id;
        consultation.showDetails = true;
      });
    } else {
      consultation.showDetails = false;
    }
  }
  
}
