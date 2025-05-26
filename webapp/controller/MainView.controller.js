sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.training.exer1pangda.controller.MainView", {
        fnDisplayMsg: function (sMsg){
            MessageToast.show(sMsg);
        },

        onAddItem: function (){
            // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var sMsg = oTextBundle.getText("addButtonMsg");
            // this.fnDisplayMsg(sMsg);
            if (!this.oDialog) {
                // By using loadFragment, we are adding the fragment as a dependent to the View
                // By doing so, we can use the functions inside the view's controller
                this.oDialog = this.loadFragment({
                    name: "com.training.exer1pangda.fragment.ProductDialog"
                });
            } 
            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function (){
            this.getView().byId("idProductDialog").close();
        },

        onChangeMOP: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
            var sSelectedText = oEvent.getParameter("selectedItem").getText();
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("modeOfPayment");
            var oMobileLabel = this.getView().byId("idLblPhone");
            var oMobileInput = this.getView().byId("idInputPhone");
            var oLabelCC = this.getView().byId("idLblCC");
            var oInputCC = this.getView().byId("idInputCC");

            this.fnDisplayMsg(sMsg + sSelectedText);

            if (sSelectedKey === "GCASH"){
                // show the mobile field
                oMobileLabel.setVisible(true);
                oMobileInput.setVisible(true);
            } else {
                oMobileLabel.setVisible(false);
                oMobileInput.setVisible(false);
            }

            if (sSelectedKey === "CC") {
                oLabelCC.setVisible(true);
                oInputCC.setVisible(true);
            } else {
                oLabelCC.setVisible(false);
                oInputCC.setVisible(false);
            }
        },

        onPressCheckout: function (){
            var oInputFName = this.getView().byId("idInptFName");
            var oInputLName = this.getView().byId("idInptLName");
            var oInputFNameValue = oInputFName.getValue();
            var oInputLNameValue = oInputLName.getValue();
            var oRouter = this.getOwnerComponent().getRouter();

            // Check if first name and last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === ""){
                   
            // set value state to Error
                oInputFName.setValueState("Error");
                oInputLName.setValueState("Error");
            } else {
                oInputFName.setValueState("None");
                oInputLName.setValueState("None");

            //Navigate to review page passing first
            oRouter.navTo("RouteReviewPage", {
            firstName: oInputFNameValue
            });
            }
        },
    });
});