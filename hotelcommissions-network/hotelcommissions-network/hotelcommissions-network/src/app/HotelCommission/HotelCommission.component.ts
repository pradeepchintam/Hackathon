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
import { HotelCommissionService } from './HotelCommission.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hotelcommission',
  templateUrl: './HotelCommission.component.html',
  styleUrls: ['./HotelCommission.component.css'],
  providers: [HotelCommissionService]
})
export class HotelCommissionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  hotelCommissionId = new FormControl('', Validators.required);
  responsibleEntity = new FormControl('', Validators.required);
  requestorEntity = new FormControl('', Validators.required);
  source = new FormControl('', Validators.required);
  recordlocator = new FormControl('', Validators.required);
  ratecodeBooked = new FormControl('', Validators.required);
  totalValue = new FormControl('', Validators.required);
  commissionValue = new FormControl('', Validators.required);
  checkinDate = new FormControl('', Validators.required);
  checkoutDate = new FormControl('', Validators.required);
  travelerName = new FormControl('', Validators.required);

  constructor(private serviceHotelCommission: HotelCommissionService, fb: FormBuilder) {
    this.myForm = fb.group({
      hotelCommissionId: this.hotelCommissionId,
      responsibleEntity: this.responsibleEntity,
      requestorEntity: this.requestorEntity,
      source: this.source,
      recordlocator: this.recordlocator,
      ratecodeBooked: this.ratecodeBooked,
      totalValue: this.totalValue,
      commissionValue: this.commissionValue,
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate,
      travelerName: this.travelerName
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHotelCommission.getAll()
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
      $class: 'com.amexgbt.blockchains.HotelCommission',
      'hotelCommissionId': this.hotelCommissionId.value,
      'responsibleEntity': this.responsibleEntity.value,
      'requestorEntity': this.requestorEntity.value,
      'source': this.source.value,
      'recordlocator': this.recordlocator.value,
      'ratecodeBooked': this.ratecodeBooked.value,
      'totalValue': this.totalValue.value,
      'commissionValue': this.commissionValue.value,
      'checkinDate': this.checkinDate.value,
      'checkoutDate': this.checkoutDate.value,
      'travelerName': this.travelerName.value
    };

    this.myForm.setValue({
      'hotelCommissionId': null,
      'responsibleEntity': null,
      'requestorEntity': null,
      'source': null,
      'recordlocator': null,
      'ratecodeBooked': null,
      'totalValue': null,
      'commissionValue': null,
      'checkinDate': null,
      'checkoutDate': null,
      'travelerName': null
    });

    return this.serviceHotelCommission.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'hotelCommissionId': null,
        'responsibleEntity': null,
        'requestorEntity': null,
        'source': null,
        'recordlocator': null,
        'ratecodeBooked': null,
        'totalValue': null,
        'commissionValue': null,
        'checkinDate': null,
        'checkoutDate': null,
        'travelerName': null
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
      $class: 'com.amexgbt.blockchains.HotelCommission',
      'responsibleEntity': this.responsibleEntity.value,
      'requestorEntity': this.requestorEntity.value,
      'source': this.source.value,
      'recordlocator': this.recordlocator.value,
      'ratecodeBooked': this.ratecodeBooked.value,
      'totalValue': this.totalValue.value,
      'commissionValue': this.commissionValue.value,
      'checkinDate': this.checkinDate.value,
      'checkoutDate': this.checkoutDate.value,
      'travelerName': this.travelerName.value
    };

    return this.serviceHotelCommission.updateAsset(form.get('hotelCommissionId').value, this.asset)
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

    return this.serviceHotelCommission.deleteAsset(this.currentId)
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

    return this.serviceHotelCommission.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'hotelCommissionId': null,
        'responsibleEntity': null,
        'requestorEntity': null,
        'source': null,
        'recordlocator': null,
        'ratecodeBooked': null,
        'totalValue': null,
        'commissionValue': null,
        'checkinDate': null,
        'checkoutDate': null,
        'travelerName': null
      };

      if (result.hotelCommissionId) {
        formObject.hotelCommissionId = result.hotelCommissionId;
      } else {
        formObject.hotelCommissionId = null;
      }

      if (result.responsibleEntity) {
        formObject.responsibleEntity = result.responsibleEntity;
      } else {
        formObject.responsibleEntity = null;
      }

      if (result.requestorEntity) {
        formObject.requestorEntity = result.requestorEntity;
      } else {
        formObject.requestorEntity = null;
      }

      if (result.source) {
        formObject.source = result.source;
      } else {
        formObject.source = null;
      }

      if (result.recordlocator) {
        formObject.recordlocator = result.recordlocator;
      } else {
        formObject.recordlocator = null;
      }

      if (result.ratecodeBooked) {
        formObject.ratecodeBooked = result.ratecodeBooked;
      } else {
        formObject.ratecodeBooked = null;
      }

      if (result.totalValue) {
        formObject.totalValue = result.totalValue;
      } else {
        formObject.totalValue = null;
      }

      if (result.commissionValue) {
        formObject.commissionValue = result.commissionValue;
      } else {
        formObject.commissionValue = null;
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

      if (result.travelerName) {
        formObject.travelerName = result.travelerName;
      } else {
        formObject.travelerName = null;
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
      'hotelCommissionId': null,
      'responsibleEntity': null,
      'requestorEntity': null,
      'source': null,
      'recordlocator': null,
      'ratecodeBooked': null,
      'totalValue': null,
      'commissionValue': null,
      'checkinDate': null,
      'checkoutDate': null,
      'travelerName': null
      });
  }

}
