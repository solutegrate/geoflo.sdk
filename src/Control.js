/**
 * @mixin
 * @memberof module:geoflo
 * @name Control
 * @description This module is responsible for creating and managing the control buttons in the Geoflo application.
 * @param {Array} controls - An array of control objects to be added to the map.
 * @param {Object} options - An object containing options for the control buttons.
 * @returns {Object} Returns the Control object.
 * @example
 * var control = new Control([
 *  { type: 'modes', position: 'top-right', show: true },
 *  { type: 'options', position: 'top-right', show: true },
 *  { type: 'actions', position: 'top-right', show: true },
 *  { type: 'types', position: 'top-right', show: true },
 *  { type: 'utils', position: 'top-right', show: true }
 * ], {
 *   colors: {
 *    primaryColor: '#000000',
 *    primaryBackground: '#ffffff',
 *    primaryText: '#000000',
 *    primaryBorder: '#000000',
 *    secondaryColor: '#000000',
 *    secondaryBackground: '#ffffff',
 *    secondaryText: '#000000',
 *    secondaryBorder: '#000000'
 *  }
 * });
 */

const Control = function (controls, options={}) {
    const geoflo = this.geoflo;

    this.controls = controls;
    this.options = options;

    var rgba = function (hex, alpha) {
        hex = hex.trim();


        if (hex.includes('rgba')) {
            hex = this.hex(hex);
        } else {
            if (!hex || [4, 7].indexOf(hex.length) === -1) { return false }

            hex = hex.substr(1);

            if (hex.length === 3) {
                hex = hex.split('').map(function (el) { return el + el + ''; }).join('');
            }
        }

        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        
        return alpha !== undefined ? "rgba(" + r + " " + g + " " + b + " / " + alpha + "%)" : "rgb(" + r + " " + g + " " + b + ")";
    }

    var hex = function (rgba) {
        var a,
            rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
            alpha = (rgb && rgb[4] || "").trim(),
            hex = rgb ? (rgb[1] | 1 << 8).toString(16).slice(1) + (rgb[2] | 1 << 8).toString(16).slice(1) + (rgb[3] | 1 << 8).toString(16).slice(1) : rgba;

        if (alpha !== "") {
            a = alpha;
        } else {
            a = 1;
        }

        a = ((a * 255) | 1 << 8).toString(16).slice(1)
        hex = hex + a;
        return hex;
    }



    this.enable = function (control) {
        if (!control) return null;
        this.position = control.position;
        geoflo.map.addControl(this, control.position);
    }

    this.disable = function () {
        geoflo.map.removeControl(this);
    }



    this.onAdd = function(map) {
        if (!this.options) return false;
        if (this.options.attribution) return this.setAttribution(map);
        this.setTheme(options.colors || geoflo.options.colors);
        geoflo.fire('control.add', { control: this, element: this.element });
        return this.element;
    }

    this.onRemove = function() {
        geoflo.buttons.removeButtons();
        geoflo.fire('control.remove', { element: this.element });
        geoflo.disable();
    }



    this.setAttribution = function () {
        var attr = Attr(geoflo, this.control, options);
        Object.assign(this, attr)

        this.setTheme(options.colors || geoflo.options.colors);
        geoflo.fire('control.add', { control: this, element: this.element });
        return this.element;
    }

    this.setMode = function (mode) {
        geoflo.setActiveButton(!mode ? 'select' : mode === 'draw' ? mode : mode)
    }

    this.setTheme = function(colors) {
        if (!colors) { return console.error('Control colors not provided!') };

        colors.primaryColor ? document.documentElement.style.setProperty('--' + geoflo.id + '-primary-color', rgba(colors.primaryColor)) : false;
        colors.primaryBackground ? document.documentElement.style.setProperty('--' + geoflo.id + '-primary-background', rgba(colors.primaryBackground)) : false;
        colors.primaryText ? document.documentElement.style.setProperty('--' + geoflo.id + '-primary-text', rgba(colors.primaryText)) : false;
        colors.primaryBorder ? document.documentElement.style.setProperty('--' + geoflo.id + '-primary-border', rgba(colors.primaryBorder)) : false;

        colors.secondaryColor ? document.documentElement.style.setProperty('--' + geoflo.id + '-secondary-color', rgba(colors.secondaryColor)) : false;
        colors.secondaryBackground ? document.documentElement.style.setProperty('--' + geoflo.id + '-secondary-background', rgba(colors.secondaryBackground)) : false;
        colors.secondaryText ? document.documentElement.style.setProperty('--' + geoflo.id + '-secondary-text', rgba(colors.secondaryText)) : false;
        colors.secondaryBorder ? document.documentElement.style.setProperty('--' + geoflo.id + '-secondary-border', rgba(colors.secondaryBorder)) : false;

        geoflo.fire('theme.change', { colors: colors });
        return this.getTheme();
    }

    this.setControl = function (controls) {
        if (!controls) return false;

        var buttons;

        this.element = document.createElement('div');
        this.element.className = geoflo.id + '-control-wrap';

        this.control = document.createElement('div');
        this.control.className = geoflo.statics.constants.classes.PREDEFINED_CONTROL_BASE + ' ' + geoflo.statics.constants.classes.PREDEFINED_CONTROL_GROUP;

        this.element.appendChild(this.control);

        if (Array.isArray(controls)) {
            buttons = Buttons(this.control, controls);
            Object.assign(this, buttons);
        }
        
        this.enable(buttons);
    }


    this.getTheme = function() {
        return geoflo.options.colors;
    }

    this.getButtons = function () {
        return this._buttons;
    }

    this.getControl = function (id) {
        var nodes = this.control.childNodes;
        if (!nodes.length) return;

        var control;

        if (id) nodes.forEach(function(n) { if (n.classList.contains(id)) control = n });
        return control;
    }



    this.showControl = function (id) {
        var control = this.getControl(id);
        if (!control) return false;
        
        control.style.display = this.position.includes('center') ?  'flex' : 'block';
        return control;
    }

    this.hideControl = function (id) {
        var control = this.getControl(id);
        if (!control) return false;

        control.style.display = 'none';
        return control;
    }


    this.setControl(controls);

    function Buttons (element, controls) {
        if (!controls || !element) return false;
    
        var classTypes = ['mode', 'feature', 'mouse'];
        var buttonElements = {};
        var buttonOptions = {};
        var activeButton = null;
        var currentControl;
        var position;
        
    
        var currentMapClasses = {
            mode: null,
            feature: null,
            mouse: null
        };
    
        var nextMapClasses = {
            mode: null,
            feature: null,
            mouse: null
        };
    
    
    
        const mouseleave = function (event) {
            if (!geoflo.currentMode) return false;
            geoflo.currentMode.handleOffMap ? geoflo.currentMode.handleOffMap(event) : false;
        }
    
        const mouseover = function (event) {
            if (!geoflo.currentMode) return false;
            geoflo.currentMode.handleOnMap ? geoflo.currentMode.handleOnMap(event) : false;
        }
    
        controls.forEach(function (control) {
            if (!getControlOptions(control)) control.show = false;
            setPosition(control);
            createButtons(element, control);
        })
    
        return {
            setActiveButton: setActiveButton,
            queueMapClasses: queueMapClasses,
            updateMapClasses: updateMapClasses,
            removeButtons: removeButtons,
            getButtonOptions: getButtonOptions,
            getButtonElements: getButtonElements,
            position: position
        };
        
    
        function queueMapClasses(options) {
            nextMapClasses = geoflo.Utilities.extend(nextMapClasses, options);
        }
    
        function updateMapClasses() {
            if (!geoflo.container)
                return;
    
            var classesToRemove = [];
            var classesToAdd = [];
    
            classTypes.forEach(function(type) {
                if (nextMapClasses[type] === currentMapClasses[type])
                    return;
    
                classesToRemove.push(type + '-' + currentMapClasses[type]);
                if (nextMapClasses[type] !== null) {
                    classesToAdd.push(type + '-' + nextMapClasses[type]);
                }
            });
    
            if (classesToRemove.length > 0) {
                var _geoflo$container$classL;
    
                (_geoflo$container$classL = geoflo.container.classList).remove.apply(_geoflo$container$classL, classesToRemove);
            }
    
            if (classesToAdd.length > 0) {
                var _geoflo$container$classL2;
    
                (_geoflo$container$classL2 = geoflo.container.classList).add.apply(_geoflo$container$classL2, classesToAdd);
            }
    
            currentMapClasses = geoflo.Utilities.extend(currentMapClasses, nextMapClasses);
        }
    
    
    
        function createTitle(options) {
            return '' + options.title + (options.key ? ' (' + options.key + ')' : "");
        }
    
        function createButtons (element, control) {
            var buttons = document.createElement('div');
            var group = (control.group ? control.group.toUpperCase() : control.attribution ? 'ATTR' : 'NONE') + '_GROUP';
            
            element.appendChild(buttons);
    
            buttons.className = '' + geoflo.statics.constants.classes[group] + ' ' + control.type;
            buttons.style.display = control.show ? position.includes('center') ?  'flex' : 'block' : 'none';
    
            control.show && control.divider ? element.appendChild(createDivider()) : false;
    
            buttons.addEventListener('mouseover', mouseover);
            buttons.addEventListener('mouseleave', mouseleave);
    
            addButtons(control, buttons);
    
            return buttons;
        }
    
        function createBaseButton(id, options) {
            if (!currentControl || !currentControl.buttons[id]) return false;
    
            var position = options.position;
            var button = options.button || document.createElement('button');
    
            options.key = geoflo.options.keys && geoflo.options.keys[id] ? geoflo.options.keys[id] : options.key;
    
            if (options.title) { button.setAttribute('title', createTitle(options)); }
            options.container.appendChild(button);
    
            options["id"] = id;
            options["button"] = button;
    
            options.add = function (opts={}) {
                this.button.style.display = 'flex';
                this.onAdd ? this.onAdd(opts) : this;
            }
    
            options.remove = function (opts={}) {
                this.button.style.display = 'none';
                this.onRemove ? this.onRemove(opts) : this;
            }
    
            options.activate = function () {
                this.button.classList.remove(options.inactiveClass);
                this.button.classList.add(options.activeClass);
                this.button.classList.add(geoflo.statics.constants.classes.ACTIVE_BUTTON);
            }
    
            options.deactivate = function () {
                button.classList.remove(options.activeClass);
                button.classList.remove(geoflo.statics.constants.classes.ACTIVE_BUTTON);
                button.classList.add(options.inactiveClass);
            }
    
            options.dontShow ? button.style.display = 'none' : false;
    
            buttonElements[id] = button;
            buttonOptions[id] = options;
    
            if (position) {
                position = position.includes('right') ? 'left' :
                position.includes('left') ? 'right' :
                position.includes('bottom') ? 'top' :
                position.includes('top') ? 'bottom' :
                'absolute';
            }
    
            options.container.tooltipPosition = position;
            geoflo.addTooltip(options.container, button, createTitle(options));
            return button;
        }
    
        function createControlButton(id) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    
            var button = createBaseButton(id, options);
            if (!button) return false;
    
            button.className = geoflo.statics.constants.classes.CONTROL_BUTTON + ' ' + options.className;
    
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
    
                if (e.target === activeButton) {
                    deactivateButtons();
                    options.onDeactivate ? options.onDeactivate(options) : false;
                } else if (options.onActivate(options)) {
                    setActiveButton(id);
                }
            }, true);
    
            return button;
        }
    
        function createOptionButton(id) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    
            var button = createBaseButton(id, options);
            if (!button) return false;
    
            button.className = '' + geoflo.statics.constants.classes.CONTROL_BUTTON;
    
            if (geoflo.options[options.name] && geoflo.options[options.name].enable) {
                button.classList.add(options.activeClass);
                button.classList.add(geoflo.statics.constants.classes.ACTIVE_BUTTON);
            } else {
                button.classList.add(options.inactiveClass);
            }
    
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!geoflo.options[options.name]) { geoflo.options[options.name] = {}; }
    
                if (geoflo.options[options.name].enable) {
                    if (options.onDeactivate) options.onDeactivate(options);
                } else {
                    options.onActivate(options);
                }
            }, true);
    
            return button;
        }
    
        function createActionButton(id) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    
            var button = createBaseButton(id, options);
            if (!button) return false;
    
            button.className = geoflo.statics.constants.classes.ACTION_BUTTON + ' ' + options.className;
    
            if (id === 'locate' && geoflo.locate) if (geoflo.locate.control) geoflo.locate.control._container.remove();
    
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                options.onActivate(options);
            }, true);
    
            return button;
        }
    
        function createDivider() {
            var divider = document.createElement('div');
            divider.className = '' + geoflo.statics.constants.classes.DIVIDER;
            return divider;
        }
    
    
        function setPosition (control) {
            if (!position) {
                if (!control.position) throw new Error('The first control needs to have a position')
                position = control.position;
            }
        }
    
    
        function deactivateButtons() {
            if (!activeButton) return;
            activeButton.classList.remove(geoflo.statics.constants.classes.ACTIVE_BUTTON);
            activeButton = null;
        }
    
        function setActiveButton(id) {
            deactivateButtons();
    
            var button = !id && geoflo.editMode ? buttonElements['edit'] : !id ? buttonElements['select'] : id === 'edit' ? buttonElements['select'] : buttonElements[id];
            if (!button) return;
    
            if (button && id !== 'trash') {
                if (button.title.includes('Draw ')) {
                    if (button.title.includes(geoflo.currentMode.type)) {
                        button.classList.add(geoflo.statics.constants.classes.ACTIVE_BUTTON);
                        activeButton = button;
                    }
                } else {
                    button.classList.add(geoflo.statics.constants.classes.ACTIVE_BUTTON);
                }
            }
        }
    
    
        function addButtons(control, buttons) {
            currentControl = control;
    
            if (control.type === 'modes') {
                createControlButton("select", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_SELECT,
                    key: "s",
                    title: 'Select Features',
                    onAdd: function () {
                        if ((geoflo.editMode || geoflo.drawMode)) {
                            geoflo.getButtons('edit').remove();
                            geoflo.getButtons('save').add();
                        } else if (geoflo.hasSelection()) {
                            geoflo.getButtons('save').remove();
                            geoflo.getButtons('edit').add();
                        } else {
                            geoflo.getButtons('save').remove();
                            geoflo.getButtons('edit').remove();
    
                            geoflo.getButtons('undo').remove();
                            geoflo.getButtons('cancel').remove();
                            geoflo.getButtons('redo').remove();
    
                            geoflo.getButtons('import').add();
                            geoflo.getButtons('export').add();
                            geoflo.getButtons('clear').add();
                        }
                    },
                    onActivate: function onActivate() {
                        geoflo.noSelect = false;
                        geoflo.setMode();
                        return true;
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.noSelect = true;
                    }
                });
    
                createControlButton("edit", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_EDIT,
                    key: "Enter",
                    title: 'Edit Feature',
                    dontShow: true,
                    onAdd: function () {
                        geoflo.getButtons('select').remove();
                        this.button.classList.remove(geoflo.statics.constants.classes.ACTIVE_BUTTON);
                        this.button.style.display = 'flex';
                        this.button.style['background-color'] = geoflo.options.colors.secondaryBackground;
                    },
                    onActivate: function onActivate() {
                        geoflo.editFeature();
                        geoflo.getButtons('save').add();
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.currentMode.deactivate();
                    },
                    onRemove: function (e) {
                        geoflo.getButtons('save') ? false : createSelect(e);
                    }
                });
    
                createControlButton("save", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_FINSIH,
                    key: "Enter",
                    title: 'Save Edit',
                    dontShow: true,
                    onAdd: function (e) {
                        geoflo.getButtons('select').remove();
                        geoflo.getButtons('edit').remove();
    
                        geoflo.getButtons('import').remove();
                        geoflo.getButtons('export').remove();
                        geoflo.getButtons('clear').remove();
    
                        geoflo.getButtons('undo').add();
                        geoflo.getButtons('cancel').add();
                        geoflo.getButtons('redo').add();
    
                        this.button.style['background-color'] = geoflo.options.colors.secondaryColor;
                    },
                    onActivate: function onActivate(e) {
                        geoflo.currentMode.handleClick({ finish: true })
                    }
                });
            } else if (control.type === 'options') {
                createActionButton("import", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_IMPORT,
                    key: "u",
                    title: 'Import Features',
                    onActivate: function onActivate() {
                        return geoflo.loadFeatures();
                    }
                });
        
                createActionButton("export", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_EXPORT,
                    key: "d",
                    title: 'Export Features',
                    onActivate: function onActivate() {
                        return geoflo.saveFeatures();
                    }
                });
    
                createActionButton("clear", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_CLEAR,
                    key: "Delete",
                    title: 'Delete Selected or All Features',
                    onActivate: function onActivate() {
                        geoflo.deleteMeshData();
                        geoflo.deleteUserData();
                        geoflo.getButtons('select').add();
                        return true;
                    }
                });
    
                createActionButton("undo", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_UNDO,
                    key: "u",
                    title: 'Undo Edit',
                    dontShow: true,
                    onActivate: function onActivate() {
                        return geoflo.currentMode.handleUndo()
                    }
                });
        
                createActionButton("redo", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_REDO,
                    key: "r",
                    title: 'Redo Edit',
                    dontShow: true,
                    onActivate: function onActivate() {
                        return geoflo.currentMode.handleRedo()
                    }
                });
    
                createActionButton("cancel", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_CANCEL,
                    key: "Escape",
                    title: 'Cancel Edit',
                    dontShow: true,
                    onActivate: function onActivate() {
                        return geoflo.cancelEdit();
                    }
                });
            } else if (control.type === 'actions') {
                createOptionButton("snapping", {
                    container: buttons,
                    name: "snapping",
                    title: 'Enable/Disable Snapping',
                    activeClass: geoflo.id + '-snapping-enabled',
                    inactiveClass: geoflo.id + '-snapping-disabled',
                    onActivate: function onActivate() {
                        return geoflo.activateSnapping();
                    },
                    onDeactivate: function onDeactivate() {
                        return geoflo.deactivateSnapping();
                    }
                });
        
                createOptionButton("pinning", {
                    container: buttons,
                    name: "pinning",
                    title: 'Enable/Disable Pinning',
                    activeClass: geoflo.id + '-pinning-enabled',
                    inactiveClass: geoflo.id + '-pinning-disabled',
                    onActivate: function onActivate() {
                        return geoflo.activatePinning();
                    },
                    onDeactivate: function onDeactivate() {
                        return geoflo.deactivatePinning();
                    }
                });
        
                createOptionButton("routing", {
                    container: buttons,
                    name: "routing",
                    title: 'Enable/Disable Routing',
                    activeClass: geoflo.id + '-routing-enabled',
                    inactiveClass: geoflo.id + '-routing-disabled',
                    onActivate: function onActivate() {
                        return geoflo.activateRouting();
                    },
                    onDeactivate: function onDeactivate() {
                        return geoflo.deactivateRouting();
                    }
                });
    
                createOptionButton("exploring", {
                    container: buttons,
                    name: "exploring",
                    title: `Enable/Disable Exploring`,
                    activeClass: geoflo.id + '-exploring-enabled',
                    inactiveClass: geoflo.id + '-exploring-disabled',
                    onActivate: function onActivate() {
                        return geoflo.activateExploring();
                    },
                    onDeactivate: function onDeactivate() {
                        return geoflo.deactivateExploring();
                    }
                });
        
                createOptionButton("painting", {
                    container: buttons,
                    name: "painting",
                    title: 'Enable/Disable Painting',
                    activeClass: geoflo.id + '-painting-enabled',
                    inactiveClass: geoflo.id + '-painting-disabled',
                    onActivate: function onActivate() {
                        return geoflo.activatePainting();
                    },
                    onDeactivate: function onDeactivate() {
                        return geoflo.deactivatePainting();
                    }
                });
            } else if (control.type === 'types') {
                createControlButton("polyline", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_LINE,
                    key: "l",
                    title: 'Draw Polyline',
                    onActivate: function onActivate() {
                        return geoflo.setMode({
                            mode: geoflo.statics.constants.modes.DRAW,
                            type: "Polyline"
                        });
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.currentMode.deactivate();
                        geoflo.setMode();
                    }
                });
        
                createControlButton("polygon", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_POLYGON,
                    key: "p",
                    title: 'Draw Polygon',
                    onActivate: function onActivate() {
                        return geoflo.setMode({
                            mode: geoflo.statics.constants.modes.DRAW,
                            type: "Polygon"
                        });
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.currentMode.deactivate();
                        geoflo.setMode();
                    }
                });
        
                createControlButton("rectangle", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_RECTANGLE,
                    key: "r",
                    title: 'Draw Rectangle',
                    onActivate: function onActivate() {
                        return geoflo.setMode({
                            mode: geoflo.statics.constants.modes.DRAW,
                            type: "Rectangle"
                        });
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.currentMode.deactivate();
                        geoflo.setMode();
                    }
                });
        
                createControlButton("circle", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_POINT,
                    key: "o",
                    title: 'Draw Circle',
                    onActivate: function onActivate() {
                        return geoflo.setMode({
                            mode: geoflo.statics.constants.modes.DRAW,
                            type: "Circle"
                        });
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.currentMode.deactivate();
                        geoflo.setMode();
                    }
                });
    
                createControlButton("text", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_TEXT,
                    key: "t",
                    title: 'Draw Text',
                    onActivate: function onActivate() {
                        return geoflo.setMode({
                            mode: geoflo.statics.constants.modes.DRAW,
                            type: "Text"
                        });
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.currentMode.deactivate();
                        geoflo.setMode();
                    }
                });
        
                createControlButton("icon", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_ICON,
                    key: "i",
                    title: 'Draw Icon',
                    onActivate: async function onActivate() {
                        return geoflo.setMode({
                            mode: geoflo.statics.constants.modes.DRAW,
                            type: "Icon"
                        });
                    },
                    onDeactivate: function onDeactivate() {
                        geoflo.currentMode.deactivate();
                        geoflo.setMode();
                    }
                });
            } else if (control.type === 'utils') {
                createActionButton("zoom", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_ZOOM_IN_FEATURES,
                    key: "x",
                    title: 'Zoom to Extent',
                    onActivate: function onActivate() {
                        return geoflo.zoomToFeatures();
                    }
                });
    
                /* createActionButton("locate", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_LOCATE,
                    key: "u",
                    title: 'Locate User',
                    button: geoflo.locate.getButton(),
                    onActivate: function onActivate() {
                        geoflo.locate.onControlEvent(this);
                    }
                }); */
        
                createActionButton("refresh", {
                    container: buttons,
                    className: geoflo.statics.constants.classes.CONTROL_BUTTON_REFRESH,
                    key: "q",
                    title: 'Refresh',
                    onActivate: function onActivate() {
                        return geoflo.refresh();
                    }
                });
            }
    
            /* createActionButton("delete-snap", {
                container: action2Group,
                className: geoflo.statics.constants.classes.CONTROL_BUTTON_DELETE_SNAP,
                title: 'Delete Snap Layer Features',
                onAction: function onAction() {
                    return geoflo.deleteMeshData();
                }
            }); */
    
            /* createControlButton("cut", {
                container: controlGroup,
                className: geoflo.statics.constants.classes.CONTROL_BUTTON_CUT,
                key: "a",
                title: 'Cut Features',
                onActivate: function onActivate() {
                    return geoflo.setMode(geoflo.statics.constants.modes.CUT);
                }
            }); */
    
            /* createActionButton("combine", {
                container: action2Group,
                className: geoflo.statics.constants.classes.CONTROL_BUTTON_COMBINE_FEATURES,
                title: 'Combine Features',
                key: '+',
                onAction: function onAction() {
                    return geoflo.combineFeatures();
                }
            }); */
    
            /* createActionButton("group-elements", {
                container: action2Group,
                className: geoflo.statics.constants.classes.CONTROL_BUTTON_GROUP_FEATURES,
                key: "g",
                title: 'Group Similar Features',
                onAction: function onAction() {
                    return geoflo.groupFeatures();
                }
            });
    
            createActionButton("ungroup-elements", {
                container: action2Group,
                className: geoflo.statics.constants.classes.CONTROL_BUTTON_UNGROUP_FEATURES,
                key: "G",
                title: 'Ungroup Similar Features',
                onAction: function onAction() {
                    return geoflo.ungroupFeatures();
                }
            }); */
    
            /* createActionButton("create-polygon", {
                container: action2Group,
                className: geoflo.statics.constants.classes.CONTROL_BUTTON_CREATE_POLYGON,
                key: 'p',
                title: 'Create Polygon from Selected Feature',
                onAction: function onAction() {
                    return geoflo.createPolygon();
                }
            }); */
    
            /* createActionButton("hide-selected", {
                container: action2Group,
                className: geoflo.statics.constants.classes.CONTROL_BUTTON_HIDE_SELECTED,
                title: 'Hide Selected Feature',
                onAction: function onAction() {
                    return geoflo.hideFeatures();
                }
            }); */
        }

        function removeButtons() {
            Object.keys(buttonElements).forEach(function(buttonId) {
                var button = buttonElements[buttonId];
    
                if (button.parentNode) {
                    button.parentNode.removeChild(button);
                } else if (button) {
                    button.remove();
                }
    
                delete buttonElements[buttonId];
                delete buttonOptions[buttonId];
            });
        }
    
    
        function getControlOptions (control) {
            if (!control) return false;
            var controls = geoflo.options.controls && typeof geoflo.options.controls === 'object';
            var dontShow = controls ? !geoflo.options.controls[control.type] : false
            return  dontShow || control.dontShow || !geoflo.options.controls ? false : true;
        }
    
        function getButtonOptions() {
            return buttonOptions;
        }
    
        function getButtonElements() {
            return buttonElements;
        }
    }
}

export default Control;