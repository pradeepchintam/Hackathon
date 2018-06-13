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
import { HotelReservationResponseService } from './HotelReservationResponse.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hotelreservationresponse',
  templateUrl: './HotelReservationResponse.component.html',
  styleUrls: ['./HotelReservationResponse.component.css'],
  providers: [HotelReservationResponseService]
})
export class HotelReservationResponseComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  hotelReservationResponseId = new FormControl('', Validators.required);
  hotelReservationRequest = new FormControl('', Validators.required);
  hotel = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  totalCost = new FormControl('', Validators.required);

  constructor(private serviceHotelReservationResponse: HotelReservationResponseService, fb: FormBuilder) {
    this.myForm = fb.group({
      hotelReservationResponseId: this.hotelReservationResponseId,
      hotelReservationRequest: this.hotelReservationRequest,
      hotel: this.hotel,
      address: this.address,
      totalCost: this.totalCost
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHotelReservationResponse.getAll()
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
      $class: 'com.amexgbt.blockchains.HotelReservationResponse',
      'hotelReservationResponseId': this.hotelReservationResponseId.value,
      'hotelReservationRequest': this.hotelReservationRequest.value,
      'hotel': this.hotel.value,
      'address': this.address.value,
      'totalCost': this.totalCost.value
    };

    this.myForm.setValue({
      'hotelReservationResponseId': null,
      'hotelReservationRequest': null,
      'hotel': null,
      'address': null,
      'totalCost': null
    });

    return this.serviceHotelReservationResponse.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'hotelReservationResponseId': null,
        'hotelReservationRequest': null,
        'hotel': null,
        'address': null,
        'totalCost': null
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
      $class: 'com.amexgbt.blockchains.HotelReservationResponse',
      'hotelReservationRequest': this.hotelReservationRequest.value,
      'hotel': this.hotel.value,
      'address': this.address.value,
      'totalCost': this.totalCost.value
    };

    return this.serviceHotelReservationResponse.updateAsset(form.get('hotelReservationResponseId').value, this.asset)
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

    return this.serviceHotelReservationResponse.deleteAsset(this.currentId)
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

    return this.serviceHotelReservationResponse.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'hotelReservationResponseId': null,
        'hotelReservationRequest': null,
        'hotel': null,
        'address': null,
        'totalCost': null
      };

      if (result.hotelReservationResponseId) {
        formObject.hotelReservationResponseId = result.hotelReservationResponseId;
      } else {
        formObject.hotelReservationResponseId = null;
      }

      if (result.hotelReservationRequest) {
        formObject.hotelReservationRequest = result.hotelReservationRequest;
      } else {
        formObject.hotelReservationRequest = null;
      }

      if (result.hotel) {
        formObject.hotel = result.hotel;
      } else {
        formObject.hotel = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.totalCost) {
        formObject.totalCost = result.totalCost;
      } else {
        formObject.totalCost = null;
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
      'hotelReservationResponseId': null,
      'hotelReservationRequest': null,
      'hotel': null,
      'address': null,
      'totalCost': null
      });
  }

}
