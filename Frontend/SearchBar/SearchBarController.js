({
  handleSearchClick: function (cmp, event, helper) {
    cmp.set("v.dbRequested", false);

    let dniInput = cmp.get("v.searchBar.Dni__c");

    if (helper.isValidDni(dniInput) == false) {
      cmp.set("v.searchBar.Dni__c", "");
      return;
    }

    let action = cmp.get("c.searchContact");
    action.setParams({ dni: dniInput });
    action.setCallback(this, function (res) {
      let state = res.getState();
      if (state === "SUCCESS") {
        alert("Contacto encontrado con exito");
        const data = res.getReturnValue();

        let getContactEvent = $A.get("e.c:getContactData");
        getContactEvent.setParams({ contact: data });
        getContactEvent.fire();
        return;
      }
      alert("No se encuentra ningun contacto con el DNI ingresado " + state);
      return;
    });
    $A.enqueueAction(action);
  },
});
