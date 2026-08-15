import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content", "projects");
const outputFile = path.join(process.cwd(), "lib", "projects.generated.json");

function generate() {
    if (!fs.existsSync(contentDirectory)) {
        console.error(`Content directory not found: ${contentDirectory}`);
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, "[]");
        return;
    }

    const files = fs
        .readdirSync(contentDirectory)
        .filter((f) => f.endsWith(".mdx"));

    const projects = files.map((file) => {
        const filePath = path.join(contentDirectory, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        const slug = file.replace(/\.mdx$/, "");

        return {
            title: data.title,
            description: data.description,
            date: data.date ? String(data.date) : undefined,
            url: data.url,
            repository: data.repository,
            published: data.published ?? false,
            slug,
            path: `/projects/${slug}`,
            content,
        };
    });

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(projects, null, 2));
    console.log(`Generated ${projects.length} projects -> ${outputFile}`);
}

generate();