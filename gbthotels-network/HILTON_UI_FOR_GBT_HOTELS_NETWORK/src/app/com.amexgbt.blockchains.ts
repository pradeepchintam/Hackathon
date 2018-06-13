import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.amexgbt.blockchains{
   export class Entity extends Participant {
      entityId: string;
      entityName: string;
   }
   export class HotelCommission extends Asset {
      hotelCommissionId: string;
      responsibleEntity: Entity;
      requestorEntity: Entity;
      source: string;
      recordlocator: string;
      ratecodeBooked: string;
      totalValue: number;
      commissionValue: number;
      checkinDate: string;
      checkoutDate: string;
      travelerName: string;
   }
   export class HotelReservationRequest extends Asset {
      hotelRequestId: string;
      requestor: Entity;
      location: string;
      checkinDate: Date;
      checkoutDate: Date;
   }
   export class Traveler extends Asset {
      travelerId: string;
      firstName: string;
      lastName: string;
   }
   export class HotelReservationResponse extends Asset {
      hotelReservationResponseId: string;
      hotelReservationRequest: HotelReservationRequest;
      hotel: Entity;
      address: string;
      totalCost: number;
   }
   export class BookHotel extends Transaction {
      hotelReservationResponse: HotelReservationResponse;
      traveler: Traveler;
      paymentDetails: string;
   }
   export class CommissionTransaction extends Transaction {
      hotelcommission: HotelCommission;
      responseCode: string;
      paymentDetails: string;
   }
// }
