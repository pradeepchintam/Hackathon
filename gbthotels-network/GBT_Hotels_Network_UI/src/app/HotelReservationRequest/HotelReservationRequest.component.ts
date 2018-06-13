/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HotelReservationRequestService } from './HotelReservationRequest.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hotelreservationrequest',
  templateUrl: './HotelReservationRequest.component.html',
  styleUrls: ['./HotelReservationRequest.component.css'],
  providers: [HotelReservationRequestService]
})
export class HotelReservationRequestComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  hotelRequestId = new FormControl('', Validators.required);
  requestor = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  checkinDate = new FormControl('', Validators.required);
  checkoutDate = new FormControl('', Validators.required);

  constructor(private serviceHotelReservationRequest: HotelReservationRequestService, fb: FormBuilder) {
    this.myForm = fb.group({
      hotelRequestId: this.hotelRequestId,
      requestor: this.requestor,
      location: this.location,
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHotelReservationRequest.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.amexgbt.blockchains.HotelReservationRequest',
      'hotelRequestId': this.hotelRequestId.value,
      'requestor': this.requestor.value,
      'location': this.location.value,
      'checkinDate': this.checkinDate.value,
      'checkoutDate': this.checkoutDate.value
    };

    this.myForm.setValue({
      'hotelRequestId': null,
      'requestor': null,
      'location': null,
      'checkinDate': null,
      'checkoutDate': null
    });

    return this.serviceHotelReservationRequest.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'hotelRequestId': null,
        'requestor': null,
        'location': null,
        'checkinDate': null,
        'checkoutDate': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.amexgbt.blockchains.HotelReservationRequest',
      'requestor': this.requestor.value,
      'location': this.location.value,
      'checkinDate': this.checkinDate.value,
      'checkoutDate': this.checkoutDate.value
    };

    return this.serviceHotelReservationRequest.updateAsset(form.get('hotelRequestId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceHotelReservationRequest.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceHotelReservationRequest.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'hotelRequestId': null,
        'requestor': null,
        'location': null,
        'checkinDate': null,
        'checkoutDate': null
      };

      if (result.hotelRequestId) {
        formObject.hotelRequestId = result.hotelRequestId;
      } else {
        formObject.hotelRequestId = null;
      }

      if (result.requestor) {
        formObject.requestor = result.requestor;
      } else {
        formObject.requestor = null;
      }

      if (result.location) {
        formObject.location = result.location;
      } else {
        formObject.location = null;
      }

      if (result.checkinDate) {
        formObject.checkinDate = result.checkinDate;
      } else {
        formObject.checkinDate = null;
      }

      if (result.checkoutDate) {
        formObject.checkoutDate = result.checkoutDate;
      } else {
        formObject.checkoutDate = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'hotelRequestId': null,
      'requestor': null,
      'location': null,
      'checkinDate': null,
      'checkoutDate': null
      });
  }

}
