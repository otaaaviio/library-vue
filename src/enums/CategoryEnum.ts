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

class CategoryEnumHelper {
  static getLabel(category: CategoryEnum): string {
    switch (category) {
      case CategoryEnum.FANTASY:
        return 'Fantasy';
      case CategoryEnum.SCIENCE_FICTION:
        return 'Science Fiction';
      case CategoryEnum.MYSTERY:
        return 'Mystery';
      case CategoryEnum.ROMANCE:
        return 'Romance';
      case CategoryEnum.HORROR:
        return 'Horror';
      case CategoryEnum.THRILLER:
        return 'Thriller';
      case CategoryEnum.HISTORICAL_FICTION:
        return 'Historical Fiction';
      case CategoryEnum.BIOGRAPHY:
        return 'Biography';
      case CategoryEnum.SELF_HELP:
        return 'Self Help';
      case CategoryEnum.POETRY:
        return 'Poetry';
      default:
        return 'Unknown';
    }
  }

  static getValues(): CategoryEnum[] {
    return Object.values(CategoryEnum);
  }

  static getLabels(): string[] {
    return this.getValues().map((category) => this.getLabel(category));
  }

  static getId(category: CategoryEnum): number {
    return this.getValues().indexOf(category);
  }

  static getRandomId(): number {
    return Math.floor(Math.random() * this.getValues().length) + 1;
  }
}

export { CategoryEnum, CategoryEnumHelper };
