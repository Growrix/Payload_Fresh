Git Tutorial — Live steps and teacher notes

Checklist

- [x] Show current git status and current branch
- [x] Create and switch to a feature branch
- [x] Add a small file to commit (this file)
- [x] Stage and commit the change
- [x] Push the branch to GitHub
- [x] Show git log and remote branch

What I'll do next

1. Run `git status` to show current state.
2. Create a branch `feature/git-tutorial` and switch to it.
3. Stage and commit this file.
4. Push the branch to `origin` and show the log.

Teacher's notes (short):

- `git status` shows uncommitted changes and current branch.
- `git checkout -b <branch>` creates and switches to a new branch.
- `git add .` stages changes for commit.
- `git commit -m "message"` records staged changes.
- `git push -u origin <branch>` uploads branch and sets upstream.
- `git log --oneline -n 5` shows recent commits.

Files changed in this demo:

- `git-tutorial.md` (added)

If you want, I can now open a Pull Request on GitHub for this branch.

---

Copilot prompts you can use (copy this section as reference)

1. Prompt: "Show git status"

   - Command I run:
     git status --porcelain=1 --branch
   - Teacher note: Shows current branch and a compact listing of staged, unstaged, and untracked files.

2. Prompt: "Show recent commits"

   - Command I run:
     git log --oneline --graph --decorate -n 10
   - Teacher note: Useful to inspect recent history and branch topology.

3. Prompt: "Stage file <path>"

   - Command I run:
     git add "<path>"
   - Teacher note: Adds a file to the index so it's included in the next commit.

4. Prompt: "Stage all"

   - Command I run:
     git add -A
   - Teacher note: Stages all changes (new/modified/deleted) in the working tree.

5. Prompt: "Commit with message '<msg>'"

   - Command I run:
     git commit -m "<msg>"
   - Teacher note: Records staged changes as a new commit with the provided message.

6. Prompt: "Amend last commit with message '<msg>'"

   - Command I run:
     git add -A
     git commit --amend -m "<msg>"
   - Teacher note: Rewrites the most recent commit (useful for small fixes). Avoid on shared branches unless necessary.

7. Prompt: "Create branch <name> and switch"

   - Command I run:
     git checkout -b <name>
   - Teacher note: Creates a new branch and switches your working tree to it.

8. Prompt: "Switch to branch <name>"

   - Command I run:
     git checkout <name>
   - Teacher note: Changes your working tree to the specified branch.

9. Prompt: "Pull main"

   - Command I run:
     git checkout main
     git pull origin main
   - Teacher note: Updates local main with the remote main branch.

10. Prompt: "Push branch" - Command I run:
    git push -u origin HEAD - Teacher note: Pushes the current branch to remote and sets upstream for future pushes.

11. Prompt: "Push branch and open PR" - What I do: Push branch and provide the GitHub PR URL to open in your browser. - Teacher note: Creates a remote branch and gives you a PR link to review/merge.

12. Prompt: "Show diff for file <path>" - Command I run:
    git diff -- "<path>" - Teacher note: Shows unstaged changes. Use `git diff --staged` for staged changes.

13. Prompt: "Revert commit <sha>" - Command I run:
    git revert <sha> - Teacher note: Creates a new commit that undoes the specified commit (safe for shared branches).

14. Prompt: "Hard reset to <sha> (confirm)" - Command I run after confirmation:
    git reset --hard <sha> - Teacher note: Resets branch and working tree to the specified commit (destructive). I will ask for confirmation.

15. Prompt: "Delete local branch <name>" - Command I run:
    git branch -d <name> - Teacher note: Deletes a branch locally if merged. Use `-D` to force-delete (I will ask before force).

16. Prompt: "Delete remote branch <name> (confirm)" - Command I run:
    git push origin --delete <name> - Teacher note: Removes branch from GitHub.

17. Prompt: "Stash changes" - Command I run:
    git stash push -m "work-in-progress"
    git stash list - Teacher note: Saves uncommitted work so you can switch branches cleanly.

18. Prompt: "Apply latest stash" - Command I run:
    git stash apply - Teacher note: Restores stashed changes; use `git stash pop` to apply and remove the stash.

19. Prompt: "Show history for file <path>" - Command I run:
    git log --oneline --follow -- "<path>" - Teacher note: Shows commit history for a file, including renames.

20. Prompt: "Set remote to <url>" - Command I run:
    git remote remove origin 2>$null; git remote add origin <url>
    git remote -v - Teacher note: Sets or replaces the `origin` remote. Safe for reconfiguring which GitHub repo this project points to.

21. Prompt: "Force push branch (confirm)" - Command I run after confirmation:
    git push --force-with-lease origin HEAD - Teacher note: Force-pushes safely with lease to avoid clobbering others' changes; destructive—confirm required.

How we'll work together

- You give one of the short prompts above (or type a natural request like "Stage all and commit with message 'x'").
- I'll run the mapped git commands locally and post the terminal output plus a one-line teacher note describing what happened and why.
- For any destructive action (hard reset, force push, delete remote branch) I will always ask for explicit confirmation before proceeding.

Optional: I can add a helper script `scripts/git-copilot.ps1` that maps short keywords to commands so you can run them locally yourself. Tell me if you want that and I will add it.
