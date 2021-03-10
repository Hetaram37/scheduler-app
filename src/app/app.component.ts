import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  slotForm: FormGroup;
  hours = Array(24).fill(0).map((hour, i) => i);
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  data = [];

  isSlotBooked(slot, hour) {
    let booked = false;
    if (slot.hours.indexOf(hour) !== -1) {
      booked = true
    }
    return booked
  }

  constructor(
    private appService: AppService
  ) {
    this.slotForm = new FormGroup({
      day: new FormControl(null, Validators.required),
      start_time: new FormControl(null, Validators.required),
      end_time: new FormControl(null, Validators.required)
    });
  }

  get day() { return this.slotForm.get('day'); }
  get start_time() { return this.slotForm.get('start_time'); }
  get end_time() { return this.slotForm.get('end_time'); }

  ngOnInit(): void {
    this.getSlotList();
  }

  get f(){
    return this.slotForm.controls;
  }

  onSubmit(){
    this.slotForm.markAllAsTouched()
    if (this.slotForm.valid) {
      this.appService.addNewSlot(this.slotForm.value).subscribe(response => {
        this.getSlotList();
      }, error => {
        throw error;
      })
    }
  }

  getSlotList() {
    this.appService.getSlotList().subscribe(response => {
      console.log(response);
      
      this.data = response.data;
    }, error => {
      throw error;
    })
  }

  changeDays(event) {
    this.slotForm.get('day').setValue(event.target.value)
  }

  changeStartTime(event) {
    this.slotForm.get('start_time').setValue(event.target.value)
  }

  changeEndTime(event) {
    this.slotForm.get('end_time').setValue(event.target.value)
  }
}
