module.export = {
    "babel": {
        //一些已经存在的配置
        //添加如下配置
        "plugins": [
          [
            "import",
            {
              "libraryName": "antd",
              "style": "css"
            }
          ],
          '@babel/preset-typescript'
        ]
     }
}