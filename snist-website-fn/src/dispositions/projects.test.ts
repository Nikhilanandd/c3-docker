import test from 'node:test';
import assert from 'node:assert';
import { getAllProjects, getProjectByName, projects, PROJECT_CATEGORIES } from './projects.ts';

test('projects object structure', () => {
    assert.strictEqual(typeof projects, 'object');
    assert.ok(Object.keys(projects).length > 0);
});

test('PROJECT_CATEGORIES contains all categories', () => {
    const categories = Object.keys(projects);
    assert.deepStrictEqual(PROJECT_CATEGORIES, categories);
    assert.ok(PROJECT_CATEGORIES.includes('Cloud Infrastructure'));
});

test('getAllProjects returns all projects from all categories', () => {
    const allProjects = getAllProjects();
    const expectedCount = Object.values(projects).reduce(
        (acc, category) => acc + Object.keys(category).length,
        0
    );

    assert.strictEqual(allProjects.length, expectedCount);

    // Check if each item is a [name, project] tuple
    allProjects.forEach(([name, project]) => {
        assert.strictEqual(typeof name, 'string');
        assert.strictEqual(typeof project, 'object');
        assert.ok(project.description);
        assert.ok(project.tech_stack);
    });
});

test('getProjectByName returns the correct project for existing names', () => {
    // Test case 1: AWS Cloud Lab
    const name1 = 'AWS Cloud Lab';
    const project1 = getProjectByName(name1);
    assert.ok(project1);
    assert.strictEqual(project1.difficulty, 'Intermediate');
    assert.deepStrictEqual(project1.tech_stack, ['AWS', 'Terraform', 'Docker']);

    // Test case 2: Microservices Demo
    const name2 = 'Microservices Demo';
    const project2 = getProjectByName(name2);
    assert.ok(project2);
    assert.strictEqual(project2.difficulty, 'Advanced');
    assert.ok(project2.tech_stack.includes('Kubernetes'));
});

test('getProjectByName is case-sensitive', () => {
    const name = 'aws cloud lab'; // lowercase
    const project = getProjectByName(name);
    assert.strictEqual(project, undefined);
});

test('getProjectByName returns undefined for non-existent project names', () => {
    const names = ['', ' ', 'Non-Existent', 'Cloud Infrastructure']; // category name is not a project name
    names.forEach(name => {
        const project = getProjectByName(name);
        assert.strictEqual(project, undefined, `Should return undefined for "${name}"`);
    });
});

test('projects in different categories can be retrieved', () => {
    const categories = Object.keys(projects);
    categories.forEach(category => {
        const categoryProjects = projects[category];
        const projectNames = Object.keys(categoryProjects);
        projectNames.forEach(name => {
            const project = getProjectByName(name);
            assert.ok(project, `Should find project "${name}" in category "${category}"`);
            assert.deepStrictEqual(project, categoryProjects[name]);
        });
    });
});
