import * as _ from 'lodash';
import * as CryptoJs from 'crypto-js';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core'

const AppUtil = {
    toast(
        error: any,
        event: any,
        isShow: boolean = true,
        messageService?: MessageService
    ){
        if (isShow && messageService) {
            messageService.add({
                key: 'app-toast',
                severity: 'error',
                detail: error || event.body.message
            });
        }
    },

    getMessageSuccess(
        messageService: MessageService, 
        translateService: TranslateService, 
        message: string
    ) {
        messageService.add({
                key: 'app-toast',
            severity: 'success',
            summary: translateService.instant('message.success'),
            detail: translateService.instant(message)
        })
    },

    getMessageFailed(
        messageService: MessageService, 
        translateService: TranslateService, 
        message: string
    ) {
        messageService.add({
            key: 'app-toast',
            severity: 'error',
            summary: translateService.instant('message.failed'),
            detail: translateService.instant(message)
        })
    },

    toCamelCaseKey({ obj }: { obj: any }): any {
        if (Array.isArray(obj)) {
            return obj.map((o) => AppUtil.toCamelCaseKey({ obj: o }));
        } else if (obj && obj.constructor == Object) {
            return Object.keys(obj).reduce(
                (result, key) => ({
                    ...result,
                    [_.camelCase(key)]: AppUtil.toCamelCaseKey({ obj: obj[key] }),
                }), {}
            )
        }

        return obj;
    },

    toSnakeCaseKey(obj: any): any {

        if (Array.isArray(obj)) {
            return obj.map((map) => AppUtil.toSnakeCaseKey({ obj: map }));
        } else if (obj && obj.constructor == Object) {
            return Object.keys(obj).reduce(
                (result, key) => ({
                    ...result,
                    [_.snakeCase(key)]: AppUtil.toSnakeCaseKey(obj[key])
                }),{}
            )
        }

        return obj;       
    },
    hasMD5(text: string | CryptoJs.lib.WordArray): string {
        return CryptoJs.MD5(text).toString();
    }
}

export default AppUtil;