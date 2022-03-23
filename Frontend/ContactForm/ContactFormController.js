({
  handleSaveClick: function (cmp, event, helper) {
    let dbValidation = cmp.get("v.dbRequested");
    let name = cmp.get("v.person.Name__c");
    let height = cmp.get("v.person.Height__c");
    let gender = cmp.get("v.person.Gender__c");
    let hairColor = cmp.get("v.person.HairColor__c");
    let eyesColor = cmp.get("v.person.EyesColor__c");
    let dni = cmp.get("v.person.Dni__c");

    if (dbValidation == false) {
      alert("Se debe buscar un contacto existente antes de guardar");
      return;
    }

    let inputList = [name, height, gender, hairColor, eyesColor, dni];
    for (let item of inputList) {
      if (item == "") {
        alert("Revise el formulario, uno o mas campos están vacios");
        return;
      }
    }

    //FIXME: isAlfanumeric no toma caracteres con acento
    if (helper.isAlfabetic(name) == false) {
      alert("El nombre ingresado no es valido");
      return;
    }

    if (helper.isAlfabetic(hairColor) == false) {
      alert("El color de pelo ingresado no es valido");
      return;
    }

    let contact = cmp.get("v.person");
    let action = cmp.get("c.updateContact");
    action.setParams({ contact: contact });
    action.setCallback(this, function (res) {
      let state = res.getState();
      if (state === "SUCCESS") {
        const data = res.getReturnValue();
        console.log(data);
      }
    });
    $A.enqueueAction(action);
    alert("Contacto actualizado!");
  },

  handleGetContact: function (cmp, event, helper) {
    let data = event.getParam("contact");
    cmp.set("v.dbRequested", true);
    for (let key in data[0]) {
      cmp.set(`v.person.${key}`, data[0][key]);
      cmp.set(`v.isDisabled_${key}`, true);
    }
    return;
  },
});
