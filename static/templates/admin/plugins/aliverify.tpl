<div class="row">
	<div class="col-sm-2 col-xs-12 settings-header">阿里云验证服务</div>
	<div class="col-sm-10 col-xs-12">
		<div class="alert alert-info" style="background-color:#66CCCC">
				<p class="help-block" style="color:#fff"><b>本版本为测试版本，并不是十分建议使用！</b></p>
				<!--<small class="help-block" style="color:#fff">测试版本可能遇到崩溃等问题，请使用 npm i nodebb-plugin-sso-qq-fix@1.0.1 来获取到最近的稳定版本</b></small>-->
				<p class="help-block" style="color:#fff">
					 如果使用碰到问题（崩溃，注册时出现错误），请到我们的 <a href="https://github.com/NodeBB-China/nodebb-plugin-registration-aliverify/issues">issue</a> 中反馈!
				</p>
			</div>
		<div class="alert alert-info">
			<p>
				申请 <strong> <a href="https://www.aliyun.com/product/antifraud?spm=5176.8142029.388261.470.715c4636LkmhSy">阿里云验证服务</a></strong> ,然后把你的 ACCESS_KEY 和 ACCESS_SECRET 复制到下面
				
			</p>
		</div>
		<form class="aliverify-settings">
			<div class="form-group">
				<label for="id">ACCESS_KEY</label>
				<input type="text" name="key" title="ACCESS_KEY" class="form-control" placeholder="请输入您申请的 ACCESS_KEY ...">
			</div>
			<div class="form-group">
				<label for="secret">ACCESS_SECRE</label>
				<input type="text" name="secret" title="ACCESS_SECRET" class="form-control" placeholder="请输入您输入的 ACCESS_SECRET ..." />
			</div>
		</form>
	</div>
</div>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
