import {i18n} from "../plugins/i18n";

enum CategoryEnum {
  FANTASY = 'FANTASY',
  SCIENCE_FICTION = 'SCIENCE_FICTION',
  MYSTERY = 'MYSTERY',
  ROMANCE = 'ROMANCE',
  HORROR = 'HORROR',
  THRILLER = 'THRILLER',
  HISTORICAL_FICTION = 'HISTORICAL_FICTION',
  BIOGRAPHY = 'BIOGRAPHY',
  SELF_HELP = 'SELF_HELP',
  POETRY = 'POETRY',
}

interface ICategory {
  value: number;
  title: string;
}

class CategoryEnumHelper {
  static getLabel(category: CategoryEnum): string {
    switch (category) {
      case CategoryEnum.FANTASY:
        return i18n.global.t('fantasy');
      case CategoryEnum.SCIENCE_FICTION:
        return i18n.global.t('science fiction');
      case CategoryEnum.MYSTERY:
        return i18n.global.t('mystery');
      case CategoryEnum.ROMANCE:
        return i18n.global.t('romance');
      case CategoryEnum.HORROR:
        return i18n.global.t('horror');
      case CategoryEnum.THRILLER:
        return i18n.global.t('thriller');
      case CategoryEnum.HISTORICAL_FICTION:
        return i18n.global.t('historical fiction');
      case CategoryEnum.BIOGRAPHY:
        return i18n.global.t('biography');
      case CategoryEnum.SELF_HELP:
        return i18n.global.t('self help');
      case CategoryEnum.POETRY:
        return i18n.global.t('poetry');
      default:
        return 'Unknown';
    }
  }

  static getValues(): CategoryEnum[] {
    return Object.values(CategoryEnum);
  }

  static getList(): ICategory[] {
    return this.getValues().map(
      (category, index) => ({
        value: index + 1,
        title: this.getLabel(category)
      })
    );
  }
}

export {CategoryEnum, CategoryEnumHelper};
