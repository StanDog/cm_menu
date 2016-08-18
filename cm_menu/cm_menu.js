/**
 * CM Menu
 *
 * Alternative custom context menu replacement for browser's default
 * context menu. Multiple context menus possible, with styling and
 * sub-menus.
 *
 * Changelog
 * --------------------
 * 2016-08-18 (version 7)
 * - self-initialization bugfix
 * - added removeMenu() function
 *
 * 2016-08-18 (version 6)
 * - self-initialization on first use (instead on page loading)
 *
 * 2016-01-11 (version 5)
 * - menu item 'click' attribute can be a direct function (previously
 *   only a string to be evaluated)
 * - _showSubMenu() does not return FALSE anymore
 * - added documentation with examples
 * - first public version released on GitHub
 *
 * 2015-12-22 (version 4)
 * - escape key closes the menu now too
 * - added menu width setting: default (210px), content (automatically
 *   resizes depending on content), direct CSS value
 * - bugfix: context refers to processing element now
 *   (previously original element was referenced)
 * - bugfix: previous menus with identical ID are deleted now
 *
 * 2013-06-15 (version 3)
 * - auto initializing
 * - updated to use CSS3 features
 * - added license
 * - bugfixing
 *
 * 2005-09-03 (version 2)
 * - added version attribute
 * - added submenus
 *
 * 2005-07-17 (version 1)
 * - first version
 *
 * @author     Stanislav Eckert
 * @copyright  Stanislav Eckert
 * @version    7
 * @link       http://stanislaveckert.com
 * @license    MIT license
 */

var cm_menu =
{
	version: 7,
	initialized: false,
	uniqueMenuID: 1,
	contextElement: null,

	init: function()
	{
		if (!this.initialized)
		{
			this.initialized = true;

			// Add event to close all opened menus. Do this in the onMouseDown event,
			// so it can be executed before onClick event when opening new menu.
			document.addEventListener('mousedown', function(evt)
			{
				cm_menu._closeMenus();
			}, false);

			document.addEventListener('keydown', function(evt)
			{
				if (evt.keyCode == 27)  // escape
				{
					cm_menu._closeMenus();
				}
			}, false);

			// Add styling (remove old one if already set)
			var cm_menu_style = document.getElementById('cm_menu_style');
			if (cm_menu_style) {
				cm_menu_style.parentNode.removeChild(cm_menu_style);
			}

			cm_menu_style = document.createElement('style');
			cm_menu_style.setAttribute('id', 'cm_menu_style');
			cm_menu_style.innerHTML = "\n\
				/* Note: Prefix 'cm' stands for context menu */ \n\
				.cm_menu { \n\
					display: none; \n\
					position: absolute; \n\
					font-family: Calibri, Verdana, Roboto, Tahoma; \n\
					font-size: 11pt; \n\
					border: 1px solid #808080; \n\
					width: 210px; \n\
					background-color: #FDFDFD; \n\
					-webkit-box-shadow: 5px 5px 5px 0 rgba(0,0,0,0.1); \n\
					box-shadow: 5px 5px 5px 0 rgba(0,0,0,0.1); \n\
					cursor: default; \n\
					box-sizing: border-box; \n\
					-moz-box-sizing: border-box; \n\
					line-height: 120%; \n\
					 \n\
					-webkit-touch-callout: none; \n\
					-webkit-user-select: none; \n\
					-khtml-user-select: none; \n\
					-moz-user-select: none; \n\
					-ms-user-select: none; \n\
					user-select: none; \n\
				} \n\
				\n\
				.cm_menu.widthContent { \n\
					width: auto; \n\
				} \n\
				\n\
				/* Class can be added to menu to add a left vertical bar */ \n\
				.cm_menu.iconBar:before { \n\
					content: ''; \n\
					position: absolute; \n\
					top: 0; \n\
					left: 0; \n\
					bottom: 0; \n\
					width: 25px; \n\
					background-color: #F2F2F2; \n\
				} \n\
				\n\
				.cm_menu .item { \n\
					height: 24px; \n\
					text-overflow: ellipsis; \n\
					white-space: nowrap; \n\
					overflow: hidden; \n\
					padding-top: 2px; \n\
					padding-left: 32px; \n\
					padding-right: 19px; \n\
					position: relative; \n\
					background-repeat: no-repeat; \n\
					background-position: 4px 50%; \n\
					background-size: auto 18px; \n\
					box-sizing: border-box; \n\
					-moz-box-sizing: border-box; \n\
				} \n\
				\n\
				.cm_menu .item:hover { \n\
					border: 1px solid #BDBDBD; \n\
					background-color: #F2F2F2; \n\
					padding-top: 1px;  /* original - 1 */ \n\
					padding-left: 31px;  /* original - 1 */ \n\
					background-position: 3px 50%; \n\
				} \n\
				\n\
				.cm_menu .item.default { \n\
					font-weight: bold; \n\
				} \n\
				\n\
				.cm_menu .item.disabled { \n\
					opacity: 0.2; \n\
					pointer-events: none; \n\
				} \n\
				\n\
				.cm_menu .item.hidden { \n\
					display: none; \n\
				} \n\
				\n\
				.cm_menu .subitem { \n\
					height: 24px; \n\
					text-overflow: ellipsis; \n\
					white-space: nowrap; \n\
					overflow: hidden; \n\
					padding-top: 2px; \n\
					padding-left: 32px; \n\
					padding-right: 19px; \n\
					position: relative; \n\
					background-repeat: no-repeat; \n\
					background-position: 4px 50%; \n\
					background-size: auto 18px; \n\
					box-sizing: border-box; \n\
					-moz-box-sizing: border-box; \n\
				} \n\
				\n\
				.cm_menu .subitem:hover { \n\
					border: 1px solid #BDBDBD; \n\
					background-color: #F2F2F2; \n\
					padding-top: 1px;  /* original - 1 */ \n\
					padding-left: 31px;  /* original - 1 */ \n\
					background-position: 3px 50%; \n\
				} \n\
				\n\
				.cm_menu .subitem:after { \n\
					content: ''; \n\
					width: 0; \n\
					height: 0; \n\
					border-top: 4px solid transparent; \n\
					border-left: 5px solid black; \n\
					border-bottom: 4px solid transparent; \n\
					position: absolute; \n\
					right: 6px; \n\
					top: 7px; \n\
				} \n\
				\n\
				.cm_menu .subitem:hover:after { \n\
					right: 5px;  /* original - 1 */ \n\
					top: 6px;  /* original - 1 */ \n\
				} \n\
				\n\
				.cm_menu .subitem.disabled { \n\
					opacity: 0.2; \n\
					pointer-events: none; \n\
				} \n\
				\n\
				.cm_menu .subitem.hidden { \n\
					display: none; \n\
				} \n\
				\n\
				.cm_menu .delimiter { \n\
					height: 1px; \n\
					padding-left: 32px; \n\
					background-color: #BDBDBD; \n\
				} \n\
				\n\
				/* This is just a helper class. It has no effect, so we can make it a subclass for less collisions */ \n\
				.cm_menu.cm_submenu { \n\
				} \n\
			";

			document.head.appendChild(cm_menu_style);
		}
	},

	createMenu: function(structure, target)
	{
		// Initialize if not already done
		this.init();

		//
		// Create menu
		//
		var cm_contextMenu = document.createElement('div');
		cm_contextMenu.classList.add('cm_menu');
		cm_contextMenu.setAttribute('onmousedown', 'event.stopPropagation();');

		// Generate new ID or use submitted one
		var cm_menuid = 'cm_menu' + (cm_menu.uniqueMenuID++);

		if (structure.id) {
			cm_menuid = structure.id;
		}

		// Delete an already existing menu (if any)
		// This can happen by users misbehavior or when working with AJAX
		if (document.getElementById(cm_menuid)) {
			document.getElementById(cm_menuid).parentNode.removeChild(document.getElementById(cm_menuid));
		}

		// Assign attributes
		cm_contextMenu.setAttribute('id', cm_menuid);

		if (structure.iconBar) {
			cm_contextMenu.classList.add('iconBar');
		}

		if (typeof(structure.width) != 'undefined')
		{
			if (structure.width == 'content') {
				cm_contextMenu.classList.add('widthContent');
			}
			else {
				cm_contextMenu.style.width = structure.width;
			}
		}

		// Create menu entries
		if (structure.entries)
		{
			for (var i=0; i < structure.entries.length; i++)
			{
				// Create menu entry
				var cm_menuEntry = document.createElement('div');
				var cm_structureEntry = structure.entries[i];

				if (cm_structureEntry.delimiter) {
					cm_menuEntry.classList.add('delimiter');
				}
				else
				{
					// Set base CSS class and onClick event
					if (cm_structureEntry.submenu)
					{
						// Add (sub)menu ID
						if (typeof(cm_structureEntry.submenu) != 'string') {
							cm_structureEntry.submenu = cm_structureEntry.submenu.id;
						}
						cm_menuEntry.setAttribute('data-cm-menu', cm_structureEntry.submenu);

						// Set class and event
						cm_menuEntry.classList.add('subitem');
						cm_menuEntry.onclick = cm_menu._showSubMenu;
					}
					else
					{
						cm_menuEntry.classList.add('item');

						if (cm_structureEntry.click)
						{
							if (typeof(cm_structureEntry.click) == 'function')
							{
								// Important:
								// You have to call cm_menu._closeMenus(); to close the menu manually
								// if you assign a function directly!
								cm_menuEntry.onclick = cm_structureEntry.click;
							}
							else
							{
								cm_menuEntry.setAttribute('onclick', 'cm_menu._closeMenus(); ' + cm_structureEntry.click);
							}
						}
					}

					// Set some menu entry states
					if (cm_structureEntry.default) {
						cm_menuEntry.classList.add('default');
					}

					if (cm_structureEntry.disabled) {
						cm_menuEntry.classList.add('disabled');
					}

					// Set icon
					if (cm_structureEntry.icon) {
						cm_menuEntry.style.backgroundImage = 'url("' + cm_structureEntry.icon + '")';
					}

					// Set tooltip text
					if (cm_structureEntry.tooltip) {
						cm_menuEntry.setAttribute('title', cm_structureEntry.tooltip);
					}

					// Set ID
					if (cm_structureEntry.id) {
						cm_menuEntry.setAttribute('id', cm_structureEntry.id);
					}

					// Set caption
					cm_menuEntry.textContent = cm_structureEntry.caption ? cm_structureEntry.caption : '';
				}

				// Append entry to menu
				cm_contextMenu.appendChild(cm_menuEntry);
			}
		}

		// Finally, add entire menu to document
		document.body.appendChild(cm_contextMenu);

		// Assign menu
		if (typeof(target) != 'undefined')
		{
			// Convert to array if needed
			if (!Array.isArray(target)) {
				target = [target];
			}

			// Assign menu to each target element
			for (var i=0; i < target.length; i++) {
				this.assignMenu(target[i], cm_contextMenu.id);
			}
		}

		// Return reference to new menu
		return cm_contextMenu;
	},

	assignMenu: function(target, menu)
	{
		// Initialize if not already done
		this.init();

		// Get object reference, if string
		if (typeof(target) == 'string') {
			target = document.getElementById(target);
		}

		// Get string (ID), if object reference
		if (typeof(menu) != 'string') {
			menu = menu.id;
		}

		target.setAttribute('data-cm-menu', menu);
		target.oncontextmenu = this._showMenu;
	},

	removeMenu: function(target)
	{
		// Initialize if not already done
		this.init();

		// Close all menu too
		this._closeMenus();

		// Get object reference, if string
		if (typeof(target) == 'string') {
			target = document.getElementById(target);
		}

		target.removeAttribute('data-cm-menu');
		target.oncontextmenu = null;
	},

	_showMenu: function(event)
	{
		// IE does not pass the event
		if (event == null) {
			event = window.event;
		}

		// Get element which processes the event ("target" refers the original element)
		var target = event.currentTarget;

		// Backup reference of the element of the current context menu,
		// so code in the onclick event of menu entries can access it
		// to gain more information of the clicked element.
		cm_menu.contextElement = target;

		// Calculate absolute cursor position
		var offsetTop = event.clientY + (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop);
		var offsetLeft = event.clientX + (document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft);

		// Get reference to the menu, move it to cursor and show
		var menu = document.getElementById(cm_menu.contextElement.getAttribute('data-cm-menu'));
		menu.style.top = offsetTop + 'px';
		menu.style.left =  + offsetLeft + 'px';

		// Execute a custom command (if any) to allow user to react before the menu
		// opens (e. g. modifying menu entries). Note: User can find the element of
		// the context menu through "cm_menu.contextElement" and the assigned element
		// through the elements "data-cm-menu" attribute.
		if (cm_menu.contextElement.getAttribute('data-cm-onbeforeopen'))
		{
			eval(cm_menu.contextElement.getAttribute('data-cm-onbeforeopen'));
		}

		menu.style.display = 'block';

		// Execute a custom command (if any) to allow user to react when the menu
		// was opened (e. g. modifying menu entries). Note: User can find the element of
		// the context menu through "cm_menu.contextElement" and the assigned element
		// through the elements "data-cm-menu" attribute.
		if (cm_menu.contextElement.getAttribute('data-cm-onopen'))
		{
			eval(cm_menu.contextElement.getAttribute('data-cm-onopen'));
		}

		// Return false to suppress original context menu
		return false;
	},

	_showSubMenu: function(event)
	{
		// IE does not pass the event
		if (event == null) {
			event = window.event;
		}

		// Get element which processes the event ("target" refers the original element)
		var target = event.currentTarget;
		var targetBounds = target.getBoundingClientRect();

		// Calculate absolute cursor position
		var offsetTop = targetBounds.top + 5 + (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop);
		var offsetLeft = targetBounds.right - 10 + (document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft);

		// Hide all submenus except current one and the main menus
		var cm_submenus = document.getElementsByClassName('cm_submenu');
		for (var i=0; i < cm_submenus.length; i++)
		{
			cm_submenus[i].style.display = 'none';
		}

		// Get reference to the menu, move it to cursor and show
		var menu = document.getElementById(target.getAttribute('data-cm-menu'));
		menu.style.top = offsetTop + 'px';
		menu.style.left =  + offsetLeft + 'px';
		menu.style.display = 'block';

		// Mark menu as submenu
		menu.classList.add('cm_submenu');

		// Small trick to bring element to top
		menu.parentNode.appendChild(menu);
	},

	_closeMenus: function()
	{
		var cm_menus = document.getElementsByClassName('cm_menu');

		for (var i=0; i < cm_menus.length; i++)
		{
			cm_menus[i].style.display = 'none';
		}
	},
};
