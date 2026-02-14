
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    if (!process.env.GEMINI_API_KEY) {
        strapi.log.warn('GEMINI_API_KEY is not set. Auto-translation skipped.');
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    for (const field of fieldsToTranslate) {
        // Only translate if source exists AND target is empty
        if (data[field.source] && !data[field.target]) {
            try {
                const prompt = `Translate the following Portuguese text to English. Return ONLY the translated text, nothing else. Text: "${data[field.source]}"`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                data[field.target] = text.trim();
                strapi.log.info(`Translated ${field.source} to ${field.target}`);
            } catch (error) {
                strapi.log.error(`Error translating ${field.source}: ${error}`);
            }
        }
    }
}
