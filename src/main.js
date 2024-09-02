// Import the Plugin class from the Obsidian API
const { Plugin } = require('obsidian');

module.exports = class PastePlaintextPlugin extends Plugin {
    async onload() {
        // Register a command that will be bound to a hotkey
        this.addCommand({
            id: 'paste-plaintext',
            name: 'Paste Plaintext',
            callback: () => {
                this.pastePlaintext();
            }
        });

        // Add a hotkey to trigger the command
        this.addHotkey({
            combination: 'Ctrl+Shift+V', // Example hotkey, change as needed
            command: 'paste-plaintext'
        });
    }

    async pastePlaintext() {
        // Read text from the clipboard and replace the selected text
        try {
            const text = await navigator.clipboard.readText();
            const editor = this.app.workspace.activeEditor?.editor;
            if (editor) {
                editor.replaceSelection(text);
            }
        } catch (error) {
            console.error('Failed to read clipboard text:', error);
        }
    }
};
