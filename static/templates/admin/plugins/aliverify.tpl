<div class="row">
	<div class="col-sm-2 col-xs-12 settings-header">阿里云滑动验证</div>
	<div class="col-sm-10 col-xs-12">
		<div class="alert alert-info" style="background-color:#66CCCC">
				<p class="help-block" style="color:#fff"><b>本版本为测试版本，并不是十分建议使用！默认请用了登录验证，如果不需要请在Shell下执行 export ali_login = false 。</b></p>
				<p class="help-block" style="color:#fff">
					 如果使用碰到问题（崩溃、注册时出现错误），请到 <a href="https://github.com/NodeBB-China/nodebb-plugin-registration-aliverify/issues">issue</a> 中反馈!
				</p>
			</div>
		<div class="alert alert-info">
			<p>
				申请 <strong><a href="https://yundun.console.aliyun.com/?p=afs#/afs/app">滑动验证服务</a></strong> 后，在 <strong><a href="https://ak-console.aliyun.com/">Access Key管理控制台</a></strong> 中创建 Access Key 并将 Access Key ID 和 Access Key Secret 复制到下面。
				
			</p>
		</div>
		<form class="aliverify-settings">
			<div class="form-group">
				<label for="id">Access Key ID</label>
				<input type="text" name="key" title="ACCESS_KEY" class="form-control" placeholder="请输入您的 Access Key ID ...">
			</div>
			<div class="form-group">
				<label for="secret">Access Key Secret</label>
				<input type="text" name="secret" title="ACCESS_SECRET" class="form-control" placeholder="请输入您的 Access Key Secret ..." />
			</div>
		</form>
	</div>
</div>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
