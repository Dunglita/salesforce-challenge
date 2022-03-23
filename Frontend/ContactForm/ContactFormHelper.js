({
  isAlfabetic: function (string) {
    function isLetter(char) {
      return /[a-zA-Z]/.test(char);
    }
    let noSpaceString = string.replace(/ /g, "");
    for (let letter of noSpaceString) {
      if (isLetter(letter) == false) {
        return false;
      }
    }
    return true;
  },
});
