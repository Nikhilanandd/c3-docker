// Recruitment Page Data Models

export interface Candidate {
    name: string;
    email: string;
    mobile: string;
    passingOutYear: string;
    isVerified: boolean;
}

export interface ProblemStatement {
    id: string;
    title: string;
    description: string;
    githubIssueUrl: string;
    categoryId: string;
}

export interface PositionCategory {
    id: string;
    title: string;
    description: string;
    problems: ProblemStatement[];
}
