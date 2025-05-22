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
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("addButtonMsg");
            this.fnDisplayMsg(sMsg);
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
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsgfln = oTextBundle.getText("reqFirstLastName");
            var sMsgfn = oTextBundle.getText("reqFirstName");
            var oInputFNameValue = this.getView().byId("idInptFName").getValue();
            var oInputLNameValue = this.getView().byId("idInptLName").getValue();
        
            if (oInputFNameValue === "" && oInputLNameValue === "") {
                this.fnDisplayMsg(sMsgfln);
                return;
            }

            if (oInputFNameValue === "") {
                this.fnDisplayMsg(sMsgfn);
                return;
            }     
        },
    });
});