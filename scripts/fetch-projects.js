import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = process.env.VITE_STRAPI_URL || 'http://localhost:1337';

async function fetchProjects() {
    console.log('Fetching projects from Strapi...');
    try {
        const response = await fetch(`${STRAPI_URL}/api/projects?populate=*&sort=order:asc`);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching from Strapi:', error.message);
        return null;
    }
}

async function bakeData() {
    const data = await fetchProjects();
    if (!data) {
        console.log('Using existing projects.json or skipping bake.');
        return;
    }

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const projectsJsonPath = path.join(publicDir, 'projects.json');

    // Map data to the format the frontend expects (same as in loadProjects.ts)
    const mappedProjects = data.data.map((project, index) => {
        const attrs = project.attributes || project;

        const getUrl = (media) => {
            if (!media) return '';
            const url = media.url;
            if (!url) return '';
            if (url.startsWith('http')) return url;
            return `${STRAPI_URL}${url}`;
        };

        const getThumbnailMedia = (thumbnail) => {
            if (!thumbnail) return null;
            if (thumbnail.data?.attributes) return thumbnail.data.attributes;
            if (thumbnail.url) return thumbnail;
            return null;
        };

        const getGalleryUrls = (gallery) => {
            if (!gallery) return [];
            if (Array.isArray(gallery.data)) return gallery.data.map((img) => getUrl(img.attributes || img));
            if (Array.isArray(gallery)) return gallery.map((img) => getUrl(img));
            return [];
        };

        const thumbnailMedia = getThumbnailMedia(attrs.thumbnail);

        return {
            id: project.id,
            title: {
                pt: attrs.title_pt || attrs.title || '',
                en: attrs.title_en || attrs.title || ''
            },
            description: {
                pt: attrs.description_pt || attrs.description || '',
                en: attrs.description_en || attrs.description || ''
            },
            tags: {
                pt: typeof (attrs.tags_pt || attrs.tags) === 'string' ? (attrs.tags_pt || attrs.tags).split(',').map(t => t.trim()) : [],
                en: typeof (attrs.tags_en || attrs.tags) === 'string' ? (attrs.tags_en || attrs.tags).split(',').map(t => t.trim()) : []
            },
            image: getUrl(thumbnailMedia),
            color: attrs.color || "#0000FF",
            images: {
                thumbnail: getUrl(thumbnailMedia),
                gallery: getGalleryUrls(attrs.gallery),
            },
            about: {
                pt: attrs.about_pt || '',
                en: attrs.about_en || ''
            },
            results: {
                pt: attrs.results_pt || '',
                en: attrs.results_en || ''
            }
        };
    });

    fs.writeFileSync(projectsJsonPath, JSON.stringify({ projects: mappedProjects }, null, 2));
    console.log(`Successfully baked ${mappedProjects.length} projects to public/projects.json`);
}

bakeData();
