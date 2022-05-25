const axios = require('axios').default;

export const ctfile = {
    getByLink: (link: string, password: number) => {
        return ctfile.getByID(link.slice(link.lastIndexOf('/') + 1), password);
    },
    getByID: async (fileid: string, password: number) => {
        const origin = () => {
            return 'https://ctfile.qinlili.workers.dev';
        };
        const path = (id: string) => {
            switch (id.split('-').length) {
                case 2: {
                    return 'file';
                }
                case 3:
                default: {
                    return 'f';
                }
            }
        };
        const { data } = await axios(
            'https://webapi.ctfile.com/getfile.php?path=' +
                path(fileid) +
                '&f=' +
                fileid +
                '&passcode=' +
                password +
                '&token=false&r=' +
                Math.random() +
                '&ref=' +
                origin(),
            {
                headers: {
                    origin: origin(),
                    referer: origin(),
                },
            }
        );
        // console.log('data1111', data);
        if (data.code == 200) {
            const { data: jsonText2 } = await axios(
                'https://webapi.ctfile.com/get_file_url.php?uid=' +
                    data.file.userid +
                    '&fid=' +
                    data.file.file_id +
                    '&file_chk=' +
                    data.file.file_chk +
                    // '&app=0&acheck=2&rd=' +
                    '&folder_id=0&mb=0&app=0&acheck=1&rd=' +
                    Math.random(),
                {
                    headers: {
                        origin: origin(),
                        referer: origin(),
                    },
                }
            );
            // console.log('jsonText2', jsonText2);
            if (jsonText2.code == 200) {
                return {
                    success: true,
                    name: data.file.file_name,
                    size: data.file.file_size,
                    time: data.file.file_time,
                    link: jsonText2.downurl,
                };
            } else {
                return {
                    success: false,
                    name: data.file.file_name,
                    size: data.file.file_size,
                    time: data.file.file_time,
                    errormsg: jsonText2.message,
                };
            }
        } else {
            return {
                success: false,
                errormsg: data.file.message,
            };
        }
    },
};
