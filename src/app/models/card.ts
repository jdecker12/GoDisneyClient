export class CardContent {
    paraOne!: string;
    paraTwo!: string;
    paraThree!: string;
    paraFour!: string;
    cardId!: number;
    getCardContentsViewModel?: any;
}

export class Card {
    thisCardId!: number;
    cardCategory?: any;
    cardTitle!: string;
    cardImg!: string;
    cardImg3!: string;
    cardLink!: string;
    cardLinkName!: string;
    cardIcon!: string;
    cardContents: Array<CardContent> = new Array<CardContent>();
}