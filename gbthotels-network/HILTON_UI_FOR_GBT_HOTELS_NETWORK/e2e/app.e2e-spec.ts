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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for HILTON_UI_FOR_GBT_HOTELS_NETWORK', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be HILTON_UI_FOR_GBT_HOTELS_NETWORK', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('HILTON_UI_FOR_GBT_HOTELS_NETWORK');
    })
  });

  it('network-name should be gbthotels-network@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('gbthotels-network@0.0.1.bna');
    });
  });

  it('navbar-brand should be HILTON_UI_FOR_GBT_HOTELS_NETWORK',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('HILTON_UI_FOR_GBT_HOTELS_NETWORK');
    });
  });

  
    it('HotelCommission component should be loadable',() => {
      page.navigateTo('/HotelCommission');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('HotelCommission');
      });
    });

    it('HotelCommission table should have 12 columns',() => {
      page.navigateTo('/HotelCommission');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  
    it('HotelReservationRequest component should be loadable',() => {
      page.navigateTo('/HotelReservationRequest');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('HotelReservationRequest');
      });
    });

    it('HotelReservationRequest table should have 6 columns',() => {
      page.navigateTo('/HotelReservationRequest');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Traveler component should be loadable',() => {
      page.navigateTo('/Traveler');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Traveler');
      });
    });

    it('Traveler table should have 4 columns',() => {
      page.navigateTo('/Traveler');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('HotelReservationResponse component should be loadable',() => {
      page.navigateTo('/HotelReservationResponse');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('HotelReservationResponse');
      });
    });

    it('HotelReservationResponse table should have 6 columns',() => {
      page.navigateTo('/HotelReservationResponse');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Entity component should be loadable',() => {
      page.navigateTo('/Entity');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Entity');
      });
    });

    it('Entity table should have 3 columns',() => {
      page.navigateTo('/Entity');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('BookHotel component should be loadable',() => {
      page.navigateTo('/BookHotel');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BookHotel');
      });
    });
  
    it('CommissionTransaction component should be loadable',() => {
      page.navigateTo('/CommissionTransaction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CommissionTransaction');
      });
    });
  

});