import { api, LightningElement, track, wire } from "lwc";
import getFields from "@salesforce/apex/MasterController.getFields";
export default class FieldsSelection extends LightningElement {

  @track objectName;
  @track selectedFinalField = [];
  @api
  getSelectedObj(name) {
    this.objectName = name;
    this.template.querySelector('c-display-Records').getRefreshTable();
  }
  @track objectFields = [];
  @wire(getFields, { selectedObjName: "$objectName" })
  selectObjectName({ data, error }) {
    if (data) {
      console.log('In GetFields');
      this.objectFields = [];
      // eslint-disable-next-line guard-for-in
      for (let field in data) {
        this.objectFields.push({ label: field, value: field });
      }
    }
    else if (error) {
      console.log(error);
    }
  }

  selectedFields(event) {
    this.template.querySelector('c-display-Records').getSelectedFields(event.detail.value);
    console.log(event.detail.value);
    this.selectedFinalField = [];
    this.selectedFinalField = event.detail.value;

  }
  getRecords() {
    this.template.querySelector('c-display-Records').getRecord(this.objectName);
    console.log('Button Click');
  }

}


