import { ContentCards } from '../../src';

export default (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        ContentCards
    },
    template: `
        <content-cards
            #default="{ cards }"
            :user-id="userId"
            :api-key="apiKey"
            :locale="locale"
        >
            hey
        </content-cards>
    `
});
