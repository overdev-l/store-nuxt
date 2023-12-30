import COS from 'cos-js-sdk-v5';
import {$fetch} from "ofetch";
import type {Result} from "~/types/result";

export class Oss {
    public static upload(file: File) {
        const oss = new COS({
            getAuthorization: async (options, callback) => {
                const { data } = await $fetch<Result<any>>("/api/proxy", {
                    method: 'post',
                    body: {
                        url: '/api/public/uploadConfig',
                        method: 'post'
                    }
                })
                callback({
                    TmpSecretId: data.credentials.tmpSecretId,
                    TmpSecretKey: data.credentials.tmpSecretKey,
                    SecurityToken: data.credentials.sessionToken,
                    // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                    ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
                });
            }
        })
        return new Promise((resolve, reject) => {
            oss.uploadFile({
                Bucket: 'sore-1323372507',
                Region: 'ap-chengdu',
                Key: file.name,
                Body: file,
                SliceSize: 1024 * 1024 * 2,
                onFileFinish: (err, data, options) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(data.Location)
                }
            }, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data.Location)
            })
        })

    }
}