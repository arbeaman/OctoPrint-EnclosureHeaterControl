# coding=utf-8
from __future__ import absolute_import

__author__ = "arbeaman <35195829+arbeaman@users.noreply.github.com>"
__license__ = "GNU Affero General Public License http://www.gnu.org/licenses/agpl.html"
__copyright__ = "Copyright (C) 2024 Rick Beaman - Released under terms of the AGPLv3 License"

import octoprint.plugin

class EnclosureHeaterControl_SubPluginExample(octoprint.plugin.StartupPlugin,
                                  octoprint.plugin.RestartNeedingPlugin):

    def __init__(self):
        self.status = False


    def on_startup(self, host, port):
        enclosureheatercontrol_helpers = self._plugin_manager.get_helpers("enclosureheatercontrol")
        if not enclosureheatercontrol_helpers or 'register_plugin' not in enclosureheatercontrol_helpers.keys():
            self._logger.warning("The version of EnclosureHeaterControl that is installed does not support plugin registration.")
            return

        self._logger.debug("Registering plugin with EnclosureHeaterControl")
        enclosureheatercontrol_helpers['register_plugin'](self)


    def turn_enclosureheater_on(self):
        self._logger.info("ON")
        self.status = True


    def turn_enclosureheater_off(self):
        self._logger.info("OFF")
        self.status = False


    def get_enclosureheater_state(self):
        return self.status


__plugin_name__ = "Enclosure Heater Control - Sub Plugin Example"
__plugin_pythoncompat__ = ">=3.0,<4"

def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = EnclosureHeaterControl_SubPluginExample()
