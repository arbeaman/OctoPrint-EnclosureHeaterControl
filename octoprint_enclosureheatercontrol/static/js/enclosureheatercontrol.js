$(function() {
    function EnclosureHeaterControlViewModel(parameters) {
        var self = this;

        self.settingsViewModel = parameters[0]
        self.loginState = parameters[1];
        
        self.settings = undefined;

        self.sensingPlugin_old = "";
        self.switchingPlugin_old = "";

        self.scripts_gcode_enclosureheatercontrol_post_on = ko.observable(undefined);
        self.scripts_gcode_enclosureheatercontrol_pre_off = ko.observable(undefined);

        self.isEnclosureHeaterOn = ko.observable(undefined);

        self.enclosureheater_indicator = $("#enclosureheatercontrol_indicator");

        self.onBeforeBinding = function() {
            self.settings = self.settingsViewModel.settings;

            self.settings.plugins.enclosureheatercontrol.sensingPlugin.subscribe(function(oldValue) {
                self.sensingPlugin_old = oldValue;
            }, this, 'beforeChange');

            self.settings.plugins.enclosureheatercontrol.switchingPlugin.subscribe(function(oldValue) {
                self.switchingPlugin_old = oldValue;
            }, this, 'beforeChange');

            self.settings.plugins.enclosureheatercontrol.sensingPlugin.subscribe(function(newValue) {
                if (newValue === "_GET_MORE_") {
                    self.openGetMore();
                    self.settings.plugins.enclosureheatercontrol.sensingPlugin(self.sensingPlugin_old);
                }
            });

            self.settings.plugins.enclosureheatercontrol.switchingPlugin.subscribe(function(newValue) {
                if (newValue === "_GET_MORE_") {
                    self.openGetMore();
                    self.settings.plugins.enclosureheatercontrol.switchingPlugin(self.switchingPlugin_old);
                }
            });

            self.sensingPlugin_old = self.settings.plugins.enclosureheatercontrol.sensingPlugin();
            self.switchingPlugin_old = self.settings.plugins.enclosureheatercontrol.switchingPlugin();
        };

        self.onSettingsShown = function () {
            self.scripts_gcode_enclosureheatercontrol_post_on(self.settings.scripts.gcode["enclosureheatercontrol_post_on"]());
            self.scripts_gcode_enclosureheatercontrol_pre_off(self.settings.scripts.gcode["enclosureheatercontrol_pre_off"]());
        };

        self.onSettingsHidden = function () {
            self.settings.plugins.enclosureheatercontrol.scripts_gcode_enclosureheatercontrol_post_on = null;
            self.settings.plugins.enclosureheatercontrol.scripts_gcode_enclosureheatercontrol_pre_off = null;
        };

        self.onSettingsBeforeSave = function () {
            if (self.scripts_gcode_enclosureheatercontrol_post_on() !== undefined) {
                if (self.scripts_gcode_enclosureheatercontrol_post_on() != self.settings.scripts.gcode["enclosureheatercontrol_post_on"]()) {
                    self.settings.plugins.enclosureheatercontrol.scripts_gcode_enclosureheatercontrol_post_on = self.scripts_gcode_enclosureheatercontrol_post_on;
                    self.settings.scripts.gcode["enclosureheatercontrol_post_on"](self.scripts_gcode_enclosureheatercontrol_post_on());
                }
            }

            if (self.scripts_gcode_enclosureheatercontrol_pre_off() !== undefined) {
                if (self.scripts_gcode_enclosureheatercontrol_pre_off() != self.settings.scripts.gcode["enclosureheatercontrol_pre_off"]()) {
                    self.settings.plugins.enclosureheatercontrol.scripts_gcode_enclosureheatercontrol_pre_off = self.scripts_gcode_enclosureheatercontrol_pre_off;
                    self.settings.scripts.gcode["enclosureheatercontrol_pre_off"](self.scripts_gcode_enclosureheatercontrol_pre_off());
                }
            }
        };

        self.onStartup = function () {
            self.isEnclosureHeaterOn.subscribe(function() {
                if (self.isEnclosureHeaterOn()) {
                    self.enclosureheater_indicator.removeClass("off").addClass("on");
                } else {
                    self.enclosureheater_indicator.removeClass("on").addClass("off");
                }   
            });

            $.ajax({
                url: API_BASEURL + "plugin/enclosureheatercontrol",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    command: "getEnclosureHeaterState"
                }),
                contentType: "application/json; charset=UTF-8"
            }).done(function(data) {
                self.isEnclosureHeaterOn(data.isEnclosureHeaterOn);
            });
        }

        self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin != "enclosureheatercontrol") {
                return;
            }

            if (data.isEnclosureHeaterOn !== undefined) {
                self.isEnclosureHeaterOn(data.isEnclosureHeaterOn);
            }
        };

        self.toggleEnclosureHeater = function() {
            if (self.isEnclosureHeaterOn()) {
                if (self.settings.plugins.enclosureheatercontrol.enablePowerOffWarningDialog()) {
                    showConfirmationDialog({
                        message: "You are about to turn off the Enclosure Heater.",
                        onproceed: function() {
                            self.turnEnclosureHeaterOff();
                        }
                    });
                } else {
                    self.turnEnclosureHeaterOff();
                }
            } else {
                self.turnEnclosureHeaterOn();
            }
        };

        self.turnEnclosureHeaterOn = function() {
            $.ajax({
                url: API_BASEURL + "plugin/enclosureheatercontrol",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    command: "turnEnclosureHeaterOn"
                }),
                contentType: "application/json; charset=UTF-8"
            })
        };

    	self.turnEnclosureHeaterOff = function() {
            $.ajax({
                url: API_BASEURL + "plugin/enclosureheatercontrol",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    command: "turnEnclosureHeaterOff"
                }),
                contentType: "application/json; charset=UTF-8"
            })
        };

        self.subPluginTabExists = function(id) {
            return $('#settings_plugin_' + id).length > 0
        };

        self.openGetMore = function() {
            window.open("https://plugins.octoprint.org/by_tag/#tag-enclosureheatercontrol-subplugin", "_blank");
        };
    }

    ADDITIONAL_VIEWMODELS.push([
        EnclosureHeaterControlViewModel,
        ["settingsViewModel", "loginStateViewModel"],
        ["#navbar_plugin_enclosureheatercontrol", "#settings_plugin_enclosureheatercontrol"]
    ]);
});
