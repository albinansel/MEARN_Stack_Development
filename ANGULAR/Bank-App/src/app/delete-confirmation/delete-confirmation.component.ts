import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
// import * as EventEmitter from 'events';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  @Input() item:string | null | undefined;

  @Output() onDelete = new EventEmitter;

  @Output() onCancel = new EventEmitter;


  constructor() { }

  ngOnInit(): void {
  }

  

  delete(){
    alert("Deleting........")
    this.onDelete.emit(this.item)
  }

  cancel(){
    alert("Cancelling....")
    this.onCancel.emit()
  }

}
