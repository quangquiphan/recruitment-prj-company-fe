import * as moment from "moment";
import AppConstant from "./app-constant";
import { TranslateService } from '@ngx-translate/core';

const AppData = {
    getListCity() {
        return [
            {
                id: 0,
                name: "An Giang"
            },
            {
                id: 1,
                name: "Bà Rịa – Vũng Tàu"
            },
            {
                id: 2,
                name: "Bạc Liêu"
            },
            {
                id: 3,
                name: "Bắc Giang"
            },
            {
                id: 4,
                name: "Bắc Kạn"
            },
            {
                id: 5,
                name: "Bắc Ninh"
            },
            {
                id: 6,
                name: "Bến Tre"
            },
            {
                id: 7,
                name: "Bình Dương"
            },
            {
                id: 8,
                name: "Bình Định"
            },
            {
                id: 9,
                name: "Bình Phước"
            },
            {
                id: 10,
                name: "Bình Thuận"
            },
            {
                id: 11,
                name: "Cà Mau"
            },
            {
                id: 12,
                name: "Cao Bằng"
            },
            {
                id: 13,
                name: "Cần Thơ"
            },
            {
                id: 14,
                name: "Đà Nẵng"
            },
            {
                id: 15,
                name: "Đắk Lắk"
            },
            {
                id: 16,
                name: "Đắk Nông"
            },
            {
                id: 17,
                name: "Điện Biên"
            },
            {
                id: 18,
                name: "Đồng Nai"
            },
            {
                id: 19,
                name: "Đồng Tháp"
            },
            {
                id: 20,
                name: "Gia Lai"
            },
            {
                id: 21,
                name: "Hà Giang"
            },
            {
                id: 22,
                name: "Hà Nam"
            },
            {
                id: 23,
                name: "Hà Nội"
            },
            {
                id: 24,
                name: "Hà Tĩnh"
            },
            {
                id: 25,
                name: "Hải Dương"
            },
            {
                id: 26,
                name: "Hải Phòng"
            },
            {
                id: 27,
                name: "Hậu Giang"
            },
            {
                id: 28,
                name: "Hòa Bình"
            },
            {
                id: 29,
                name: "Tp.Hồ Chí Minh"
            },
            {
                id: 30,
                name: "Hưng Yên"
            },
            {
                id: 31,
                name: "Khánh Hòa"
            },
            {
                id: 32,
                name: "Kiên Giang"
            },
            {
                id: 33,
                name: "Kon Tum"
            },
            {
                id: 34,
                name: "Lai Châu"
            },
            {
                id: 35,
                name: "Lạng Sơn"
            },
            {
                id: 36,
                name: "Lào Cai"
            },
            {
                id: 37,
                name: "Lâm Đồng"
            },
            {
                id: 38,
                name: "Long An"
            },
            {
                id: 39,
                name: "Nam Định"
            },
            {
                id: 40,
                name: "Nghệ An"
            },
            {
                id: 41,
                name: "Ninh Bình"
            },
            {
                id: 42,
                name: "Ninh Thuận"
            },
            {
                id: 43,
                name: "Phú Thọ"
            },
            {
                id: 44,
                name: "Phú Yên"
            },
            {
                id: 45,
                name: "Quảng Bình"
            },
            {
                id: 46,
                name: "Quảng Nam"
            },
            {
                id: 47,
                name: "Quảng Ngãi"
            },
            {
                id: 48,
                name: "Quảng Ninh"
            },
            {
                id: 49,
                name: "Quảng Trị"
            },
            {
                id: 50,
                name: "Sóc Trăng"
            },
            {
                id: 51,
                name: "Sơn La"
            },
            {
                id: 52,
                name: "Tây Ninh"
            },
            {
                id: 53,
                name: "Thái Bình"
            },
            {
                id: 54,
                name: "Thái Nguyên"
            },
            {
                id: 55,
                name: "Thanh Hóa"
            },
            {
                id: 56,
                name: "Thừa Thiên Huế"
            },
            {
                id: 57,
                name: "Tiền Giang"
            },
            {
                id: 58,
                name: "Trà Vinh"
            },
            {
                id: 59,
                name: "Tuyên Quang"
            },
            {
                id: 60,
                name: "Vĩnh Long"
            },
            {
                id: 61,
                name: "Vĩnh Phúc"
            },
            {
                id: 62,
                name: "Vĩnh Phúc"
            },
        ];
    },

    getCompanySize(translate: TranslateService) {
        return [
            {
                id: AppConstant.COMPANY_SIZE.FORM_11_TO_25,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_11_TO_25}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.FORM_26_TO_50,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_26_TO_50}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.FORM_51_TO_100,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_51_TO_100}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.FORM_101_TO_1000,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_101_TO_1000}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.OVER_1000,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.OVER_1000}`)
            }
        ]
    },

    getMajor(translate: TranslateService) {
        return [
            {
                id: "it",
                label: translate.instant('major.it')
            },
            {
                id: "sale",
                label: translate.instant('major.sale')
            },
            {
                id: "accountant",
                label: translate.instant('major.accountant')
            },
            {
                id: "hr",
                label: translate.instant('major.hr')
            },
            {
                id: "QA/QC",
                label: translate.instant('major.qa_qc')
            },
            {
                id: "law",
                label: translate.instant('major.law')
            },
            {
                id: "education",
                label: translate.instant('major.education')
            },
            {
                id: "orther",
                label: translate.instant('major.orther')
            }
        ]
    },

    getSalary(translate: TranslateService) {
        return [
            
            {
                id: "EXPECTED",
                label: translate.instant('salary.EXPECTED')
            },
            {
                id: "UNDER_3",
                label: translate.instant('salary.UNDER_3')
            },
            {
                id: "FROM_3_TO_5",
                label: translate.instant('salary.FROM_3_TO_5')
            },
            {
                id: "FROM_5_TO_10",
                label: translate.instant('salary.FROM_5_TO_10')
            },
            {
                id: "FROM_10_TO_18",
                label: translate.instant('salary.FROM_10_TO_18')
            },
            {
                id: "FROM_18_TO_25",
                label: translate.instant('salary.FROM_18_TO_25')
            },
            {
                id: "FROM_25_TO_50",
                label: translate.instant('salary.FROM_25_TO_50')
            },
            {
                id: "OVER_50",
                label: translate.instant('salary.OVER_50')
            },
        ]
    },

    getGender(translate: TranslateService) {
        return [
            {
                id: 'FE_MALE',
                label: translate.instant('gender.FE_MALE')
            },
            {
                id: 'MALE',
                label: translate.instant('gender.MALE')
            }
        ]
    },

    getExpiryDate(translate: TranslateService) {
        return [
            {
                id: moment(moment().add(10, 'days')).format(AppConstant.DATE_FORMAT.POST),
                label: translate.instant('label.expiry_date_ooption', {date: 10})
            },
            {
                id: moment(moment().add(15, 'days')).format(AppConstant.DATE_FORMAT.POST),
                label: translate.instant('label.expiry_date_ooption', {date: 15})
            },
            {
                id: moment(moment().add(20, 'days')).format(AppConstant.DATE_FORMAT.POST),
                label: translate.instant('label.expiry_date_ooption', {date: 20})
            },
            {
                id: moment(moment().add(30, 'days')).format(AppConstant.DATE_FORMAT.POST),
                label: translate.instant('label.expiry_date_ooption', {date: 30})
            },
            {
                id: moment(moment().add(60, 'days')).format(AppConstant.DATE_FORMAT.POST),
                label: translate.instant('label.expiry_date_ooption', {date: 60})
            },
            {
                id: moment(moment().add(90, 'days')).format(AppConstant.DATE_FORMAT.POST),
                label: translate.instant('label.expiry_date_ooption', {date: 90})
            },
            {
                id: moment(moment().add(120, 'days')).format(AppConstant.DATE_FORMAT.POST),
                label: translate.instant('label.expiry_date_ooption', {date: 120})
            }
        ]
    }
}

export default AppData