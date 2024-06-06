import {i18n} from "../plugins/i18n";
import {ICategory} from "../interfaces/category";

export enum Category {
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

export class CategoryEnumHelper {
  static getLabel(category: Category): string {
    switch (category) {
      case Category.FANTASY:
        return i18n.global.t('fantasy');
      case Category.SCIENCE_FICTION:
        return i18n.global.t('science fiction');
      case Category.MYSTERY:
        return i18n.global.t('mystery');
      case Category.ROMANCE:
        return i18n.global.t('romance');
      case Category.HORROR:
        return i18n.global.t('horror');
      case Category.THRILLER:
        return i18n.global.t('thriller');
      case Category.HISTORICAL_FICTION:
        return i18n.global.t('historical fiction');
      case Category.BIOGRAPHY:
        return i18n.global.t('biography');
      case Category.SELF_HELP:
        return i18n.global.t('self help');
      case Category.POETRY:
        return i18n.global.t('poetry');
      default:
        return 'Unknown';
    }
  }

  static getValues(): Category[] {
    return Object.values(Category);
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
