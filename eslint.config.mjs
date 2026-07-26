import js from '@eslint/js'
import tseslint from 'typescript-eslint'

// The Obsidian community plugin scorecard additionally runs
// `eslint-plugin-obsidianmd`. That plugin is intentionally not a devDependency
// here because it pins an older ESLint and drags in a set of advisory-flagged
// transitive packages. To check those rules locally without adding them to the
// lockfile, run:
//
//   npx --package eslint-plugin-obsidianmd --package eslint eslint src
//
export default tseslint.config(
	{
		ignores: ['main.js', 'node_modules/**'],
	},
	js.configs.recommended,
	{
		// Plugin source: type-aware linting against the project's tsconfig.
		files: ['src/**/*.ts'],
		extends: [...tseslint.configs.strictTypeChecked],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'no-prototype-builtins': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			semi: ['error', 'never'],
		},
	},
	{
		// Build tooling runs under Node, outside the plugin bundle.
		files: ['*.mjs'],
		languageOptions: {
			globals: { process: 'readonly' },
		},
	},
)
