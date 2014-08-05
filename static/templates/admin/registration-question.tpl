<h1>Registration Question & Answer</h1>
<hr />

<form>
	<p>
		Enter a registration question for the user to answer.
	</p><br />
	<div class="alert alert-info">
		<p>
			<label for="Question">Question</label>
			<input type="text" data-field="registration-question:question" title="Question" class="form-control" placeholder="Question"><br />
			<label for="Answer">Answer</label>
			<input type="text" data-field="registration-question:answer" title="Answer" class="form-control" placeholder="Answer">
		</p>
	</div>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
	require(['forum/admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>