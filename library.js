'use strict'
const meta = require.parent.require('./src/meta')
const winston = require.parent.require('winston')
const path = require('path')
const core = {}
const ALY = require('aliyun-sdk')
let AppKey
let AppSecret
let AppId
meta.settings.get('aliverify', function (err, settings) {
  if (!err && settings['key'] && settings['secret'] && settings['appkey']) {
    AppKey = settings['key']
    AppSecret = settings['secret']
    AppId = settings['appkey']
  }
})
// hook static:app.load
core.init = (data, callback) => {
  function renderAdmin (req, res) {
    res.render('admin/plugins/aliverify', {})
  }
  data.router.get('/admin/plugins/aliverify', data.middleware.admin.buildHeader, renderAdmin)
  data.router.get('/api/admin/plugins/aliverify', renderAdmin)
  data.router.get('/aliverify/js/register', (req, res, next) => {
    res.set('Content-Type', 'application/x-javascript')
    res.charset = 'utf-8'
    const dir = path.join(__dirname, '/static/lib/register.js')
    res.sendFile(dir)
  })

  callback()
}
// hook filter:admin.header.build
core.addAdminNavigation = (header, callback) => {
  header.plugins.push({
    'icon': 'fa-tasks',
    'route': '/plugins/aliverify',
    'name': '阿里云验证服务'
  })

  callback(null, header)
}
// hook filter:register.build
core.regcaptcha = (data, callback) => {
  if (!AppKey || !AppSecret) {
    callback(null, data)
    return
  }
  let ret = {
    'label': '验证码',
    'html': '<div id="nc_captcha"></div>'
  }
  let NcCaptcha = {
    'html': "<input type='hidden' id='csessionid' name='csessionid'/><input type='hidden' id='sig' name='sig'/><input type='hidden' id='alitoken' name='alitoken'/><input type='hidden' id='scene' name='scene'/><p class='hidden' id='ali_appkey'>" + AppId + '</p>'
  }

  if (data.templateData.regFormEntry && Array.isArray(data.templateData.regFormEntry)) {
    data.templateData.regFormEntry.push(ret)
    data.templateData.regFormEntry.push(NcCaptcha)
  } else {
    data.templateData.captcha = ret
    data.templateData.nc_captcha = NcCaptcha
  }
  callback(null, data)
}
// hook filter:register.check
core.regcheck = (data, callback) => {
  // console.log("hook filter:register.check");
  if (!AppKey || !AppSecret) {
    return callback(null, data)
  }
  // console.log(data);
  let jaq = new ALY.JAQ({
    accessKeyId: AppKey,
    secretAccessKey: AppSecret,
    endpoint: 'http://jaq.aliyuncs.com',
    apiVersion: '2016-11-23'
  })

  jaq.afsCheck({
    Platform: 3, // 必填参数，请求来源： 1：Android端； 2：iOS端； 3：PC端及其他
    Session: data.req.body['csessionid'], // 必填参数，从前端获取，不可更改
    Sig: data.req.body['sig'], // 必填参数，从前端获取，不可更改
    Token: data.req.body['alitoken'], // 必填参数，从前端获取，不可更改
    Scene: 'register'// 必填参数，从前端获取，不可更改
  }, function (err, d) {
    if (err) {
      // 异常
      console.log('error:', err)
      callback(err, data)
      return
    }
    // 此处无异常，但也可能调用失败
    winston.verbose('result:', JSON.stringify(d))
    const ErrorCode = (typeof (d.ErrorCode) === 'string') ? parseInt(d.ErrorCode) : d.ErrorCode
    if (d.hasOwnProperty('Data') && d.Data && ErrorCode === 0) { // code == 0
      callback(null, data)
    } else {
      const ret = {
        source: '阿里云验证', message: '验证失败，错误代码:' + ErrorCode
      }
      callback(ret, data)
    }
  })
}
module.exports = core
