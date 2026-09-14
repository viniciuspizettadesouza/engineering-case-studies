# Developer Tooling and Command-Line Reference

Review a command before running it, especially when it changes Git history,
permissions, dependencies, or many files.

## Git identity and configuration

```bash
git config user.name
git config user.email
git config --list
```

Add `--global` only when the setting should apply to every local repository.
Avoid disabling commit signing globally to solve a repository-specific problem;
diagnose the signing setup or make a narrowly scoped change.

Amend the most recent unpublished commit with `git commit --amend`. Rebase a
feature branch onto an updated base with `git rebase origin/fix/example-branch`,
after confirming that rewriting the branch is safe. Prefer
`git switch -c my-feature` when creating a branch in current Git versions.

Use `git commit --no-verify` only for a diagnosed emergency. Skipping hooks can
bypass the same validation that protects collaborators and CI.

## Packages and local builds

```bash
npm outdated
npx npm-check-updates
pnpm install --frozen-lockfile
```

Review dependency updates before applying them. Commands that rewrite a
manifest should run on a branch and be followed by tests. Generated directories
commonly ignored by Git include `node_modules/`, `.next/`, `coverage/`, and
`storybook-static/`.

## Shell and editor notes

- Export `GPG_TTY=$(tty)` when terminal-based signing needs the active TTY.
- In Vim, press `Esc`, enter `:wq`, and press Return to save and quit.
- Restart a TypeScript language server through the editor command palette when
  its project state becomes stale.
- Editor settings sync can keep preferences consistent across machines; review
  extensions and settings before trusting a shared configuration.
- Format LaTeX with `latexindent cv.tex -w` only after reviewing or committing
  the file, because `-w` rewrites it.

Administrative tools such as `visudo` intentionally require elevated access.
Do not copy credentials or passphrases into notes, repositories, shell history,
or example commands; store them in an appropriate password manager.

## Environment cleanup and CI

Some Windows Subsystem for Linux checkouts contain `Zone.Identifier` metadata.
List exact matches before deleting them; never run a recursive deletion command
from an unverified directory.

When a pipeline fails, start at the first failed step rather than searching only
for the word `FAIL`. Capture the failing command, environment, and relevant log
context, reproduce locally when possible, then fix the cause instead of bypassing
validation.

Code-review assistants can help with a full-file walkthrough, but their output
is a review input, not evidence that the code is correct or secure.
