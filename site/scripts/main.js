/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2018. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	if (!Site.is_mobile()) {
		//Dialog form
		Site.floating_form = new Caracal.Dialog();
		Site.floating_form
			.set_title(language_handler.getText(null, 'form_title'))
			.set_content_from_dom('div.floating_form')
			.set_size(600, 400);

		//Button to call floating form dialog
		Site.button = document.querySelector('a.action');
		Site.button.addEventListener('click',function(){
			Site.floating_form.open();
		});

		// create handler for submitting dialog form
		Caracal.ContactForm.list[0].events.connect('submit-success', function(event) {
			Site.floating_form.close();
			return true;
		})

	};

	//Light box
	Site.home_page_gallery = new LightBox('section.gallery a', false, false, true);
};


// connect document `load` event with handler function
window.addEventListener('load', Site.on_load);
