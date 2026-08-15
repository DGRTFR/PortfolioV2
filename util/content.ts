import projectsData from "@/lib/projects.generated.json";

export type Project = {
	title: string;
	description: string;
	date?: string;
	url?: string;
	repository?: string;
	published: boolean;
	slug: string;
	path: string;
	content: string;
};

export function getAllProjects(): Project[] {
	return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
	return getAllProjects().find((p) => p.slug === slug);
}