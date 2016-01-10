// ==UserScript==
// @name        Halo 5 Auto-REQ
// @namespace   https://github.com/wormania
// @include     https://www.halowaypoint.com/*/games/halo-5-guardians/xbox-one/requisitions/categories/*?ownedOnly=False
// @version     0.9
// @grant       none
// ==/UserScript==

var x = document.querySelectorAll('[data-name]');
var str1 = "";
for (i = 0; i < x.length; i++) {
  //Skip REQ if it's not owned (for customisation items and loadout) or no certification (for power weapons/vehicles)
  if (x[i].dataset.subcategory in {"ArmorSuit":" ","Helmet":" ","Emblem":" ","":" ","Equipment":" ","Visor":" ","Stance":" ","Assassination":" ","WeaponSkin":" ",} && x[i].dataset.haveOwned === "False" || x[i].dataset.subcategory in {"PowerWeapon":"","Vehicle":""} && x[i].dataset.hasCertification === "False") {
  continue
  }
  //Initialise/clear all loadout names
  var weaponName = ""
  var sightName = ""
  var attachmentName = ""
  console.log(x[i].dataset.name);
  //Check if REQ is a loadout weapon, as they all have duplicate names and need special handling
  if (x[i].dataset.name.split(" ").slice(-1)[0] in {"Rifle":"","AR":"","BR":"",} && x[i].dataset.subcategory === "") {
  //First two words of the description give the "proper" name of the weapon for AR/BR
  console.log(x[i].dataset.description.split(" ")[0] + " " + x[i].dataset.description.split(" ")[1])
  weaponName = x[i].dataset.description.split(" ")[0] + " " + x[i].dataset.description.split(" ")[1]
  //Words 4 + 5 give the type of sight used
  console.log(x[i].dataset.description.split(" ")[3] + " " + x[i].dataset.description.split(" ")[4])
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
  console.log(x[i].dataset.description.split(" ")[0])
  weaponName = x[i].dataset.description.split(" ")[0]
  //Words 3 + 4 give the type of sight used
  console.log(x[i].dataset.description.split(" ")[2] + " " + x[i].dataset.description.split(" ")[3])
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
  console.log(str1)
  //Armours and Helmets of the same set have identical names, this gives us a way to distinguish between them
  //Emblems also share names with non-Emblem items
  if (x[i].dataset.subcategory === "Helmet" || x[i].dataset.subcategory === "ArmorSuit" || x[i].dataset.subcategory === "Emblem") {
  str1 = str1.concat(x[i].dataset.subcategory.toLowerCase())
  }
  str1 = str1.concat("\t")
  }
  console.log(weaponName + sightName + attachmentName)
}
console.log(str1)
window.prompt("Copy to clipboard: Ctrl+C, Enter", str1);

//TODO:
//See if it's possible to automate Weapon Skin data
//Maybe just COUNT those with duplicate skin names
//
//Better use of continue would remove a lot of the more complicated if/else logic (would probably require a complete refactor)