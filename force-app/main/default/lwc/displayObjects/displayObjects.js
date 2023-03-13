import { LightningElement, track } from "lwc";
import getObject from "@salesforce/apex/MasterController.getObject";
import { NavigationMixin } from "lightning/navigation";
export default class displayObjects extends NavigationMixin(LightningElement) {
  @track objLst = [];
  @track selectedObjectName='';
  connectedCallback() {
    getObject()
      .then((result) => {
        if (result) {
          this.objLst = [];
          // eslint-disable-next-line guard-for-in
          for (let key in result) {
            this.objLst.push({ label: key, value: key });
          }
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getObjectFields(event) {
    this.template
      .querySelector("c-display-fields")
      .getSelectedObj(event.target.value);
      this.selectedObjectName=event.target.value;
  }

  createRecord() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: this.selectedObjectName,
        actionName: "new"
      }
    });
  }
}
