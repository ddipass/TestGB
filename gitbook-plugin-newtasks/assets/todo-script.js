$(document).ready(function () {

    // read local task list
	$('#task-list-items').html(localStorage.getItem('listItems'));

    // add to task list
	$('.task-add-items').submit(function(event) {
		event.preventDefault();
		var item = $('#todo-list-item').val();
		if (item) {
			$('#task-list-items').append("<li><input class='task-checkbox' type='checkbox'/>" + 
				                         item + "<a class='task-remove'>x</a><hr class='task-hr'></li>");
			localStorage.setItem('listItems', $('#task-list-items').html());
			$('#todo-list-item').val("");
		}
	});

    // change contents 
	$(document).on('change', '.task-checkbox', function() {
		if($(this).attr('checked')) {
			$(this).removeAttr('checked');
		} else {
			$(this).attr('checked', 'checked');
		}
		$(this).parent().toggleClass('task-completed');
		localStorage.setItem('listItems', $('#task-list-items').html());
	});

    // remove items from task list
	$(document).on('click', '.task-remove', function() {
		$(this).parent().remove();
		localStorage.setItem('listItems', $('#task-list-items').html());
	});

});