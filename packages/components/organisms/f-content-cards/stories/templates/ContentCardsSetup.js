import {
    ContentCards, PromotionCard, VoucherCard, FirstTimeCustomerCard
} from '../../src';
import { makeServer, resetBrazeData } from '../mocks/mirage-server';

export default (args, { argTypes }) => ({
    name: 'test',
    props: Object.keys(argTypes),
    components: {
        ContentCards,
        PromotionCard,
        VoucherCard,
        FirstTimeCustomerCard
    },
    data: () => ({
        contentCardsHaveLoaded: false
    }),
    beforeMount () {
        resetBrazeData();
        makeServer('setupSeed');
    },
    methods: {
        hasLoaded () {
            this.contentCardsHaveLoaded = true;
        },
        handleCustomCardType (type) {
            switch (type) {
                case 'Anniversary_Card_1':
                case 'Voucher_Card_1':
                    return 'VoucherCard';
                case 'Restaurant_FTC_Offer_Card':
                    return 'FirstTimeCustomerCard';
                case 'Post_Order_Card_1':
                    return 'PostOrderCard';
                case 'Promotion_Card_1':
                case 'Promotion_Card_2':
                    return 'PromotionCard';
                case 'Terms_And_Conditions_Card':
                case 'Terms_And_Conditions_Card_2':
                    return 'TermsAndConditionsCard';
                case 'Home_Promotion_Card_1':
                    return 'HomePromotionCard1';
                case 'Home_Promotion_Card_2':
                    return 'HomePromotionCard2';
                default:
                    break;
            }
            return false;
        }
    },
    template: `
        <content-cards
            #default="{ cards }"
            :user-id="userId"
            :api-key="apiKey"
            :locale="locale"
        >
            <div>
                <template v-for="(card, cardIndex) in cards">
                    <component :key="cardIndex" :is="handleCustomCardType(card.type)" :card="card" />
                </template>
            </div>
        </content-cards>
    `
});
