// ==UserScript==
// @name        Halo 5 Auto-REQ
// @namespace   https://github.com/wormania
// @include     https://www.halowaypoint.com/*/games/halo-5-guardians/xbox-one/requisitions/categories/*?ownedOnly=False
// @version     0.94a
// @grant       none
// ==/UserScript==

//Don't run script if you are not logged in
if (document.body.textContent.indexOf("Enter your credentials to view this data") > -1 ) {
  throw new Error("Not Logged in.");
}

var x = document.querySelectorAll('[data-name]');
var str1 = "";
for (i = 0; i < x.length; i++) {
  //Skip REQ if it's a blank item (Shows occasionally during patch time/server issues)
  if (x[i].dataset.name === "") {
    continue
  }
  //Skip REQ if it's not owned (for customisation items and loadout) or no certification (for power weapons/vehicles/powerups)
  if (x[i].dataset.subcategory in {"ArmorSuit":" ","Helmet":" ","Emblem":" ","":" ","Equipment":" ","Visor":" ","Stance":" ","Assassination":" ","WeaponSkin":" ",} && x[i].dataset.haveOwned === "False" || x[i].dataset.subcategory in {"PowerWeapon":"","Vehicle":"","Equipment":""} && x[i].dataset.hasCertification === "False") {
  continue //This line can be commented out to collect *every* REQ, useful for testing
  }
  //Initialise/clear all loadout names
  var weaponName = ""
  var sightName = ""
  var attachmentName = ""
  //Check if REQ is a loadout weapon, as they all have duplicate names and need special handling
  if (x[i].dataset.name.split(" ").slice(-1)[0] in {"Rifle":"","AR":"","BR":"",} && x[i].dataset.subcategory === "") {
  //Special handling for the Halo 2 Battle Rifle
  if (x[i].dataset.name === "Halo 2 Battle Rifle"){
  str1 = str1.concat("Battle RifleHalo 2 Battle Rifle\tX\t")
  continue
  }
  //First two words of the description give the "proper" name of the weapon for AR/BR
  weaponName = x[i].dataset.description.split(" ")[0] + " " + x[i].dataset.description.split(" ")[1]
  //Words 4 + 5 give the type of sight used
  sightName = x[i].dataset.description.split(" ")[3] + " " + x[i].dataset.description.split(" ")[4]
  //Weapons without an attachment have a period after the sight, these can skip over the attachment check
  if (sightName.slice(-1) === "."){
  sightName = sightName.replace("\.", "")
  attachmentName = ""
  } else {
  //Silencer is the only single-word attachment
  if (x[i].dataset.description.indexOf("Silencer") > -1){
  attachmentName = ", Silencer"
  } else {
  //The rest of the attachments are words 7 + 8
  attachmentName = ", " + x[i].dataset.description.split(" ")[6] + " " + x[i].dataset.description.split(" ")[7].replace("\.", "")
  }
  }
  str1 = str1.concat(weaponName + sightName + attachmentName)
  str1 = str1.concat("\tX\t")
  //For DMR/SMG/Magnum you only need the first word for the name
  } else if (x[i].dataset.name.split(" ").slice(-1)[0] in {"DMR":"","Magnum":"","SMG":"",}) {
  weaponName = x[i].dataset.description.split(" ")[0]
  //Words 3 + 4 give the type of sight used
  sightName = x[i].dataset.description.split(" ")[2] + " " + x[i].dataset.description.split(" ")[3]
  //Weapons without an attachment have a period after the sight, these can skip over the attachment check
  if (sightName.slice(-1) === "."){
  sightName = sightName.replace("\.", "")
  attachmentName = ""
  } else {
  //Silencer is the only single-word attachment
  if (x[i].dataset.description.indexOf("Silencer") > -1){
  attachmentName = ", Silencer"
  } else {
  //The rest of the attachments are words 6 + 7
  attachmentName = ", " + x[i].dataset.description.split(" ")[5] + " " + x[i].dataset.description.split(" ")[6].replace("\.", "")
  }
  }
  str1 = str1.concat(weaponName + sightName + attachmentName)
  str1 = str1.concat("\tX\t")
  } else {
  //For most other REQs just the name attribute is enough to distinguish it
  str1 = str1.concat(x[i].dataset.name.trim().toLowerCase());
  str1 = str1.concat("\tX")
  //Armour Mods are on the loadout page so don't need a tab after the X
  if (x[i].dataset.subcategory != ""){
  str1 = str1.concat("\t")
  }
  //Armours and Helmets of the same set have identical names, this gives us a way to distinguish between them
  //Emblems also share names with non-Emblem items
  if (x[i].dataset.subcategory === "Helmet" || x[i].dataset.subcategory === "ArmorSuit" || x[i].dataset.subcategory === "Emblem") {
  str1 = str1.concat(x[i].dataset.subcategory.toLowerCase())
  }
  str1 = str1.concat("\t")
  }
}
//Chrome only allows 2000 characters in the window.prompt, so print to console if Chrome is detected
if (window.navigator.userAgent.indexOf("Chrome") === -1){
window.prompt("Copy to clipboard: Ctrl+C, Enter", str1);
} else {
console.log(str1)
}