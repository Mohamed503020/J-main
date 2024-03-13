import { ThemeDirectionEnum } from "../enums/theme-direction.enum";

export interface LanguageDto {
    id: number;
    name: string;
    country: string;
    dir: ThemeDirectionEnum;
}