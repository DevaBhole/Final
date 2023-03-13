import { LightningElement, track, api } from "lwc";
import recordsFetch from "@salesforce/apex/MasterController.recordsFetch";
import deleteRecord from "@salesforce/apex/DeleteObject.deleteRecord";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";

export default class DisplayRecords extends NavigationMixin(LightningElement) {
    @track fieldsSelected = [];
    @track recordsGot = false;
    @track recordsFet = [];
    @track arrtoSend = [];
    @track columnsName = [];
    @track val;

    _title = "Selected Object Does Not have any Records";
    message = "Insert Records";
    variant = "error";

    @api
    getSelectedFields(field) {
        this.fieldsSelected = [];
        this.fieldsSelected = field;
    }
    @api
    getRefreshTable() {
        this.arrtoSend = [];
        this.columnsName = [];
        this.recordsFet = [];
        this.recordsGot = false;
    }
    @track actions = [
        { label: "View", name: "view" },
        { label: "Edit", name: "edit" },
        { label: "Delete", name: "delete" }
    ];
    @track selectObject = "";
    @api
    getRecord(objectName) {
        this.selectObject = objectName;
        recordsFetch({ objname: objectName, fields: this.fieldsSelected })
            .then((result) => {
                if (result) {
                    this.arrtoSend = [];
                    // eslint-disable-next-line guard-for-in
                    for (let index in this.fieldsSelected) {
                        this.arrtoSend.push(this.fieldsSelected[index]);
                    }
                    this.val = this.arrtoSend;
                    this.columnsName = [];
                    this.columnsName = this.val.map((value, index) => ({
                        label: this.val[index],
                        fieldName: value
                    }));
                    this.columnsName = this.columnsName.concat([
                        { type: "action", typeAttributes: { rowActions: this.actions } }
                    ]);
                    this.recordsGot = true;
                    this.recordsFet = result;
                    if (this.recordsFet.length === 0) {
                        this.showError();
                    }
                } else {
                    console.log("error occurred");
                }
            })
            .catch((error) => {
                console.log("Error on record method: " + error.message);
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        // eslint-disable-next-line default-case
        switch (actionName) {
            case "view":
                this[NavigationMixin.Navigate]({
                    type: "standard__recordPage",
                    attributes: {
                        recordId: row.Id,
                        actionName: "view"
                    }
                });
                break;
            case "edit":
                this[NavigationMixin.Navigate]({
                    type: "standard__recordPage",
                    attributes: {
                        recordId: row.Id,
                        objectApiName: "$selectObject",
                        actionName: "edit"
                    }
                });
                break;
            case "delete":
                this.delRecord(this.recordId);
                break;
        }
    }
    delRecord(RowId) {
        this.showLoadingSpinner = true;
        deleteRecord({ objId: RowId })
            .then((result) => {
                window.console.log("result" + result);
                this.showLoadingSpinner = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success!!",
                        message: RowId + " Record deleted.",
                        variant: "success"
                    })
                );
                return refreshApex(this.refreshTable);
            })
            .catch((error) => {
                window.console.log("Error ====> " + JSON.stringify(error));
                this.showLoadingSpinner = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error!!",
                        message: JSON.stringify(error),
                        variant: "error"
                    })
                );
            });
    }
    showError() {
        const evnt = new ShowToastEvent({
            title: this._title,
            message: this.message,
            variant: this.variant
        });
        this.dispatchEvent(evnt);
    }
}
