const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function activate(context) {
    // Command for git format-patch -1 HEAD
    const formatPatchCommand = vscode.commands.registerCommand('git-patch-export.formatPatch', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        
        // Get last commit message for filename
        exec('git log -1 --pretty=format:"%s"', { cwd: workspaceRoot }, (error, stdout) => {
            if (error) {
                vscode.window.showErrorMessage('Error getting commit information: ' + error.message);
                return;
            }
            
            const commitMessage = stdout.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            const fileName = `${commitMessage || 'commit'}.patch`;
            
            // Execute git format-patch
            exec(`git format-patch -1 HEAD --stdout > "${fileName}"`, { cwd: workspaceRoot }, (error) => {
                if (error) {
                    vscode.window.showErrorMessage('Error creating patch: ' + error.message);
                    return;
                }
                
                vscode.window.showInformationMessage(`Patch saved as: ${fileName}`);
                
                // Optionally open the file
                const filePath = path.join(workspaceRoot, fileName);
                if (fs.existsSync(filePath)) {
                    vscode.workspace.openTextDocument(filePath).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                }
            });
        });
    });

    // Command for git diff --staged
    const stagedDiffCommand = vscode.commands.registerCommand('git-patch-export.stagedDiff', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        
        // Ask user for filename
        const fileName = await vscode.window.showInputBox({
            prompt: 'Enter filename for the patch',
            value: 'staged-changes.patch',
            placeHolder: 'name.patch'
        });
        
        if (!fileName) {
            return; // User cancelled
        }
        
        // Execute git diff --staged
        exec(`git diff --staged > "${fileName}"`, { cwd: workspaceRoot }, (error) => {
            if (error) {
                vscode.window.showErrorMessage('Error creating patch: ' + error.message);
                return;
            }
            
            vscode.window.showInformationMessage(`Staged changes patch saved as: ${fileName}`);
            
            // Optionally open the file
            const filePath = path.join(workspaceRoot, fileName);
            if (fs.existsSync(filePath)) {
                vscode.workspace.openTextDocument(filePath).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
            }
        });
    });

    context.subscriptions.push(formatPatchCommand);
    context.subscriptions.push(stagedDiffCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};