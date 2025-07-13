# Git Patch Export

A VS Code extension that adds convenient patch export commands to the Git panel, allowing you to quickly create patches from your Git repository.

## Features

- **Export Last Commit as Patch**: Creates a patch file from the last commit using `git format-patch -1 HEAD`
- **Export Staged Changes as Patch**: Creates a patch file from staged changes using `git diff --staged`
- Integrated directly into VS Code's Git panel with intuitive buttons
- Automatically opens created patch files for review
- Smart filename generation based on commit messages

## Usage

### Install the Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Git Patch Export"
4. Click Install

### Using the Extension

Once installed, you'll find two new buttons in your Git panel:

#### 1. Export Last Commit as Patch (📤)
- Click the export button in the Git panel header
- Automatically generates a patch file from your last commit
- File is named based on the commit message (e.g., `fix-bug-in-parser.patch`)
- Opens the patch file automatically for review

#### 2. Export Staged Changes as Patch (📝)
- Click the diff button in the Git panel header
- Prompts you to enter a filename for the patch
- Creates a patch file containing all staged changes
- Opens the patch file automatically for review

### Button Locations

The buttons appear in two locations:
- **Git Panel Header**: Available at the top of the Source Control panel
- **Context Menu**: Right-click on staged files for quick access

## Commands

| Command | Description | Git Command |
|---------|-------------|-------------|
| `git-patch-export.formatPatch` | Export Last Commit as Patch | `git format-patch -1 HEAD` |
| `git-patch-export.stagedDiff` | Export Staged Changes as Patch | `git diff --staged > name.patch` |

## Requirements

- VS Code 1.60.0 or higher
- Git installed and available in PATH
- Active Git repository in workspace

## Extension Settings

This extension contributes the following settings:

* No additional settings required - works out of the box!

## Known Issues

- Patch files are created in the workspace root directory
- Requires Git to be properly configured in the system PATH

## Release Notes

### 1.0.0

Initial release with core functionality:
- Export last commit as patch
- Export staged changes as patch
- Integration with Git panel UI
- Automatic file opening

## Contributing

Found a bug or want to contribute? Please visit our [GitHub repository](https://github.com/sv222/vscode-git-patch-export).

## License

This extension is licensed under the [MIT License](LICENSE).

---

**Enjoy using Git Patch Export!** 🚀