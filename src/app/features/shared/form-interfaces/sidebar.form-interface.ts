import { FormControl } from "@angular/forms";
import { MenuTypeEnum } from "../enums/menu-type.enum";

export interface SidebarFormInterface {
  menuId:FormControl<MenuTypeEnum | null>;
}   