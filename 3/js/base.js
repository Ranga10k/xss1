var loginData = {
  username: "https://webhook.site/a552d503-6dfc-459b-acab-a6398c11b2b1", // 替换为您的用户名
  password: "afdc1afbaddc1a33a38944a5204b6f2e" // 替换为您的密码
};

// 将登录数据转换为表单编码格式
var formData = new URLSearchParams();
for (var key in loginData) {
  formData.append(key, loginData[key]);
}

// 使用Fetch API进行登录
fetch("/login", {
  method: "POST",
  body: formData,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  credentials: "include" // 包括身份验证信息
})
  .then(function (response) {
    if (response.ok) {
      // 登录成功后发送POST请求访问VIP页面
  

      // 将VIP数据转换为表单编码格式
      var vipFormData = new URLSearchParams();
      for (var key in vipData) {
        vipFormData.append(key, vipData[key]);
      }

      return fetch("/vip", {
        method: "POST", // 使用POST请求
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include" // 包括身份验证信息
      });
    } else {
      throw new Error("登录失败");
    }
  })
  .then(function (vipResponse) {
    if (vipResponse.ok) {
      return vipResponse.text();
    } else {
      throw new Error("访问VIP页面失败");
    }
  })
  .then(function (vipData) {
    console.log("VIP页面内容:", vipData);
    // 在这里处理VIP页面的数据
  })
  .catch(function (error) {
    console.error("出错:", error);
    // 在这里处理错误
  });
