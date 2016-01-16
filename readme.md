# Halo 5 REQ Script

Script that collates your acquired Halo 5 REQ data from the Halo Waypoint website, formatted for pasting in to the [Halo 5 REQ Tracker Spreadsheet](https://docs.google.com/spreadsheets/d/1JYZ4TYIWPzVl5rplr4exQfRw2JjZQhjEEh56XruDzJI)

## Installation

###Firefox with [Greasemonkey](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/) or Chrome with [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en):
Go to the [script page](https://github.com/wormania/halo5-req-script/blob/master/halo5-req.user.js) and click on "Raw". Greasemonkey/Tampermonkey will ask you to install the script, click install.

###Firefox/Chrome *without* Greasemonkey/Tampermonkey:
No installation possible, see Usage for how you can still use the script

## Usage

###Firefox with Greasemonkey:
Navigate to your Requisition page on the Halo Waypoint. As you navigate to each of the categories ([Customization](https://www.halowaypoint.com/en-gb/games/halo-5-guardians/xbox-one/requisitions/categories/customization?ownedOnly=False), [Loadout](https://www.halowaypoint.com/en-gb/games/halo-5-guardians/xbox-one/requisitions/categories/loadout?ownedOnly=False), [Power and Vehicle](https://www.halowaypoint.com/en-gb/games/halo-5-guardians/xbox-one/requisitions/categories/powerandvehicle?ownedOnly=False)) a Message Box will pop up with your REQ Data pre-selected. 
Copy this, close the message box, and paste it to the relevant row on the tracker spreadsheet's "Paste" sheet.

###Firefox without Greasemonkey:
Open the [Raw script page](https://github.com/wormania/halo5-req-script/raw/master/halo5-req.user.js), copy the entire script (Ctrl-A, Ctrl-C). Navigate to the first Requsition page, open the console with F12 and paste the script, then hit Enter. The message box will pop up with your REQ Data for that page, copy this and paste it to the relevant row on the tracker spreadsheet's "Paste" sheet.  
Then navigate to the next Requisition page, and with the console selected you can push Up and then Enter to repeat the previous script.

###Chrome with Tampermonkey:
Navigate to your Requisition page on the Halo Waypoint. Open the console with F12 and you will see your REQ Data for the current page listed. Copy this list (triple click to quickly select all) of REQs to the spreadsheet's "Paste" sheet. Repeat through the next requisition pages.

###Chrome without Tampermonkey:
Open the [Raw script .txt](https://raw.githubusercontent.com/wormania/halo5-req-script/master/halo5-req.txt), copy the entire script (Ctrl-A, Ctrl-C). Navigate to the first Requsition page, open the console with F12 and paste the script, then hit Enter. Then you will see your REQ Data for the current page listed in the console, copy this list (triple click to quickly select all) to the spreadsheet.  
Navigate to the next Requisition page, and with the console selected you can push Up and then Enter to repeat the previous script.

## History
0.93: Stop Powerups without Certifications being counted  
0.92a: Fix crash on Chrome  
0.92: Added support for weapon skins, stop script running if not logged in to Waypoint (EN Language only)  
0.91: Readme added, removed pop up Message Box for those running Chrome (The Chrome message box is limited to 2000 characters, which truncates the data). Removed unnecessary console.logs to allow proper Chrome support  
0.9: First Public Version. Support for all REQs except Weapon Skins. Proper browser support limited to just Firefox