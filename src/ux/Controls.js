const Attr = function (ctx, element, control) {
    var classTypes = ['mouse'];

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
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOffMap ? ctx.currentMode.handleOffMap(event) : false;
    }

    const mouseover = function (event) {
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOnMap ? ctx.currentMode.handleOnMap(event) : false;
    }

    const click = function (event) {
        /* if (options.icon) {
            ctx.map.setPitch(0);
            ctx.map.setBearing(0);
            ctx.setIcon();
        } */
    }

    

    function queueMapClasses(options) {
        nextMapClasses = ctx.Utilities.extend(nextMapClasses, options);
    }

    function updateMapClasses() {
        if (!ctx.container)
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
            var _ctx$container$classL;

            (_ctx$container$classL = ctx.container.classList).remove.apply(_ctx$container$classL, classesToRemove);
        }

        if (classesToAdd.length > 0) {
            var _ctx$container$classL2;

            (_ctx$container$classL2 = ctx.container.classList).add.apply(_ctx$container$classL2, classesToAdd);
        }

        currentMapClasses = ctx.Utilities.extend(currentMapClasses, nextMapClasses);
    }


    function createTitle(options) {
        return '' + options.title + (options.key ? ' (' + options.key + ')' : "");
    }

    function createAttr (element) {
        var attr = document.createElement('img');
        var icon = control.icon ? 'icon' : '';
        var rotate = control.rotate;

        attr.className = 'mapboxgl-ctrl-logo ' + ctx.id;
        icon ? attr.className += `-${icon}` : false;
       
        attr.setAttribute('target', '_blank');
        attr.setAttribute('src', control.attribution);

        if (rotate) attr.style.rotate = rotate + 'deg';
                
        element.appendChild(attr);
        element.style.display = control.show ? control.position.includes('center') ?  'flex' : 'block' : 'none';
        element.addEventListener('click', click);
        element.addEventListener('mouseover', mouseover);
        element.addEventListener('mouseleave', mouseleave);
        return element;
    }

    createAttr(element);

    return {
        queueMapClasses: queueMapClasses,
        updateMapClasses: updateMapClasses,
        position: control.position
    };
}


const Buttons = function (ctx, element, controls) {
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
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOffMap ? ctx.currentMode.handleOffMap(event) : false;
    }

    const mouseover = function (event) {
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOnMap ? ctx.currentMode.handleOnMap(event) : false;
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
        nextMapClasses = ctx.Utilities.extend(nextMapClasses, options);
    }

    function updateMapClasses() {
        if (!ctx.container)
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
            var _ctx$container$classL;

            (_ctx$container$classL = ctx.container.classList).remove.apply(_ctx$container$classL, classesToRemove);
        }

        if (classesToAdd.length > 0) {
            var _ctx$container$classL2;

            (_ctx$container$classL2 = ctx.container.classList).add.apply(_ctx$container$classL2, classesToAdd);
        }

        currentMapClasses = ctx.Utilities.extend(currentMapClasses, nextMapClasses);
    }



    function createTitle(options) {
        return '' + options.title + (options.key ? ' (' + options.key + ')' : "");
    }

    function createButtons (element, control) {
        var buttons = document.createElement('div');
        var group = (control.group ? control.group.toUpperCase() : control.attribution ? 'ATTR' : 'NONE') + '_GROUP';
        
        element.appendChild(buttons);

        buttons.className = '' + ctx.statics.constants.classes[group] + ' ' + control.type;
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

        options.key = ctx.options.keys && ctx.options.keys[id] ? ctx.options.keys[id] : options.key;

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
            this.button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
        }

        options.deactivate = function () {
            button.classList.remove(options.activeClass);
            button.classList.remove(ctx.statics.constants.classes.ACTIVE_BUTTON);
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
        ctx.addTooltip(options.container, button, createTitle(options));
        return button;
    }

    function createControlButton(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var button = createBaseButton(id, options);
        if (!button) return false;

        button.className = ctx.statics.constants.classes.CONTROL_BUTTON + ' ' + options.className;

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

        button.className = '' + ctx.statics.constants.classes.CONTROL_BUTTON;

        if (ctx.options[options.name] && ctx.options[options.name].enable) {
            button.classList.add(options.activeClass);
            button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
        } else {
            button.classList.add(options.inactiveClass);
        }

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!ctx.options[options.name]) { ctx.options[options.name] = {}; }

            if (ctx.options[options.name].enable) {
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

        button.className = ctx.statics.constants.classes.ACTION_BUTTON + ' ' + options.className;

        if (id === 'locate' && ctx.Locate) if (ctx.Locate.control) ctx.Locate.control._container.remove();

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            options.onActivate(options);
        }, true);

        return button;
    }

    function createDivider() {
        var divider = document.createElement('div');
        divider.className = '' + ctx.statics.constants.classes.DIVIDER;
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
        activeButton.classList.remove(ctx.statics.constants.classes.ACTIVE_BUTTON);
        activeButton = null;
    }

    function setActiveButton(id) {
        deactivateButtons();

        var button = !id && ctx.editMode ? buttonElements['edit'] : !id ? buttonElements['select'] : id === 'edit' ? buttonElements['select'] : buttonElements[id];
        if (!button) return;

        if (button && id !== 'trash') {
            if (button.title.includes('Draw ')) {
                if (button.title.includes(ctx.currentMode.type)) {
                    button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
                    activeButton = button;
                }
            } else {
                button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
            }
        }
    }


    function addButtons(control, buttons) {
        currentControl = control;

        if (control.type === 'modes') {
            createControlButton("select", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_SELECT,
                key: "s",
                title: 'Select Features',
                onAdd: function () {
                    if ((ctx.editMode || ctx.drawMode)) {
                        ctx.getButtons('edit').remove();
                        ctx.getButtons('save').add();
                    } else if (ctx.hasSelection()) {
                        ctx.getButtons('save').remove();
                        ctx.getButtons('edit').add();
                    } else {
                        ctx.getButtons('save').remove();
                        ctx.getButtons('edit').remove();

                        ctx.getButtons('undo').remove();
                        ctx.getButtons('cancel').remove();
                        ctx.getButtons('redo').remove();

                        ctx.getButtons('import').add();
                        ctx.getButtons('export').add();
                        ctx.getButtons('clear').add();
                    }
                },
                onActivate: function onActivate() {
                    ctx.noSelect = false;
                    ctx.setMode();
                    return true;
                },
                onDeactivate: function onDeactivate() {
                    ctx.noSelect = true;
                }
            });

            createControlButton("edit", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_EDIT,
                key: "Enter",
                title: 'Edit Feature',
                dontShow: true,
                onAdd: function () {
                    ctx.getButtons('select').remove();
                    this.button.classList.remove(ctx.statics.constants.classes.ACTIVE_BUTTON);
                    this.button.style.display = 'flex';
                    this.button.style['background-color'] = ctx.options.colors.secondaryBackground;
                },
                onActivate: function onActivate() {
                    ctx.editFeature();
                    ctx.getButtons('save').add();
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                },
                onRemove: function (e) {
                    ctx.getButtons('save') ? false : createSelect(e);
                }
            });

            createControlButton("save", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_FINSIH,
                key: "Enter",
                title: 'Save Edit',
                dontShow: true,
                onAdd: function (e) {
                    ctx.getButtons('select').remove();
                    ctx.getButtons('edit').remove();

                    ctx.getButtons('import').remove();
                    ctx.getButtons('export').remove();
                    ctx.getButtons('clear').remove();

                    ctx.getButtons('undo').add();
                    ctx.getButtons('cancel').add();
                    ctx.getButtons('redo').add();

                    this.button.style['background-color'] = ctx.options.colors.secondaryColor;
                },
                onActivate: function onActivate(e) {
                    ctx.currentMode.handleClick({ finish: true })
                }
            });
        } else if (control.type === 'options') {
            createActionButton("import", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_IMPORT,
                key: "u",
                title: 'Import Features',
                onActivate: function onActivate() {
                    return ctx.loadFeatures();
                }
            });
    
            createActionButton("export", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_EXPORT,
                key: "d",
                title: 'Export Features',
                onActivate: function onActivate() {
                    return ctx.saveFeatures();
                }
            });

            createActionButton("clear", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_CLEAR,
                key: "Delete",
                title: 'Delete Selected or All Features',
                onActivate: function onActivate() {
                    ctx.deleteMeshData();
                    ctx.deleteUserData();
                    ctx.getButtons('select').add();
                    return true;
                }
            });

            createActionButton("undo", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_UNDO,
                key: "u",
                title: 'Undo Edit',
                dontShow: true,
                onActivate: function onActivate() {
                    return ctx.currentMode.handleUndo()
                }
            });
    
            createActionButton("redo", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_REDO,
                key: "r",
                title: 'Redo Edit',
                dontShow: true,
                onActivate: function onActivate() {
                    return ctx.currentMode.handleRedo()
                }
            });

            createActionButton("cancel", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_CANCEL,
                key: "Escape",
                title: 'Cancel Edit',
                dontShow: true,
                onActivate: function onActivate() {
                    return ctx.cancelEdit();
                }
            });
        } else if (control.type === 'actions') {
            createOptionButton("snapping", {
                container: buttons,
                name: "snapping",
                title: 'Enable/Disable Snapping',
                activeClass: ctx.id + '-snapping-enabled',
                inactiveClass: ctx.id + '-snapping-disabled',
                onActivate: function onActivate() {
                    return ctx.activateSnapping();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivateSnapping();
                }
            });
    
            createOptionButton("pinning", {
                container: buttons,
                name: "pinning",
                title: 'Enable/Disable Pinning',
                activeClass: ctx.id + '-pinning-enabled',
                inactiveClass: ctx.id + '-pinning-disabled',
                onActivate: function onActivate() {
                    return ctx.activatePinning();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivatePinning();
                }
            });
    
            createOptionButton("routing", {
                container: buttons,
                name: "routing",
                title: 'Enable/Disable Routing',
                activeClass: ctx.id + '-routing-enabled',
                inactiveClass: ctx.id + '-routing-disabled',
                onActivate: function onActivate() {
                    return ctx.activateRouting();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivateRouting();
                }
            });

            createOptionButton("exploring", {
                container: buttons,
                name: "exploring",
                title: `Enable/Disable Exploring`,
                activeClass: ctx.id + '-exploring-enabled',
                inactiveClass: ctx.id + '-exploring-disabled',
                onActivate: function onActivate() {
                    return ctx.activateExploring();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivateExploring();
                }
            });
    
            createOptionButton("painting", {
                container: buttons,
                name: "painting",
                title: 'Enable/Disable Painting',
                activeClass: ctx.id + '-painting-enabled',
                inactiveClass: ctx.id + '-painting-disabled',
                onActivate: function onActivate() {
                    return ctx.activatePainting();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivatePainting();
                }
            });
        } else if (control.type === 'types') {
            createControlButton("polyline", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_LINE,
                key: "l",
                title: 'Draw Polyline',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Polyline"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("polygon", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_POLYGON,
                key: "p",
                title: 'Draw Polygon',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Polygon"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("rectangle", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_RECTANGLE,
                key: "r",
                title: 'Draw Rectangle',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Rectangle"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("circle", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_POINT,
                key: "o",
                title: 'Draw Circle',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Circle"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });

            createControlButton("text", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_TEXT,
                key: "t",
                title: 'Draw Text',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Text"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("icon", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_ICON,
                key: "i",
                title: 'Draw Icon',
                onActivate: async function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Icon"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
        } else if (control.type === 'utils') {
            createActionButton("zoom", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_ZOOM_IN_FEATURES,
                key: "x",
                title: 'Zoom to Extent',
                onActivate: function onActivate() {
                    return ctx.zoomToFeatures();
                }
            });

            createActionButton("locate", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_LOCATE,
                key: "u",
                title: 'Locate User',
                button: ctx.Locate.getButton(),
                onActivate: function onActivate() {
                    ctx.Locate.onControlEvent(this);
                }
            });
    
            createActionButton("refresh", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_REFRESH,
                key: "q",
                title: 'Refresh',
                onActivate: function onActivate() {
                    return ctx.refresh();
                }
            });
        }

        /* createActionButton("delete-snap", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_DELETE_SNAP,
            title: 'Delete Snap Layer Features',
            onAction: function onAction() {
                return ctx.deleteMeshData();
            }
        }); */

        /* createControlButton("cut", {
            container: controlGroup,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_CUT,
            key: "a",
            title: 'Cut Features',
            onActivate: function onActivate() {
                return ctx.setMode(ctx.statics.constants.modes.CUT);
            }
        }); */

        /* createActionButton("combine", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_COMBINE_FEATURES,
            title: 'Combine Features',
            key: '+',
            onAction: function onAction() {
                return ctx.combineFeatures();
            }
        }); */

        /* createActionButton("group-elements", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_GROUP_FEATURES,
            key: "g",
            title: 'Group Similar Features',
            onAction: function onAction() {
                return ctx.groupFeatures();
            }
        });

        createActionButton("ungroup-elements", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_UNGROUP_FEATURES,
            key: "G",
            title: 'Ungroup Similar Features',
            onAction: function onAction() {
                return ctx.ungroupFeatures();
            }
        }); */

        /* createActionButton("create-polygon", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_CREATE_POLYGON,
            key: 'p',
            title: 'Create Polygon from Selected Feature',
            onAction: function onAction() {
                return ctx.createPolygon();
            }
        }); */

        /* createActionButton("hide-selected", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_HIDE_SELECTED,
            title: 'Hide Selected Feature',
            onAction: function onAction() {
                return ctx.hideFeatures();
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
        var controls = ctx.options.controls && typeof ctx.options.controls === 'object';
        var dontShow = controls ? !ctx.options.controls[control.type] : false
        return  dontShow || control.dontShow || !ctx.options.controls ? false : true;
    }

    function getButtonOptions() {
        return buttonOptions;
    }

    function getButtonElements() {
        return buttonElements;
    }
}


const Control = function (ctx, controls, options={}) {
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
        ctx.map.addControl(this, control.position);
    }

    this.disable = function () {
        ctx.map.removeControl(this);
    }



    this.onAdd = function(map) {
        if (!this.options) return false;
        if (this.options.attribution) return this.setAttribution(map);
        this.setTheme(options.colors || ctx.options.colors);
        ctx.fire('control.add', { control: this, element: this.element });
        return this.element;
    }

    this.onRemove = function() {
        ctx.buttons.removeButtons();
        ctx.fire('control.remove', { element: this.element });
        ctx.disable();
    }



    this.setAttribution = function () {
        var attr = Attr(ctx, this.control, options);
        Object.assign(this, attr)

        this.setTheme(options.colors || ctx.options.colors);
        ctx.fire('control.add', { control: this, element: this.element });
        return this.element;
    }

    this.setMode = function (mode) {
        ctx.setActiveButton(!mode ? 'select' : mode === 'draw' ? mode : mode)
    }

    this.setTheme = function(colors) {
        if (!colors) { return console.error('Control colors not provided!') };

        colors.primaryColor ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-color', rgba(colors.primaryColor)) : false;
        colors.primaryBackground ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-background', rgba(colors.primaryBackground)) : false;
        colors.primaryText ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-text', rgba(colors.primaryText)) : false;
        colors.primaryBorder ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-border', rgba(colors.primaryBorder)) : false;

        colors.secondaryColor ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-color', rgba(colors.secondaryColor)) : false;
        colors.secondaryBackground ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-background', rgba(colors.secondaryBackground)) : false;
        colors.secondaryText ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-text', rgba(colors.secondaryText)) : false;
        colors.secondaryBorder ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-border', rgba(colors.secondaryBorder)) : false;

        ctx.fire('theme.change', { colors: colors });
        return this.getTheme();
    }

    this.setControl = function (controls) {
        if (!controls) return false;

        var buttons;

        this.element = document.createElement('div');
        this.element.className = ctx.id + '-control-wrap';

        this.control = document.createElement('div');
        this.control.className = ctx.statics.constants.classes.PREDEFINED_CONTROL_BASE + ' ' + ctx.statics.constants.classes.PREDEFINED_CONTROL_GROUP;

        this.element.appendChild(this.control);

        if (Array.isArray(controls)) {
            buttons = Buttons(ctx, this.control, controls);
            Object.assign(this, buttons);
        } else if (controls.attribution) {
            buttons = Attr(ctx, this.control, controls);
            Object.assign(this, buttons);
        }
        
        this.enable(buttons);
    }


    this.getTheme = function() {
        return ctx.options.colors;
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
}

export { Control as default }