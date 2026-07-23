# OctoPrint Enclosure Heater Control
This OctoPrint plugin provides remote control of a 3D printer enclosure heater.

The enclosure heater can be switched on or off manually from the OctoPrint nav bar, and automatically:

- turned **on** when user-specified G-code commands are sent to the printer;
- turned **off** after the printer has been idle for a configurable timeout.

Switching and sensing can be handled through a compatible sub-plugin (such as
[OctoPrint-EnclosureHeaterControl-TPLink](https://github.com/arbeaman/OctoPrint-EnclosureHeaterControl-TPLink)),
G-code or system commands, or GPIO pins.

Click the heater icon in the nav bar to toggle the enclosure heater on or off:
![Enclosure Heater Control nav bar](enclosureheatercontrol_navbar.png?raw=true)

The settings screens:
![Enclosure Heater Control settings](enclosureheatercontrol_settings1.png?raw=true)

![Enclosure Heater Control settings](enclosureheatercontrol_settings2.png?raw=true)

## Setup
Install the plugin using the Plugin Manager from Settings.

## Settings
See the [Wiki](https://github.com/arbeaman/OctoPrint-EnclosureHeaterControl/wiki/Settings)

## Troubleshooting
See the [Wiki](https://github.com/arbeaman/OctoPrint-EnclosureHeaterControl/wiki/Troubleshooting)

## API
See the [Wiki](https://github.com/arbeaman/OctoPrint-EnclosureHeaterControl/wiki/API)

## Credits
Based on [OctoPrint-PSUControl](https://github.com/kantlivelong/OctoPrint-PSUControl) by Shawn Bruce (kantlivelong), used under the AGPLv3.
