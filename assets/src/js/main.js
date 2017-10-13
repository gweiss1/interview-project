
console.log('Main');

// circle menu open

$('.circle-menu').click(function() {
	$('.main-nav').css('display', 'block');
});

// circle menu close

$('.close-menu').click(function() {
	$('.main-nav').css('display', 'none');
});

// Dropdown menu

$('.dropdown-btn').click(function() {
	// console.log('dropdown button clicked');

	$('.filter-box').slideToggle('slow', function() {
		if ($('.filter-box').css('display') == 'block') {
			$('.dropdown-btn').css('transform', 'rotate(0deg)');
		} else if ($('.filter-box').css('display') == 'none'){
			$('.dropdown-btn').css('transform', 'rotate(180deg)');
		}
	});
});



// tool tip box 

$('.tool-tip').hover(function() {
	$('.tool-tip-window').css('display', 'block');
}, function() {
	$('.tool-tip-window').css('display', 'none');
});



//get json file


$.getJSON("./resources/dealers.json", function(area, status) {
	const pros = area.dealers;
	// console.log(pros);
	// console.log(status);

	console.log(pros.length);
	const areaWrapper = $('.js-location');

	$('.find-a-pro').keypress(function() {
	if (event.keyCode == '13' && $(this).val() != '') {
		const zipCode = $(this).val();
		console.log(zipCode);

		areaWrapper.html(`<span>${pros.length} dealers in ${zipCode}</span>`);
	}
});


	const prosWrapper = $('.js-pros');
	// console.log(prosWrapper);




	pros.forEach(function(pro, index) {
		// console.log(pro);
		// console.log(index);

		// console.log(pro.data.name);



		prosWrapper.append(`
			<div class="pro js-pro-${index}">
			
				<h3 class="company-name">${pro.data.name}</h3>
				<hr class="divider">
				<a href="tel:${pro.data.phone1}" class="phone-btn">
					<img src="assets/images/phone-icon.png" alt="">
					<p class="tap">Tap to call</p>
					<p class="number">${pro.data.phone1}</p>
				</a>
				<p class="cant-talk">Can't talk now? Click below to send an email.</p>
				<button class="contact js-contact-${index}"><img src="assets/images/email-icon.svg" alt="">Contact this Pro</button>
				
				<div class="email-modal js-modal-${index}">
					
					<div class="modal-content">
						<button class="close-modal">X</button>
						<div class="modal-header">
							<p class="email-title">Email</p>
							<h3 class="modal-company-name">${pro.data.name}</h3>
						</div>
						<div class="modal-main">
							<p class="instructions">Fill out the form below and ${pro.data.name} will get in touch.</p>
							<form class="contact-form">
								<div class="form-fields">
									<label for="name" class="text-label">First and last name <span class="circle circle-name">&#9711;</span></label>
									<input type="text" id="name-${index}" class="name" name="name">

									<label for="phone" class="text-label">Phone number <span class="circle circle-phone">&#9711;</span></label>
									<input type="tel" id="phone-${index}" class="phone" name="phone">

									<label for="email" class="text-label">Email address <span class="circle circle-email">&#9711;</span></label>
									<input type="email" id="email-${index}" class="email" name="email">

									<label for="comments" class="text-label">Comments or questions <span class="optional">optional</span></label>
									<textarea name="comments" id="comments-${index}" class="comments" rows="5"></textarea>

									<p class="own text-label">Do you currently own a pool or spa?</p>
									<input type="radio" name="pool-owner" value="yes" id="yes-${index}" class="yes">
									<label for="yes-${index}" class="checkbox"></label>
									<label for="yes-${index}" class="radio-label">Yes</label>

									<input type="radio" name="pool-owner" value="no" id="no-${index}" class="no">
									<label for="no-${index}" class="checkbox"></label>
									<label for="no-${index}" class="radio-label">No</label>
								</div>

								<input type="submit" value="Send" class="submit-btn">
							</form>
						</div>
					</div>
				</div>

				<h5 class="biz-hours">Business Hours</h5>
				<ul class="hours">
					<li>Weekdays ${pro.data.weekHours.mon}</li>
					<li>Saturdays ${pro.data.weekHours.sat}</li>
					<li>Sundays ${pro.data.weekHours.sun}</li>
				</ul>

				<div class="services">
					<ul class="services-list js-services-list-${index}">
						
					</ul>
				</div>
			</div>	
			`)


		// services list 
		const serviceList = $(`.js-services-list-${index}`);
		const services = pro.data.certifications;

		// console.log(services);

		services.forEach(function(service) {
			serviceList.append(`<li><img src="assets/images/${service}.png" alt="${service} Icon">${service}</li>`);
		});


		// modal

		$(`.js-contact-${index}`).click(function() {
			// console.log('contact button clicked');

			$(`.js-modal-${index}`).css('display', 'block');
		});

		$('.close-modal').click(function() {
			// console.log('close button clicked');
			$(`.js-modal-${index}`).css('display', 'none');
		});

		// change cirle to checkmark when field is filled 

		$(`#name-${index}`).keyup(function() {
		if ($(`#name-${index}`).val() != '') {
			$('.circle-name').html('<img src="assets/images/checked-field-vector.png">');
		} else if ($(`#name-${index}`).val() === '') {
			$('.circle-name').html('&#9711;');
		}
		});


		$(`#phone-${index}`).keyup(function() {
			if ($(`#phone-${index}`).val() != '') {
				$('.circle-phone').html('<img src="assets/images/checked-field-vector.png">');
			} else if ($(`#phone-${index}`).val() === '') {
				$('.circle-phone').html('&#9711;');
			}	
		});

		$(`#email-${index}`).keyup(function() {
			if ($(`#email-${index}`).val() != '') {
				$('.circle-email').html('<img src="assets/images/checked-field-vector.png">');
			} else if ($(`#email-${index}`).val() === '') {
				$('.circle-email').html('&#9711;');
			}	
		});


	});

});




// filters

$('#service').change(function() {
	if ($('#service').prop('checked')) {
		console.log('service pro selected');	
	} else {
		console.log('service pro unselected');
	}
});

$('#installation').change(function() {
	if ($('#installation').prop('checked')) {
		console.log('installation pro selected');	
	} else {
		console.log('installation pro unselected');
	}
});

$('#residential').change(function() {
	if ($('#residential').prop('checked')) {
		console.log('residential pro selected');	
	} else {
		console.log('residential pro unselected');
	}
});

$('#commercial').change(function() {
	if ($('#commercial').prop('checked')) {
		console.log('commercial pro selected');	
	} else {
		console.log('commercial pro unselected');
	}
});





