```js
    // https://url17.ctfile.com/f/18694317-580089343-d2bbec?p=526663
    const api_server = 'https://webapi.ctfile.com';
    const file_id = 580089343;
    const folder_id = 0;
    const userid = 18694317;
    const pass = 526663;
    const r = Math.random();
    const url = `${api_server}/passcode.php?file_id=${file_id}&folder_id=${folder_id}&userid=${userid}&passcode=${pass}&r=${r}`
    
    // 获取所有的基础数据 
    const { data } = await axios({
        url: 'https://webapi.ctfile.com/passcode.php?file_id=532806680&folder_id=0&userid=18694317&passcode=6290&r=0.11188067487366626',
        method: 'GET',
        responseType: 'json',
    });
    
    const fileID = '18694317-580089343-d2bbec'; //文件ID，网址后的东西
    const pass = '526663'; //文件密码
    const r = Math.random(); //随机一个小于1的小数
    const fileInfoUrl = `https://webapi.ctfile.com/getfile.php?path=f&f=${fileID}&passcode=${pass}&token=false&r=${r}`;

    // 获取文件相关信息
    const { data } = await axios({ url: fileInfoUrl, method: 'GET' });

    if (data.code === 200) {
        const { userid, file_id, file_chk } = data.file;
        const fileUrl = `https://webapi.ctfile.com/get_file_url.php?uid=${userid}&fid=${file_id}&file_chk=${file_chk}&app=0&acheck=2&rd=${Math.random()}`
        
        // 获取文件下载地址
        const { data: resData } = await axios.get(fileUrl);
        console.log('resData', resData);
    }
```

### 参考文档

[城通网盘API的链接研究](https://blog.csdn.net/Ceyase/article/details/122683209)