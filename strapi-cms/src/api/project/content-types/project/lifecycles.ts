import { translate } from 'google-translate-api-x';

export default {
    async beforeCreate(event) {
        const { data } = event.params;
        await translateContent(data);
    },

    async beforeUpdate(event) {
        const { data } = event.params;
        await translateContent(data);
    },
};

interface TranslatableField {
    source: string;
    target: string;
}

const fieldsToTranslate: TranslatableField[] = [
    { source: 'title_pt', target: 'title_en' },
    { source: 'description_pt', target: 'description_en' },
    { source: 'about_pt', target: 'about_en' },
    { source: 'results_pt', target: 'results_en' },
];

async function translateContent(data: any) {
    for (const field of fieldsToTranslate) {
        // Only translate if source exists AND target is empty
        if (data[field.source] && !data[field.target]) {
            try {
                // translate returns a promise that resolves to the result object
                // The result object has a 'text' property with the translated text
                const res = await translate(data[field.source], { from: 'pt', to: 'en' }) as any;

                data[field.target] = res.text;
                strapi.log.info(`Translated ${field.source} to ${field.target}`);
            } catch (error) {
                strapi.log.error(`Error translating ${field.source}: ${error}`);
            }
        }
    }
}
