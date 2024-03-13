import { Component, Input } from '@angular/core';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';

@Component({
  selector: 'app-secondary-sidbar',
  templateUrl: './secondary-sidbar.component.html',
  styleUrls: ['./secondary-sidbar.component.scss']
})
export class SecondarySidbarComponent {

  @Input() menuId: MenuTypeEnum | null = null;


  get selectedMenu() {
    if(this.menuId != null){
      return this.menuArr.find(x => x.id == this.menuId);
    }
    return null;
  }


  menuArr = [
    {
      id: MenuTypeEnum.Sms,
      name: "SMS",
      details: [
        {
          id: 1,
          name: "رئيسية Sms"
        },
        {
          id: 2,
          name: "اضافة اسم المرسل"
        },

      ]
    },
    {
      id: MenuTypeEnum.whatApp,
      name: "WhatApp",
      details: [
        {
          id: 1,
          name: " الرئيسية WhatsApp"
        },
        {
          id: 2,
          name: "اضافة رقم خدمة"
        },

      ]
    },
    {
      id: MenuTypeEnum.Hosting,
      name: "خدمات الاستضافة",
      details: [
        {
          id: 1,
          name: "الرئيسية خدمات الاستضافة"
        },

      ]
    },
    {
      id: MenuTypeEnum.FinancialSystem,
      name: "النظام المالي والاداري",
      details: [
        {
          id: 1,
          name: "  رئيسية النظام المالي والاداي"
        },
        {
          id: 2,
          name: "انشاء شركة جديدة "
        },

      ]
    },
    {
      id: MenuTypeEnum.SystemManagement,
      name: "ادارة النظم والموارد ",
      details: [
        {
          id: 1,
          name: "الرئيسية ادارة النظم والموارد"
        },
        {
          id: 2,
          name: "العملاء المتوقعين "
        },

      ]
    },
    {
      id: MenuTypeEnum.CustomerRelation,
      name: "ادارة علاقات العملاء",
      details: [
        {
          id: 1,
          name: "الرئيسية ادارة علاقات العملاء"
        },

      ]
    },
    {
      id: MenuTypeEnum.StartProject,
      name: "ابدا مشروعك",
      details: [
        {
          id: 1,
          name: "الرئيسية أبدا مشروعك"
        },

      ]
    },
    {
      id: MenuTypeEnum.SalaStor,
      name: "  متجر سلة",
      details: [
        {
          id: 1,
          name: "الرئيسية    متجر سلة"
        },

      ]
    },
    {
      id: MenuTypeEnum.GoogleSheet,
      name: "Google sheet Beta",
      details: [
        {
          id: 1,
          name: "الرئيسية Google sheet Beta"
        },

      ]
    },
    {
      id: MenuTypeEnum.Schools,
      name: "المدارس",
      details: [
        {
          id: 1,
          name: "الرئيسية المدارس"
        },

      ]
    },
    {
      id: MenuTypeEnum.Make,
      name: "Make",
      details: [
        {
          id: 1,
          name: "الرئيسية Make"
        },

      ]
    },
    {
      id: MenuTypeEnum.Email2SMS,
      name: "Email2SMS",
      details: [
        {
          id: 1,
          name: "   رئيسية Email2SMS "
        },

      ]
    },
    {
      id: MenuTypeEnum.WordPress,
      name: "الووردبريس",
      details: [
        {
          id: 1,
          name: "الرئيسية الووردبريس"
        },

      ]
    },
    {
      id: MenuTypeEnum.Programs,
      name: "برامجنا الجاهوة",
      details: [
        {
          id: 1,
          name: "الرئيسية برامجنا الجاهوة"
        },

      ]
    },
  ]

}
