# OctoPrint Enclosure Heater Control
This OctoPrint plugin controls printer enclosure heater to reduce power and for safety when the printer is not in use.  This pluging is based heavily on PSUControl by Shawn Bruce.

It adds a heater (lightning) icon at the top of the navbar that cna be clicked to turn the heater on and off.  
It can also automatically turn the heater off when a specific G-CODE (like M84 - disable steppers) is sent to the printer.

The enclosure heater can be automatically switched on when user specified commands are sent to the printer and/or switched off when idle (work in progress).

Supports Commands (G-Code or System) or GPIO to switch power supply on/off (work in progress).  Currently the only supported subplugin to control the heater is the TPLink switch subplugin.

![EnclosureHeaterControl](enclosureheatercontrol_navbar_settings.png?raw=true)
 
 
## Setup
Install the plugin using Plugin Manager from Settings
 
## Settings
See the [Wiki](https://github.com/arbeaman/OctoPrint-EnclosureHeaterControl/wiki/Settings) (Work in progress)
 
## Troubleshooting
See the [Wiki](https://github.com/arbeaman/OctoPrint-EnclosureHeaterControl/wiki/Troubleshooting) (Work in progress)

## API
See the [Wiki](https://github.com/arbeaman/OctoPrint-EnclosureHeaterControl/wiki/API) (Work in progress)

## Support
Help can be found at the [OctoPrint Community Forums](https://community.octoprint.org) (Not yet)

## Feature Requests
[![Feature Requests](https://feathub.com/arbeaman/OctoPrint-EnclosureHeaterControl?format=svg)](https://feathub.com/arbeaman/OctoPrint-EnclosureHeaterControl) (Not yet)

